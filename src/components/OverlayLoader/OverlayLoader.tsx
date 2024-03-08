import React from 'react'
import { useSelector } from 'react-redux';
import './OverlayLoader.css'

type Props = {}

export const OverlayLoader = (props: Props) => {
    const loadingState = useSelector((state: any) => state.loading);
    return (
        <>
            {loadingState.requestCount > 0 && (
                <div className="overlay">
                    <div className="overlay__inner">
                        <div className="overlay__content">
                            <img className="spinner" src="/assets/logos/TobetoLogo.png" />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}