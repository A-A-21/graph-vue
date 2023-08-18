<template>
  <div v-if="data" class="contribution-graph">
    <div class="contribution-graph__months">
      <div v-for="month in getMonths()" :key="getUniqKey(month)">
        {{ month }}
      </div>
    </div>
    <div class="contribution-graph__content">
      <div class="contribution-graph__weekdays">
        <div>Пн</div>
        <div>Ср</div>
        <div>Пт</div>
      </div>
      <div class="contribution-graph__weeks" v-for="week in getAllDays()" :key="getUniqKey(week)">
        <div class="contribution-graph__days" v-for="day in week" :key="getUniqKey(day)">
          <div v-if="selectedDate === day" class="tooltip">
            <div class="tooltip__contributions">{{ data[day] || 0 }} contributions</div>
            <div class="tooltip__date">{{ getValidDate(day) }}</div>
          </div>
          <DaysGraph :isSelect="selectedDate === day" @selectDate="selectDate"
                     :contributions="data[day] || 0"
                     :date="day"></DaysGraph>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { onMounted, ref } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { getAllDays, getMonths } from '@/helpers/withMoment';
import DaysGraph from './DaysGraph.vue';

const data = ref(null);
const selectedDate = ref(null);

function getValidDate(date) {
  return moment(date)
    .format('dddd, MMMM D, YYYY');
}

function selectDate(date) {
  if (selectedDate.value === date) {
    selectedDate.value = null;
  } else {
    selectedDate.value = date;
  }
}

function getUniqKey(params) {
  return _.uniqueId(`${params}`);
}

async function getData() {
  const response = await fetch('https://dpg.gg/test/calendar.json');
  const responseData = await response.json();
  data.value = responseData;
  return responseData;
}

onMounted(async () => {
  await getData();
});
</script>

<style lang="scss" scoped>

.tooltip {
  padding-top: 3px;
  position: absolute;
  background-color: black;
  z-index: 1;
  top: -55px;
  right: -66px;
  width: 145px;
  height: 42px;
  border-radius: 3px;

  &::before {
    content: '';
    background: black;
    position: absolute;
    width: 30px;
    height: 30px;
    top: 15px;
    transform: translateX(-50%) rotate(45deg);
    z-index: -1;
  }

  &__contributions {
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 0em;
    text-align: center;
    color: #FFFFFF;
  }

  &__date {
    font-family: Inter;
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: 0em;
    text-align: center;
    color: #7C7C7C;;
  }
}

.contribution-graph {
  width: 900px;

  &__months {
    display: flex;
    justify-content: space-around;
  }

  &__content {
    display: flex;
    gap: 2px;
  }

  &__weekdays {
    display: flex;
    flex-direction: column;
    gap: 19px;
  }
}

.contribution-graph__weeks {
  display: flex;
  gap: 2px;
  flex-direction: column;
}

.contribution-graph__days {
  position: relative;
  display: flex;
  gap: 2px;
}
</style>
