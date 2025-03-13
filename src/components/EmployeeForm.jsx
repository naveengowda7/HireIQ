const EmployeeForm = ({ employeeData, handleChange, errors }) => {
  return (
    <div>
      <div className="form-group">
        <label>Education</label>
        {errors.education && <p className="error">{errors.education}</p>}
        <input
          type="text"
          name="education"
          value={employeeData.education}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Experience (Years)</label>
        {errors.experience && <p className="error">{errors.experience}</p>}
        <input
          type="number"
          name="experience"
          value={employeeData.experience}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Skills</label>
        {errors.skills && <p className="error">{errors.skills}</p>}
        <input
          type="text"
          name="skills"
          value={employeeData.skills}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default EmployeeForm;
