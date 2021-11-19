import React from 'react'
import Navigation from '../navigations'
import GlobalUiWrapper from './GlobalUiWrapper'
import RateWrapper from './RateWrapper'
import ScreenAnalyticsWrapper from './ScreenAnalyticsWrapper'
import VersionCheckWrapper from './VersionCheckWrapper'

const Wrapper = () => {

    return (
        <GlobalUiWrapper>
            <VersionCheckWrapper>
                <RateWrapper>
                    <Navigation />
                </RateWrapper>
            </VersionCheckWrapper>
        </GlobalUiWrapper>
    )
}

export default Wrapper