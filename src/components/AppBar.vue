<template>
  <v-card color="grey lighten-4">
    <v-toolbar dense flat>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Paint</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <v-btn icon v-on:click="showEllipse">
        <v-icon>mdi-ellipse-outline</v-icon>
      </v-btn>
      <v-btn icon v-on:click="showCircle">
        <v-icon>mdi-checkbox-blank-circle-outline</v-icon>
      </v-btn>
      <v-btn icon v-on:click="showLine">
        <v-icon>mdi-ray-start-end</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>
<script>
export default {
  name: "AppBar",

  data: () => ({
    color: "Pink",
  }),
  mounted() {},
  computed: {},
  methods: {
    showLine() {
      this.$store.commit("changeLineStatus", true);
    },
    showCircle() {
      this.$store.commit("changeCircleStatus", true);
    },

    showEllipse() {
      this.$store.commit("changeEllipseStatus", true);
    },
  },
};
</script>
<style scoped>
</style>







