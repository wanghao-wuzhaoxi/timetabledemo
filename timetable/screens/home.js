import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Course from '../util';
import Request from '../retrieve'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Table from './table';
import ClassDetial from './classDetail';
import MenuCard from '../components/menuCard';
import { Colors } from '../colors';
import Loading from '../components/loading';
import TodayCourse from '../components/todayCourse';
import Ecard from './everyday';
import SplashScreen from 'react-native-splash-screen'

const startDate = new Date(2020, 1, 23)
const curDate=new Date()
export const teachingWeek = Math.ceil(((Date.now() - Number(startDate)) / 1000 / 60 / 60 / 24 / 7))

const HomeStack = createStackNavigator();



export function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="主页" component={Home} />
            <HomeStack.Screen name="课表" component={Table} options={{
                ...TransitionPresets.ModalTransition,

            }} />
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
            Request.ecardlogin().then(res => {
                console.log('电子账户', res.data.msg)
            });

            if (json) {this.setState({ courses: JSON.parse(json), loading: false })
        console.log(json)
        }

            else {
                await Request.login();
                let { data } = await Request.getTimeTable()
                let courses = Course.createBatch(data)

                await Course.save('kebiao', JSON.stringify(courses))

                let json = await AsyncStorage.getItem('kebiao');
                if (json) {
                    let data = JSON.parse(json);
                    this.setState({ courses: data, loading: false })
                }
            }
            let res = await Promise.all([Request.ecardget(), Request.eCardInfo()])
            const bankBalance = res[0].data.match(/余额:\d+.\d+/)[0]
            const ecardNum = res[0].data.match(/<em>\d+/)[0].substring(4)
            const bankCard = res[0].data.match(/<span>\d+\*+\d+/)[0].substring(7)
            const ecardbalance = res[1].data.match(/red">\d+.\d+/)[0].substring(5)
            this.setState({ balance: bankBalance, ecardNum: ecardNum, bankCard: bankCard, ecardbalance: ecardbalance })


        } catch (error) {
            console.log('数据加载失败', error);
        }

        this.setState({ loading: false })

    }



    render() {
        //筛选出周数包含当前教学周，且当天正在上的课并按照课程的节次升序排列
        const todayCourse = this.state.courses && this.state.courses.filter(
            course =>course.weeks.indexOf(teachingWeek) !== -1 &course.xq == curDate.getDay())
            .sort((a, b) => a.jc - b.jc)


        return (
            <>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, backgroundColor: Colors.light, height: 100 }}>
                    <MenuCard title='完整课表' charCode={10687} nav={() => this.state.courses&&this.props.navigation.navigate('课表', { staff: this.state.staff, courses: this.state.courses })}></MenuCard>
                    <MenuCard title='我的教务' charCode={10163} nav={() => this.props.navigation.navigate('课表', { staff: this.state.staff, courses: this.state.courses })}></MenuCard>
                    <MenuCard title='校园卡充值' charCode={9649} nav={() => this.props.navigation.navigate('校园卡', { ecardNum: this.state.ecardNum, balance: this.state.balance, bankCard: this.state.bankCard, ecardbalance: this.state.ecardbalance })}></MenuCard>
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
                            (<TodayCourse index={index} c={c} key={index} {...this.props}></TodayCourse>)
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
