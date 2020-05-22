import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Button, StatusBar } from 'react-native'
import { ScrollView, TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler'
import { Colors } from '../styles/colors'
import { BoxShadow } from 'react-native-shadow'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';
import { Schedule } from '../utils/schedule'
import Icon from 'react-native-vector-icons/Ionicons';
import { CourseStatusStyles } from '../styles/styles'

export const width = (Dimensions.get('window').width)
const cellWidth = width / 5.5;


export default class Table extends Component {

    constructor(props) {
        super(props);
        this.state={
            staff: Schedule.emptyCell,
            coursesToShow:this.props.route.params.courses.filter(c => this.courseFilter.showOnlyCurWeek(c)),
           
        }
    }

    courseFilter={
        showOnlyCurWeek(c){
            return c.weeks.indexOf(Schedule.curTeachingWeek) !== -1
        },
        showAll(c){
            return c
        },
        showSomeWeek(c,weekNum){
            return c.weeks.indexOf(weekNum) !== -1
        }
    }

    
    render() {
        // const shadowOpt = {
        //     width: cellWidth,
        //     height: 80,
        //     color: '#ccc',
        //     border: 4,
        //     radius: 3,
        //     opacity: 0.2,
        //     x: .4,
        //     y: 1,
        // }
        const staff=this.state.staff;
      
        return (
            <View style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: Colors.light }}>
                <StatusBar translucent={true}></StatusBar>
                <Text style={{ paddingTop: 8, paddingLeft:10,fontSize: 16, color: '#b8bece', fontWeight: '500', fontFamily: 'Futura', }}>第{Schedule.curTeachingWeek}周</Text>
                <Text style={{ fontSize: 19,paddingLeft:10, textAlignVertical: 'center', color: '#3c4560', fontWeight: 'bold' }}>{Schedule.curDate.toLocaleDateString()}</Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.background}>
                    <View style={{ width: width * 1.4, flexDirection: 'row', flexWrap: 'wrap', flex: 1, backgroundColor: Colors.light }}>
                        <TableHeader></TableHeader>
                        <View style={{ backgroundColor: Colors.light, width: cellWidth / 2.5, height: '100%', top: 40, position: 'absolute', left: 0, zIndex: 100 }}>
                            {['1-2', '3-4', '5-6', '7-8', '9-10', '10-11'].map((e,index) => <Left jc={e} key={e} courseState={Schedule.mapTime(index)}></Left>)}
                        </View>
                        {staff.map((e, index) => {
                          let  cellCourses=this.state.coursesToShow&&this.state.coursesToShow.filter(c=> c.jc - 1 == Math.floor(index / 7) & c.xq == index % 7 + 1)
                            return (
                                <View style={[styles.table, {
                                    backgroundColor: 'white',
                                    position: 'relative',
                                    left: cellWidth / 2.5,
                                    borderColor: 'rgba(0,0,0,0.2)',
                                }]} key={index}>
                                

                                    {cellCourses[0] &&

                                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#BABABB', false)} onPress={() => this.props.navigation.navigate('课程详情', cellCourses[0])}>
                                            <View style={styles.cell}>
                                                <Text style={styles.cellText} numberOfLines={2}>{cellCourses[0].name}</Text>
                                                <Text style={styles.classRoom}>{cellCourses[0].classRoom || ''}</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    }

                                    {cellCourses.length > 1 &&
                                        <View style={styles.more}>
                                            <Menu renderer={renderers.Popover}>
                                                <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity, triggerTouchable: { activeOpacity: 0.85 } }}>
                                                    <Text style={[styles.moreText]}>  <Icon name='ios-leaf' size={18}></Icon></Text>

                                                </MenuTrigger>

                                                <MenuOptions>
                                                    {cellCourses.map((course, index) =>
                                                        <MenuOption key={index} onSelect={() => this.props.navigation.navigate('课程详情', course)}  >
                                                            <View style={{ padding: 5, flexDirection: 'row' }}>
                                                                <Text><Text style={{ color: Colors.purple }}>{String.fromCharCode(10017)}</Text> {course.name} </Text>
                                                            </View>
                                                        </MenuOption>)}
                                                </MenuOptions>
                                            </Menu>
                                        </View>
                                    }

                                </View>
                            )
                        })}
                    </View>

                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    cell: {
        alignItems: 'center',
        width: cellWidth,
        height: 80,
        backgroundColor: "#fff",
        overflow: "hidden",
        justifyContent: 'space-around',
        zIndex: 1,
    },

    table: {
        // width: cellWidth + cellWidth / 10,
        // paddingHorizontal: cellWidth / 20,
        marginVertical: cellWidth / 30,
        // height: 80 + cellWidth / 10,
        backgroundColor: 'rgba(0,0,0,0.05)',
        width: cellWidth,
        // paddingHorizontal: cellWidth / 20,
        // paddingVertical: cellWidth / 20,
        height: 80,
        position: 'relative'
    },
    background: {
        backgroundColor: 'white',
        flex: 1
    },
    cellText: {
        fontWeight: '700',
        paddingTop: 11,
        paddingHorizontal: 2,
        color: Colors.title,
        textAlign: 'center',
        lineHeight: 18,
        letterSpacing: 0,
        fontSize: 14,
        overflow: 'hidden',
        letterSpacing: 0,
    },
    classRoom: {
        color: Colors.subTitle,
        marginTop: 2,
        textAlign: 'center',
        fontSize: 13,
        backgroundColor: Colors.light,
        borderRadius: 3,
        padding: 1,
        paddingHorizontal: 8,
        letterSpacing: -0.4,
        marginBottom: 10,

    },
    more: {
        position: 'absolute',
        top: 0,
        right: 2,
        height: 10,
        borderRadius: 12,
        color: 'white',
    },
    moreText: {
        color: Colors.foreGreen,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        fontWeight: '700'
    },
    element: {
        width: width / 5.5,
        marginVertical: 0,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        lineHeight: 40,
        fontFamily: 'Futura',
        color: Colors.subTitle,
    },
    container: {
        paddingLeft: cellWidth / 2.5,
        flexDirection: 'row',
        elevation: 3,
        backgroundColor: 'white',
        // marginBottom: 4
    }
});




const TableHeader = function () {
    const arr = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <View style={styles.container}>
            {arr.map((day, index) =>
                <View key={index} style={[styles.element, (Schedule.day == index + 1 | Schedule.day == 0 & index == 6) && { backgroundColor: Colors.light, borderRadius: 5, marginVertical: 5 }]}>
                    <Text style={[styles.text, (Schedule.day == index + 1 | Schedule.day == 0 & index == 6) && { color: Colors.purple, lineHeight: 30 }]}>{day}</Text>
                </View>)}
        </View>
    )
}

const Left = function (props) {
    return (<View style={[{ height: 80, marginVertical: cellWidth / 30, justifyContent: 'center', alignItems: 'center' },CourseStatusStyles[props.courseState]]}>
        <Text style={[{ color: Colors.foreGreen, textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center', fontSize: 16, height: 18 },CourseStatusStyles[props.courseState]]}>{props.jc.split('-')[0]}</Text>
        <Text style={[{ color: Colors.foreGreen, textAlign: 'center', textAlignVertical: 'top', fontSize: 16, height: 16 },CourseStatusStyles[props.courseState]]}>ⲓ</Text>
        <Text style={[{ color: Colors.foreGreen, textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center', fontSize: 16, height: 18 },CourseStatusStyles[props.courseState]]}>{props.jc.split('-')[1]}</Text>
    </View>)
}