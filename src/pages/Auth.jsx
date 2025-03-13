import React, { useEffect, useState } from "react";
import { SignUp, useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../store/userSlice";
import { useSaveUserDataMutation } from "../store/userApi";
import "../assets/Auth.css";

const Auth = () => {
  const { isSignedIn, user } = useUser();
  const dispatch = useDispatch();
  const [saveUserData] = useSaveUserDataMutation();

  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");

  const [employeeData, setEmployeeData] = useState({
    education: "",
    experience: 0,
    skills: "",
  });

  const [companyData, setCompanyData] = useState({
    companyName: "",
    industry: "",
    website: "",
  });

  useEffect(() => {
    if (user) {
      dispatch(
        setUser({
          id: user.id,
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
        })
      );
    } else {
      dispatch(clearUser());
    }
  }, [user, dispatch]);

  const handleChange = (e) => {
    if (userType === "employee") {
      setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    } else {
      setCompanyData({ ...companyData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    const userDetails = {
      clerkId: user.id,
      name: user.fullName,
      email: user.primaryEmailAddress.emailAddress,
      userType,
      ...(userType === "employee" ? employeeData : companyData),
    };

    try {
      await saveUserData(userDetails).unwrap();
      console.log("User data saved successfully");
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {!isSignedIn ? (
          <div className="signup-container">
            <h2>Sign Up</h2>
            <SignUp />
          </div>
        ) : step === 1 ? (
          <div className="user-selection">
            <h2>Choose Your Role</h2>
            <button
              className="select-btn"
              onClick={() => {
                setUserType("employee");
                setStep(2);
              }}
            >
              I am looking for a job
            </button>
            <button
              className="select-btn"
              onClick={() => {
                setUserType("company");
                setStep(2);
              }}
            >
              I am a company hiring
            </button>
          </div>
        ) : (
          <div className="form-container">
            <h2>Welcome, {user.fullName}</h2>
            <h3>
              {userType === "employee"
                ? "Job Seeker Details"
                : "Company Details"}
            </h3>

            {userType === "employee" ? (
              <>
                <div className="form-group">
                  <label>Education:</label>
                  <input
                    type="text"
                    name="education"
                    value={employeeData.education}
                    onChange={handleChange}
                    placeholder="B.Tech"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Experience:</label>
                  <input
                    type="number"
                    name="experience"
                    value={employeeData.experience}
                    onChange={handleChange}
                    placeholder="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Skills:</label>
                  <input
                    type="text"
                    name="skills"
                    value={employeeData.skills}
                    onChange={handleChange}
                    placeholder="Skills"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Company Name:</label>
                  <input
                    type="text"
                    name="companyName"
                    value={companyData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Industry:</label>
                  <input
                    type="text"
                    name="industry"
                    value={companyData.industry}
                    onChange={handleChange}
                    placeholder="Industry Type"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Website:</label>
                  <input
                    type="text"
                    name="website"
                    value={companyData.website}
                    onChange={handleChange}
                    placeholder="Website URL"
                    required
                  />
                </div>
              </>
            )}

            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
