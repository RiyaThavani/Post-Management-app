/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const loginData = JSON.parse(localStorage.getItem("LoginData")) || false;
  console.log({ loginData });

  if (!loginData) {
    return <Navigate to={"/Login"} />;
  }
  else{
    return children;
  }
 
};

export default PrivateRouter;
