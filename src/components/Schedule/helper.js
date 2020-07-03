/**
 * 取得不包含時間的 Date 物件
 *
 * @param  {Date} date
 * @return {Date}
 */
export function getDateWithoutTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * 取得該週第一天日期
 *
 * @param  {Date} date
 * @return {Date}
 */
export function getFirstDayOfWeek(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
}

/**
 * 取得該週最後一天日期
 *
 * @param  {Date} date
 * @return {Date}
 */
export function getLastDayOfWeek(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
}

/**
 * 取得下週第一天日期
 *
 * @param  {Date} date
 * @return {Date}
 */
export function getFirstDayOfNextWeek(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7);
}

/**
 * 取得上週第一天日期
 *
 * @param  {Date} date
 * @return {Date}
 */
export function getFirstDayOfPreviousWeek(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() - 7);
}

/**
 * 驗證兩個 Date 物件是否為同一日期
 * 
 * @param  {Date} timeA
 * @param  {Date} timeB
 * @return {Boolean}
 */
export function isSameDay(timeA, timeB) {
    return timeA.toDateString() === timeB.toDateString();
}

/**
 * 依日期生成當週日期列表
 * 
 * @param  {Date} currentDate
 * @return {Array}
 */
export function getWeeksByDate(currentDate) {

    console.log('cd: ', currentDate);
    let firstDayOfWeek = getFirstDayOfWeek(currentDate);
    console.log('firstDayOfWeek: ',firstDayOfWeek );
    let weeks = Array(7)
        .fill(null)
        .map((n, dayIndex) => {

            let dateOfDay = getDateWithoutTime(currentDate);
            //週期日期 = 當日日期 + （計算週期 - 當日週期）
            dateOfDay.setDate(currentDate.getDate() + (dayIndex - currentDate.getDay()));

            return dateOfDay
            
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