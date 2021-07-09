import React, { ReactNode, useCallback, useState } from 'react'
import { StyleSheet, View, StyleProp, ViewStyle, Animated, Easing, EasingFunction } from 'react-native'
import { TapGestureHandler, State, TapGestureHandlerStateChangeEvent, } from 'react-native-gesture-handler'


type TouchableScaleProps = {
    onPress?: () => void;
    inDuration?: number;
    outDuration?: number;
    inEasing?: EasingFunction;
    outEasing?: EasingFunction;
    targetScale?: number
    children?: ReactNode
    style?: StyleProp<ViewStyle>
    contianerStyle?: StyleProp<ViewStyle>
}


const TouchableScale: React.FC<TouchableScaleProps> = (props) => {

    const [animation] = useState(new Animated.Value(0))

    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, props.targetScale || 0.6]
    })

    const onHandlerStateChange = useCallback(({ nativeEvent }: TapGestureHandlerStateChangeEvent) => {
        if (nativeEvent.state == State.END) {
            props.onPress && props.onPress()
        }
        if (nativeEvent.state === State.BEGAN) {
            Animated.timing(animation, {
                toValue: 1,
                useNativeDriver: true,
                duration: props.inDuration,
                easing: props.inEasing,
            }).start(() => {
                Animated.timing(animation, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: props.outDuration,
                    easing: props.outEasing
                }).start()
            })
        }
    }, [props.onPress, props.inDuration, props.outDuration, props.inEasing, props.outEasing, animation])

    return (
        <TapGestureHandler
            onHandlerStateChange={onHandlerStateChange}
        >
            <View style={props.contianerStyle} >
                <Animated.View
                    style={[
                        props.style,
                        { transform: [{ scale }] }
                    ]}
                >
                    {props.children}
                </Animated.View>
            </View>
        </TapGestureHandler>

    )
}
TouchableScale.defaultProps = {
    targetScale: 0.6,
    onPress: () => { },
    inEasing: Easing.inOut(Easing.ease),
    outEasing: Easing.inOut(Easing.ease),
    inDuration: 66,
    outDuration: 133
}

export default TouchableScale

const styles = StyleSheet.create({})