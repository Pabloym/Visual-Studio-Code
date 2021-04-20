# Challenge 

## Module 10. Data Visualization.

## Pablo Yañez Martin

In this task, we have to replicate the advanced exercise with a different country, in my case I have chosen Germany.

I have selected the file from the following url:
https://github.com/deldersveld/topojson/blob/master/countries/germany/dach-states.json
If we observe that, in that file, there are others countries which have borders with Germany, those are Switzerland and Austria. As we do not want that those countries appear in the graphics, I have deleted that part of the file. This file is called germany.json.

The next step is to prepare a file which contains the name of each region as well as the longitude and latitude in order to draw each circle in each region. The coordinates have been searched in google maps.
This file is named communities.ts and it is the following:

```
export const latLongCommunities = [
  {
    name: "Bayern",
    long:  11.650894,
    lat: 48.655570,
  },
  {
    name: "Baden-Württemberg",
    long: 9.354594,
    lat: 48.739288,
  },
  {
    name: "Berlin",
    long: 13.505698,
    lat: 52.525800,
  },
  {
    name: "Bremen",
    long:8.832608, 
    lat:  53.080632,
  },
  {
    name: "Hamburg",
    long: 10.031332,
    lat:  53.576088,
  },
  {
    name: "Hessen",
    long:   9.007773,
    lat:50.516541,
  },
  {
    name: "Sachsen",
    long:  13.444757,
    lat: 51.067079,
  },
  {
    name: "Brandenburg",
    long:  13.827491,
    lat: 52.178903,
  },
  {
    name: "Mecklenburg-Vorpommern",
    long:  12.576551,
    lat: 53.759271,
  },
  {
    name: "Niedersachsen",
    long:  9.621663,
    lat: 52.838700,
  },
  {
    name: "Nordrhein-Westfalen",
    long: 7.265287,
    lat: 51.484413,
  },
  {
    name: "Rheinland-Pfalz",
    long:  7.340805,
    lat: 50.104816,
  },
  {
    name: "Saarland",
    long:  6.955725,
    lat: 49.370524,
  },
  {
    name: "Sachsen-Anhalt",
    long:  11.662089,
    lat: 52.460367,
  },
  {
    name: "Schleswig-Holstein",
    long: 9.717415, 
    lat: 54.160996,
  },
  {
    name: "Thüringen",
    long: 11.067702, 
    lat: 50.821764,
  },
];
```

Once we already have the data with all the regions, it is easy to prepare a new file, covid.ts, with the name of each region and theirs data of infections by covid in one day of this month (April 2021), and the previous month (March 2021) in order to compare the situation in Germany, if it has improved or not.
This file is the following:

``` 
export interface resultado {
  name: string;
  value: number;
}

export const ahora: resultado[] = [
  {
    name: "Bayern",
    value: 5098,
  },
  {
    name: "Baden-Württemberg",
    value: 3880,
  },
  {
    name: "Berlin",
    value: 1327,
  },
  {
    name: "Bremen",
    value: 270,
  },
  {
    name: "Hamburg",
    value: 479,
  },
  {
    name: "Hessen",
    value: 1992,
  },
  {
    name: "Sachsen",
    value: 2416,
  },
  {
    name: "Brandenburg",
    value: 883,
  },
  {
    name: "Mecklenburg-Vorpommern",
    value: 573,
  },
  {
    name: "Niedersachsen",
    value: 1103,
  },
  {
    name: "Nordrhein-Westfalen",
    value:  6318,
  },
  {
    name: "Rheinland-Pfalz",
    value: 1206,
  },
  {
    name: "Saarland",
    value: 537,
  },
  {
    name: "Sachsen-Anhalt",
    value: 882,
  },
  {
    name: "Schleswig-Holstein",
    value: 407,
  },
  {
    name: "Thüringen",
    value: 1190,
  },
];


export const antes: resultado[] = [
  {
    name: "Bayern",
    value: 1098,
  },
  {
    name: "Baden-Württemberg",
    value: 880,
  },
  {
    name: "Berlin",
    value: 127,
  },
  {
    name: "Bremen",
    value: 27,
  },
  {
    name: "Hamburg",
    value: 92,
  },
  {
    name: "Hessen",
    value: 892,
  },
  {
    name: "Sachsen",
    value: 716,
  },
  {
    name: "Brandenburg",
    value: 183,
  },
  {
    name: "Mecklenburg-Vorpommern",
    value: 73,
  },
  {
    name: "Niedersachsen",
    value: 473,
  },
  {
    name: "Nordrhein-Westfalen",
    value:  2318,
  },
  {
    name: "Rheinland-Pfalz",
    value: 206,
  },
  {
    name: "Saarland",
    value: 57,
  },
  {
    name: "Sachsen-Anhalt",
    value: 182,
  },
  {
    name: "Schleswig-Holstein",
    value: 40,
  },
  {
    name: "Thüringen",
    value: 190,
  },
];
```

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
      <button id="before">Previus Situation</button>
      <button id="now">Current Situation</button>
    </div>
    <script src="./index.ts"></script>
  </body>
</html>
```
Where we can see that in the graphics we will have two buttons, the first, Previous situation, to observe the situation of the prior month, and Current Situation, to observe the situation of this days.


## Code

```
import * as d3 from "d3";
import * as topojson from "topojson-client";
const germanyjson = require("./germany.json");
const d3Composite = require("d3-composite-projections");
import { latLongCommunities } from "./communities";
import { antes, ahora, resultado } from "./covid";
```
First, we will take the data of the people infected the previous month.
```
let datos = antes;
```
Thanks to the following function, we will be able to draw each region with a colour according to the number of people infected that day.
```
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
```
With the following function, we will assign one colour for each region.
```
const assignCommunitiesBackgroundColor = (comunidad: string) => {
  const item = datos.find(
    (item) => item.name === comunidad
  );
  return item ? color(item.value) : color(0);
};
```
The following function is used to scale the radius of the circles depending on the number of people infected.
```
const circleScale = d3
  .scaleThreshold<number, number>()
  .domain([0,50,100,250,500,1000,2000,3000,4000,5000,6000,7000,8000,9000,10000])
  .range([5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]);


const calculateRadiusBasedOnAffectedCases = (comunidad: string) => {
  const entry = datos.find((item) => item.name === comunidad);
  return entry ? circleScale(entry.value) : 0;
};
```
In the following cell, it is how I have projected the map of Germany.
```
const aProjection = d3
  .geoMercator()
  .scale(1900)
  .translate([200, 2300]);

const geoPath = d3.geoPath().projection(aProjection);

const geojson = topojson.feature(germanyjson, germanyjson.objects.layer);
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
  .attr("d", geoPath as any)
  .style("fill",function(d : any) {
    return assignCommunitiesBackgroundColor(d.properties.NAME_1)
  });
```
The following function is useful to be able to visualize the number of people infected in each region, we will use it to show this number when we select with the mouse each region. 
It will appear a circle with the name of the corresponding region and the number of people infected.
```
const numberOfPeopleInfected = (comunidad: string) => {
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
        .html(`<span>${datum.name}: ${"Diagnosed cases:"+numberOfPeopleInfected(datum.name)}</span>`)
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
```
