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
}

export default class JWService {

    static login(encodedParams) {
        axios.defaults.withCredentials = true;
        return axios({
            url: 'http://csujwc.its.csu.edu.cn/jsxsd/xk/LoginToXk',
            method: 'POST',
            headers: {
                ...defaultHeader,
            },
            data: 'encoded=' + encodedParams
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
}





