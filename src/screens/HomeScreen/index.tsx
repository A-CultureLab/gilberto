import React from 'react'
import { StyleSheet, Text, View, Pressable, Button } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    cancelAnimation,
} from 'react-native-reanimated';
import { COLOR1, WIDTH } from '../../constants/styles';



const HomeScreen = () => {
    const offset = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withSpring(offset.value * 255) }],
        };
    });

    return (
        <>
            <Animated.View style={[styles.box, animatedStyles]} />
            <Button onPress={() => {
                cancelAnimation(offset)
                offset.value = Math.random()
            }} title="Move" />
        </>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        marginTop: 100,
        backgroundColor: COLOR1
    }
})
