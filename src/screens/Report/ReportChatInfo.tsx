import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { chatWillReport_chat } from '../../graphql/__generated__/chatWillReport'

const ReportChatInfo: React.FC<chatWillReport_chat> = ({ image, message }) => {
    return (
        <View style={styles.container} >
            {message ?
                <Text>{message}</Text>
                :
                <FastImage
                    source={{ uri: image || '' }}
                    style={styles.image}
                />
            }
        </View>
    )
}

export default ReportChatInfo

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    image: {
        width: 96,
        height: 96
    }
})