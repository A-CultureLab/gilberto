import { Platform } from "react-native";

export const IS_ANDROID = Platform.OS === 'android'
export const IS_IOS = Platform.OS === 'ios'

export const ANIMAL_CHARACTER = {
    'cat': [
        '자신이 사람인줄 아는 개냥이',
        '호기심 많은 고양이',
        '사냥꾼 고양이',
        '예민 보스 고양이',
        '고양이들의 고양이'
    ],
    'dog': [
        '자신감 있는 강아지',
        '독립적인 강아지',
        '편안하고 행복한 강아지',
        '소심한 강아지',
        '적응력 있는 강아지'
    ]
}