import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { NodePlayerView } from 'react-native-nodemediaclient';
import { commonStyles } from './monitor';
import { Colors } from '../colors';
export class VideoMonitor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            temp: ""
        }
        // this.fetchData=this.fetchData.bind(this)
    }



    render() {
        return (
            <View style={{flex:1,backgroundColor:Colors.light}}>
            <Text style={commonStyles.title}>十舍604</Text>
                <NodePlayerView
                    style={{ width:'100%',height:'80%'}}
                    ref={(vp) => { this.vp = vp }}
                    inputUrl={"rtmp://49.235.59.130/videotest/"}
                    // scaleMode={"ScaleAspectFit"}
                    bufferTime={300}
                    maxBufferTime={1000}
                    autoplay={true}
                />
               </View>
        )
    }
}

export default VideoMonitor
