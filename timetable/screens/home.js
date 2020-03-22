import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Util from '../util';
import Request from '../retrieve'
import { createStackNavigator } from '@react-navigation/stack';
import Table from './table';
import ClassDetial from './classDetail';
import MenuCard from '../components/menuCard';
import { Colors } from '../colors';
import Loading from '../components/loading';
import TodayCourse from '../components/todayCourse';
import Ecard from './everyday';
import SplashScreen from 'react-native-splash-screen'


const startDate = new Date(2020, 1, 23)
export const teachingWeek = Math.ceil(((Date.now() - Number(startDate)) / 1000 / 60 / 60 / 24 / 7))

const HomeStack = createStackNavigator();

export function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="主页" component={Home} />
            <HomeStack.Screen name="课表" component={Table} />
            <HomeStack.Screen name="课程详情" component={ClassDetial} />
            <HomeStack.Screen name="校园卡" component={Ecard} />
        </HomeStack.Navigator>
    );
}



const emptyCell = []
for (var n = 0; n < 42; n++) {
    emptyCell.push('');
}

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staff: emptyCell,
            courses: null,
            loading: true,
        }
    }



    async componentDidMount() {
        SplashScreen.hide();
        try {
            let json = await AsyncStorage.getItem('kebiao');
            let login = Request.ecardlogin();
       

            if (json) {
                let data = JSON.parse(json);
                console.log(data)
                this.setState({ courses: data, loading: false })
            }
            else {
                await Request.login();
                let data1 = await Request.getTimeTable()
                let data2 = await Util.parseCourse(data1.data)
                let data3 = await Util.parseWeek(data2)
                await Util.prototype.save('kebiao', JSON.stringify(data3))
                let json = await AsyncStorage.getItem('kebiao');
                if (json) {
                    let data = JSON.parse(json);
                    this.setState({ courses: data, loading: false })
                }
            }
         
        } catch (error) {
            console.log('获取数据出错啦');
            console.log(error)
        }
        this.setState({ loading: false })

    }



    render() {
        const todayCourse = this.state.courses && this.state.courses.filter(course =>
            course.weeks.indexOf(teachingWeek) !== -1 &
            course.xq == new Date().getDay()).sort((a, b) => a.jc - b.jc)


        return (
            <>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, backgroundColor: Colors.light, height: 100 }}>
                    <MenuCard title='完整课表' charCode={10687} nav={() => this.props.navigation.navigate('课表', { staff: this.state.staff, courses: this.state.courses })}></MenuCard>
                    <MenuCard title='我的教务' charCode={10163} nav={() => this.props.navigation.navigate('课表', { staff: this.state.staff, courses: this.state.courses })}></MenuCard>
                    <MenuCard title='校园卡充值' charCode={9649} nav={() => this.props.navigation.navigate('校园卡')}></MenuCard>
                    <MenuCard title='校内通知' charCode={9993} nav={() => this.props.navigation.navigate('课表', { staff: this.state.staff, courses: this.state.courses })}></MenuCard>
                </ScrollView>

                <View>
                    <Text style={styles.title}>TODAY'S COURSES</Text>
                    <Text style={styles.count}>{todayCourse instanceof Array && todayCourse.length} courses</Text>
                </View>

                {todayCourse instanceof Array && todayCourse.length == 0 && <View style={styles.noCourse}><Text>今天好像没有课程哦,试试去添加待办事项吧</Text></View>}

                <View style={{ flex: 1 }}>
                    <ScrollView style={{ backgroundColor: Colors.light }} >
                        {this.state.loading &&
                            <View style={{ height: 300, width: 300, alignSelf: 'center' }}>
                                <Loading></Loading>
                            </View>
                        }

                        {todayCourse instanceof Array && todayCourse.map((c, index) =>
                            (<TodayCourse index={index} c={c} key={index}></TodayCourse>)
                        )}

                    </ScrollView>
                </View>
            </>
        )
    }
}

export default Home


const styles = StyleSheet.create({
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
