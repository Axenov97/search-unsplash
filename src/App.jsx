import React, {useEffect} from "react";
import SearchResultList from "./components/SearchResultList/searchResultList";
import SearchBar from "./components/SearchBar/searchBar";
import {useSelector} from "react-redux";

function App() {
    const isLoading = useSelector(state => state.search.isLoading)

    useEffect(() => {
        if (isLoading) {
            document.body.scrollIntoView()
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [isLoading])

    return <>
        <SearchBar />
        <SearchResultList />
    </>
}

export default App
