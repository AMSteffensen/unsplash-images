// App.js
import React, { useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import SearchForm from "./components//SearchForm";
import Gallery from "./components//Gallery";
import SearchHistory from "./components//SearchHistory";

const App = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  return (
    <main>
      <ThemeToggle />
      <SearchHistory history={searchHistory} />
      <div>
        <SearchForm setSearchHistory={setSearchHistory} />
        <Gallery />
      </div>
    </main>
  );
};

export default App;
