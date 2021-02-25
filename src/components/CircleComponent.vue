<template>
  <v-card class="mx-auto my-12" max-width="374" v-if="getCircleStatus">
    <v-card-title>Make your Circle</v-card-title>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Choose the Algorithm</v-card-title>

    <v-card-actions>
      <v-btn color="success" class="ma-2" v-on:click="changeCircleStatus">
        Create Circle
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "CircleComponent",
  components: {},

  data: () => ({
    color: "Pink",
    show: false,
  }),

  mounted() {},
  computed: {
    getCircleStatus: function () {
      return this.$store.getters.getCircle;
    },
  },
  methods: {
    changeCircleStatus() {
      this.$store.commit("changeCircleStatus", true);
    },
  },
};
</script>
<style scoped>
</style>







