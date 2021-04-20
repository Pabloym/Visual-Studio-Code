# Mandatory task

## Module 10. Data Visualization.

## Pablo Yañez Martin

In this task, we have to make a map of Spain with all the communities showing with a circle the severity of infections during the 3 waves suffered in Spain during the pandemic and the current situation..

I have selected the file of the map of Spain from the following url:
https://github.com/deldersveld/topojson/blob/master/countries/spain/spain-comunidad-with-canary-islands.json
This file will be named as spain.json.

The next step is to prepare a file which contains the name of each region as well as the longitude and latitude in order to draw each circle in each Autonomous Community.
The name of the Autonomous Community in both files have to be the same, so we have to take care with that, because, in other case, this could result in no circles being painted on this autonomous community.
This is the case of several communities such as Madrid (Comunidad de Madrid), Murcia (Región de Murcia) , Navarra (Comunidad Foral de Navarra) or Asturias (Principado de Asturias) among others.
This file is named communities.ts and it is the following:

```
export const latLongCommunities = [
  {
    name: "Comunidad de Madrid",
    long: -3.70256,
    lat: 40.4165,
  },
  {
    name: "Andalucía",
    long: -4.5,
    lat: 37.6,
  },
  {
    name: "Comunidad Valenciana",
    long: -0.37739,
    lat: 39.45975,
  },
  {
    name: "Región de Murcia",
    long: -1.13004,
    lat: 37.98704,
  },
  {
    name: "Extremadura",
    long: -6.16667,
    lat: 39.16667,
  },
  {
    name: "Cataluña",
    long: 1.86768,
    lat: 41.82046,
  },
  {
    name: "País Vasco",
    long: -2.75,
    lat: 43.0,
  },
  {
    name: "Cantabria",
    long: -4.03333,
    lat: 43.2,
  },
  {
    name: "Principado de Asturias",
    long: -5.86112,
    lat: 43.36662,
  },
  {
    name: "Galicia",
    long: -7.86621,
    lat: 42.75508,
  },
  {
    name: "Aragón",
    long: -1.0,
    lat: 41.0,
  },
  {
    name: "Castilla y León",
    long: -4.45,
    lat: 41.383333,
  },
  {
    name: "Castilla-La Mancha",
    long: -3.000033,
    lat: 39.500011,
  },
  {
    name: "Islas Canarias",
    long: -15.5,
    lat: 28.0,
  },
  {
    name: "Islas Baleares",
    long: 2.52136,
    lat: 39.18969,
  },
  {
    name: "Comunidad Foral de Navarra",
    long: -1.65,
    lat: 42.816666,
  },
  {
    name: "La Rioja",
    long: -2.445556,
    lat: 42.465,
  },
  {
    name: "Ceuta",
    long: -5.344104,
    lat: 35.898369,
  },
  {
    name: "Melilla",
    long: -2.9464,
    lat: 35.301432,
  },
];

```

Now, we will prepare a file with the name of each community and the data of cumulative incidence in 14 days during the three waves of the pandemic and the current situation.
This file is the following:

``` 
export interface resultado {
  name: string;
  value: number;
}

// IA 14 dias (20/03/2020) link datos:https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/documentos/Actualizacion_50_COVID-19.pdf

export const ola1: resultado[] = [
  {
    name: "Andalucía",
    value: 15,
  },
  {
    name: "Aragón",
    value: 26,
  },
  {
    name: "Principado de Asturias",
    value: 33,
  },
  {
    name: "Islas Baleares",
    value: 17,
  },
  {
    name: "Islas Canarias",
    value: 12,
  },
  {
    name: "Cantabria",
    value: 23,
  },
  {
    name: "Castilla-La Mancha",
    value: 50,
  },
  {
    name: "Castilla y León",
    value: 47,
  },
  {
    name: "Cataluña",
    value: 42,
  },
  {
    name: "Ceuta",
    value: 6,
  },
  {
    name: "Comunidad Valenciana",
    value: 21,
  },
  {
    name: "Extremadura",
    value: 27,
  },
  {
    name: "Galicia",
    value: 21,
  },
  {
    name: "Comunidad de Madrid",
    value: 105,
  },
  { 
    name: "Melilla",
     value: 27 },
  {
    name: "Región de Murcia",
    value: 13,
  },
  {
    name: "Comunidad Foral de Navarra",
    value: 84,
  },
  {
    name: "País Vasco",
    value: 64,
  },
  {
    name: "La Rioja",
    value: 147,
  },
];

// IA 14 dias (02/11/2020) link datos:https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/documentos/Actualizacion_241_COVID-19.pdf

export const ola2: resultado[] = [
  {
    name: "Andalucía",
    value: 545,
  },
  {
    name: "Aragón",
    value: 1127,
  },
  {
    name: "Principado de Asturias",
    value: 416,
  },
  {
    name: "Islas Baleares",
    value: 229,
  },
  {
    name: "Islas Canarias",
    value: 76,
  },
  {
    name: "Cantabria",
    value: 392,
  },
  {
    name: "Castilla-La Mancha",
    value: 518,
  },
  {
    name: "Castilla y León",
    value: 828,
  },
  {
    name: "Cataluña",
    value: 726,
  },
  {
    name: "Ceuta",
    value: 831,
  },
  {
    name: "Comunidad Valenciana",
    value: 225,
  },
  {
    name: "Extremadura",
    value: 556,
  },
  {
    name: "Galicia",
    value: 311,
  },
  {
    name: "Comunidad de Madrid",
    value: 403,
  },
  { name: "Melilla", value: 1356 },
  {
    name: "Región de Murcia",
    value: 565,
  },
  {
    name: "Comunidad Foral de Navarra",
    value: 1193,
  },
  {
    name: "País Vasco",
    value: 640,
  },
  {
    name: "La Rioja",
    value: 772,
  },
];

// IA 14 dias (20/01/2021) link datos: https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/documentos/Actualizacion_294_COVID-19.pdf
export const ola3: resultado[] = [
  {
    name: "Andalucía",
    value: 676,
  },
  {
    name: "Aragón",
    value: 650,
  },
  {
    name: "Principado de Asturias",
    value: 351,
  },
  {
    name: "Islas Baleares",
    value: 673,
  },
  {
    name: "Islas Canarias",
    value: 180,
  },
  {
    name: "Cantabria",
    value: 360,
  },
  {
    name: "Castilla-La Mancha",
    value: 1066,
  },
  {
    name: "Castilla y León",
    value: 1047,
  },
  {
    name: "Cataluña",
    value: 615,
  },
  {
    name: "Ceuta",
    value: 429,
  },
  {
    name: "Comunidad Valenciana",
    value: 1075,
  },
  {
    name: "Extremadura",
    value: 1425,
  },
  {
    name: "Galicia",
    value: 542,
  },
  {
    name: "Comunidad de Madrid",
    value: 789,
  },
  { name: "Melilla", value: 698 },
  {
    name: "Región de Murcia",
    value: 1189,
  },
  {
    name: "Comunidad Foral de Navarra",
    value: 412,
  },
  {
    name: "País Vasco",
    value: 373,
  },
  {
    name: "La Rioja",
    value: 1042,
  },
];

// IA 14 dias (09/04/2021) link datos: https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/documentos/Actualizacion_350_COVID-19.pdf
export const covidNow: resultado[] = [
  {
    name: "Comunidad de Madrid",
    value: 324,
  },
  {
    name: "La Rioja",
    value: 202,
  },
  {
    name: "Andalucía",
    value: 190,
  },
  {
    name: "Cataluña",
    value: 199,
  },
  {
    name: "Comunidad Valenciana",
    value: 35,
  },
  {
    name: "Región de Murcia",
    value: 68,
  },
  {
    name: "Extremadura",
    value: 132,
  },
  {
    name: "Castilla-La Mancha",
    value: 143,
  },
  {
    name: "País Vasco",
    value: 295,
  },
  {
    name: "Cantabria",
    value: 144,
  },
  {
    name: "Principado de Asturias",
    value: 163,
  },
  {
    name: "Galicia",
    value: 70,
  },
  {
    name: "Aragón",
    value: 202,
  },
  {
    name: "Castilla y León",
    value: 187,
  },
  {
    name: "Islas Canarias",
    value: 126,
  },
  {
    name: "Islas Baleares",
    value: 66,
  },
  {
    name: "Comunidad Foral de Navarra",
    value: 395,
  },
  { name: "Ceuta y Melilla", value: 200 },
];
```
As we can see, in each data we can obtain the original data of people infected of covid-19 using the link.


To conclude with the files, the index.html file is the following:
```
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="./map.css" />
    <link rel="stylesheet" type="text/css" href="./base.css" />
    <link rel="stylesheet" type="text/css" href="./styles.css" />
  </head>
  <body>
    <div>
      <button id="1wave">First Wave</button>
      <button id="2wave">Second Wave</button>
      <button id="3wave">Third Wave</button>
      <button id="now">Current Situation</button>
    </div>
    <script src="./index.ts"></script>
  </body>
</html>

```
Where we can see that in the graphics we will have four buttons, one to each waves and other to the current situation. 

## Code

```
import * as d3 from "d3";
import * as topojson from "topojson-client";
const spainjson = require("./spain.json");
const d3Composite = require("d3-composite-projections");
import { latLongCommunities } from "./communities";
import { ola1, ola2, ola3, covidNow, resultado } from "./covid";
```
To scale the radius of the circle we will take the maximun number of cumulative indicidence of all the data.
```
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
```
And with the following function we will scale it in a linear way.
```
const affectedRadiusScale = d3
  .scaleLinear()
  .domain([0, maxAffected])
  .range([0, 50]);
```
Now, we will take the data of the people infected in the first wave.
```
let datos = ola1;
```

The following function will return the radius of each autonomous community.
```
const calculateRadiusBasedOnAffectedCases = (comunidad: string) => {
  const entry = datos.find((item) => item.name === comunidad);
  return entry ? affectedRadiusScale(entry.value) : 0;
};
```
In the following cell, it is how I have projected the map of Spain including the Canary Island and Ceuta and Melilla.
```
const aProjection = d3Composite
  .geoConicConformalSpain()
  .scale(3300)
  .translate([500, 400]);
const geoPath = d3.geoPath().projection(aProjection);

const geojson = topojson.feature(spainjson, spainjson.objects.ESP_adm1);
```
```
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
```
With the following function, we will draw the map.
```
svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("class", "country")
  .attr("d", geoPath as any);
```
The following function is useful to be able to visualize the number of the cumulativa incidence by 100.000 people in each region, we will use it to show this number when we select each region with the mouse. 
It will appear a circle with the name of the corresponding region and the number cumulative incidence.
```
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
 ```
The following lines of the code are used to update the graphics.
```
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
```
