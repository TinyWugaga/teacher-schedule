<template>
  <div class="schedule-view-box box-cloumn">
    <div class="box-cloumn-container" :active="isActive">
      <div class="box-cloumn__title text-center">
        <div>{{ formattedWeekDay }}</div>
        <div>{{ formattedDate }}</div>
      </div>
      <div class="box-cloumn__content text-center">
        <time-list v-for="(time, key) in schedule" :key="key" :time="time" />
      </div>
    </div>
  </div>
</template>

<script>
import TimeList from '../../units/TimeList';

export default {
  name: "ScheduleViewBox",
  components: { TimeList },
  props: {
    date: { default: null },
    schedule: { default: null }
  },
  computed: {
    formattedWeekDay() {
      return "日一二三四五六".split("")[this.date.getDay()];
    },
    formattedDate() {
      let date = this.date.getDate();
      return (date < 0 ? "0" : "") + date;
    },
    isActive() {
      let today = new Date();
      return (
        this.date >
        new Date(today.getFullYear(), today.getMonth(), today.getDate())
      );
    }
  },
};
</script>

<style lang="less">
.box-cloumn {
  flex: 1;
  padding: 0 5px;
}
.box-cloumn-container {
  border-top: 4px solid #d2d2d2;
  .box-cloumn__title {
    color: #d2d2d2;
  }
}
.box-cloumn-container[active] {
  border-top: 4px solid #02cab9;
  .box-cloumn__title {
    color: #484848;
  }
}
.box-cloumn__title {
  padding: 10px 0;
}
.text-center {
  text-align: center;
}
</style>