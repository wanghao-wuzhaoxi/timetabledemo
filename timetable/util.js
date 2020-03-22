import AsyncStorage from '@react-native-community/async-storage';

const testWeeks = /周次：\d+[,-]\d+/g;
const testTeacher = /上课教师[\S]+/g;
const testLocation = /上课地点[\S]+/g;

export default class Util {
    static parseCourse(data) {
        return new Promise((resolve, reject) => {
            data.forEach(course => {
                const zhouci = course.title.match(testWeeks);

                course.name = course.kcmc.split(',')[0]
                course.teacher = course.title.match(testTeacher)[0].substring(5);
                course.zhouci = zhouci[0].substring(3);
                course.classRoom = course.title.match(testLocation)[0].substring(5);


                if (zhouci.length != 1) {
                    zhouci.forEach((e, index) => {
                        const courseNames = course.kcmc.split(',')
                        const classrooms = course.title.match(testLocation)
                        const courseTeachers = course.title.match(testTeacher)
                        if (index !== 0) {
                            data.push({
                                jc: course.jc,
                                xq: course.xq,
                                name: courseNames[index],
                                teacher: courseTeachers[index].substring(5),
                                zhouci: e.substring(3),
                                classRoom: classrooms[index].substring(5)
                            })
                            course.zhouci = zhouci[0].substring(3)
                        }
                    })
                }
                delete course.title
                delete course.kcmc

            })
            resolve(data)
        })
    }

    static parseWeek(data) {
        return new Promise((resolve, reject) => {
            let reg = /\d+[,-]\d+/g;
            data.forEach(course => {
                const zhouci = course.zhouci.match(reg)

                let weeks = []
                if (zhouci[0].indexOf(',') != -1) {
                    zhouci[0].split(',').forEach(el => weeks.push(Number(el)))

                }
                else if (zhouci[0].indexOf('-') != -1) {
                    for (var yaya = Number(zhouci[0].split('-')[0]); yaya <= Number(zhouci[0].split('-')[1]); yaya++) {
                        weeks.push(Number(yaya))
                    }
                }
                course.weeks = weeks

            })
            resolve(data)
        })

    }

}


    Util.prototype.save = function (name, data) {
    AsyncStorage.setItem(name, data, (a) => console.log(a))
    .then(d => {
    console.log(d);
    console.log(`save ${name
} success`);
        })
        .catch(e => { console.log(e) })
}