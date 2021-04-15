import * as d3 from "d3";
import * as topojson from "topojson-client";
const spainjson = require("./spain.json");
const d3Composite = require("d3-composite-projections");
import { latLongCommunities } from "./communities";
import { ola1, ola2, ola3, covidNow, resultado } from "./covid";


// Escala de colores segun gravedad
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

// Asignacion de colores por comunidad 
const assignCommunitiesBackgroundColor = (comunidad: string) => {
  const item = datos.find(
    (item) => item.name === comunidad
  );

  return item ? color(item.value) : color(0);
};

const maxAffected1 = ola1.reduce(
  (max, item) => (item.value > max ? item.value : max),
  0
);
const maxAffected2 = ola2.reduce(
  (max, item) => (item.value > max ? item.value : max),
  0
);
const maxAffected3 = ola3.reduce(
  (max, item) => (item.value > max ? item.value : max),
  0
);
const maxAffected4 = covidNow.reduce(
  (max, item) => (item.value > max ? item.value : max),
  0
); 


const maxAffected = Math.max(
  maxAffected1,
  maxAffected2,
  maxAffected3,
  maxAffected4
);

const affectedRadiusScale = d3
  .scaleLinear()
  .domain([0, maxAffected])
  .range([0, 50]);

let datos = ola1;

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
/*
svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("class", "country")
  .attr("d", geoPath as any);
*/
// Pintar el mapa con dichos colores
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
    })
    svg
  .selectAll("path")
  .data(geojson["features"])
  .transition()
  .duration(500)
  .attr("class", "country")
  .attr("d", geoPath as any)
  .style("fill",function(d : any) {
    return assignCommunitiesBackgroundColor(d.properties.NAME_1)
  });
};

updateChart(ola1);

document.getElementById("1wave").addEventListener("click", function () {
  updateChart(ola1);
});

document.getElementById("2wave").addEventListener("click", function () {
  updateChart(ola2);
});

document.getElementById("3wave").addEventListener("click", function () {
  updateChart(ola3);
});

document.getElementById("now").addEventListener("click", function () {
  updateChart(covidNow);
});
