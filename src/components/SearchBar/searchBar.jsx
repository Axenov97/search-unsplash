import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setIsFocus, setIsLoading, setInputData, setApiImages} from "../../store/searchSlice";
import "./search-bar.scss";
import {fetchData} from "../../http/searchAPI";

const SearchBar = () => {
    const dispatch = useDispatch()
    const inputData = useSelector(state => state.search.inputData)
    const apiImages = useSelector(state => state.search.apiImages)
    const isFocus = useSelector(state => state.search.isFocus)

    function onClickHandler() {
        dispatch(setIsLoading(true))
        fetchData(inputData)
            .then(data => dispatch(setApiImages(data)))
            .finally(()=>dispatch(setIsLoading(false)))
    }

    return <div className={apiImages.length > 0 ? 'search-bar' : 'search-bar empty'}>
        <div className="flex-container">
            <input
                className='search-bar__input'
                type="search"
                placeholder='Телефоны, яблоки, груши...'
                value={inputData}
                onFocus={() => dispatch(setIsFocus())}
                onBlur={() => dispatch(setIsFocus())}
                onKeyUp={(e) => {
                    if (e.key === "Enter" && isFocus) {
                        onClickHandler()
                        e.currentTarget.blur()
                    }
                }}
                onChange={(e) => dispatch(setInputData(e.target.value))}
            />
            <button
                className='search-bar__btn'
                onClick={() => onClickHandler()}
            >
                Искать
            </button>
        </div>
    </div>

};

export default SearchBar;