// import { BsCloudSunFill } from "react-icons/bs";
import { FaInternetExplorer } from "react-icons/fa6";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsCloudSunFill } from "react-icons/bs";
import { useContext, useState } from "react";
import { ThemeContext } from "../assets/context/theme-context";
import { NavLink, useNavigate } from "react-router-dom";
import Model from "./Model";


const Navbar = () => {
  const navigate=useNavigate();
  const { role } =JSON.parse(localStorage.getItem("LoginData"));
  

  const {theme, toggleTheme} = useContext(ThemeContext)
  const[showLogout,setLogout] = useState(false);
  const handleLogout =()=>{
    setLogout(true);
  }
  const handlelogoutconfirm=(event) =>{
    localStorage.removeItem("LoginData");
    event.preventDefault();
    navigate("/Login");
  }
  const handlelogoutcancle=(event)=>{
    event.preventDefault();
    setLogout(false);
  }
 
  return (
    <>
   {showLogout &&  <Model handlelogoutconfirm={handlelogoutconfirm} handlelogoutcancle={handlelogoutcancle}/>}
      <div className={`${theme === "dark" ? "navbar-section" : "navbar-section-light"}`}>
        <div className="navbar">
          <div className="content">
            <span>
              <h3>EXPLORE<FaInternetExplorer/></h3>
            </span>
            <ul>
               <li><NavLink to="/">Home</NavLink></li>
               {role === "admin" &&<li><NavLink to="/createpost">Create-post</NavLink></li>}
                <li><NavLink to="/explorepost">Explore-post</NavLink></li>
                <div className="btn-logout">
              <button type="submit" onClick={handleLogout}>Logout</button>
            </div>
            </ul>
            <div className="icon" onClick={toggleTheme}>
            
            {theme === "dark" ? (
              <BsCloudSunFill size={23}  />
            ) : (
              <BsFillMoonStarsFill size={23}  />
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
