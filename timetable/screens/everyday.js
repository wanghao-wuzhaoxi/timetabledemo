import React, { Component } from 'react'
import { Text, View, StyleSheet,Alert, Button } from 'react-native'
import Request from '../retrieve';
import cheerio from 'cheerio'
import Loading, { Loading1 } from '../components/loading';
import { Colors } from '../colors';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Tab from '../components/tab';


export default class Ecard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: '',
            ecardNum: '',
            bankCard: '',
            value: '',
            active:'校园卡'
        }
        this.handlePost = this.handlePost.bind(this)
    }


    async componentDidMount() {
        if (!this.state.balance) {
            try {
                let res = await Promise.all([Request.ecardget(), Request.eCardInfo()])
                console.log(res)
                const $ = cheerio.load(res[0].data)
                const balance = $('#TransferForm > fieldset > div.userInfoR > p:nth-child(2) > span:nth-child(3)').text()
                const ecardNum = $('#TransferForm > fieldset > div.userInfoR > p:nth-child(1) > em').text()
                const bankCard = $('#TransferForm > fieldset > div.userInfoR > p:nth-child(2) > span:nth-child(1)').text()

                const reg = /red">\d+.\d+/g;
                const ecardbalance = res[1].data.match(reg)[0].substring(5)
                console.log(ecardbalance)
                this.setState({ balance: balance, ecardNum: ecardNum, bankCard: bankCard, ecardbalance: ecardbalance })

            } catch (error) {
                console.log('获取校园卡数据出错啦');
                console.log(error)
            }
        }
    }
    onchange(active){
        this.setState({active:active})
    }


     handlePost() {
        if (!this.state.value) return
        let value=this.state.value;
        try{
            Alert.alert(
                '',
                '确认为校园卡充值'+this.state.value+'元吗',
                [ {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => {
                 Request.ecardDeposit(value,'card').then(postResult=>{alert(postResult.data.msg)})
                  }},
                ],
                {cancelable: false},
              );



        }catch(e){
            alert(e)
        }
    }

    render() {
        const{ecardNum,balance,bankCard,ecardbalance}=this.state

        return (
            <View style={{ backgroundColor: Colors.light, flex: 1 }}>
            <InfoItem color={Colors.foreGreen} text={ecardNum} title="学号："/>
            <InfoItem color={Colors.foreBlue} text={bankCard} title="银行卡号："/>
            <InfoItem color={Colors.forRed} text={balance.slice(3)} title="银行卡余额：￥"/>
            <InfoItem color={Colors.foreGreen} text={ecardbalance} title="校园卡余额：￥"/>

                <View style={styles.tabContainer}>
                <Tab active={this.state.active=='校园卡'} handleTab={()=>this.onchange('校园卡')}>校园卡</Tab>
                <Tab active={this.state.active=='电子账户'} handleTab={()=>this.onchange('电子账户')}>电子账户</Tab>                   
                </View>
            <View style={{flexWrap:'wrap',backgroundColor:'white',margin:20,height:200,borderRadius:10}}>
            {/* <View style={{borderTopLeftRadius:10,borderBottomLeftRadius:10,width:30,height:'100%',backgroundColor:Colors.backGreen}}><Text style={{textAlign:'center',fontSize:18,letterSpacing:5,lineHeight:20,color:Colors.foreGreen}}>TRANSFER</Text></View> */}
                <Text style={{textAlign:'center',margin:10,fontSize: 20,color:Colors.purple}}>转账到{this.state.active}</Text>
           
                 
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <TextInput
                        style={{borderTopLeftRadius:3,color:Colors.purple,borderTopRightRadius:3,backgroundColor:Colors.light,fontSize:16,borderBottomColor:Colors.purple,height:40,borderBottomWidth:1.8,margin:10}}
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
            {/* <TouchableOpacity onPress={()=>{}} style={{elevation:3,margin:10,backgroundColor: 'white', justifyContent: "center", alignItems: 'center', borderRadius: 12, height: 35, width: 60, borderWidth: 0.5, borderColor: Colors.purple }}>
                <Text style={styles.destroy}>确定</Text>
            </TouchableOpacity> */}
            <View style={{width:100,elevation:3,marginTop:10,height:40,justifyContent:'center'}}>
                <Button color={Colors.purple} title='确定' onPress={this.handlePost}></Button>
                </View>
            
                </View>
            
                </View>
            </View>
        )
    }
}

const InfoItem=(props)=>(
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ backgroundColor: props.color, height: 15, width: 15, marginLeft: 18 }}>
    </View>
<Text style={styles.row}> {props.title}<Text style={{textDecorationLine:props.text?'underline':'none'}}>{props.text}</Text></Text>
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
    }    ,
    tabContainer: {
      paddingHorizontal:10,
      paddingVertical:5,
      flexDirection: "row",
      backgroundColor:'white'
    
    },
    destroy: {
        fontSize: 15,
        color: Colors.purple,
        textAlign: 'center',
        // fontWeight: 'bold',
        paddingHorizontal:10,
       
    },
})