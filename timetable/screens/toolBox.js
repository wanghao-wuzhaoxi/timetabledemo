import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView, StatusBar } from 'react-native'
import { Colors } from '../colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';


export class ToolBox extends Component {
    render() {
        return (
            <View style={{ backgroundColor: Colors.light, flex: 1 }}>
                <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0.04)'}></StatusBar>
                {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, backgroundColor: Colors.light, height: 100 }}>
                    <MenuCard title='视频监控' iconName='ios-videocam' nav={() => this.props.navigation.navigate('视频监控')}></MenuCard>
                    <MenuCard title='温湿度监控' iconName='ios-thermometer' nav={() => this.props.navigation.navigate('温湿度监控')}></MenuCard>
                    <MenuCard title='完整课表' iconName='ios-calendar' nav={() => this.state.courses && this.props.navigation.navigate('课表', { staff: this.state.staff, courses: this.state.courses })}></MenuCard>
                    <MenuCard title='我的教务' iconName='ios-send' nav={() => this.props.navigation.navigate('课表', { staff: this.state.staff, courses: this.state.courses })}></MenuCard>
                </ScrollView> */}
                <View style={{ height: 80, width: '100%' }}></View>
                <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }} >
                    <Card title='图书馆' iconName='ios-school'></Card>
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
        <TouchableNativeFeedback useForeground={true} onPress={() => { }} background={TouchableNativeFeedback.Ripple('#BABABB', false)} style={{ alignItems: 'center', justifyContent: 'space-around', height: Dimensions.get('window').width / 2.5 * 0.618 }}>
                <View style={{ marginTop: 8, backgroundColor: Colors.backGreen, height: 40, width: 40, borderRadius: 20, justifyContent: 'center' }}>
                    <Text style={{ color: Colors.foreGreen, textAlign: 'center', fontWeight: 'bold' }}><Ionicons name={props.iconName} size={25} /></Text>
                </View>
                <Text style={{ color: Colors.darkGray }}>{props.title}</Text>
           
        </TouchableNativeFeedback>
    </View>)
}


// import React, { useState } from "react";
// import { Text, View, StyleSheet, TouchableNativeFeedback } from "react-native";


// const randomHexColor = () => {
//   return "#000000".replace(/0/g, function() {
//     return (~~(Math.random() * 16)).toString(16);
//   });
// };
// const ToolBox = () => {
//   const [rippleColor, setRippleColor] = useState(randomHexColor());
//   const [rippleOverflow, setRippleOverflow] = useState(false);
//   return (
//     <View style={styles.container}>
//       <TouchableNativeFeedback
//         onPress={() => {
//           setRippleColor(randomHexColor());
//           setRippleOverflow(!rippleOverflow);
//         }}
//         background={TouchableNativeFeedback.Ripple('#ccc', false)}
//       >
//         <View style={styles.touchable}>
//           <Text style={styles.text}>TouchableNativeFeedback</Text>
//         </View>
//       </TouchableNativeFeedback>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingTop: 30,
//     backgroundColor: "#ecf0f1",
//     padding: 8
//   },
//   touchable: { flex: 0.5, borderColor: "black", borderWidth: 1 },
//   text: { alignSelf: "center" }
// });

// export default ToolBox;