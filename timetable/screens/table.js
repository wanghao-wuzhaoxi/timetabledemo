import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import TableHeader from '../components/tableHeader'
import { teachingWeek } from './home'
import { Colors } from '../colors'
import { BoxShadow } from 'react-native-shadow'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

export const width = (Dimensions.get('window').width)
const cellWidth = width / 5.5;


export default class Table extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const shadowOpt = {
            width: cellWidth,
            height: 90,
            color: '#ccc',
            border: 6,
            radius: 3,
            opacity: 0.1,
            x: 0.5,
            y: 1,
            style: { marginVertical: cellWidth / 20, marginHorizontal: cellWidth / 20 }
        }
        const { staff, courses } = this.props.route.params
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.background}>
                <View style={{ width: width * 1.4, flexDirection: 'row', flexWrap: 'wrap' }}>
                    <TableHeader></TableHeader>
                    {staff.map((e, index) => {
                        const cellCourses = courses.filter((c => c.weeks.indexOf(teachingWeek) !== -1 & c.jc - 1 == Math.floor(index / 7) & c.xq == index % 7 + 1))
                        return (
                            <View style={styles.table} key={index}>
                                {cellCourses[0] &&
                                    <Menu renderer={renderers.Popover}>
                                        <MenuTrigger disabled={cellCourses.length == 1} >
                                            <BoxShadow setting={shadowOpt}>
                                                <TouchableOpacity style={styles.cell}
                                                    onPress={() => { cellCourses.length == 1 && this.props.navigation.navigate('课程详情', cellCourses[0]) }}
                                                >
                                                    <Text style={styles.cellText} numberOfLines={2}>{cellCourses[0].name}</Text>
                                                    <Text style={styles.classRoom}>
                                                        {cellCourses[0].classRoom}
                                                    </Text>

                                                    {cellCourses.length > 1 &&
                                                        <Text style={styles.more}>more...</Text>
                                                    }
                                                </TouchableOpacity>
                                            </BoxShadow>
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
                                }
                            </View>
                        )
                    })}
                </View>

            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    cell: {
        alignItems: 'center',
        position: "relative",
        width: cellWidth,
        height: 90,
        backgroundColor: "#fff",
        borderRadius: 3,
        overflow: "hidden",
        justifyContent: 'space-around',
    },

    table: {
        width: cellWidth,
        marginHorizontal: cellWidth / 20,
        marginVertical: cellWidth / 20,
        height: 90,
    },
    background: {
        backgroundColor: Colors.light
    },
    cellText: {

        fontWeight: '600',
        paddingTop: 6,
        paddingHorizontal: 2,
        color: 'rgba(0,0,0,0.7)',
        textAlign: 'center',
        lineHeight: 18,
        letterSpacing: 0,
        fontSize: 14,
        overflow: 'hidden',
        letterSpacing: -0.5
    },
    classRoom: {
        color: Colors.purple,
        fontStyle: 'italic',
        marginTop: 5,
        textAlign: 'center',
        fontSize: 13,
    },
    more: {
        borderRadius: 7,
        width: '60%',
        color: 'white',
        textAlignVertical: 'center',
        fontSize: 10,
        textAlign: 'center',
        backgroundColor: Colors.purple,
        height: 15
    }
});
