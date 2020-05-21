import axios from 'axios'
import { Base64 } from '../encode';
const defaultHeaderOpt = {
    "Accept": "*/*",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36",
    "Origin": "http://ecard.csu.edu.cn:8070",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
}

export default class EcardService {
    static login(account,password) {
        axios.defaults.withCredentials = true;
        return axios({
            url: 'http://ecard.csu.edu.cn:8070/Account/Login',
            method: 'POST',
            headers: {
                ...defaultHeaderOpt,
                "Referer": "http://ecard.csu.edu.cn:8070/Account/Login?next=aHR0cDovL2VjYXJkLmNzdS5lZHUuY246ODA3MC9TeW5DYXJkL01hbmFnZS9UcmFuc2Zlcg==",
            },
            data: "SignType=SynSno&UserAccount="+account+"&Password="+ Base64.encode(password)+"&NextUrl=aHR0cDovL2VjYXJkLmNzdS5lZHUuY246ODA3MC9TeW5DYXJkL01hbmFnZS9UcmFuc2Zlcg%3D%3D&openid=&Schoolcode=csu"
        })
    }

    static getTransferPage() {
        axios.defaults.withCredentials = true;
        return axios({
            url: 'http://ecard.csu.edu.cn:8070/SynCard/Manage/Transfer',
            method: 'get',
            headers: {
                ...defaultHeaderOpt,
                "Referer": "http://ecard.csu.edu.cn:8070/Account/Login?next=aHR0cDovL2VjYXJkLmNzdS5lZHUuY246ODA3MC9TeW5DYXJkL01hbmFnZS9UcmFuc2Zlcg==",
            },
        })
    }

    static reset(){
       return { bankBalance:'', ecardNum:'', bankCard:'',ecardbalance:'' }
    }


    static getInfoPage() {
        axios.defaults.withCredentials = true;
        return axios({
            url: 'http://ecard.csu.edu.cn:8070/SynCard/Manage/BasicInfo ',
            method: 'GET',
            headers: {
                ...defaultHeaderOpt,
                "Referer": "http://ecard.csu.edu.cn:8070/",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        })
    }

    static deposit(amount, cardtype) {
        axios.defaults.withCredentials = true;
        return axios({
            url: 'http://ecard.csu.edu.cn:8070/SynCard/Manage/TransferPost',
            method: 'POST',
            headers: {
                ...defaultHeaderOpt,
                "Referer": "http://ecard.csu.edu.cn:8070/SynCard/Manage/Transfer",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            data: `FromCard=bcard&ToCard=${cardtype}&Amount=${amount}&CheckSign=E13B0F3E695B7853D3485865D12B32CD&Password=MTkwMzEw`
        })
    }

    static parseTransferPage(res) {
        const bankBalance = res.data.match(/(余额:\d+.\d+)|(余额:\d+)/)[0]
        const ecardNum = res.data.match(/<em>\d+/)[0].substring(4)
        const bankCard = res.data.match(/<span>\d+\*+\d+/)[0].substring(7)
        return { bankBalance, ecardNum, bankCard }
    }

    static parseInfoPage(res) {
        const ecardbalance = res.data.match(/red">\d+.\d+/)[0].substring(5)
        return { ecardbalance }
    }
}