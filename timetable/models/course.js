import AsyncStorage from '@react-native-community/async-storage';

const testWeeks = /周次：\d+[,-]\d+/g;
const testTeacher = /上课教师[\S]+/g;
const testLocation = /上课地点[\S]+/g;
const testName = /课程名称[\S]+/g;

export default class Course {
    constructor(data,index) {
        this.zhouci = data.title.match(testWeeks)[index].substring(3)
        this.weeks = Course.parseWeek(this.zhouci)
        this.teacher = data.title.match(testTeacher)[index].substring(5);
        this.classRoom = data.title.match(testLocation)[index].substring(5);
        this.name = data.title.match(testName)[index].substring(5);
        this.jc = data.jc
        this.xq = data.xq - 1
    }
    static createBatch(data) {
        console.log(data)
        const courses = []
        data.forEach(item => {
            for (let i = 0; i < item.title.match(testName).length; i++) courses.push(new Course(item,i))
        })
        console.log(courses)
        return courses
    }


    static parseWeek(zhouci) {
        let weeks = []
        if (zhouci.indexOf('-') != -1) {
            for (let i = Number(zhouci.split('-')[0]); i <= Number(zhouci.split('-')[1]); i++) {
                weeks.push(Number(i))
            }
        }
        if (zhouci.indexOf(',') != -1) zhouci.split(',').forEach(el => weeks.push(Number(el)))
        return weeks
    }

    static save(name, data) {
        AsyncStorage.setItem(name, data, (a) => console.log(a))
        .then(d => {
        console.log(d);
        console.log(`save ${name
    } success`);
            })
            .catch(e => { console.log(e) })
    }

}


