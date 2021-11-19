import { Dimensions } from "react-native"
import { getStatusBarHeight } from "react-native-status-bar-height"

export const WIDTH = Dimensions.get('window').width
export const HEIGHT = Dimensions.get('screen').height // 가능하면 사용하지 말아주세요 기종별로 오류가 너무 많아서...
export const STATUSBAR_HEIGHT = getStatusBarHeight()

export const COLOR1 = '#F89132'
export const COLOR2 = '#2A7FFE'
export const COLOR3 = '#FE2A2A'

export const WHITE = '#fff'
export const GRAY3 = '#eee'
export const GRAY2 = '#ccc'
export const GRAY1 = '#888'
export const BLACK = '#000'

export const KAKAO_COLOR = '#FFE812'
export const APPLE_COLOR = '#000'

export const DEFAULT_SHADOW = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.10,
    shadowRadius: 4,

    elevation: 5,
}

export const SPRING_CONFIG = {
    damping: 10,
    mass: 0.4,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
}