import { Dimensions } from "react-native"
import { getStatusBarHeight } from "react-native-status-bar-height"

export const WIDTH = Dimensions.get('window').width
export const HEIGHT = Dimensions.get('screen').height // 가능하면 사용하지 말아주세요 기종별로 오류가 너무 많아서...
export const STATUSBAR_HEIGHT = getStatusBarHeight()

export const COLOR1 = '#42D1C0'
export const COLOR2 = '#2A7FFE'

export const WHITE = '#fff'
export const GRAY3 = '#eee'
export const GRAY2 = '#ccc'
export const GRAY1 = '#888'
export const BLACK = '#000'

export const KAKAO_COLOR = '#FFE812'
export const APPLE_COLOR = '#000'