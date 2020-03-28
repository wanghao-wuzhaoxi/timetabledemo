import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { Colors } from '../colors';

const scheduleArr = [
    { start: 8, end: 9 + 40 / 60 },
    { start: 10, end: 11 + 40 / 60 },
    { start: 14, end: 15 + 40 / 60 },
    { start: 16, end: 17 + 40 / 60 },
    { start: 19, end: 20 + 40 / 60 },
    { start: 21, end: 22 + 40 / 60 },
]

function mapTime(jc) {
    const Time = new Date();
    const time = Time.getHours() + Time.getMinutes() / 60
    if (time > scheduleArr[jc].start & time < scheduleArr[jc].end) return 'courseGoingthrough'
    if (time > scheduleArr[jc].end) return 'courseGone'
    if (time < scheduleArr[jc].start) return 'courseTocome'
}

const LeftLogo = (props) => (<Text style={[styles.leftLogo, styles[props.state]]}>
    {props.jieci}</Text>)

export default class TodayCourse extends Component {


    render() {
        const { index, c } = this.props;
        return (
            <TouchableNativeFeedback key={index} useForeground={true} onPress={() => this.props.navigation.navigate('课程详情', c)}>
                <View style={styles.box}>
                    <View style={{ height: '100%', justifyContent: "center" }}>
                        <LeftLogo jieci={`${2 * c.jc - 1}-${c.jc * 2}`} state={mapTime(c.jc - 1)}></LeftLogo>

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
        height: 100,
        flexWrap: 'wrap',
    },
    courseName: {
        fontWeight: '700',
        fontSize: 16,
        borderTopRightRadius: 3,
        paddingHorizontal: 10,
        letterSpacing: 1.2,
    },
    zhouci: {
        color: '#8795a1',
        position: 'absolute',
        top: '20%',
        right: 14
    },
    teacher: {
        color: '#8795a1',
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: '400'
    },
    leftLogo: {
        marginHorizontal: 15,
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
        fontSize: 16,
        color: '#8795a1',
        fontStyle: 'italic',
    },
    jieci: {
        color: Colors.darkGray,
        fontWeight: '400'
    },
});
