import React from 'react'
import Navigation from '../navigations'
import AuthWrapper from './AuthWrapper'
import GlobalUiWrapper from './GlobalUiWrapper'
import RateWrapper from './RateWrapper'
import VersionCheckWrapper from './VersionCheckWrapper'

const Wrapper = () => {

    return (
        <GlobalUiWrapper>
            <VersionCheckWrapper>
                <RateWrapper>
                    <AuthWrapper>
                        <Navigation />
                    </AuthWrapper>
                </RateWrapper>
            </VersionCheckWrapper>
        </GlobalUiWrapper>
    )
}

export default Wrapper