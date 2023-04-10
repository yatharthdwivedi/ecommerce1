import axios from "axios";

const { createContext, useState, useContext, useEffect } = require("react");

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom Hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
