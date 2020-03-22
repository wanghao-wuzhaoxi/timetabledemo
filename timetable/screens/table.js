import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler'
import TableHeader from '../components/tableHeader'
import { teachingWeek } from './home'
import { Colors } from '../colors'

const width = (Dimensions.get('window').width)
const cellWidth = width / 5.5;


export default class Table extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    render() {
        const { staff, courses } = this.props.route.params
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.background}>

                <View style={{ width: width * 1.4, flexDirection: 'row', flexWrap: 'wrap' }}>
                    <TableHeader></TableHeader>
                    {staff.map((course, index) => {
                        const cellCourses = courses.filter((c => c.weeks.indexOf(teachingWeek) !== -1 & c.jc - 1 == Math.floor(index / 7) & c.xq == index % 7 + 1))
                        return (
                            <View style={styles.table} key={index}>
                                {cellCourses[0] &&
                                    <View style={styles.cell}>
                                        <TouchableNativeFeedback style={{ width: cellWidth, height: 90, paddingTop: 4, paddingHorizontal: 2 }} useForeground={true} onPress={() => this.props.navigation.navigate('课程详情', cellCourses[0])}>
                                            <Text style={styles.cellText} numberOfLines={2} aselectable={true}>
                                                {cellCourses[0].name}
                                            </Text>
                                            <Text style={styles.classRoom}>
                                                {cellCourses[0].classRoom}
                                            </Text>
                                            {cellCourses.length > 1 && <Text style={{ color: Colors.foreGreen }}>{String.fromCharCode(10047)}</Text>}
                                        </TouchableNativeFeedback>
                                    </View>}
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({

    table: {
        width: cellWidth,
        marginHorizontal: cellWidth / 20,
        marginVertical: cellWidth / 20,
        height: 90,
    },
    background: {
        backgroundColor: '#f4f4f4'
    },
    cell: {
        backgroundColor: Colors.backBlue,
        borderRadius: 5,
        textAlignVertical: 'center',
        height: '100%',
        elevation: 1,

    },
    cellText: {
        fontWeight: 'bold',
        color: Colors.foreBlue,
        textAlign: 'center',
        height: 40,
        lineHeight: 20,
        overflow: 'hidden'
    },
    classRoom: {
        color: "rgb(156, 159, 169)",
        fontStyle: 'italic',
        marginTop: 10,
        textAlign: 'center',


    }
});
