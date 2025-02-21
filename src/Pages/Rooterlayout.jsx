import { Outlet } from "react-router-dom"
import Navbar from "../Componets/Navbar"
import Footer from "../Componets/Footer"


const Rooterlayout = () => {
  return (
    <div>
       <Navbar/>
      
       <Outlet/>
       <Footer/>
    </div>
  )
}

export default Rooterlayout
