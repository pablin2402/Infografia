<template>
  <v-app id="inspire">
    <app-bar> </app-bar>

    <v-card color="grey lighten-4">
      <v-toolbar dense flat>
        <v-spacer></v-spacer>

        <v-spacer></v-spacer>

        <v-menu offgetCircleStatus-y>
          <template v-slot:activator="{ on }">
            <v-icon
              large
              :color="background"
              dark
              v-on="on"
              v-on:click="changePalleteStatus"
            >
              mdi-palette</v-icon
            >
          </template>
          <v-color-picker
            value="#7417BE"
            v-model="background"
            hide-canvas
            hide-inputs
            show-swatches
            class="mx-auto"
          ></v-color-picker>
        </v-menu>
        <v-icon large color="red && blue" @click="deletePixel"
          >mdi-eraser</v-icon
        >
        <v-menu offgetCircleStatus-y>
          <template v-slot:activator="{ on }">
            <v-icon large :color="color" dark v-on="on">mdi-brush</v-icon>
          </template>
          <v-color-picker
            value="#7417BE"
            v-model="color"
            hide-canvas
            hide-inputs
            show-swatches
            class="mx-auto"
          ></v-color-picker>
        </v-menu>
        <v-btn class="ma-2" outlined color="indigo" @click="clearCanvas">
          Clear Canvas
        </v-btn>
        <v-btn
          class="ma-2"
          outlined
          color="indigo"
          @click="changeTranslationStatus"
        >
          Traslation
        </v-btn>
        <v-btn class="ma-2" outlined color="indigo" @click="changeRotateStatus">
          Rotate
        </v-btn>
      </v-toolbar>
    </v-card>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="10">
            <canvas
              id="c"
              @mousedown="startSelect"
              @mousemove="finalSelect"
              @mouseup="makeLine"
            >
              Tu navegador no soporta canvas
            </canvas>
          </v-col>
          <v-col cols="12" sm="2">
            <v-sheet height="750" width="300" rounded="lg">
              <v-form ref="form">
                <v-col cols="12">
                  <ellipse-component></ellipse-component>
                  <circle-component></circle-component>
                  <line-component></line-component>
                  <positions-component
                    :x1="startPosition.x"
                    :x2="finalPosition.x"
                    :y1="startPosition.y"
                    :y2="finalPosition.y"
                  ></positions-component>
                </v-col>
              </v-form>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <v-spacer></v-spacer>
          <v-btn
            type="button"
            class="mx-2"
            fab
            dark
            small
            color="primary"
            v-on:click="substractWidth"
          >
            <v-icon dark> mdi-minus </v-icon>
          </v-btn>
          <v-btn
            type="button"
            class="mx-2"
            fab
            dark
            small
            color="primary"
            v-on:click="addWidth"
          >
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
//import { columns, rows } from "../utils/Grid";
import AppBar from "./AppBar.vue";
import {
  ddaAlgorithm,
  positionsTest,
  bresenham,
  // pixelCoordinatesForZoom,
} from "@/utils/Line";
import { boundaryFill4, drawPixelCall } from "@/utils/Fill";
import { FullPixel } from "@/utils/FullPixel";
import EllipseComponent from "./EllipseComponent.vue";
import CircleComponent from "./CircleComponent.vue";
import LineComponent from "./LineComponent.vue";
import PositionsComponent from "./PositionsComponent.vue";
//import { puntomedioe, point, traslate } from "@/utils/Rotation";
import { circleMidPoint } from "@/utils/Circle";
import { ellipseMidpoint } from "@/utils/Ellipse";
import { Pixel } from "../utils/Pixel";

const NUMBERFORZOOM = 10;
export default {
  components: {
    AppBar,
    EllipseComponent,
    CircleComponent,
    LineComponent,
    PositionsComponent,
  },
  name: "Principal",

  data: () => ({
    square: NUMBERFORZOOM,
    width: NUMBERFORZOOM,
    height: NUMBERFORZOOM,
    finalPosition: {
      x: null,
      y: null,
    },
    positions: [],
    startPosition: {
      x: null,
      y: null,
    },
    lineWidth: 0.4,
    selectionMode: false,
    color: "pink",
    background: "blue",
    vueCanvas: null,
    canvas: null,
  }),
  mounted() {
    this.canvas = document.getElementById("c");
    this.vueCanvas = this.canvas.getContext("2d");
    this.drawGrid();
  },
  computed: {
    getColor: function () {
      return this.$store.getters.colors;
    },
    getRotate: function () {
      return this.$store.getters.getRotate;
    },
    getTranslate: function () {
      return this.$store.getters.getTranslation;
    },
    getEllipseStatus: function () {
      return this.$store.getters.getEllipse;
    },
    getCircleStatus: function () {
      return this.$store.getters.getCircle;
    },
    getDDALine: function () {
      return this.$store.getters.getDDALine;
    },
    getBresenham: function () {
      return this.$store.getters.getBresenham;
    },
    getLine: function () {
      return this.$store.getters.getLine;
    },
    getDelete: function () {
      return this.$store.getters.getDelete;
    },
    getPallete: function () {
      return this.$store.getters.getPalette;
    },
  },
  methods: {
    changePalleteStatus() {
      this.$store.commit("changePaletteStatus", true);
    },
    changeRotateStatus() {
      this.$store.commit("changeRotateStatus", true);
    },
    deletePixel: function () {
      this.$store.commit("changeDeleteStatus", true);
    },
    changeTranslationStatus() {
      this.$store.commit("changeTranslateStatus", true);
    },

    updateColor: function (colors) {
      this.color = colors;
    },
    changeColor: function (color) {
      this.color = color;
    },

    drawGrid: function () {
      this.rect = this.canvas.getBoundingClientRect();
      if (this.canvas.getContext) {
        this.vueCanvas.canvas.width = 950;

        this.vueCanvas.canvas.height = 950;
        this.vueCanvas.strokeStyle = "#44414B";
        this.vueCanvas.lineWidth = this.lineWidth;
        //columns(this.height, this.canvas, this.vueCanvas);
        // rows(this.height, this.canvas, this.vueCanvas);
      } else {
        alert("Canvas is not supported by your browser");
      }
    },
    clearCanvas: function () {
      this.vueCanvas.clearRect(
        0,
        0,
        this.vueCanvas.canvas.width,
        this.vueCanvas.canvas.height
      );
      while (positionsTest.length > 0) {
        positionsTest.pop();
      }
    },
    drawMoreAndLessPixel: function () {
      positionsTest.forEach((e) => {
        drawPixelCall(
          Math.round(e.x / this.square) * this.square,
          Math.round(e.y / this.square) * this.square,
          this.vueCanvas,
          e.color,
          this.width
        );
      });
    },

    addWidth: function () {
      if (this.exceptionWidthAdd(100)) {
        this.height += NUMBERFORZOOM;
        this.square += NUMBERFORZOOM;
        this.width += NUMBERFORZOOM;
        this.drawGrid();
        this.drawMoreAndLessPixel();
      }
    },
    exceptionWidthAdd: function (exception) {
      return (this.height && this.square && this.width) < exception;
    },
    exceptionWidthSubstract: function (exception) {
      return (this.height && this.square && this.width) >= exception;
    },
    substractWidth: function () {
      if (this.exceptionWidthSubstract(5)) {
        this.height -= NUMBERFORZOOM;
        this.square -= NUMBERFORZOOM;
        this.width -= NUMBERFORZOOM;
        this.drawGrid();
        this.drawMoreAndLessPixel();
      }
    },
    makeLine: function () {
      let position = new FullPixel(
        this.startPosition.x,
        this.startPosition.y,
        this.finalPosition.x,
        this.finalPosition.y,
        this.color,
        this.vueCanvas,
        this.width
      );
      switch (true) {
        case this.getDDALine === true:
          ddaAlgorithm(position);
          break;

        case this.getBresenham === true:
          bresenham(position);
          break;
        case this.getCircleStatus === true:
          circleMidPoint(position);
          break;
        case this.getEllipseStatus === true:
          ellipseMidpoint(position);
          break;
        case this.getDelete === true:
          this.erasePixel();
          break;
        case this.getPallete === true:
          boundaryFill4(
            Math.round(this.startPosition.x / this.square) * this.square,
            Math.round(this.startPosition.y / this.square) * this.square,
            this.vueCanvas,
            this.width,
            this.background
          );
          break;
        case this.getRotate === true:
          this.rotation(
            Math.round(this.startPosition.x / this.square) * this.square,
            Math.round(this.startPosition.y / this.square) * this.square,
            Math.round(this.finalPosition.x / this.square) * this.square,
            Math.round(this.finalPosition.y / this.square) * this.square,
            this.width,

            this.vueCanvas
          );
          break;
        case this.getTranslate === true:
          this.translation(
            Math.round(this.startPosition.x / this.square) * this.square,
            Math.round(this.startPosition.y / this.square) * this.square,
            Math.round(this.finalPosition.x / this.square) * this.square,
            Math.round(this.finalPosition.y / this.square) * this.square,
            this.width,

            this.vueCanvas
          );
          break;
        default:
          console.log("Help");
      }
    },
    translation: function (x1, y1, x2, y2, width, ctx) {
      ctx.translate(x2, y2);
      let x = x2 - x1;
      let y = y2 - y1;
      let array = [];
      positionsTest.forEach(
        (e) => array.push(new Pixel(e.x + x, e.y + y, e.color)),
        positionsTest.pop()
      );
      this.drawGrid();
      array.forEach((e) => drawPixelCall(e.x, e.y, ctx, e.color, width));
    },
    rotation: function (x1, y1, x2, y2, width, ctx) {
      ctx.rotate((45 * Math.PI) / 180);
      ctx.translate(x2, y2);
      /*
      let array = [];
      positionsTest.forEach(
        (e) => array.push(new Pixel(e.x, e.y, e.color)),
        positionsTest.pop()
      );

  */ this.drawGrid();
      positionsTest.forEach((e) =>
        drawPixelCall(e.x, e.y, ctx, e.color, width)
      );
    },
    erasePixelCoordinates: function (x, y, x2, y2) {
      this.vueCanvas.clearRect(x, y, x2 - 0.5, y2 - 0.5);
    },
    drawPixelWithCoordinates: function (x, y, lineWidth) {
      this.erasePixelCoordinates(
        Math.round(x / this.square) * this.square,
        Math.round(y / this.square) * this.square,
        this.width - lineWidth,
        this.width - lineWidth
      );
    },
    erasePixel: function () {
      let x = this.startPosition.x;
      let y = this.startPosition.y;
      this.drawPixelWithCoordinates(x, y, 0.4);
    },
    startSelect: function (e) {
      const self = this;
      let rect = e.target.getBoundingClientRect();
      self.startPosition.x = e.clientX - rect.left;
      self.startPosition.y = e.clientY - rect.top;
    },
    finalSelect: function (e) {
      let rect = e.target.getBoundingClientRect();
      const self = this;
      self.finalPosition.x = e.clientX - rect.left;
      self.finalPosition.y = e.clientY - rect.top;
    },
  },
};
</script>
<style lang="scss">
@import "../components/Principal.scss";
</style>