/**
 * 轉換 Date 物件成日期字串
 *
 * @param  {Date} date
 * @return {String}
 */
export function formatDateToString(dateObject) {

    let year  = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    let date  = dateObject.getDate();

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