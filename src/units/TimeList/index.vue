<template>
  <div class="time-list">
    <div :class="['time-list-item',time.state]" >
      {{ formattedTime }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeList",
  components: {},
  props: {
    time: { default: null }
  },
  computed: {
    formattedTime() {
      let time = this.time.time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

      return time.replace(/[^0-9:]+/, "");
    }
  }
};
</script>

<style lang="less">
.time-list-item {
    padding: 3px 0;
    border: 1px solid transparent;
    color: #b6b6b6;
}

.available {
    color: #02cab9;
    font-weight: 700;
}
</style>