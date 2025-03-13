const CompanyForm = ({ companyData, handleChange, errors }) => {
  return (
    <div>
      <div className="form-group">
        <label>Company Name</label>
        {errors.companyName && <p className="error">{errors.companyName}</p>}
        <input
          type="text"
          name="companyName"
          value={companyData.companyName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Industry</label>
        {errors.industry && <p className="error">{errors.industry}</p>}
        <input
          type="text"
          name="industry"
          value={companyData.industry}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Website</label>
        {errors.website && <p className="error">{errors.website}</p>}
        <input
          type="text"
          name="website"
          value={companyData.website}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CompanyForm;
