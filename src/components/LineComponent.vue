<template>
  <v-card class="mx-auto my-12" max-width="374" v-if="getLine">
    <v-card-title>Make your line</v-card-title>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Choose the Algorithm</v-card-title>

    <v-card-actions>
      <v-btn color="success" class="ma-2" v-on:click="changeLineDDAStatus">
        DDA
      </v-btn>
      <v-btn color="success" class="ma-2" @click="changeBresenhamStatus">
        Bresenham
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "LineComponent",
  components: {},

  data: () => ({
    color: "Pink",
    show: false,
  }),

  mounted() {},
  computed: {
    getDDALine: function () {
      return this.$store.getters.getDDALine;
    },
    getBresenham: function () {
      return this.$store.getters.getBresenham;
    },
    getLine: function () {
      return this.$store.getters.getLine;
    },
  },
  methods: {
    changeLineDDAStatus() {
      this.$store.commit("changeLineDDAStatus", true);
    },
    changeBresenhamStatus() {
      this.$store.commit("changeBresenhamStatus", true);
    },
  },
};
</script>
<style scoped>
</style>







