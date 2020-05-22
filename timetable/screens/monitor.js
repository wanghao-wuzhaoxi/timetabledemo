import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import MonitorService from '../services/monitorService'
import WebView from 'react-native-webview';
import Loading from '../components/loading';
import { Colors } from '../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
export class Monitor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            temp: "",
            loading: true
        }
        // this.fetchData=this.fetchData.bind(this)
    }
    handleMessage = (msg) => {
        console.log(msg.nativeEvent.data)
        if (msg.nativeEvent.data == 'ok') this.setState({ loading: false })
    }

    handleOnload = (syntheticEvent) => {
        setTimeout(() => {
            this.webref.injectJavaScript(`
            document.body.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;padding-left:20px;padding-top:30px;background-color:rgb(249, 248, 254)"
            document.querySelector('#app').style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;padding-left:10px;background-color:rgb(249, 248, 254)"
            document.querySelector('.preview-window').style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;padding-left:10px;background-color:rgb(249, 248, 254)"
            document.querySelector('.preview-container').style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;padding-left:10px;background-color:rgb(249, 248, 254)"
            document.querySelector('#app > div > div').style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;padding-left:10px;background-color:rgb(249, 248, 254)"
            document.querySelector('#app > div > div.preview-container > div:nth-child(1)').style.position="static"
            document.querySelector('#app > div > div.preview-container > div:nth-child(2)').style.position="static"        
            document.querySelector('#app > div > div.page-switcher').remove()  
            `)
        }, 400)
        const { nativeEvent } = syntheticEvent;
        this.url = nativeEvent.url;
    }

    // componentDidMount() {
    //     this.fetchData();
    //     let a = setInterval(async () => {
    //         let res = await MonitorService.getTemprature();
    //         console.log(res)
    //         console.log(res.data)
    //         this.setState({ temp: res.data.data[0] })
    //         this.setState({ humi: res.data.data[1] })
    //         console.log(res.data.data[0])
    //     }, 12000)
    // }


    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.temp) {
    //         console.log(nextState.temp.ds.update_at.substring(nextState.temp.ds.update_at.length - 2) - this.state.temp.ds.update_at.substring(nextState.temp.ds.update_at.length - 2))
    //         console.log(nextState.temp.ds.update_at, this.state.temp.ds.update_at)
    //     }
    //     return !this.state.temp || nextState.temp.ds.update_at - this.state.temp.ds.update_at > 10
    // }

    async fetchData() {
        let res = await MonitorService.getTempAndHum();
        console.log(res)
        console.log(res.data)
        this.setState({ temp: res.data.data[0] })
        this.setState({ humi: res.data.data[1] })
        console.log(res.data.data[0])
    }

    render() {
        MonitorService.getTempAndHum().then(res => { console.log(res) });

        return (
            <View style={{ flex: 1}}>
    
                {this.state.loading && <View style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    zIndex: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}><View style={{ height: 300, width: 300, alignSelf: 'center' }}>
                        <Loading></Loading>
                    </View></View>}

                    <ScrollView style={{ height:'100%' }}>

                <View style={{ flex: 1 }}>
                    <WebView ref={r => (this.webref = r)} style={{ height: Dimensions.get('window').height-30, width:Dimensions.get('window').width}} dis
                        onLoadEnd={this.handleOnload}
                        onMessage={this.handleMessage}
                        scrollEnabled={false}
                        scalesPageToFit={true}
                        source={{
                            uri: 'https://open.iot.10086.cn/app_editor/#/view?open_id=94129ff833cd1a5ea21efe20c75d359b'
                        }}
                        injectedJavaScript={`
                    setTimeout(()=>{
                        window.ReactNativeWebView.postMessage('ok');
                        document.body.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;padding-left:20px;padding-top:30px;background-color:rgb(249, 248, 254)"
            document.querySelector('#app').style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;padding-left:10px;background-color:rgb(249, 248, 254)"
            document.querySelector('.preview-window').style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;padding-left:10px;background-color:rgb(249, 248, 254)"
            document.querySelector('.preview-container').style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;padding-left:10px;background-color:rgb(249, 248, 254)"
            document.querySelector('#app > div > div').style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;padding-left:10px;background-color:rgb(249, 248, 254)"
            document.querySelector('#app > div > div.preview-container > div:nth-child(1)').style.position="static"
            document.querySelector('#app > div > div.preview-container > div:nth-child(2)').style.position="static"     
            document.querySelector('#app > div > div.page-switcher').remove()  
       
        },400)`}

                    />
                </View>
                <View>
                    <Text style={commonStyles.title}>异常记录</Text>
                    <Text style={commonStyles.count}>0 条异常记录</Text>
                </View>
                </ScrollView>
                {/* <Text>上次同步于： {this.state.temp && this.state.temp.ds.update_at} </Text>
                <Text> {this.state.temp && this.state.temp.ds.current_value + this.state.temp.ds.unit_symbol} </Text> */}
  
            </View>
           
        )
    }
}

export default Monitor
export const commonStyles = StyleSheet.create({
    tabContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        backgroundColor: 'white'

    },
    noCourse: {
        paddingTop: 10,
        paddingLeft: 8,
        backgroundColor: 'rgb(249, 248, 254)',
        flexGrow: 1
    },
    box: {
        backgroundColor: 'rgb(249, 248, 254)',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 2,
        height: 100,
        flexWrap: 'wrap',
    },
    title: {
        lineHeight: 50,
        color: '#8795a1',
        fontSize: 20,
        backgroundColor: 'white',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 2,
        paddingHorizontal: 10
    },
    count: {
        textAlignVertical: 'center',
        color: Colors.purple,
        position: 'absolute',
        top: '30%',
        fontSize: 16,
        right: 14,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },

});