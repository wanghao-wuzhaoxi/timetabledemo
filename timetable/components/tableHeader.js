import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { width } from '../screens/table'
import { Colors } from '../colors'

export class TableHeader extends Component {
    render() {
        const arr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        return (
            <View style={styles.container}>
                {arr.map((day, index) =>
                    <View key={index} style={styles.element}>
                        <Text style={[styles.text,new Date().getDay()==index+1&&{color:Colors.purple}]}>{day}</Text>
                    </View>)}
            </View>
        )
    }
}

export default TableHeader


const styles = StyleSheet.create({
    element: {
        width: width / 5,
        marginVertical: 0,
    },
    text: {
        textAlign: 'center', 
        fontSize: 16,
        lineHeight: 30,
        color: 'rgba(0,0,0,0.7)'
    },
    container: {
        flexDirection: 'row',
        elevation: 3,
        backgroundColor: 'white',
        marginBottom: 4
    }
})