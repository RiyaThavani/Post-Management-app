import {  useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Navbar from "../Componets/Navbar";
import { v4 as uuidv4 } from "uuid";



const CreatePost = () => {
 
  
  const navigate=useNavigate();
 
  const [allData, setAllData] = useState(() => {
    const cardData = localStorage.getItem("formData");
    return cardData ? JSON.parse(cardData) : [];
  });

  const location = useLocation();
  const { post, isEdit } = location.state || {};

  const [titleData, setTitle] = useState({
    title: post?.title || "",
    body: post?.body || "",
    image: post?.image || "",
    id: post?.id || uuidv4(),
  });

  const inputChangeHandler = (event) => {
    // if (event.target.type === "file") {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();
    //   const data = reader.readAsDataURL(file);
    //   reader.addEventListener("load", (e) => {
    //     console.log(e.target.result);
    //     setTitle({ ...titleData, image: e.target.result });
    //   });
    if (event.target.type === "file") {
      let file = event.target.files[0];
      const reader = new FileReader();

      // eslint-disable-next-line no-unused-vars
      const data = reader.readAsDataURL(file);
      reader.addEventListener("load", (e) => {
        console.log(e.target.result);
        setTitle({ ...titleData, image: e.target.result });
      });
    } else {
      console.log(event.target.value, event.target.name);
      setTitle({ ...titleData, [event.target.name]: event.target.value });
    }
  };

  function addButton(event) {
    event.preventDefault();
    // console.log(JSON.stringify(titleData));
    // localStorage.setItem("formData", JSON.stringify(allData));
    // const localDATA = localStorage.getItem("formData");
    // console.log({titleData }, JSON.parse(localDATA));
    if (!titleData.title || !titleData.body ) {
      toast.error("Please fill in all fields before submitting!");
      return;
    }
    const newData = [...allData, titleData];
    setAllData(newData);

    // setAllData([...allData, titleData]);
    localStorage.setItem("formData", JSON.stringify(newData));
    toast.success("Data Add Successfully !", { style: { background:"rgb(71 85 105/1)", color: "white" } });
    setTitle({ title: "", body: "", image: "", id: uuidv4() });

    let updatedData;
    if (isEdit) {
      updatedData = allData.map((item) =>
        item.id === titleData.id ? titleData : item
      );
    } else {
      updatedData = [...allData, titleData];
    }
    setAllData(updatedData);

    localStorage.setItem("formData", JSON.stringify(updatedData));

    setTitle({ title: "", body: "", image: "", id: uuidv4() });
    navigate("/")
  }

  useEffect(() => {
    console.log("useEffect running...");
    localStorage.setItem("formData", JSON.stringify(allData));
  }, [allData]);
  
  const { role } =  JSON.parse(localStorage.getItem("LoginData"));
 
  if (role !== "admin") {
    return  navigate("/");
  }
  console.log({role});

  return (
    <div>
      {/* <Navbar /> */}
      <div className="post-container">
        <div className="post-section">
          <div className="post-content">
            <h2>Create Post</h2>
          </div>
          <form action="" onSubmit={addButton}>
            <div className="rows">
              <label htmlFor="">Title:</label>
              <input
                type="text"
                name="title"
                value={titleData.title}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="rows">
              <label htmlFor="">Body:</label>
              <textarea
                id="body"
                name="body"
                value={titleData.body}
                onChange={inputChangeHandler}
              ></textarea>
            </div>
            <div className="img-row">
              <label>Image:</label>
              <input
                type="file"
                name="image"
                src=""
                alt=""
                onChange={inputChangeHandler}
                // style={{ color: "white", fontSize: 18 }}
              />
            </div>

            <button type="submit" className="btn-add">
              {isEdit ? "Update Post" : "Add Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
