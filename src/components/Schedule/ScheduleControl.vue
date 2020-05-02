<template>
  <div class="schedule-control">
    <div class="schedule-control-buttons">
      <el-button-group>
        <el-button
          plain
          size="mini"
          icon="el-icon-arrow-left"
        ></el-button>
        <el-button
          plain
          size="mini"
          icon="el-icon-arrow-right"
          @click="getNextWeek"
        ></el-button>
      </el-button-group>
    </div>
    <div class="schedule-control-label">
      {{ formattedDateTitle }}
    </div>
    <div class="schedule-control-time-zone">
      <span>*時間以 time-zone（國家）來顯示</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScheduleControl",
  components: {},
  props: {
    weeks: { default: null },
    timeZone: { default: null },
    getNextWeek: { default: null }
  },
  computed: {
    formattedDateTitle() {
      let weekFirstDay = this.weeks[0];
      let weekLastDay = this.weeks[6];

      return weekFirstDay.toLocaleDateString() + ' ~ ' + weekLastDay.toLocaleDateString()
    },
  }
};
</script>

<style lang="less">
.schedule-control {
  overflow: hidden;

  .schedule-control-buttons {
    width: 90px;
    display: inline-block;
  }
  .schedule-control-label {
    padding-left: 15px;
    display: inline-block;
    width: 220px;
  }
  .schedule-control-time-zone {
    float: right;
    text-align: right;
    font-size: 12px;
    line-height: 25px;
  }
}
</style>