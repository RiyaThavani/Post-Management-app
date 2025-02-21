import { Outlet } from "react-router-dom"
import Navbar from "../componetes/Navbar"

const RouterProvider = () => {
  return (
    <div>
       <Navbar/>
       <Outlet/>
    </div>
  )
}

export default RouterProvider
