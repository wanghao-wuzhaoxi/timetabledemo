import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Button, StatusBar, SafeAreaView, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import Table from './table';
import ClassDetial from './classDetail';

import { Colors } from '../colors';
import Loading from '../components/loading';
import TodayCourse from '../components/todayCourse';
import Ecard from './everyday';
import SplashScreen from 'react-native-splash-screen'
import LoginForm from './login';
import { Base64 } from '../encode'
import EcardService from '../services/ecardService';
import JWService from '../services/jwService';
import Course from '../models/course';
import { Schedule } from '../utils/schedule';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import WebView from 'react-native-webview';
import MyTabBar from '../components/myTabBar';
import Monitor from './monitor';
import VideoMonitor from './videoMonitor';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { SvgXml } from 'react-native-svg';
const HomeStack = createStackNavigator();
const xml = `<svg xmlns="http://www.w3.org/2000/svg" id="b5c0e5b8-29e4-4820-a986-e08c8b5e3595" data-name="Layer 1" width="938.19159" height="761.03649" viewBox="0 0 938.19159 761.03649" class="injected-svg gridItem__media" xmlns:xlink="http://www.w3.org/1999/xlink"><rect y="758.44705" width="937.72423" height="2" fill="#3f3d56"></rect><path d="M605.6087,275.68745h-3.99878V166.14212a63.40184,63.40184,0,0,0-63.40179-63.40192H306.1214a63.40185,63.40185,0,0,0-63.402,63.40172V767.11633a63.40186,63.40186,0,0,0,63.40179,63.40191H538.20782a63.40186,63.40186,0,0,0,63.402-63.40167V353.66369h3.99884Z" transform="translate(-130.9042 -69.48176)" fill="#3f3d56"></path><path d="M588.11842,166.58437v600.09a47.35088,47.35088,0,0,1-47.35,47.35h-233.21a47.34234,47.34234,0,0,1-47.34-47.35v-600.09a47.34233,47.34233,0,0,1,47.34-47.35h28.3a22.48621,22.48621,0,0,0,20.83,30.99h132.96a22.48084,22.48084,0,0,0,20.82-30.99h30.3A47.35087,47.35087,0,0,1,588.11842,166.58437Z" transform="translate(-130.9042 -69.48176)" fill="#fff"></path><circle cx="234.72423" cy="148.94264" r="62" fill="#ff6584"></circle><ellipse cx="481.52878" cy="511.47762" rx="83.93709" ry="41.13748" transform="translate(-205.63303 871.01427) rotate(-84.36901)" fill="#3f3d56"></ellipse><path d="M471.82832,648.57886c-6.69694-99.99244,19.199-196.41244,19.46125-197.37392l3.13615.85472c-.261.95682-26.013,96.871-19.35407,196.303Z" transform="translate(-130.9042 -69.48176)" fill="#544bbb"></path><rect x="479.38571" y="505.02121" width="42.18651" height="3.2511" transform="translate(-286.74406 160.73103) rotate(-22.51062)" fill="#544bbb"></rect><rect x="458.80141" y="491.62473" width="3.2511" height="42.18795" transform="matrix(0.55614, -0.83109, 0.83109, 0.55614, -352.65322, 540.75307)" fill="#544bbb"></rect><ellipse cx="395.86633" cy="372.95401" rx="164.17107" ry="80.46008" transform="translate(-145.03503 660.83367) rotate(-84.36901)" fill="#e6e6e6"></ellipse><path d="M378.44285,641.00468c-13.08066-195.31557,37.50028-383.6477,38.01258-385.52721l3.13615.85473c-.511,1.87484-50.948,189.70118-37.9054,384.45632Z" transform="translate(-130.9042 -69.48176)" fill="#3f3d56"></path><rect x="391.67367" y="361.87935" width="82.51384" height="3.2511" transform="translate(-237.08815 123.96365) rotate(-22.51062)" fill="#3f3d56"></rect><rect x="352.96843" y="334.12429" width="3.2511" height="82.51384" transform="translate(-285.48788 391.84164) rotate(-56.21159)" fill="#3f3d56"></rect><ellipse cx="595.20552" cy="293.31849" rx="224.65515" ry="110.10326" transform="translate(113.99601 787.38934) rotate(-84.36901)" fill="#544bbb"></ellipse><path d="M571.9608,660.085c-17.893-267.17522,51.29658-524.79536,51.99745-527.36607l3.13615.85472c-.69962,2.56606-69.74527,259.6804-51.89027,526.29519Z" transform="translate(-130.9042 -69.48176)" fill="#3f3d56"></path><rect x="589.46865" y="278.76226" width="112.91339" height="3.2511" transform="translate(-189.03802 199.17687) rotate(-22.51062)" fill="#3f3d56"></rect><rect x="537.10232" y="240.18265" width="3.2511" height="112.91339" transform="translate(-138.31025 509.93024) rotate(-56.21231)" fill="#3f3d56"></rect><path d="M260.21846,656.72262l-2,112.50247c0,26.619,23.19,48.19931,49.34,48.19931h233.21c26.15,0,49.35-21.58029,49.35-48.19931l-2-111.515C470.54677,612.13741,361.82945,614.99539,260.21846,656.72262Z" transform="translate(-130.9042 -69.48176)" fill="#544bbb"></path><path d="M757.73389,265.55793l12.41349-9.92842c-9.64348-1.06394-13.60581,4.19541-15.22744,8.35823-7.53388-3.12835-15.73541.97151-15.73541.97151l24.83709,9.01675A18.79465,18.79465,0,0,0,757.73389,265.55793Z" transform="translate(-130.9042 -69.48176)" fill="#3f3d56"></path><path d="M454.33082,177.90815l12.41348-9.92842c-9.64348-1.06393-13.60581,4.19542-15.22743,8.35824-7.53389-3.12835-15.73542.97151-15.73542.97151l24.8371,9.01674A18.79483,18.79483,0,0,0,454.33082,177.90815Z" transform="translate(-130.9042 -69.48176)" fill="#3f3d56"></path><path d="M949.215,138.80286l12.41348-9.92841c-9.64348-1.06394-13.60581,4.19541-15.22744,8.35823-7.53388-3.12835-15.73541.97151-15.73541.97151l24.8371,9.01674A18.7949,18.7949,0,0,0,949.215,138.80286Z" transform="translate(-130.9042 -69.48176)" fill="#3f3d56"></path><path d="M929.59073,595.44741l-.21138,16.91339a11.0384,11.0384,0,0,1-13.33074,10.65962h0a11.0384,11.0384,0,0,1-7.64863-15.594l5.65225-11.7156,11.71725-85.025-4.49739-56.81539,21.99782-1.05418,4.6785,64.98836Z" transform="translate(-130.9042 -69.48176)" fill="#ffb9b9"></path><polygon points="690.906 615.823 669.756 729.705 680.331 728.078 719.376 613.383 690.906 615.823" fill="#ffb9b9"></polygon><polygon points="792.179 617.043 805.601 733.772 816.989 732.145 819.836 616.23 792.179 617.043" fill="#ffb9b9"></polygon><path d="M1043.47242,652.36032c-30.3204,24.35925-65.82375,60.13557-101.17188,46.80734-36.88693-13.90847-79.45811-14.78814-127.40493-8.57563C826.347,618.76176,840.4884,550.798,858.8214,488.85876l61.008,9.76129c.94385,1.04272-1.33391,6.68349-.40672,7.72768,17.14911,19.3131,34.64046,34.28155,45.20984,54.17363a263.09034,263.09034,0,0,0,62.09993,77.6744Z" transform="translate(-130.9042 -69.48176)" fill="#e6e6e6"></path><path d="M1069.0958,664.96865c-30.3204,25.04776-93.88745,66.8633-129.23558,53.15835-36.88693-14.30159-80.67827-13.18034-128.6251-6.79223q3.41266-22.01133,7.281-43.74258c10.39163-58.36708,199.81766-37.86485,225.363-15.63859Z" transform="translate(-130.9042 -69.48176)" fill="#e6e6e6" opacity="0.5"></path><path d="M946.99379,456.45785c-11.40621-3.33493-23.03457-1.67947-34.81756,3.44321l4.26832-32.07389a13.42176,13.42176,0,0,1,11.69123-14.95333h0a13.42177,13.42177,0,0,1,14.95334,11.69123Z" transform="translate(-130.9042 -69.48176)" fill="#2f2e41"></path><circle cx="764.1153" cy="296.95419" r="22.77634" fill="#ffb9b9"></circle><path d="M937.31842,429.88431l-50.0266-11.79488c7.42642-10.67621,5.90678-23.19,0-36.60483L911.695,376.604c2.70107,9.25875,5.978,17.73139,10.57473,24.40322Z" transform="translate(-130.9042 -69.48176)" fill="#ffb9b9"></path><path d="M919.82944,501.87381,858.008,492.926l2.05584-11.57777c-.97509-30.16344,3.99581-54.85253,13.39953-75.46037l54.50052,3.25376,0,0A40.50556,40.50556,0,0,1,939.6747,457.222l-19.03182,37.33085Z" transform="translate(-130.9042 -69.48176)" fill="#2f2e41"></path><path d="M812.67015,828.55818c-2.85281,1.302-5.24242-9.24676-7.64881-6.882-6.731,6.61469-17.03824,8.05508-26.02269,5.16711l3.14439-.03515A4.20762,4.20762,0,0,1,779.491,821.325h0a4.20763,4.20763,0,0,1,2.91922-2.60459l7.15843-1.78961,11.23977-19.76649,12.24936-1.55031.30939.506a31.58354,31.58354,0,0,1,3.38457,25.82571C815.733,825.20973,814.34639,827.79315,812.67015,828.55818Z" transform="translate(-130.9042 -69.48176)" fill="#2f2e41"></path><path d="M947.7013,828.55818c-2.85282,1.302-5.24243-9.24676-7.64882-6.882-6.731,6.61469-17.03824,8.05508-26.02269,5.16711l3.1444-.03515a4.20761,4.20761,0,0,1-2.6521-5.48314h0a4.20763,4.20763,0,0,1,2.91922-2.60459l7.15843-1.78961,11.23977-19.76649,12.24936-1.55031.30939.506a31.58354,31.58354,0,0,1,3.38457,25.82571C950.76414,825.20973,949.37753,827.79315,947.7013,828.55818Z" transform="translate(-130.9042 -69.48176)" fill="#2f2e41"></path><path d="M923.36919,462.42194h-.58335c-10.99942-9.531-20.55808-20.21545-12.8387-33.59175-6.54685-16.61653-13.84548-33.87222-13.4044-44.54745a31.30614,31.30614,0,0,0-7.11173-21.76562c-6.95679-8.12637-8.50514-11.75564-21.21085-8.68247v0a24.07552,24.07552,0,0,1,24.94809-24.394l7.93809.28866c6.07248.22081,25.47968,2.70318,29.64637,6.71041a19.33222,19.33222,0,0,1,5.5343,16.25539c-.77881,6.62568,1.3115,12.4758,6.89623,17.3813,10.692,11.05631,15.10194,22.52841,9.0399,34.6936-4.57574,12.87865-4.35717,23.47924,7.44566,28.57533h0v0C963.502,448.05651,938.57153,462.42194,923.36919,462.42194Z" transform="translate(-130.9042 -69.48176)" fill="#2f2e41"></path><ellipse cx="794.98802" cy="521.53228" rx="7.78175" ry="15.87792" transform="translate(-273.66577 608.98229) rotate(-42.76626)" fill="#3f3d56"></ellipse><circle cx="695.70128" cy="390.80406" r="22.82838" fill="#544bbb"></circle><path d="M864.9405,605.75427a120.26458,120.26458,0,0,1-28.32994-17.97493c-17.27569-14.93614-29.82021-36.372-30.75373-59.53895-.89589-22.2329,8.52533-43.134,18.4908-62.45411q1.88055-3.64579,3.80009-7.27128c.48628-.92285,1.99541-.303,1.5061.62561-10.33838,19.62013-21.18589,40.3541-22.16671,62.97818-1.03383,23.84711,10.61711,46.57835,27.95481,62.44419a117.26593,117.26593,0,0,0,30.03393,19.64334" transform="translate(-130.9042 -69.48176)" fill="#3f3d56"></path><rect x="818.53833" y="459.58913" width="1.08699" height="15.27261" transform="translate(-215.05144 126.87117) rotate(-13.00791)" fill="#3f3d56"></rect><ellipse cx="831.60826" cy="565.3893" rx="7.78175" ry="15.87792" transform="translate(-194.69233 38.19293) rotate(-7.13528)" fill="#3f3d56"></ellipse><path d="M858.8214,579.15067,856.55622,595.913a11.0384,11.0384,0,0,1-14.52733,8.96062h0a11.03839,11.03839,0,0,1-5.6969-16.408l7.03407-10.94188,21.96289-82.97095,2.44032-56.94084,21.9629,1.62688-3.25376,65.07525Z" transform="translate(-130.9042 -69.48176)" fill="#ffb9b9"></path><path d="M892.57918,449.81361c-10.91641-4.69632-22.65976-4.46625-34.97794-.81344l8.1344-31.31748a13.42176,13.42176,0,0,1,13.42176-13.42175h0a13.42175,13.42175,0,0,1,13.42175,13.42175Z" transform="translate(-130.9042 -69.48176)" fill="#2f2e41"></path></svg>`
export function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="主页" component={Home} options={{ headerShown: false }} />
            <HomeStack.Screen name="课表" component={Table} options={{ headerShown: false }} />
            <HomeStack.Screen name="课程详情" component={ClassDetial} />
            <HomeStack.Screen name="校园卡" component={Ecard} />
            <HomeStack.Screen name="登录" component={LoginForm} />
            <HomeStack.Screen name="温湿度监控" component={Monitor} />
            <HomeStack.Screen name="视频监控" component={VideoMonitor} />
        </HomeStack.Navigator>
    );
}


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staff: Schedule.emptyCell,
            courses: null,
            loading: false,
            logined: false,
            ecardLogined: false,
            jWAccount: '',
            openLogin: false
        }
        this.onChangeNum = this.onChangeNum.bind(this)
        this.onChangePsd = this.onChangePsd.bind(this)
        this.login = this.login.bind(this)
        this.ecardRefresh = this.ecardRefresh.bind(this)
        this.ecardlogin = this.ecardlogin.bind(this)
    }

    onChangeNum(inputData) { this.setState({ num: inputData }); }
    onChangePsd(inputData) { this.setState({ psd: inputData }); }
    onchange(active) { this.setState({ active: active }) }



    async componentDidMount() {
        try {
            await this.dealWithJWAccount()
            await this.dealWithEcardAccount();
            console.log("账户信息", this.state.jWAccount)

        } catch (error) {
            console.log('数据初始化失败', error);
        }
        SplashScreen.hide();
    }


    async login(num = this.state.num, psd = this.state.psd, needSave = true) {
        this.setState({ loading: true })
        let json = '';
        let res = await JWService.login(encodeURIComponent(`${Base64.encode(num)}%%%${Base64.encode(psd)}`));
        if (res.status == 200) {
            console.log(res.data)
            if (res.data.match(/ color="red">.*</)) {
                alert(res.data.match(/ color="red">.*</)[0].replace('color="red">', '').replace('<', ''))
                this.setState({ loading: false })
                return ''
            }
            else {
                let name = res.data.match(/<font size="4">.*<\/font>/)[0].replace('<font size="4">', '').replace('</font>', '')
                this.setState({ logined: true, jWAccount: { username: this.state.num, password: this.state.psd, name: name } });
                if (needSave) AsyncStorage.setItem('JWAccount', JSON.stringify({ username: this.state.num, password: this.state.psd, name: name }))
                let { data } = await JWService.getTimeTable();
                let courses = Course.createBatch(data);
                await Course.save('kebiao', JSON.stringify(courses));
                json = await AsyncStorage.getItem('kebiao');
                if (json) this.setState({ loading: false })

            }

        }

        return json
    }

    async ecardlogin(num = this.state.num, psd = this.state.psd, needSave = true) {
        this.setState({ ecardLoading: true })
        let a = await EcardService.login(num, psd);
        if (a && a.status == 200) {
            console.log(a.data)
            if (a.data.success == true) {
                this.setState({ ecardLogined: true, ecardLoading: false });
                if (needSave)
                    AsyncStorage.setItem('EcardAccount', JSON.stringify({ username: this.state.num, password: this.state.psd }))
            }
            else {
                this.setState({ ecardLoading: false });
                alert(a.data.msg)}
        }
        this.ecardRefresh()
    }

    async dealWithEcardAccount() {
        //判断本地是否存储校园卡账号和密码
        let ecardAccount = JSON.parse(await AsyncStorage.getItem('EcardAccount'))
        console.log(ecardAccount)
        if (ecardAccount && ecardAccount.username) {
            console.log(ecardAccount.username)
            this.setState({ hasAccount: true })
            this.ecardlogin(ecardAccount.username, ecardAccount.password, false)
        }
    }

    async dealWithJWAccount() {
        //判断本地是否有课表数据
        let Kebioajson = await AsyncStorage.getItem('kebiao');
        let JWAccount = JSON.parse(await AsyncStorage.getItem('JWAccount'));
        if (Kebioajson) this.setState({ courses: JSON.parse(Kebioajson), loading: false, logined: true, jWAccount: JWAccount })
        else {
            if (JWAccount) {//尝试获取本地的教务用户名密码
                this.setState({ jWAccount: JWAccount })
                this.login(JWAccount.username, JWAccount.password, false)
            }
        }
    }

    ecardRefresh() {
        console.log("正在刷新")
        this.setState({ ...EcardService.reset() })
        EcardService.getTransferPage().then(res => this.setState({ ...EcardService.parseTransferPage(res) })).catch(e => console.log(e));
        EcardService.getInfoPage().then(res => this.setState({ ...EcardService.parseInfoPage(res) })).catch(e => console.log(e))
    }

    renderTadayCourse() {
        //筛选出周数包含当前教学周，且当天正在上的课并按照课程的节次升序排列
        const todayCourse = this.state.courses && this.state.courses.filter(
            course => course.weeks.indexOf(Schedule.curTeachingWeek) !== -1 & course.xq == Schedule.curDate.getDay())
            .sort((a, b) => a.jc - b.jc);
        if (this.state.logined) return (
            <View style={{ flex: 1 }}>
                <View>
                    <Text style={styles.title}>TODAY'S COURSES</Text>
                    <Text style={styles.count}>{todayCourse instanceof Array && todayCourse.length} courses</Text>
                </View>
                {todayCourse instanceof Array && todayCourse.length == 0 && <View style={styles.noCourse}><Text>今天好像没有课程哦,试试去添加待办事项吧</Text></View>}

                <View style={{ flex: 1 }}>
                    <ScrollView style={{ backgroundColor: Colors.light }} >
                        {todayCourse instanceof Array && todayCourse.map((c, index) =>
                            (<TodayCourse index={index} c={c} key={index} {...this.props}></TodayCourse>)
                        )}
                    </ScrollView>
                </View>
            </View>)

        if (!this.state.logined && !this.state.loading) return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.light }}>
                <Text style={{ color: Colors.title, margin: 10 }}>您好像还没有登录哦</Text>
                <SvgXml xml={xml} width="200" height="200" />
                <TouchableNativeFeedback onPress={() => this.setState({ openLogin: true, closeLogin: false })} style={{ elevation: 2 }} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.6)', false)}>
                    <View style={{ backgroundColor: '#544BBB', borderRadius: 5 }}>
                        <Text style={{ paddingHorizontal: 26, paddingVertical: 6, color: 'white', fontSize: 16, letterSpacing: 5 }}>登录</Text>
                    </View>
                </TouchableNativeFeedback>
                <Text style={{ color: Colors.subTitle, margin: 20 }}>    我们不会尝试窃取您的隐私。获取学号和校园卡密码仅用于获取余额数据并进行充值，我们会将您的学号和密码保存在您的手机本地，以便于您随时更新课表及其他数据。</Text>
            </View>)

        if (this.state.loading) return (
            <View style={{ height: 300, width: 300, alignSelf: 'center' }}>
                <Loading></Loading>
            </View>)
    }




    render() {
        return (
            <>
                {this.state.openLogin &&
                    <LoginForm title={'教务登录'} action={!this.state.closeLogin ? 'openLogin' : 'closeLogin'}
                        handleClose={() => {
                            this.setState({ closeLogin: true })
                            setTimeout(() => {
                                this.setState({ openLogin: false })
                            }, 500)
                        }}
                        placeholder1={'请输入学号'} placeholder2={'请输入校园卡密码'} onSubmit={() => {
                            this.setState({ closeLogin: true, openLogin: false })
                            this.login().then(json => {
                                if (json) {
                                    let data = JSON.parse(json);
                                    this.setState({ courses: data, loading: false })
                                }
                            })
                        }}
                        onChangeNum={(e) => this.onChangeNum(e)}
                        onChangePsd={(e) => this.onChangePsd(e)}>
                    </LoginForm>}
                {this.state.openEcardLogin &&
                    <LoginForm title={'校园卡登录'} action={!this.state.closeEcardLogin ? 'openLogin' : 'closeLogin'}
                        handleClose={() => {
                            this.setState({ closeEcardLogin: true })
                            setTimeout(() => {
                                this.setState({ openEcardLogin: false })
                            }, 500)
                        }}
                        placeholder1={'请输入学号'} placeholder2={'请输入校园卡密码'} onSubmit={() => {
                            this.setState({ closeEcardLogin: true, openEcardLogin: false })
                            this.ecardlogin()
                        }}
                        onChangeNum={(e) => this.onChangeNum(e)}
                        onChangePsd={(e) => this.onChangePsd(e)}>
                    </LoginForm>}
                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar barStyle="dark-content" translucent={true} backgroundColor="rgba(0,0,0,0.001)" />
                    <View style={{ backgroundColor: Colors.light }}>
                        <View style={{ width: '100%', marginTop: 30 + StatusBar.currentHeight, paddingLeft: 90, marginBottom: 30 }}>
                            <View style={{ position: 'absolute', marginLeft: 20, top: 0, left: 0, width: 56, height: 56, borderRadius: 15 }} >
                                <TouchableOpacity style={{ width: 56, height: 56, borderRadius: 15 }}>
                                    <Image source={require("../assets/Snipa.jpg")} style={{ width: 56, height: 56, backgroundColor: 'white', borderRadius: 15 }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ paddingTop: 8, fontSize: 16, color: '#b8bece', fontWeight: '500', fontFamily: 'Futura', }}>{this.state.jWAccount.username || '未登录'}</Text>
                            <Text style={{ fontSize: 19, textAlignVertical: 'center', color: '#3c4560', fontWeight: 'bold' }}>{this.state.jWAccount.name || '未登录'}</Text>
                            <View style={{ position: 'absolute', marginRight: 20, top: 20, right: 0, width: 80, height: 40, borderRadius: 5 }}>
                                <View style={{ borderRadius: 8 }}>
                                    <TouchableOpacity onPress={() => this.state.courses && this.props.navigation.navigate('课表', { staff: this.state.staff, courses: this.state.courses })}>
                                        {/* <Icon name='ios-eye' size={22} color='white'></Icon> */}
                                        <Text style={{ elevation: 10, fontSize: 16, padding: 5, fontWeight: 'bold', color: Colors.title }}> 完整课表</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    <ScrollableTabView
                        style={{ flex: 1 }}
                        initialPage={0}
                        renderTabBar={() => <MyTabBar tabStyle={{ backgroundColor: 'white' }} />}
                    >

                        <View style={{ flex: 1 }} tabLabel={{ text: '今日课程', icon: "ios-today" }}>{this.renderTadayCourse()}</View>
                        <View style={{ flex: 1, backgroundColor: Colors.light }} tabLabel={{ text: '校园卡充值', icon: "ios-card" }}>
                            {!this.state.hasAccount && !this.state.ecardLogined && !this.state.ecardLoading &&
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.light }}>

                                    <Text style={{ color: Colors.title, margin: 10 }}>您好像还没有登录哦</Text>
                                    <SvgXml xml={xml} width="200" height="200" />
                                    <TouchableNativeFeedback onPress={() => this.setState({ openEcardLogin: true, closeEcardLogin: false })} style={{ elevation: 2 }} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.6)', false)}>
                                        <View style={{ backgroundColor: '#544BBB', borderRadius: 5 }}>
                                            <Text style={{ paddingHorizontal: 26, paddingVertical: 6, color: 'white', fontSize: 16, letterSpacing: 5 }}>登录</Text>
                                        </View>
                                    </TouchableNativeFeedback>

                                    <Text style={{ color: Colors.subTitle, margin: 20 }}>    我们不会尝试窃取您的隐私。获取学号和校园卡密码仅用于获取余额数据并进行充值，我们会将您的学号和密码保存在您的手机本地，以便于您随时更新课表及其他数据。</Text>
                                </View>
                            }
                            {this.state.ecardLoading && !this.state.ecardLogined &&
                                <View style={{ height: 300, width: 300, alignSelf: 'center' }}>
                                    <Loading></Loading>
                                </View>
                            }
                            {this.state.ecardLogined && <Ecard ecardRefresh={this.ecardRefresh} route={{ params: this.state }}></Ecard>}
                        </View>
                        <View tabLabel={{ text: '查单词', icon: "ios-search" }} style={{ flex: 1 }}>
                            <WebView ref={r => (this.webref = r)} style={{ flex: 1 }}
                                onMessage={this.handlemessage}
                                source={{
                                    uri: 'http://seedbed.xyz/mydict.html',
                                }}
                            />
                        </View>

                        <Text tabLabel={{ text: '校内通知', icon: "ios-mail" }}>校内通知</Text>
                    </ScrollableTabView>
                </SafeAreaView>
            </>
        )
    }
}

export default Home



const styles = StyleSheet.create({
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
        lineHeight: 40,
        fontFamily: 'Futura',
        color: Colors.subTitle,
        // color: '#8795a1',
        fontWeight: '600',
        fontSize: 18,
        backgroundColor: 'white',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 2,
        paddingHorizontal: 10
    },
    count: {
        fontFamily: 'Futura',
        textAlignVertical: 'center',
        color: Colors.purple,
        position: 'absolute',
        top: '25%',
        fontSize: 16,
        right: 14,
        fontStyle: 'italic',
        // fontWeight: '600'
    },

});
