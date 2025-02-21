/* eslint-disable react/prop-types */
// import { useContext } from "react";
// import { ThemeContext } from "../assets/context/theme-context";

const Model = (props) => {
  // const { theme } = useContext(ThemeContext);
  return (
    <div>
      <div className="alert-box">
        <div className="drop-box"></div>
            <div className="model-content">
                <div className="heding">
                    Are You sure you want to logout?
                </div>
                <div className="buttons-group">
                <button type="submit" className= "btn-canlce"  onClick={props.handlelogoutcancle} >Cancle</button>
                <button type="submit" className= "btn-log"  onClick={props.handlelogoutconfirm} >Logout</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Model
