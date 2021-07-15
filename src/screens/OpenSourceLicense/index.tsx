import React from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { GRAY1 } from '../../constants/styles'


const oss = require('../../assets/oss.json') as Object
const data: any[] = []
const licensesKinds: any[] = []
for (const [key, value] of Object.entries(oss)) {
    data.push({ name: key, ...value })
    if (!licensesKinds.includes(value.licenses)) licensesKinds.push(value.licenses)
}


const OpenSourceLicense = () => {

    return (
        <ScreenLayout>
            <Header title='오픈소스 라이선스' />
            <FlatList
                data={data}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) =>
                    <View style={styles.itemContainer} >
                        <Text style={styles.title} >{item.name}</Text>
                        {item.publisher && <Text style={styles.content} selectable>{item.publisher}</Text>}
                        {item.repository && <Text style={styles.content} selectable >{item.repository}</Text>}
                        {item.licenses && <Text style={styles.content} selectable>{item.licenses}</Text>}
                    </View>
                }
            />
        </ScreenLayout>
    )
}

export default OpenSourceLicense

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: 16,
        marginTop: 24
    },
    title: {
        marginBottom: 8
    },
    content: {
        color: GRAY1,
        lineHeight: 20
    }
})