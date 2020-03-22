import axios from 'axios'


const defaultHeader = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': 1,
    'Referer': 'http://csujwc.its.csu.edu.cn/jsxsd/xskb/xskb_list.do?Ves632DSdyV=NEW_XSD_WDKB',
    'Host': 'csujwc.its.csu.edu.cn',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
    'Cookie': '_ga=GA1.3.978327659.1577113737; JSESSIONID=96B09F69AAED4C768EB325C99C9901B1; UM_distinctid=16f4cff8b279e4-0fe1d87bdc301d-6701b35-e1000-16f4cff8b28337; CSU_P2P_TOKEN=HUwnw8bsjc0ie; BIGipServerpool_jwctest=2017969610.20480.0000'
}

export default class Request {


    static login() {
        axios.defaults.withCredentials = true;
        return axios({
            url: 'http://csujwc.its.csu.edu.cn/jsxsd/xk/LoginToXk',
            method: 'POST',
            headers: {
                ...defaultHeader
            },
            data: 'encoded=ODMwNTE4MDcyMg%3D%3D%25%25%25NTMyNjIzMTk5OTA3MTkwMzEw'
        })
    }

    static getTimeTable() {
        axios.defaults.withCredentials = true;
        return axios({
            url: 'http://csujwc.its.csu.edu.cn/jsxsd/kbxx/getKbxx.do',
            method: 'POST',
            headers: {
                ...defaultHeader,
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': 'http://csujwc.its.csu.edu.cn/jsxsd/framework/xsMain.jsp'
            },
            data: 'xnxq01id=2019-2020-2&zc='
        })
    }

    static ecardlogin() {
        axios.defaults.withCredentials = true;
        return axios({
            url: 'http://ecard.csu.edu.cn:8070/Account/Login',
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "X-Requested-With": "XMLHttpRequest",
                "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36",
                "Origin": "http://ecard.csu.edu.cn:8070",
                "Referer": "http://ecard.csu.edu.cn:8070/Account/Login?next=aHR0cDovL2VjYXJkLmNzdS5lZHUuY246ODA3MC9TeW5DYXJkL01hbmFnZS9UcmFuc2Zlcg==",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "Cookie": "_ga=GA1.3.978327659.1577113737; UM_distinctid=16f4cff8b279e4-0fe1d87bdc301d-6701b35-e1000-16f4cff8b28337; CSU_P2P_TOKEN=HUwnw8bsjc0ie; ASP.NET_SessionId=wvp2eoriv3cnthb1q50wubnz; iPlanetDirectoryPro=U3luU25vXzgzMDUxODA3MjJfMjAyMDAzMTAyMjU2MDE2NzIx"
            },
            data: "SignType=SynSno&UserAccount=8305180722&Password=MTkwMzEw&NextUrl=aHR0cDovL2VjYXJkLmNzdS5lZHUuY246ODA3MC9TeW5DYXJkL01hbmFnZS9UcmFuc2Zlcg%3D%3D&openid=&Schoolcode=csu"
        })
    }

    static ecardget() {
        axios.defaults.withCredentials = true;
        return axios({
            url: 'http://ecard.csu.edu.cn:8070/SynCard/Manage/Transfer',
            method: 'get',
            headers: {
                "Accept": "*/*",
                "X-Requested-With": "XMLHttpRequest",
                "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36",
                "Origin": "http://ecard.csu.edu.cn:8070",
                "Referer": "http://ecard.csu.edu.cn:8070/Account/Login?next=aHR0cDovL2VjYXJkLmNzdS5lZHUuY246ODA3MC9TeW5DYXJkL01hbmFnZS9UcmFuc2Zlcg==",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "Cookie": "_ga=GA1.3.978327659.1577113737; UM_distinctid=16f4cff8b279e4-0fe1d87bdc301d-6701b35-e1000-16f4cff8b28337; CSU_P2P_TOKEN=HUwnw8bsjc0ie; ASP.NET_SessionId=wvp2eoriv3cnthb1q50wubnz; iPlanetDirectoryPro=U3luU25vXzgzMDUxODA3MjJfMjAyMDAzMTAyMjU2MDE2NzIx"
            },
        })
    }

    static ecardDeposit(amount,cardtype) {
        axios.defaults.withCredentials = true;
        return axios({
            url: 'http://ecard.csu.edu.cn:8070/SynCard/Manage/TransferPost',
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "X-Requested-With": "XMLHttpRequest",
                "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36",
                "Origin": "http://ecard.csu.edu.cn:8070",
                "Referer": "http://ecard.csu.edu.cn:8070/SynCard/Manage/Transfer",
                "Accept-Encoding": "gzip, deflate",
                "Connection": "keep-alive",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "Cookie": "_ga=GA1.3.978327659.1577113737; UM_distinctid=16f4cff8b279e4-0fe1d87bdc301d-6701b35-e1000-16f4cff8b28337; CSU_P2P_TOKEN=HUwnw8bsjc0ie; ASP.NET_SessionId=wvp2eoriv3cnthb1q50wubnz; iPlanetDirectoryPro=U3luU25vXzgzMDUxODA3MjJfMjAyMDAzMTEwOTUxMzIwNTg0"
            },
            data: `FromCard=bcard&ToCard=${cardtype}&Amount=${amount}&CheckSign=E13B0F3E695B7853D3485865D12B32CD&Password=MTkwMzEw`
        })

    }

    static eCardInfo() {
        axios.defaults.withCredentials = true;
        return axios({
            url: 'http://ecard.csu.edu.cn:8070/SynCard/Manage/BasicInfo ',
            method: 'GET',
            headers: {
                "Accept": "*/*",
                "X-Requested-With": "XMLHttpRequest",
                "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36",
                "Host": "ecard.csu.edu.cn:8070",
                "Referer": "http://ecard.csu.edu.cn:8070/",
                "Accept-Encoding": "gzip, deflate",
                "Connection": "keep-alive",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "Cookie": "_ga=GA1.3.978327659.1577113737; UM_distinctid=16f4cff8b279e4-0fe1d87bdc301d-6701b35-e1000-16f4cff8b28337; CSU_P2P_TOKEN=HUwnw8bsjc0ie; ASP.NET_SessionId=wvp2eoriv3cnthb1q50wubnz; iPlanetDirectoryPro=U3luU25vXzgzMDUxODA3MjJfMjAyMDAzMTEwOTUxMzIwNTg0"
            },
        })

    }

}





