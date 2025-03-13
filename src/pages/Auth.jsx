import React, { useEffect, useState } from "react";
import { SignUp, useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../store/userSlice";
import { useSaveUserDataMutation } from "../store/userApi";
import "../assets/Auth.css";
import EmployeeForm from "../components/EmployeeForm";
import CompanyForm from "../components/CompanyForm";

const Auth = () => {
  const { isSignedIn, user } = useUser();
  const dispatch = useDispatch();
  const [saveUserData] = useSaveUserDataMutation();

  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [errors, setErrors] = useState({});

  const [employeeData, setEmployeeData] = useState({
    education: "",
    experience: "",
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

    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateFields = () => {
    const newErrors = {};
    const requiredFields = userType === "employee" ? employeeData : companyData;

    for (const field in requiredFields) {
      if (!requiredFields[field].trim()) {
        newErrors[field] = "This field is required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!user) return;
    if (!validateFields()) return;

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
              <EmployeeForm
                employeeData={employeeData}
                handleChange={handleChange}
                errors={errors}
              />
            ) : (
              <CompanyForm
                companyData={companyData}
                handleChange={handleChange}
                errors={errors}
              />
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
