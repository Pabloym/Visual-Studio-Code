import * as d3 from "d3";
import * as topojson from "topojson-client";
const spainjson = require("./spain.json");
const d3Composite = require("d3-composite-projections");
import { latLongCommunities } from "./communities";
import { covidAfter, covidBefore, resultado } from "./covid";

// Numero maximo de contagiados entre todas las comunidades
const maxAffected1 = covidAfter.reduce(
  (max, item) => (item.value > max ? item.value : max),
  0
);

const maxAffected2 = covidBefore.reduce(
  (max, item) => (item.value > max ? item.value : max),
  0
);

const maxAffected = Math.max(maxAffected1, maxAffected2);

// Radio del circulo de cada comunidad en funcion del maximo de contagios
const affectedRadiusScale = d3
  .scaleLinear()
  .domain([0, maxAffected])
  .range([0, 50]);

let datos = covidAfter;

const calculateRadiusBasedOnAffectedCases = (comunidad: string) => {
  const entry = datos.find((item) => item.name === comunidad);

  return entry ? affectedRadiusScale(entry.value) : 0;
};

const aProjection = d3Composite
  .geoConicConformalSpain()
  .scale(3300)
  .translate([500, 400]);
const geoPath = d3.geoPath().projection(aProjection);

const geojson = topojson.feature(spainjson, spainjson.objects.ESP_adm1);

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 1024)
  .attr("height", 800)
  .attr("style", "background-color: #FBFAF0");

const div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("class", "country")
  .attr("d", geoPath as any);

svg
  .selectAll("circle")
  .data(latLongCommunities)
  .enter()
  .append("circle")
  .attr("class", "affected-marker")
  .attr("r", (d) => {
    return calculateRadiusBasedOnAffectedCases(d.name);
  })
  .attr("cx", (d) => aProjection([d.long, d.lat])[0])
  .attr("cy", (d) => aProjection([d.long, d.lat])[1]);

const updateChart = (covid: resultado[]) => {
  datos = covid;
  svg
    .selectAll("circle")
    .data(latLongCommunities)
    .transition()
    .duration(800)
    .attr("r", (d) => {
      return calculateRadiusBasedOnAffectedCases(d.name);
    });
};

updateChart(covidBefore);

document.getElementById("CovidBefore").addEventListener("click", function () {
  console.log(covidBefore);
  updateChart(covidBefore);
});

document.getElementById("CovidAfter").addEventListener("click", function () {
  console.log(covidAfter);
  updateChart(covidAfter);
});

/*
import * as d3 from "d3";
import * as topojson from "topojson-client";
const spainjson = require("./spain.json");
const d3Composite = require("d3-composite-projections");
import { latLongCommunities } from "./communities";
import {covidAfter, covidBefore, resultado} from "./covid";

// Escala de colores para las comunidades segun la gravedad
const color = d3
  .scaleThreshold<number, string>()
  .domain([0, 50, 100, 250, 500, 1000])
  .range([
    "#FFFFF",
    "#FFE8E5",
    "#F88F70",
    "#CD6A4E",
    "#A4472D",
    "#7B240E",
    "#540000",
  ]);



// Numero maximo de contagiados entre todas las comunidades
const maxAffected1 = covidAfter.reduce(
  (max,item) => (item.value > max ? item.value : max),0
);

const maxAffected2 = covidBefore.reduce(
  (max,item) => (item.value > max ? item.value : max),0
);

const maxAffected = Math.max(maxAffected1, maxAffected2);


// Radio del circulo de cada comunidad en funcion del maximo de contagios
const affectedRadiusScale = d3
  .scaleLinear()
  .domain([0,maxAffected])
  .range([0,50]);

let datos = covidAfter;

const calculateRadiusBasedOnAffectedCases = (comunidad : string) => {
  const entry = datos.find(item => item.name === comunidad);

  return entry ? affectedRadiusScale(entry.value) : 0;
};


const aProjection = d3Composite
  .geoConicConformalSpain()
  .scale(3300)
  .translate([500, 400]);
const geoPath = d3.geoPath().projection(aProjection);

const geojson = topojson.feature(spainjson, spainjson.objects.ESP_adm1);

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 1024)
  .attr("height", 800)
  .attr("style", "background-color: #FBFAF0");


const div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);


svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("class", "country")
  .attr("d", geoPath as any);


svg
  .selectAll("circle")
  .data(latLongCommunities)
  .enter()
  .append("circle")
  .attr("class", "affected-marker")
  .attr("r", d => calculateRadiusBasedOnAffectedCases(d.name))
  .attr("cx", (d) => aProjection([d.long, d.lat])[0])
  .attr("cy", (d) => aProjection([d.long, d.lat])[1]);



  const updateChart = (covid : resultado[]) => {
    datos=covid;
    svg
      .selectAll("circle")
      .data(latLongCommunities)
      .enter()
      .append("circle")
      .attr("class", "affected-marker")
      .attr("r", d => calculateRadiusBasedOnAffectedCases(d.name))
      .attr("cx", (d) => aProjection([d.long, d.lat])[0])
      .attr("cy", (d) => aProjection([d.long, d.lat])[1]);

      const radio = d => calculateRadiusBasedOnAffectedCases(d.name);

      const circ = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radio);
  };
  
  document
    .getElementById("CovidBefore")
    .addEventListener("click", function() {
      console.log(covidBefore);
      updateChart(covidBefore);
      //datos = CovidBefore;
    });
    
  
  document
    .getElementById("CovidAfter")
    .addEventListener("click", function() {
      console.log(covidAfter)
      updateChart(covidAfter);
      //datos = CovidAfter;
    });
*/

/*
import * as d3 from "d3";
import { on } from "node:events";
import * as topojson from "topojson-client";
const spainjson = require("./spain.json");
const d3Composite = require("d3-composite-projections");
import {latLongCommunities } from "./communities";
import {CovidAfter, CovidBefore} from "./covid";


const datos = CovidAfter;

const color = d3
  .scaleThreshold<number, string>()
  .domain([0, 50, 100, 250, 500, 1000])
  .range([
    "#ffffae", 
    "#f6de7e",  
    "#efbc51", 
    "#eaaa45", 
    "#de8532",  
    "#c35931",  
    "#a13030"
  ]);


  const assignCommunitiesBackgroundColor = (comunidad: string) => {
    const item = datos.find(
      (item) => item.name === comunidad
    );
  
    return item ? color(item.value) : color(0);
  };
  
const aProjection = d3Composite
  .geoConicConformalSpain()
  .scale(3300)
  .translate([500, 400]);
const geoPath = d3.geoPath().projection(aProjection);

const geojson = topojson.feature(spainjson, spainjson.objects.ESP_adm1);


const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 1024)
  .attr("height", 800)
  .attr("style", "background-color: #FBFAF0");

svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("class", "country")
  .attr("d", geoPath as any)
  .style("fill",function(d : any) {
    return assignCommunitiesBackgroundColor(d.properties.NAME_1)
  });


  // CIRCULOS DE GRAVEDAD
  
  const maxAffected = datos.reduce(
    (max,item) => (item.value > max ? item.value : max),0
  );

  const affectedRadiusScale = d3
  .scaleLinear()
  .domain([0,maxAffected])
  .range([0,50]);


const calculateRadiusBasedOnAffectedCases = (comunidad : string ) => {
  const entry = datos.find(item => item.name === comunidad);

  return entry ? affectedRadiusScale(entry.value) : 0;
};



const div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);


svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("class", "country")
  .attr("d", geoPath as any);


svg
  .selectAll("circle")
  .data(latLongCommunities)
  .enter()
  .append("circle")
  .attr("class", "affected-marker")
  .attr("r", d => calculateRadiusBasedOnAffectedCases(d.name)/2)
  .attr("cx", (d) => aProjection([d.long, d.lat])[0])
  .attr("cy", (d) => aProjection([d.long, d.lat])[1]);

  */