import React, { Component } from 'react'
import { Text, View } from 'react-native'


export default class ClassDetial extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { params } = this.props.route
        return (
            <View>
                <Text>上课老师：{params.teacher}</Text>
                <Text>课程进度：</Text>
                <Text>上课周次：{params.zhouci}</Text>
                <Text>上课教师：{params.classRoom}</Text>
            </View>
            /* <View style={{ borderRadius: 3, backgroundColor: 'rgba(80, 97, 191,.8)', height: '20%', width: teachingWeek / c.weeks[c.weeks.length - 1] * 100 + '%' }}>
                            <Text style={{ color: 'white', fontSize: 12 }}> {(teachingWeek / c.weeks[c.weeks.length - 1] * 100).toFixed(2) + '%'}  </Text>
                        </View> */
        )
    }
}
