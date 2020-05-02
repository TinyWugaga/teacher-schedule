<template>
  <div class="section--schedule">
    <h3 class="section-title">授課時間</h3>
    <div class="section-body">
      <div class="schedule">
        <schedule-control :weeks="weeks" />
        <div class="schedule-view">
          <schedule-view-box
            v-for="(date, index) in weeks"
            :key="index"
            :date="date"
            :schedule="getDateSchedule(date)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScheduleControl from "./ScheduleControl";
import ScheduleViewBox from "./ScheduleViewBox";
import { getWeeks, formattedSchedule, getTimeList } from "./helper.js";
import { fetch } from "../../utils/schedule.js";

export default {
  name: "Schedule",
  components: {
    ScheduleControl,
    ScheduleViewBox
  },
  data() {
    let today = new Date();

    return {
      today,
      weeks: getWeeks(),
      schedule: fetch()
    };
  },
  methods: {
    getDateSchedule(date) {
      let schedule = formattedSchedule(this.schedule);
      let timeList = getTimeList(schedule);

      console.log("event: ", timeList);

      let dateSchedule = [];
      Object.values(timeList).map(event => {
        let time = event.time;
        if(this.isSameDay(time, date)) {
          dateSchedule.push(event);
        }
      });

      return dateSchedule;
    },
    isSameDay(timeA, timeB) {
      return timeA.toDateString() === timeB.toDateString();
    }
  }
};
</script>

<style lang="less">
body {
  max-width: 1440px;
  margin: auto;
}
.section-title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
}
.section-body {
  min-height: 400px;
  position: relative;
}
.schedule-view {
  padding: 15px 0;
  display: flex;
}
</style>