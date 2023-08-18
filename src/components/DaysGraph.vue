<template>
  <button @click="$emit('selectDate', date)">
    <div class="days-graph" :class="applyClass()"></div>
  </button>
</template>

<script setup lang="js">

const props = defineProps({
  contributions: Number,
  date: String,
  isSelect: Boolean,
});

function applyClass() {
  const { contributions } = props;

  let resultClass = '';
  if (props.isSelect) {
    resultClass += 'selected';
  } else {
    resultClass += 'not-selected';
  }

  if (contributions === 0) {
    resultClass += ' empty';
  } else if (contributions < 10) {
    resultClass += ' color-1';
  } else if (contributions < 20) {
    resultClass += ' color-2';
  } else if (contributions < 30) {
    resultClass += ' color-3';
  } else {
    resultClass += ' color-4';
  }

  return resultClass;
}

</script>

<style lang="scss" scoped>
$color-empty: #EDEDED;
$color-1: #ACD5F2;
$color-2: #7FA8C9;
$color-3: #527BA0;
$color-4: #254E77;

.selected {
  width: 13px;
  height: 13px;
  border: 1px solid #000000;
}

.not-selected {
  width: 15px;
  height: 15px;
}

.days-graph {
  cursor: pointer;

  &.empty {
    background-color: $color-empty;
  }

  &.color-1 {
    background-color: $color-1;
  }

  &.color-2 {
    background-color: $color-2;
  }

  &.color-3 {
    background-color: $color-3;
  }

  &.color-4 {
    background-color: $color-4;
  }

  &:hover {
    border: 1px solid gray;
    width: 13px;
    height: 13px;
  }
}
</style>
