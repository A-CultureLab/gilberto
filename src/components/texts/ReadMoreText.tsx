import ReadMore, { ReadMoreProps } from '@fawazahmed/react-native-read-more'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GRAY1 } from '../../constants/styles'

const ReadMoreText: React.FC<ReadMoreProps> = (props) => <ReadMore
    numberOfLines={3}
    style={{ lineHeight: 20 }}
    ellipsis=' '
    seeMoreStyle={{ fontWeight: 'normal', color: GRAY1 }}
    seeLessStyle={{ fontWeight: 'normal', color: GRAY1 }}
    seeMoreText='더보기'
    seeLessText=''
    {...props}
/>

export default ReadMoreText

const styles = StyleSheet.create({})
