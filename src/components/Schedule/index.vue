<template>
  <div class="section section--schedule">
    <h3 class="section-title">
      <span>授課時間</span>
    </h3>
    <div class="section-body">
      <div class="schedule">
        <schedule-control
          :weeks="weeks"
          @getNextWeeks="getNextWeeks"
          @getPreviousWeeks="getPreviousWeeks"
        />
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
import * as helper from "./helper.js";
import * as api from "../../api/schedule";

export default {
  name: "Schedule",
  components: {
    ScheduleControl,
    ScheduleViewBox
  },
  props: {
    date: { type: Date, default: () => new Date() }
  },
  data() {
    let currentDate = this.date;
    let weeks = helper.getWeeksByDate(currentDate);

    return {
      currentDate,
      weeks,
      schedule: []
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

      this.schedule = [];

      api.fetch({ started_at: startAt }).then(res => {
        this.schedule = res;
      });

      this.weeks = helper.getWeeksByDate(startAt);
    },
    getDateSchedule(date) {
      let schedule = helper.formattedSchedule(this.schedule);
      let timeList = helper.getTimeList(schedule);

      let dateSchedule = [];
      Object.values(timeList).map(event => {
        let time = event.time;

        if (helper.isSameDay(time, date)) {
          dateSchedule.push(event);
        }
      });

      return dateSchedule;
    },
    getNextWeeks() {
      let next = helper.getFirstDayOfNextWeek(this.currentDate);

      this.fetch(next);

      return next;
    },
    getPreviousWeeks() {
      let previous = helper.getFirstDayOfPreviousWeek(this.currentDate);
      if (previous < helper.getFirstDayOfWeek(new Date())) return;

      this.fetch(previous);
    }
  }
};
</script>

<style lang="less">
@import "style.less";
</style>