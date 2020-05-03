<template>
  <div class="schedule-control">
    <div class="schedule-control-buttons">
      <el-button-group>
        <el-button
          plain
          size="mini"
          icon="el-icon-arrow-left"
          :disabled="isCurrentWeek"
          @click="$emit('getPreviousWeeks')"
        ></el-button>
        <el-button
          plain
          size="mini"
          icon="el-icon-arrow-right"
          @click="$emit('getNextWeeks')"
        ></el-button>
      </el-button-group>
    </div>
    <div class="schedule-control-label">
      {{ formattedDateTitle }}
    </div>
    <div class="schedule-control-time-zone">
      <span>{{
        $t("schedule.timezone-description", [timeZoneToSring, timezoneAbbreviation])
      }}</span>
    </div>
  </div>
</template>

<script>
import * as helper from "./helper.js";

export default {
  name: "ScheduleControl",
  components: {},
  props: {
    weeks: { default: null }
  },
  computed: {
    formattedDateTitle() {
      let weekFirstDay = this.weeks[0];
      let weekLastDay = this.weeks[6];

      return (
        weekFirstDay.toLocaleDateString() +
        " ~ " +
        weekLastDay.toLocaleDateString()
      );
    },
    isCurrentWeek() {
      let firstDayOfThisWeek = this.weeks[0];
      let firstDayOfCurrentWeek = helper.getFirstDayOfWeek(new Date());

      return helper.isSameDay(firstDayOfCurrentWeek, firstDayOfThisWeek);
    },
    timeZoneToSring() {
      let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timeZone = timeZone.split("/");
      return timeZone[timeZone.length - 1]
    },
    timezoneAbbreviation() {
      return new Date().toString().match(/([A-Z]+[\\+-][0-9]+)/)[1];
    },
  }
};
</script>
