

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login';
import Homepage from './Pages/Homepage';
import CreatePost from './Pages/CreatePost';
import PrivateRouter from './Pages/PrivateRouter';
import Rooterlayout from './Pages/Rooterlayout';
import Export from './Pages/Export';
import ExplorePost from './Pages/ExplorePost';


 
const router=createBrowserRouter([

  {
    path:"/",
    element: (
      <PrivateRouter>
      <Rooterlayout/>
      </PrivateRouter>
    ),
 children: [
  {
    path:"/",
    element:<Homepage />,
  },
  {
    path:"/createpost",
    element:<CreatePost/>,
  },
  {
    path:"/explorepost",
    element:<ExplorePost/>,
  },
  {
    path:"/detail/:id",
    element:<Export/>,
  },
],
},
  {
    path:"/Login",
    element:<Login/>,
  },
]);
function App() {
  return <RouterProvider router={router}/>;
}

export default App
