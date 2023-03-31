import React from 'react';
import './preloader.scss';
import {useSelector} from "react-redux";

const Preloader = () => {
    const isLoading = useSelector(state => state.search.isLoading)

    return (
        <div className={isLoading ? 'loader-container active' : 'loader-container'}>
            <div className="preloader">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" >
                    <path d="M16 2.66602L16 9.33268" stroke="black" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 22.666L16 29.3327" stroke="black" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M29.3359 16L22.6693 16" stroke="black" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.33594 16L2.66927 16" stroke="black" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M25.4297 6.57227L20.7156 11.2863" stroke="black" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.2891 20.7148L6.57502 25.4289" stroke="black" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M25.4297 25.4277L20.7156 20.7137" stroke="black" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.2891 11.2852L6.57502 6.57111" stroke="black" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
};

export default Preloader;