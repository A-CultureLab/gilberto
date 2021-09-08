import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { chatRoomWillReport_chatRoom } from '../../graphql/__generated__/chatRoomWillReport'

const ReportChatRoomInfo: React.FC<chatRoomWillReport_chatRoom> = ({ name }) => {
    return (
        <View style={styles.container} >
            <Text numberOfLines={1} ellipsizeMode='tail' >{name}</Text>
        </View>
    )
}

export default ReportChatRoomInfo

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 24,
    }
})