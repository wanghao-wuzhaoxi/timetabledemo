import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { Colors } from '../colors';
import { Schedule } from '../utils/schedule';


const LeftLogo = (props) => (<Text style={[styles.leftLogo, styles[props.state]]}>
    {props.jieci}</Text>)

export default class TodayCourse extends Component {


    render() {
        const { index, c } = this.props;
        return (
            <TouchableNativeFeedback key={index} background={TouchableNativeFeedback.Ripple('#BABABB',false)} useForeground={true} onPress={() => this.props.navigation.navigate('课程详情', c)}>
                <View style={styles.box}>
                    <View style={{ height: '100%', justifyContent: "center" }}>
                        <LeftLogo jieci={`${2 * c.jc - 1}-${c.jc * 2}`} state={Schedule.mapTime(c.jc - 1)}></LeftLogo>

                    </View>
                    <Text style={styles.zhouci}>{c.zhouci}周</Text>
                    <View style={{ height: '100%', justifyContent: "center", alignItems: 'stretch' }}>
                        <Text numberOfLines={2} style={styles.courseName}>
                            {c.name}
                        </Text>
                        <Text style={styles.classRoom}>{c.classRoom}</Text>
                        <Text style={styles.teacher}>{c.teacher}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'rgb(249, 248, 254)',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 2,
        height: 86,
        flexWrap: 'wrap',
    },
    courseName: {
        fontWeight: 'bold',
        fontSize: 15,
        color:Colors.title,
        borderTopRightRadius: 3,
        paddingHorizontal: 10,
        letterSpacing: 1.2,
    },
    zhouci: {
        // color: Colors.purple,
        position: 'absolute',
        bottom: '10%',
        right: 14,
    },
    teacher: {
        color: '#8795a1',
        paddingHorizontal: 10,
        fontSize: 14,
        fontWeight: '400'
    },
    leftLogo: {
        marginLeft: 15,
        marginRight:5,
        width: 50,
        height: 50,
        borderRadius: 15,
        fontWeight: '700',
        fontSize: 21,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    courseGone: {
        backgroundColor: 'rgb(228, 243, 250)',
        color: 'rgb(84, 189, 207)',
    },
    courseTocome: {
        backgroundColor: 'rgb(236, 238, 251)',
        color: 'rgb(97, 127, 214)',
    },
    courseGoingthrough: {
        backgroundColor: 'rgb(249, 239, 248)',
        color: 'rgb(237, 167, 193)',
    },
    classRoom: {
        paddingHorizontal: 10,
        letterSpacing: 1.4,
        fontSize: 14,
        color: '#8795a1',
        fontStyle: 'italic',
    },
    jieci: {
        color: Colors.darkGray,
        fontWeight: '400'
    },
});
