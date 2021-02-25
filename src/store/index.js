import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    color: "Green",
    ellipseStatus: false,
    circleStatus: false,
    lineDDAStatus: false,
    lineBresenhamStatus: false,
    lineStatus: false,
    deletePixel: false,
    pallete: false,
    rotate: false,
  },
  mutations: {
    changeEllipseStatus(state, step) {
      state.ellipseStatus = step;
      state.circleStatus = false;
      state.lineDDAStatus = false;
      state.lineBresenhamStatus = false;
      state.lineStatus = false;
      state.pallete = false;
    },
    changeRotateStatus(state, step) {
      state.ellipseStatus = false;
      state.circleStatus = false;
      state.lineDDAStatus = false;
      state.lineBresenhamStatus = false;
      state.lineStatus = false;
      state.pallete = false;
      state.rotate = step;
    },
    changeDeleteStatus(state, step) {
      state.ellipseStatus = false;
      state.circleStatus = false;
      state.lineDDAStatus = false;
      state.lineBresenhamStatus = false;
      state.lineStatus = false;
      state.deletePixel = step;
      state.pallete = false;
    },
    changeCircleStatus(state, step) {
      state.circleStatus = step;
      state.lineDDAStatus = false;
      state.ellipseStatus = false;
      state.lineBresenhamStatus = false;
      state.lineStatus = false;
      state.pallete = false;
    },
    changeLineDDAStatus(state, step) {
      state.lineDDAStatus = step;
      state.circleStatus = false;
      state.lineBresenhamStatus = false;
      state.ellipseStatus = false;
      state.pallete = false;
    },
    changeBresenhamStatus(state, step) {
      state.lineDDAStatus = false;
      state.circleStatus = false;
      state.lineBresenhamStatus = step;
      state.ellipseStatus = false;
      state.pallete = false;
    },
    changeLineStatus(state, step) {
      state.lineDDAStatus = false;
      state.circleStatus = false;
      state.lineBresenhamStatus = false;
      state.ellipseStatus = false;
      state.lineStatus = step;
      state.pallete = false;
    },
    changePaletteStatus(state, step) {
      state.lineDDAStatus = false;
      state.circleStatus = false;
      state.lineBresenhamStatus = false;
      state.ellipseStatus = false;
      state.lineStatus = false;
      state.pallete = step;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getEllipse(state) {
      return state.ellipseStatus;
    },
    getCircle(state) {
      return state.circleStatus;
    },
    getDDALine(state) {
      return state.lineDDAStatus;
    },
    getBresenham(state) {
      return state.lineBresenhamStatus;
    },
    getLine(state) {
      return state.lineStatus;
    },
    getDelete(state) {
      return state.deletePixel;
    },
    getPalette(state) {
      return state.pallete;
    },
    getRotate(state) {
      return state.rotate;
    },
  },
});
