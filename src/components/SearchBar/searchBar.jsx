import React, {createRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setIsFocus, setIsLoading, setInputData, setApiImages} from "../../store/searchSlice";
import "./search-bar.scss";
import {fetchData} from "../../http/searchAPI";
import useReactSimpleMatchMedia from 'react-simple-matchmedia'

const SearchBar = () => {
    const phoneScreen = useReactSimpleMatchMedia('(max-width: 768px)');
    const ref = createRef()
    const [jContent, setJContent] = useState({justifyContent: 'center'})
    const dispatch = useDispatch()
    const inputData = useSelector(state => state.search.inputData)
    const apiImages = useSelector(state => state.search.apiImages)
    const isFocus = useSelector(state => state.search.isFocus)
    const isLoading = useSelector(state => state.search.isLoading)

    function onClickHandler() {
        dispatch(setIsLoading(true))
        fetchData(inputData)
            .then(data => {
                dispatch(setApiImages(data))
                setTimeout(() => {
                    if (data.length > 0) {
                        setJContent({justifyContent: 'flex-start'})
                    } else {
                        setJContent({justifyContent: 'center'})
                    }
                }, 1000)
            })
    }

    function enterKeyHandler(e) {
        if (e.key === "Enter" && isFocus) {
            onClickHandler()
            e.currentTarget.blur()
        }
    }

    useEffect(() => {
        setJContent({justifyContent: 'center'})
    }, [])

    useEffect(() => {
        if (isLoading && !phoneScreen) {
            ref.current.style.opacity = 0
        } else {
            ref.current.style.opacity = 1
        }
    }, [isLoading])

    function onFocusHandler() {
        dispatch(setIsFocus())
    }

    return (
        <div ref={ref} className={apiImages.length === 0 && !isLoading ? 'search-bar empty' : 'search-bar'} style={jContent}>
            <input
                className='search-bar__input'
                type="search"
                placeholder='Телефоны, яблоки, груши...'
                value={inputData}
                onFocus={() => onFocusHandler()}
                onBlur={() => dispatch(setIsFocus())}
                onKeyUp={(e) => enterKeyHandler(e)}
                onChange={(e) => dispatch(setInputData(e.target.value))}
            />
            <button
                className='search-bar__btn'
                onClick={() => onClickHandler()}
            >
                Искать
            </button>
        </div>
    )};

export default SearchBar;