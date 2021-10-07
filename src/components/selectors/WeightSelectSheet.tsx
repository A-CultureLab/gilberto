import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { WIDTH } from '../../constants/styles'
import DefaultModalBottomSheet from '../bottomSheets/DefaultModalBottomSheet'
import Footer from '../footers/Footer'
import ScrollSelector from './ScrollSelector'

interface WeightSelectSheetProps {
    visible: boolean
    onClose: () => void
    onSelect: (w: number) => void
}


const WeightSelectSheet: React.FC<WeightSelectSheetProps> = ({ onClose, onSelect, visible }) => {


    const [n, setN] = useState<number>(1)
    const [f, setF] = useState<number>(1)


    const onSubmit = useCallback(() => {
        onSelect(n + (f / 10))
        onClose()
    }, [n, f, onClose])


    return (
        <DefaultModalBottomSheet
            visible={visible}
            onClose={onClose}
        >
            <View style={styles.container} >
                <ScrollSelector
                    infinityScroll
                    width={24}
                    initIndex={1}
                    list={Array(50).fill(0).map((_, i) => (i).toString())}
                    onChange={i => setN((i))}
                />
                <Text style={styles.dot} >.</Text>
                <ScrollSelector
                    infinityScroll
                    width={24}
                    initIndex={1}
                    list={Array(10).fill(0).map((_, i) => (i).toString())}
                    onChange={i => setF((i))}
                />
                <Text style={styles.kg} >kg</Text>
            </View>
            <Footer
                onPress={onSubmit}
                text='입력'
            />
        </DefaultModalBottomSheet>
    )
}


export default WeightSelectSheet

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        fontSize: 18,
        width: 5,
        alignSelf: 'center',
        alignItems: 'center'
    },
    kg: {
        fontSize: 18,
        position: 'absolute',
        left: WIDTH / 2 + 24 + 5
    }
})