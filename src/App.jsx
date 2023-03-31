import React from "react";
import SearchResultList from "./components/SearchResultList/searchResultList";
import SearchBar from "./components/SearchBar/searchBar";

function App() {

    return <>
        <div className="app">
            <SearchBar />
            <SearchResultList />
        </div>
    </>
}

export default App
