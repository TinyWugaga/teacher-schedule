//TODO:delete
/**
 * 轉換 Date 物件成日期字串
 *
 * @param  {Date} date
 * @return {String}
 */
export function formatDateToString(dateObject) {

    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    let date = dateObject.getDate();

    return `${year}/${month}/${date}`
}

//TODO:delete
/**
 * 比較兩個 Date 物件是否為同一天
 *
 * @param  {Date} timeA
 * @param  {Date} timeB
 * @return {Boolean} 
 */
export function isSameDay(timeA, timeB) {

    return timeA.toDateString() === timeB.toDateString();

}

/**
 * 生成當週日期列表
 *
 * @return {Array}
 */
export function getWeeks() {

    let days = ['日', '一', '二', '三', '四', '五', '六',];

    let weeks = days
        .map((day, dayIndex) => {

            let today = new Date();

            //今日日期 - (計算週期-今日週期)
            let date = today.getDate() + (dayIndex - today.getDay());
            date = today.setDate(date);

            return new Date(date)
        });
    return weeks
}

/**
 * 
 * 
 * @param  {Object} schedule
 * @return {Array}
 */
export function getScheduleList(schedule) {
    return getTimeList((formattedSchedule(schedule)));
}

/**
 * 轉換行事曆資料格式
 * 
 * @param  {Object} schedule
 * @return {Array}
 */
export function formattedSchedule(schedule) {
    return Object.keys(schedule).map(state => {
        let stateSchedule = schedule[state];

        Object.values(stateSchedule).map(event => {
            return {
                start: new Date(event.start),
                end: new Date(event.end),
                state: state
            }
        });
    });
}

/**
 * 獲取行事曆時程列表
 * 
 * @param  {Object} schedule
 * @return {Array}
 */
export function getTimeList(schedule) {
    let timeList = [];

    Object.values(schedule).map(event => {
        let startTime = event.start;
        let endTime = event.end;

        let duration = startTime.getTime() - endTime.getTime();
        let durationInMintues = -Math.floor(duration / 1000 / 60);

        Array(durationInMintues / 30)
            .fill(null)
            .map((count) => {
                let plusTime = 30 * 60 * 1000 * count;
                let startTimeStamp = startTime.getTime();
                let timeStamp = startTimeStamp + plusTime;

                timeList.push({ time: new Date(timeStamp), state: event.state });
            });
    });

    return timeList;
}