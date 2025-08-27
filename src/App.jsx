// App component with search functionality
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navbar } from "./components/layer.jsx";

function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (query) => {
    setSearchTerm(query);
    
    if (!query.trim()) {
      setFilteredData(fetchedData);
      return;
    }
    
    const filtered = fetchedData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredData(filtered);
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    userName === "" || password === ""
      ? alert("please enter username and password")
      : console.log({ userName, pass: password });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const res = await fetch("./api/posts");

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Page was not found!");
          } else {
            throw new Error("Something went wrong!");
          }
        }

        const data = await res.json();
        setFetchedData(data);
        setFilteredData(data);
      } catch (error) {
        setErrorMessage(error.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8">
        {searchTerm && (
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Showing results for: <span className="font-semibold">"{searchTerm}"</span>
              {filteredData.length === 0 && " - No results found"}
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setFilteredData(fetchedData);
                }}
                className="ml-4 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Clear search
              </button>
            </p>
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <h1 className="text-2xl font-semibold">Loading...</h1>
          </div>
        )}
        
        {!isLoading && errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{errorMessage}</p>
          </div>
        )}
        
        {!isLoading && filteredData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col"
              >
                <a href="#">
                  <img
                    className="w-full h-48 object-cover"
                    src={item.image}
                    alt={item.title}
                  />
                </a>
                <div className="p-5 flex flex-col flex-grow">
                  <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                      {item.title}
                    </h5>
                  </a>
                  <p className="mb-4 font-normal text-gray-700 dark:text-gray-400 flex-grow line-clamp-3">
                    {item.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-auto"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;