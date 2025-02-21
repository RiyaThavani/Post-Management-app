import { useEffect, useState } from "react";


const useFetch = (url) => {
    const [allData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getAPIData = async () => {
         setIsLoading(true)
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "GET",
        });
    
        console.log({ response });
        const data = await response.json();
        console.log({ data });
        setAllData(data);
        setIsLoading(false);
      };
    
      useEffect(() => {
        getAPIData();
      }, [url]);
    
      return [allData,isLoading];
    };


export default useFetch;
