import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import "./search-result-list.scss"
import Preloader from "../Preloader/Preloader";
import {setIsLoading, addNextPageData} from "../../store/searchSlice";
import InfiniteScroll from 'react-infinite-scroll-component';
import {fetchNextPage} from "../../http/searchAPI";

const SearchResultList = () => {
    const isFocus = useSelector(state => state.search.isFocus)
    const isLoading = useSelector(state => state.search.isLoading)
    const apiImages = useSelector(state => state.search.apiImages)
    const dispatch = useDispatch()
    const inputData = useSelector(state => state.search.inputData)
    const [nextPage, setNextPage] = useState(2)

    const nextPageHandler = () => {
        setNextPage(nextPage + 1)
    }

    useEffect(() => {
        fetchNextPage(inputData, nextPage)
            .then((data) => dispatch(addNextPageData([...data])))
            .catch(err => console.log(err))
    }, [nextPage])

    useEffect(() => {
        setTimeout(() => {
            dispatch(setIsLoading(false))
        }, 1500)
    }, [apiImages])

    return (
        <div className='result-list'>
            <InfiniteScroll
                className='grid-container'
                style={apiImages.length > 0 ? {display: 'grid'} : {display: 'none'}}
                next={nextPageHandler}
                hasMore={true}
                loader={null}
                dataLength={apiImages.length}
            >
                {
                    apiImages.length > 0 && apiImages.map((img, key) =>
                        <img
                            key={key}
                            src={img.urls.small_s3}
                            alt={img.alt_description}
                            id={img.id}
                            className='result-list__image'
                        />)
                }
            </InfiniteScroll>
            <div className={isFocus && apiImages.length > 0 ? 'foreground active' : 'foreground'} />
            <div className={isLoading ? 'loader-container active' : 'loader-container'}>
                <Preloader />
            </div>

        </div>
    )

};

export default SearchResultList;