<template>
  <div class="section--schedule">
    <h3 class="section-title">授課時間</h3>
    <div class="section-body">
      <div class="schedule">
        <schedule-control :weeks="weeks" :getNextWeek="getNextWeeks"/>
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
import { getWeeksByDate, formattedSchedule, getTimeList } from "./helper.js";
import * as api from "../../utils/schedule";

export default {
  name: "Schedule",
  components: {
    ScheduleControl,
    ScheduleViewBox
  },
  props: {
    date: { type: Date, default: () => new Date(2020,4,3) },
  },
  data() {
    let currentDate = this.date;
    let weeks = getWeeksByDate(currentDate);

    return {
      currentDate,
      weeks,
      schedule:[]
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch(startAt = null) {
      if (startAt) {
        this.currentDate = startAt;
      } else {
        startAt = this.currentDate;
      }

      api.fetch({started_at: startAt})
        .then((res) => {
          console.log('res: ',res);
          this.schedule = res;
        })
    },
    getDateSchedule(date) {
      let schedule = formattedSchedule(this.schedule);
      let timeList = getTimeList(schedule);

      let dateSchedule = [];
      Object.values(timeList).map(event => {
        let time = event.time;
        if (this.isSameDay(time, date)) {
          dateSchedule.push(event);
        }
      });

      return dateSchedule;
    },
    isSameDay(timeA, timeB) {
      return timeA.toDateString() === timeB.toDateString();
    },
    getNextWeeks() {
      let currentDate = this.currentDate;
      currentDate.setDate(currentDate.getDate() + 7);
      this.currentDate = currentDate;
      this.weeks = getWeeksByDate(currentDate);
    },
    getPrevWeeks() {
      //let today = new Date();

      let currentDate = this.currentDate;
      currentDate.setDate(currentDate.getDate() - 7);

      this.weeks = getWeeksByDate(currentDate);
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