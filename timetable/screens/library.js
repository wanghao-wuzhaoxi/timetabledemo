import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'

export class Library extends Component {
    render() {
        return (
            <View style={{paddingTop:StatusBar.currentHeight}}>
                <Text> 尽请期待 </Text>
            </View>
        )
    }
}

export default Library
