import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'

export class TableHeader extends Component {
    render() {
        const arr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        return (
            <View style={styles.container}>
                {arr.map((a, index) => <View key={index} style={styles.element}><Text style={styles.text}>{a}</Text></View>)}
            </View>
        )
    }
}

export default TableHeader

const width = (Dimensions.get('window').width) / 5;
const styles = StyleSheet.create({
    element: {
        width: width,
        marginVertical: 0,
    },
    text: {
        textAlign: 'center', fontSize: 16,
        lineHeight: 30,
        color: 'rgb(156, 159, 169)'
    },
    container: {
        flexDirection: 'row',
        elevation: 3,
        shadowColor: '#5061bf',
        shadowOffset: { width: 1, height: 1 },
        elevation: 2,
        backgroundColor: 'white',
        marginBottom: 4
    }
})