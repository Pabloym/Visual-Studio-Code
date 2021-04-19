import * as d3 from "d3";
import * as topojson from "topojson-client";
const germanyjson = require("./germany.json");
const d3Composite = require("d3-composite-projections");
import { latLongCommunities } from "./communities";
import { antes, ahora, resultado } from "./covid";


let datos = antes;

const color = d3
  .scaleThreshold<number, string>()
  .domain([0, 50, 100, 250, 500, 1000])
  .range([
    "#D7FFF8",
    "#a7f9ea",
    "#4ad2df",
    "#00a8d9",
    "#007bcc",
    "#0749ab",
    "#0B0050",
    ]);
    


const assignCommunitiesBackgroundColor = (comunidad: string) => {
  const item = datos.find(
    (item) => item.name === comunidad
  );

  return item ? color(item.value) : color(0);
};

const maxAffected1 = antes.reduce(
  (max, item) => (item.value > max ? item.value : max),
  0
);
const maxAffected2 = ahora.reduce(
  (max, item) => (item.value > max ? item.value : max),
  0
);


const maxAffected =  Math.max(
  maxAffected1,
  maxAffected2,
);

const affectedRadiusScale = d3
  .scaleLinear()
  .domain([0, maxAffected])
  .range([0, 50]);



const calculateRadiusBasedOnAffectedCases = (comunidad: string) => {
  const entry = datos.find((item) => item.name === comunidad);

  return entry ? circleScale(entry.value) : 0;
};


const aProjection = d3
  .geoMercator()
  .scale(1900)
  .translate([200, 2300]);

const geoPath = d3.geoPath().projection(aProjection);

const geojson = topojson.feature(germanyjson, germanyjson.objects.layer);

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
  .attr("d", geoPath as any)
  .style("fill",function(d : any) {
    return assignCommunitiesBackgroundColor(d.properties.NAME_1)
  });
  

const ia = (comunidad: string) => {
    const output = datos.find((item) => item.name === comunidad);
    return output ? output.value : 0;
  };

const circleScale = d3
  .scaleThreshold<number, number>()
  .domain([0,50,100,250,500,1000,2000,3000,4000,5000,6000,7000,8000,9000,10000])
  .range([5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]);


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
        .html(`<span>${datum.name}: ${"Diagnosed cases:"+ia(datum.name)}</span>`)
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

updateChart(antes);

document.getElementById("before").addEventListener("click", function () {
  updateChart(antes);
});

document.getElementById("now").addEventListener("click", function () {
  updateChart(ahora);
});

