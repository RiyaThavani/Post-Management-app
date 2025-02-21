// import Navbar from "../Componets/Navbar";
import { FaInternetExplorer } from "react-icons/fa6";
import Postcard from "../Componets/Postcard";
import {  useEffect, useState } from "react";
// import image1 from "../assets/image1.png";
import {useNavigate } from "react-router-dom";



const Homepage = () => {

  const  navigate= useNavigate();
  const [posts, setPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});
  useEffect(() => {
    const cardData = localStorage.getItem("formData");
    console.log(cardData);
    if (cardData) {
      setPosts(JSON.parse(cardData));
    }
  }, []);
  const handleDelete = (id) => {
    console.log(id);
    let filteredData = posts.filter((post) => {
      return post.id !== id;
    });
    console.log(filteredData);
    setPosts(filteredData);
    localStorage.setItem("formData", JSON.stringify(filteredData));
  };
  
  useEffect(() => {
    if (isEdit) {
        setPosts((prevPosts) =>
            prevPosts.map((item) =>
                item.id === dataToEdit.id ? dataToEdit : item
            )
        );
        setIsEdit(false);
    }
}, [dataToEdit, isEdit]);
  const handleEditTask = (id) => {
    setIsEdit(true);
    const filteredData = posts.find((post) => {
      return post.id === id;
    });
    console.log(filteredData);
    setDataToEdit(filteredData);
    navigate("/createpost", {
      state: {
        post: filteredData, isEdit: true
      }
    });
  };
  const handleMore=(id)=>{
    navigate(`/detail/${id}`);
  }
  

  return (
    <>
      {/* <Navbar /> */}
      <div className="card-container">
        <div className="card-content">
          {/* <div className="card-section"> */}
            <div className="home-text">
              Explore Post
              <span className="text-icon">
                <FaInternetExplorer size={28} />
              </span>
            </div>
            <div className="card-main">
              {posts.length > 0 ? (
                posts.map((post) => {
                  return(
                  <Postcard
                    key={post.title}
                    id={post.id}
                    image={post.image}
                    title={post.title}
                    body={post.body}
                    handleDelete={handleDelete}
                    handleEditTask={handleEditTask}
                    handleMore={handleMore}
                  />
                );
                })
            )  :(
              <p className="card-pera">No posts yet!</p>
            )}
            </div>
          {/* </div> */}
        </div>
      </div>
     
    </>
  );
};

export default Homepage;
