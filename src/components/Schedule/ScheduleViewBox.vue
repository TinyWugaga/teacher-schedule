<template>
  <div class="schedule-view-box box-column">
    <div class="box-column-container" :active="isActive">
      <div class="box-column__title text-center">
        <div>{{ formattedWeekDay }}</div>
        <div>{{ formattedDate }}</div>
      </div>
      <div class="box-column__content text-center">
        <template v-if="isActive">
          <time-list v-for="(time, key) in schedule" :key="key" :time="time" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import TimeList from '../TimeList';
import { getDateWithoutTime } from './helper.js'

export default {
  name: "ScheduleViewBox",
  components: { TimeList },
  props: {
    date: { default: null },
    schedule: { default: null }
  },
  computed: {
    formattedWeekDay() {
      let weekDay = [
        'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'
      ][this.date.getDay()];

      return this.$i18n.t(`weeks.${weekDay}`);
    },
    formattedDate() {
      let date = this.date.getDate();
      return (date < 0 ? "0" : "") + date;
    },
    isActive() {
      let today = new Date();
      return this.date >= getDateWithoutTime(today)
    }
  },
};
</script>