import dayjs from 'dayjs'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DefaultModalBottomSheet from '../bottomSheets/DefaultModalBottomSheet'
import Footer from '../footers/Footer'
import ScrollSelector from './ScrollSelector'

interface DateSelectSheetProps {
    visible: boolean
    onClose: () => void
    onSelect: (date: Date) => void
    initialValue?: Date
    day?: boolean
}


const DateSelectSheet: React.FC<DateSelectSheetProps> = ({ onClose, onSelect, visible, day, initialValue }) => {


    const [y, setY] = useState<number>(dayjs(initialValue).year())
    const [m, setM] = useState<number>(dayjs(initialValue).month())
    const [d, setD] = useState<number>(dayjs(initialValue).day())


    const onSubmit = useCallback(() => {
        onSelect(dayjs().set('year', y).set('month', m - 1).set('date', day ? d : 1).toDate())
        onClose()
    }, [y, m, d, onClose])


    return (
        <DefaultModalBottomSheet
            visible={visible}
            onClose={onClose}
        >
            <View style={styles.container} >
                <ScrollSelector
                    list={Array(60).fill(0).map((_, i) => (i + 2021 - 59).toString() + '년')}
                    initIndex={y - 2021 + 59}
                    onChange={i => setY(i + 2021 - 59)}
                />
                <View style={{ width: 16 }} />
                <ScrollSelector
                    list={Array(12).fill(0).map((_, i) => (i + 1).toString() + '월')}
                    initIndex={m - 1}
                    onChange={i => setM(i + 1)}
                />
                {day && <View style={{ width: 16 }} />}
                {day && <ScrollSelector
                    list={Array(31).fill(0).map((_, i) => (i + 1).toString() + '일')}
                    initIndex={d - 1}
                    onChange={i => setD(i + 1)}
                />}
            </View>
            <Footer
                onPress={onSubmit}
                text='입력'
            />
        </DefaultModalBottomSheet>
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