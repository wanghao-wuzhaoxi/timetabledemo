import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView, StatusBar } from 'react-native'
import { Colors } from '../styles/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Library from './library';


const ToolBoxStack = createStackNavigator();
export function ToolBoxStackScreen() {
    return (
        <ToolBoxStack.Navigator>
            <ToolBoxStack.Screen name="工具箱" component={ToolBox} options={{ headerShown: false }} />
            <ToolBoxStack.Screen name="图书馆" component={Library} options={{ headerShown: false }} />
        </ToolBoxStack.Navigator>
    );
}

export class ToolBox extends Component {
    render() {
        return (
            <View style={{ backgroundColor: Colors.light, flex: 1 }}>
                <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0.01)'}></StatusBar>
                <View style={{ height: 80, width: '100%' }}></View>
                <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }} >
                    <Card title='图书馆' iconName='ios-school' onPress={()=>this.props.navigation.navigate('图书馆')}></Card>
                    <Card title='我的教务' iconName='ios-home'></Card>
                    <Card title='网址导航' iconName='ios-compass'></Card>
                    <Card title='中南链接' iconName='ios-navigate'></Card>
                </View>
            </View>
        )
    }
}

export default ToolBox

const Card = function (props) {
    return (<View style={{ borderRadius: 3, elevation: 1, margin: Dimensions.get('window').width / 2.5 / 24, width: Dimensions.get('window').width / 2.5, backgroundColor: 'white', height: Dimensions.get('window').width / 2.5 * 0.618 }}>
        <TouchableNativeFeedback useForeground={true} onPress={props.onPress} background={TouchableNativeFeedback.Ripple('#BABABB', false)} style={{ alignItems: 'center', justifyContent: 'space-around', height: Dimensions.get('window').width / 2.5 * 0.618 }}>
                <View style={{ marginTop: 8, backgroundColor: Colors.backGreen, height: 40, width: 40, borderRadius: 20, justifyContent: 'center' }}>
                    <Text style={{ color: Colors.foreGreen, textAlign: 'center', fontWeight: 'bold' }}><Ionicons name={props.iconName} size={25} /></Text>
                </View>
                <Text style={{ color: Colors.darkGray }}>{props.title}</Text>
           
        </TouchableNativeFeedback>
    </View>)
}


