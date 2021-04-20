# Advanced task

## Module 10. Data Visualization.

## Pablo Yañez Martin

In this task, we have to improve the mandatory task adding a colour scale for all the autonomous communities, according to the cumulative incidence by 100.000 habitants. 
The files are the same as in the mandatory task. Only changes some parts in the code as I will explain in the following lines.

## Code
The unique change is associated with the following function, which give a colour to each community in function to their risk level of covid.

This is the colour scale, I have selected a scale of blue colours.
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

This function associates a colour with a community.
````
const assignCommunitiesBackgroundColor = (comunidad: string) => {
  const item = datos.find(
    (item) => item.name === comunidad
  );
  return item ? color(item.value) : color(0);
};
````

I have added the lines with the simbol +, with these lines we will draw each autonomous community with their corresponding colour according to the previuos scale.

```
svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("class", "country")
  .attr("d", geoPath as any)
 + .style("fill",function(d : any) {
 +   return assignCommunitiesBackgroundColor(d.properties.NAME_1)
  });
```
And, to conclude, we have to update the colour of each autonomous community too.
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
