import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import "./search-result-list.scss"
import Preloader from "../Preloader/Preloader";
import {setIsLoading} from "../../store/searchSlice";

const SearchResultList = () => {
    const isFocus = useSelector(state => state.search.isFocus)
    const apiImages = useSelector(state => state.search.apiImages)
    const dispatch = useDispatch()

    useEffect(() => {
        if (apiImages.length === 0) {
            dispatch(setIsLoading(false))
        }
    }, [apiImages])

    return (
        <div className='result-list'>
            <div className="grid-container">
                {
                    apiImages.length > 0 && apiImages.map((img, key) =>
                        <img
                            key={key}
                            src={img.urls.small_s3}
                            alt={img.alt_description}
                            id={img.id}
                            className='result-list__image'
                        />
                )}
            </div>
            <div className={isFocus && apiImages.length > 0 ? 'foreground active' : 'foreground'} />
            <Preloader />
        </div>
    )

};

export default SearchResultList;