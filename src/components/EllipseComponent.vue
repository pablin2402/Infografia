<template>
  <v-card class="mx-auto my-12" max-width="374" v-if="getEllipseStatus">
    <v-card-title>Make your Ellipse</v-card-title>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn color="success" class="ma-2" v-on:click="changeEllipseStatus">
        Create ELLIPSE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "EllipseComponent",
  components: {},

  data: () => ({
    color: "Pink",
  }),

  mounted() {},
  computed: {
    getEllipseStatus: function () {
      return this.$store.getters.getEllipse;
    },
  },
  methods: {
    changeEllipseStatus() {
      this.$store.commit("changeEllipseStatus", true);
    },
  },
};
</script>
<style scoped>
</style>







