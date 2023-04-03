import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setIsFocus, setIsLoading, setInputData, setApiImages} from "../../store/searchSlice";
import "./search-bar.scss";
import {fetchData} from "../../http/searchAPI";
import useReactSimpleMatchMedia from 'react-simple-matchmedia'

const SearchBar = () => {
    const phoneScreen = useReactSimpleMatchMedia('(max-width: 768px)');
    const [styles, setStyles] = useState({justifyContent: 'center', opacity: '1'})
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
                if (!phoneScreen) {
                    if (data.length === 0 || apiImages.length === 0) {
                        setStyles({...styles, opacity: '0'})
                    } else {
                        setStyles({...styles, opacity: '1'})
                    }
                }

                setTimeout(() => {
                    if (data.length > 0) {
                        setStyles({...styles, justifyContent: 'flex-start'})
                    } else {
                        setStyles({...styles, justifyContent: 'center'})
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

    function onFocusHandler(e) {
        dispatch(setIsFocus())
        e.currentTarget.placeholder = ''
    }
    function onBlurHandler(e) {
        dispatch(setIsFocus())
        e.currentTarget.placeholder = 'Телефоны, яблоки, груши...'
    }

    useEffect(() => {
        setStyles({justifyContent: 'center', opacity: '1'})
    }, [])

    return (
        <div className={apiImages.length === 0 && !isLoading ? 'search-bar empty' : 'search-bar'} style={styles}>
            <input
                className='search-bar__input'
                type="search"
                placeholder='Телефоны, яблоки, груши...'
                value={inputData}
                onFocus={(e) => onFocusHandler(e)}
                onBlur={(e) => onBlurHandler(e)}
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