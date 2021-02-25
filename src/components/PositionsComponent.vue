<template>
  <v-card v-if="getEllipseStatus || getCircleStatus || getLine">
    <h3 class="teal py-5 white--text text-center">
      From:
      <br />
      <strong>X: &nbsp;</strong>
      {{ Math.round(x1) }} , <strong>Y: </strong>
      {{ Math.round(y1) }}
    </h3>
    <h3 class="teal py-2 white--text text-center">
      To: <br /><strong>X: </strong> {{ Math.round(x2) }} ,
      <strong>Y: </strong>
      {{ Math.round(y2) }}
    </h3>
  </v-card>
</template>
<script>
export default {
  name: "PositionsComponent",
  components: {},

  data: () => ({
    color: "Pink",
  }),
  props: {
    x1: {
      type: Number,
    },
    x2: {
      type: Number,
    },
    y1: {
      type: Number,
    },
    y2: {
      type: Number,
    },
  },
  mounted() {},
  computed: {
    getEllipseStatus: function () {
      return this.$store.getters.getEllipse;
    },
    getCircleStatus: function () {
      return this.$store.getters.getCircle;
    },
    getLine: function () {
      return this.$store.getters.getLine;
    },
  },
  methods: {},
};
</script>
<style scoped>
</style>







