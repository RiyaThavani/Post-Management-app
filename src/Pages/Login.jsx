
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../assets/context/theme-context";



const Login = () => {
  
 
  const navigate = useNavigate();
  
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    username: "",
    role: "",
    mobileno: "",
    otp: "",
  });
  const [error, setError] = useState({
    username: "",
    role: "",
    mobileno: "",
    otp: "",
  });
  const [isTouched, setIsTouched] = useState({
    username: false,
    role: false,
    mobileno:false,
    otp:false,

  });
  const inputChangeHandler = (event) => {
    console.log(event.target.value, event.target.name);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  
    setError({ ...error, [event.target.name]: "" });
  };
  const inputBlurHandler = (event) => {
    const { name } = event.target;
    setIsTouched({ ...isTouched, [name]: true });
    if (formData[name] === "") {
      setError({ ...error, [name]: `${name} is required` });
    }
  };
  console.log(isTouched);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const generateOtp = (event) => {
    event.preventDefault();
    const randomOtp = Math.floor(1000 + Math.random() * 9000); // 6-digit OTP
    setGeneratedOtp(randomOtp.toString()); // Store OTP in state
    alert(`Your OTP is: ${randomOtp}`); // Show OTP in alert
  };

  const regex = /^\d{10,15}$/;
  const isFormValid = () => {
    let errors = {};

    if (formData.username.trim() === "") {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username atleast 3 character long.";
    }
    if (formData.role.trim() === "") {
      errors.role = "select role is required";
    }
    if (!regex.test(formData.mobileno)) {
      errors.mobileno = "invalid mobile no plasce enter 10 digit";
    }
    if (formData.otp.trim() === "") {
      errors.otp = "OTP is required. Click 'Verify OTP'";
    } else if (formData.otp !== generatedOtp) {
      errors.otp = "Invalid OTP. Please try again.";
    }
    return errors;
  };
  function onSubmit(event) {
    event.preventDefault();
    setIsTouched({ username: false, role: false, mobileno: false, otp: false });
    console.log({ formData });
    
    let result = isFormValid();
    setError(result);
    console.log(Object.keys(result));
    if (Object.keys(result).length === 0) {
      localStorage.setItem("LoginData", JSON.stringify(formData));
      navigate("/");
      // localStorage.setItem("role", formData.role); // Save role to localStorage
      // setRole(formData.role); // Update global role state
    }
  }
  const formIsValid = Object.values(error).every((item) => item === "");
  console.log({ formIsValid }, Object.values(error));
  function handleClear(event) {
    event.preventDefault();
    setFormData({
      username: "",
      role: "",
      mobileno: "",
      otp: "",
    });
    setIsTouched({ username: false, role: false, mobileno: false, otp: false });
    setError({});
  }
  
  return (
    <>
      <div className="login-container">
        <div
          className={`${theme === "dark" ? "login-box" : "login-box-light"}`}
        >
          <div className="text">
            <h1>Login</h1>
            <p>Create new account</p>
          </div>
          <form action="" onSubmit={onSubmit}>
            <div className="log-row">
              <label htmlFor="">Username:</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={formData.username}
              />
              <p className="error">{error.username}</p>
            </div>
            <div className="log-row">
              <label htmlFor="">Role:</label>
              <select
                id="role"
                name="role"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                className="loginselect"
                value={formData.role}
              >
                <option
                  value="select"
                  style={{ color: "white" }}
                  className="select" 
                >
                  Select...
                </option>
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
              <p className="error">{error.role}</p>
            </div>
            <div className="log-row">
              <label htmlFor="">Mobile Number:</label>
              <input
                type="text"
                name="mobileno"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={formData.mobileno}
                placeholder="Enter MobileNumber"
              />
              <p className="error">{error.mobileno}</p>
            </div>
            <div className="log-row">
              <label htmlFor="">OTP:</label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={formData.otp}
              />
              <span className="otp">
                <button className="btn-otp" onClick={generateOtp}>
                  GenerateOTP
                </button>
              </span>
              <p className="error">{error.otp}</p>
            </div>
            <div className="btn-login">
              <button
                type="submit"
                className={`${
                  theme === "dark" ? "btn-submit" : "btn-submit-light"
                }`}
              >
                Login
              </button>
              <button
                type="submit"
                className={`${
                  theme === "dark" ? "btn-submit" : "btn-submit-light"
                }`}
                onClick={handleClear}
              >
                Cancle
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
