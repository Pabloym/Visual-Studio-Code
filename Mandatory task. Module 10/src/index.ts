import * as d3 from "d3";
import * as topojson from "topojson-client";
const spainjson = require("./spain.json");
const d3Composite = require("d3-composite-projections");
import { latLongCommunities } from "./communities";
import { ola1, ola2, ola3, covidNow, resultado } from "./covid";

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

svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("class", "country")
  .attr("d", geoPath as any);

const ia = (comunidad: string) => {
    const output = datos.find((item) => item.name === comunidad);
    return output ? output.value : 0;
  };

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
  .attr("cy", (d) => aProjection([d.long, d.lat])[1])
  .on("mouseover", function (e: any, datum: any) {
    d3
      .select(this);
      const coords = { x: e.x, y: e.y };
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html(`<span>${datum.name}: ${"Casos diagnosticatos por cada 100.000 habitantes:"+ia(datum.name)}</span>`)
        .style("left", `${coords.x}px`)
        .style("top", `${coords.y - 28}px`);
  })
  .on("mouseout", function (datum) {
    d3.select(this).attr("transform", "");
    div.transition().duration(500).style("opacity", 0);
  });
  
  


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
