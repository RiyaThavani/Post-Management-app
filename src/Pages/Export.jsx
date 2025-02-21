import { useParams } from "react-router-dom";
import image1 from "../assets/image1.png";

export const Export = () => {
  const params = useParams();
  console.log(params);
  const localDATA = JSON.parse(localStorage.getItem("formData"));

  const filteredData = localDATA.filter((item) => item.id === params.id);
  console.log(filteredData);

  return (
    <>
      <div>
        
        {/* <div>Export-Detailed:{params.id}</div> */}
        {filteredData.map((item) => (
          <div className="export-section"key={item.id}>
          <div className="export-container">
            <div className="export-content">
              <img src={item.image || image1} alt="Detailed Image" />
              <div className="export-text">
                <div className="title">{item.title}</div>
                <div className="description">{item.body}</div>
              </div>
            </div>
          </div>
          </div>
        ))}
       
      </div>
    </>
  );
};

export default Export;
