import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DefaultBottomSheet from '../bottomSheets/DefaultBottomSheet'
import Footer from '../footers/Footer'
import ScrollSelector from './ScrollSelector'

interface DateSelectSheetProps {
    visible: boolean
    onClose: () => void
    onSelect: (y: string, m: string, d: string | null) => void
    day?: boolean
}


const DateSelectSheet: React.FC<DateSelectSheetProps> = ({ onClose, onSelect, visible, day }) => {


    const [y, setY] = useState<string>('2021')
    const [m, setM] = useState<string>('1')
    const [d, setD] = useState<string | null>(day ? '1' : null)


    const onSubmit = useCallback(() => {
        onSelect(y, m, d)
        onClose()
    }, [y, m, d, onClose])


    return (
        <DefaultBottomSheet
            visible={visible}
            onClose={onClose}
        >
            <View style={styles.container} >
                <ScrollSelector
                    list={Array(60).fill(0).map((_, i) => (i + 2021 - 60).toString() + '년')}
                    initIndex={60}
                    onChange={i => setY((i + 2021 - 60).toString())}
                />
                <View style={{ width: 16 }} />
                <ScrollSelector
                    list={Array(12).fill(0).map((_, i) => (i + 1).toString() + '월')}
                    onChange={i => setM((i + 1).toString())}
                />
                {day && <View style={{ width: 16 }} />}
                {day && <ScrollSelector
                    list={Array(31).fill(0).map((_, i) => (i + 1).toString() + '일')}
                    onChange={i => setD((i + 1).toString())}
                />}
            </View>
            <Footer
                onPress={onSubmit}
                text='입력'
            />
        </DefaultBottomSheet>
    )
}

DateSelectSheet.defaultProps = {
    day: true
}

export default DateSelectSheet

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})