<template>
  <ContributionGraph></ContributionGraph>
</template>

<script>
import ContributionGraph from './components/ContributionGraph.vue';

export default {
  name: 'App',
  components: {
    ContributionGraph,
  },
};
</script>

<style lang="scss">
button {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
}

#app {
  font-family: Inter, serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: center;

  color: #959494;
  margin-top: 60px;
}
</style>
