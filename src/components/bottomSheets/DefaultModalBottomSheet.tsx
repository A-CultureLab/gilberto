import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, TouchableWithoutFeedback, KeyboardAvoidingView, NativeEventSubscription, BackHandler } from 'react-native'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Modal from 'react-native-modal'
import { GRAY2, HEIGHT, WIDTH } from '../../constants/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IS_IOS } from '../../constants/values';


interface DefaultModalBottomSheetProps {
    visible: boolean
    onClose: () => void
    enableBottomSafeArea?: boolean
    disableKeyboardAvoidingView?: boolean
}

const DefaultModalBottomSheet: React.FC<DefaultModalBottomSheetProps> = ({ visible, onClose, children, enableBottomSafeArea, disableKeyboardAvoidingView }) => {

    const { bottom } = useSafeAreaInsets()

    return (
        <>
            <Modal
                isVisible={visible}
                onBackdropPress={onClose}
                onBackButtonPress={onClose}
                onDismiss={onClose}
                backdropColor='#000'
                backdropOpacity={0.5}
                useNativeDriverForBackdrop
                backdropTransitionOutTiming={0}
                statusBarTranslucent
                //@ts-ignore
                deviceWidth={WIDTH}
                //@ts-ignore
                deviceHeight={HEIGHT}
                swipeDirection={['down']}
                onSwipeComplete={onClose}
                propagateSwipe
                style={{ margin: 0, justifyContent: 'flex-end' }}
            >

                <KeyboardAvoidingView behavior='padding' enabled={!disableKeyboardAvoidingView} >
                    <View style={styles.extraSwipeRange} />
                    <View style={styles.swiperContainer} >
                        <View style={styles.swiper} />
                    </View>
                    <View style={[styles.contentContainer, { paddingBottom: enableBottomSafeArea ? bottom : 0 }]} >
                        {children}
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </>
    )
}

export default DefaultModalBottomSheet

const styles = StyleSheet.create({
    extraSwipeRange: {
        width: WIDTH,
        height: 50,
        backgroundColor: '#fff',
        opacity: 0
    },
    swiperContainer: {
        width: WIDTH,
        height: 40,
        paddingTop: 16,
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff'
    },
    swiper: {
        width: 32,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: GRAY2
    },
    contentContainer: {
        width: WIDTH,
        backgroundColor: '#fff'
    }
})