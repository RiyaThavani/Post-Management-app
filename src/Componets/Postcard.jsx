/* eslint-disable react/prop-types */

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import image1 from "../assets/image1.png";


const Postcard = (props) => {
  const { role } =  JSON.parse(localStorage.getItem("LoginData"));
 
  console.log({role})
  // defultimgeset..
  //  const imagedefult = "https://picsum.photos/v2/list";
  function longDescription(body, maxLength) {
    if (body.length <= maxLength) {
      return body;
    }
    return body.slice(0, maxLength) + "...";
  }

  const maxLength = 50;
 
  return (
    <>
      <div className="card">
        <img src={props.image || image1}  />
        <div className="card-text">
          <h3>{props.title}</h3>
          <p>{longDescription(props.body, maxLength)}</p>
        </div>
        <div className="card-actions">
          {role === "admin" && (
            <>
              <div
                className="edit-btn"
                onClick={() => props.handleEditTask(props.id)}
              >
                <FaEdit size={25} />
              </div>
              <div
                className="delete-btn"
                onClick={() => props.handleDelete(props.id)}
              >
                <MdDelete size={25} />
              </div>
            </>
          )}
          <div className="detailed-btn">
            <FaArrowRight
              size={25}
              onClick={() => props.handleMore(props.id)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Postcard;
{
  /* <div className="edit-btn" >
              <FaEdit size={20} />
            </div>
            <div
              className="delete-btn"
            >
              <MdDelete size={20} />
            </div> */
}
