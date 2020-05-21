import axios from 'axios'

export default class MonitorService {
    static getTempAndHum(account,password) {
        axios.defaults.withCredentials = true;
        return axios({
            url: 'https://open.iot.10086.cn/app/dsdatam',
            method: 'POST',
            headers: {
                "Accept": "application/json, text/plain",
                "X-Requested-With": "XMLHttpRequest",
                "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36",
                "Origin": "https://open.iot.10086.cn",
                "Accept-Encoding": "gzip, deflate",
                "Connection": "keep-alive",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "Host":"open.iot.10086.cn",
                "Refer":"https://open.iot.10086.cn/app_editor/",
                "Content-Type":"application/x-www-form-urlencoded",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Dest": "empty",
            },
            data: "is_model=0&open_id=94129ff833cd1a5ea21efe20c75d359b&pid=344538&ds_list%5B0%5D=597145113%2Ctemp&ds_list%5B1%5D=597145113%2Chum&limit=10&wap=false"
        })
    }
}



