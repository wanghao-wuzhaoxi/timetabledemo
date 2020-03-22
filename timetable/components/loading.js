import React, { Component } from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'

export default class Loading extends Component {
    render() {
        return (
            // <View >
            <LottieView
                style={{ height: '200%', width: '200%', flex: 1, alignSelf: 'center' }}
                hardwareAccelerationAndroid source={require('../assets/lf30_editor_txwmmc.json')}
                loop
                autoPlay></LottieView>
            // </View>
        )
    }
}
export class Loading1 extends Component {
    render() {
        return (

            <LottieView
                style={{ height: '100%', width: '100%', flex: 1, alignSelf: 'center' }}
                hardwareAccelerationAndroid source={require('../assets/three.json')}
                loop
                autoPlay></LottieView>
        )
    }
}


