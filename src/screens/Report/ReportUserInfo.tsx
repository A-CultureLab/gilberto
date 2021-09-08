import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { GRAY1 } from '../../constants/styles'
import { userWillReport_user } from '../../graphql/__generated__/userWillReport'
import genderGenerator from '../../lib/genderGenerator'

const ReportUserInfo: React.FC<userWillReport_user> = ({ image, age, gender, name }) => {
    return (
        <View style={styles.container} >
            <FastImage
                source={{ uri: image }}
                style={styles.image}
            />
            <View>
                <Text style={styles.name} >{name}</Text>
                <Text style={styles.genderAge} >{genderGenerator.user(gender)}, {age}세</Text>
            </View>
        </View>
    )
}

export default ReportUserInfo

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 72,
        height: 72,
        borderRadius: 36,
        marginRight: 16
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    genderAge: {
        fontSize: 14,
        color: GRAY1,
        marginTop: 8
    }
})
