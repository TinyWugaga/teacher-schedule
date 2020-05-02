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
            :schedule="getThisDateSchedule(date)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScheduleControl from "./ScheduleControl";
import ScheduleViewBox from "./ScheduleViewBox";
import { getWeeks } from "./helper.js";
import { fetch } from "../../utils/schedule.js";

export default {
  name: "Schedule",
  components: {
    ScheduleControl,
    ScheduleViewBox
  },
  computed: {
    formattedSchedule() {
      let schedule = this.schedule;
      let scheduleList = [];

      for (var state in schedule) {
        let stateSchedule = schedule[state];

        Object.values(stateSchedule).map( event => {
          scheduleList.push({
            start: new Date(event.start),
            end: new Date(event.end),
            state: state
          });
        });
      }

      return scheduleList;
    },
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
    getThisDateSchedule(date) {
      let schedule = this.formattedSchedule;
      let dateSchedule = this.getDateSchedule(date, schedule);

      return dateSchedule;
    },
    getDateSchedule(date, schedule) {
      let events = [];

      Object.values(schedule).map( event => {
        let startTime = new Date(event.start);

        if (this.isSameDay(startTime, date)) {
          events.push(event);
        }
      });

      events = this.sortEventsByTime(events);

      return events;
    },
    isSameDay(timeA, timeB) {
      return timeA.toDateString() === timeB.toDateString();
    },
    sortEventsByTime(events) {
      return events.sort((a, b) => {
        return a.start > b.start ? 1 : -1;
      });
    },
  }
};
</script>

<style lang="less">
body {
  max-width: 1440px;
  margin: auto;
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