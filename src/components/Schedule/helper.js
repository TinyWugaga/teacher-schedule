/**
 * 依日期生成當週日期列表
 * 
 * @param  {Date} currentDate
 * @return {Array}
 */
export function getWeeksByDate(currentDate) {

    let days = ['日', '一', '二', '三', '四', '五', '六',];

    let weeks = days
        .map((day, dayIndex) => {

            //今日日期 - (計算週期-今日週期)
            let date = currentDate.getDate() + (dayIndex - currentDate.getDay());
            date = currentDate.setDate(date);

            return new Date(date)
        });
    return weeks
}

/**
 * 轉換行事曆資料格式
 * 
 * @param  {Object} schedule
 * @return {Array}
 */
export function formattedSchedule(schedule) {
    let newSchedule = [];

    Object.keys(schedule).map(state => {
        let stateSchedule = schedule[state];

        Object.values(stateSchedule).map(event => {
            newSchedule.push({
                start: new Date(event.start),
                end: new Date(event.end),
                state: state
            });
        });
    });

    return newSchedule
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
        let durationInMinutes = -Math.floor(duration / 1000 / 60);

        Array(durationInMinutes / 30)
            .fill(null)
            .map((n, count) => {
                let plusTime = 30 * 60 * 1000 * count;
                let startTimeStamp = startTime.getTime();
                let timeStamp = startTimeStamp + plusTime;

                timeList.push({ time: new Date(timeStamp), state: event.state });
            });
    });

    return sortTimeList(timeList);
}

/**
 * 依照時間排序行事曆時程列表
 * 
 * @param  {Object} timeList
 * @return {Array}
 */
function sortTimeList(timeList) {
    return timeList.sort((a, b) => {
        return a.time > b.time ? 1 : -1;
    });
}