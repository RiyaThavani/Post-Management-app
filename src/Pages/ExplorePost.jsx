import { useCallback, useContext, useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importing search icon
import { ThemeContext } from "../assets/context/theme-context";
import useFetch from "./UseFetch";

// import { ThemeContext } from "../assets/context/theme-context";

const ExplorePost = () => {
  const { theme } = useContext(ThemeContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);
  // const [isLoading, setIsLoading] = useState(false);

  //  const [isLoading]=UseFetch();
  // setIsLoading(true);
  const [allData, isLoading] = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  // setIsLoading(false);
  console.log([allData]);
  function longDescription(body, maxLength) {
    if (body.length <= maxLength) {
      return body;
    }
    return body.slice(0, maxLength) + "...";
  }
  function longTitle(title, maxtitleLength) {
    if (title.length <= maxtitleLength) {
      return title;
    }
    return title.slice(0, maxtitleLength) + "...";
  }

  const maxtitleLength = 10;
  const maxLength = 50;

  const filteredCards = allData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = filteredCards.slice(startIndex, endIndex);

  // const handlePageChange = (page) => {
  //     setCurrentPage(page);
  // };
  const increment = useCallback(() => {
    setCurrentPage((c) => Math.min(totalPages, c + 1));
  }, [totalPages]);

  const decrement = () => {
    setCurrentPage((c) => Math.max(1, c - 1));
  };

  console.log(isLoading);

  return (
    <>
      <div>
        <div className="explore-container">
          <div className="explore">
            <div className="explore-text">
              <h1>List Of Post</h1>
              {/* <div className="row2"></div> */}
              {isLoading && <p className="text-p">Loading...</p>}
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  className={`${
                    theme === "dark" ? "serchinput" : "serchinput-light"
                  }`}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="search-icon" size={20} />
              </div>
            </div>
            <div className="post-flex">
              {filteredCards.length > 0 ? (
                currentCards.map((item) => (
                  <div className="card-main" key={item.id}>
                    <div className="card">
                      <img
                        src={`https://picsum.photos/id/${item.id}/200/300`}
                        alt=""
                      />
                      <div className="card-text">
                        <h3>{longTitle(item.title, maxtitleLength)}</h3>
                        <p>{longDescription(item.body, maxLength)}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-results">No matching posts found.</p>
              )}
            </div>
            <div className="dropdown-container">
              <label htmlFor="cardsPerPage">Posts per page: </label>
              <select
                id="cardsPerPage"
                value={cardsPerPage}
                onChange={(e) => setCardsPerPage(Number(e.target.value))}
              >
                {[5, 10, 15, 20].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="pagination">
              <button
                type="button"
                className="prev"
                onClick={decrement}
                disabled={currentPage === 1}
              >
                PREV
              </button>
              <span className="page">
                {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                className="next"
                onClick={increment}
                disabled={currentPage === totalPages}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExplorePost;

//state for current page
//total page
//slice
