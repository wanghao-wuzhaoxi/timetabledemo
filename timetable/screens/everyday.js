import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, Button } from 'react-native'
import Loading, { Loading1 } from '../components/loading';
import { Colors } from '../colors';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Tab from '../components/tab';
import EcardService from '../services/ecardService';


export default class Ecard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            active: '校园卡',
            ...props.route.params
        }
        this.handlePost = this.handlePost.bind(this)
    }

    onchange(active) {
        this.setState({ active: active })
    }


    handlePost() {
        if (!this.state.value|!this.state.value.match(/\d+\.*\d+/)) return
        let value = this.state.value;
        try {
            Alert.alert(
                '',
                '确认为校园卡充值' + this.state.value + '元吗',
                [{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        EcardService.deposit(value, 'card').then(postResult => { alert(postResult.data.msg);this.props.ecardRefresh() })
                    }
                },
                ],
                { cancelable: false },
            );
        } catch (e) {
            alert(e)
        }
    }

    render() {
        const { ecardNum, bankBalance, bankCard, ecardbalance } = this.props.route.params
        return (
            <View style={{ backgroundColor: Colors.light, flex: 1 }}>
                <InfoItem color={Colors.foreGreen} text={ecardNum} title="学号：" />
                <InfoItem color={Colors.foreBlue} text={bankCard} title="银行卡号：" />
                <InfoItem color={Colors.forRed} text={bankBalance && bankBalance.slice(3)} title="银行卡余额：￥" />
                <InfoItem color={Colors.foreGreen} text={ecardbalance} title="校园卡余额：￥" />

                <View style={styles.tabContainer}>
                    <Tab active={this.state.active == '校园卡'} handleTab={() => this.onchange('校园卡')}>校园卡</Tab>
                    <Tab active={this.state.active == '电子账户'} handleTab={() => this.onchange('电子账户')}>电子账户</Tab>
                </View>
                <View style={{ flexWrap: 'wrap', backgroundColor: 'white', margin: 20, height: 200, borderRadius: 10 }}>
                    {/* <View style={{borderTopLeftRadius:10,borderBottomLeftRadius:10,width:30,height:'100%',backgroundColor:Colors.backGreen}}><Text style={{textAlign:'center',fontSize:18,letterSpacing:5,lineHeight:20,color:Colors.foreGreen}}>TRANSFER</Text></View> */}
                    <Text style={{ textAlign: 'center', margin: 10, fontSize: 20, color: Colors.purple }}>转账到{this.state.active}</Text>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TextInput
                            style={{ borderTopLeftRadius: 3, color: Colors.purple, borderTopRightRadius: 3, backgroundColor: Colors.light, fontSize: 16, borderBottomColor: Colors.purple, height: 40, borderBottomWidth: 1.8, margin: 10 }}
                            value={this.state.value}
                            onChangeText={(value) => this.setState({ value: value })}
                            onSubmitEditing={this.handlePost}
                            placeholder="请输入转账金额"
                            placeholderTextColor={Colors.darkGray}
                            selectionColor={Colors.backGreen}
                            blurOnSubmit={true}
                            returnKeyType="done"
                            autoFocus
                            keyboardType='numeric'
                        />

                        <View style={{ width: 100, elevation: 3, marginTop: 10, height: 40, justifyContent: 'center' }}>
                            <Button color={Colors.purple} title='确定' onPress={this.handlePost}></Button>
                        </View>

                    </View>

                </View>
            </View>
        )
    }
}

export const InfoItem = (props) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ backgroundColor: props.color, height: 15, width: 15, marginLeft: 18 }}>
        </View>
        <Text style={styles.row}> {props.title}<Text>{props.text}</Text></Text>
        {!props.text &&
    (<View style={{ width: 40, height: 40 }}>
        <Loading1></Loading1>
    </View>)}
    </View>)





const styles = StyleSheet.create({
    row: {
        backgroundColor: Colors.light,
        lineHeight: 40,
        fontSize: 16,
        color: Colors.darkGray,
    },
    tabContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        backgroundColor: 'white'

    },
    destroy: {
        fontSize: 15,
        color: Colors.purple,
        textAlign: 'center',
        paddingHorizontal: 10,

    },
})