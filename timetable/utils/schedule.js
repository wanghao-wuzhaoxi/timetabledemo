const startDate=new Date(2020, 1, 23);
const curDate=new Date();
const day=curDate.getDay()
const emptyCell = new Array(42).fill(' ')
const scheduleArr = [
    { start: 8, end: 9 + 40 / 60 },
    { start: 10, end: 11 + 40 / 60 },
    { start: 14, end: 15 + 40 / 60 },
    { start: 16, end: 17 + 40 / 60 },
    { start: 19, end: 20 + 40 / 60 },
    { start: 21, end: 22 + 40 / 60 },
]

export const Schedule={
    startDate,
    curDate,
    emptyCell,
    day,
    curTeachingWeek:Math.ceil(((Date.now() - Number(startDate)) / 1000 / 60 / 60 / 24 / 7)),
    mapTime:function(jc){
        const Time = new Date();
        const time = Time.getHours() + Time.getMinutes() / 60
        if (time > scheduleArr[jc].start & time < scheduleArr[jc].end) return 'courseGoingthrough'
        if (time > scheduleArr[jc].end) return 'courseGone'
        if (time < scheduleArr[jc].start) return 'courseTocome'
    }
}