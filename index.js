let dataset = [];
let length =0;
let minutes = [];
let years = [];

let minFmt = "%M:%S";
let yrFmt = "%Y";

let h = 500;
let w = 1000;          
let r = 5;

let padding = 50;

let plotData = [];

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
.then( (data)=> { // get all data, do checks etc

//console.log(data);
    dataset = [...data];
//    console.log(dataset);

    minutes= data.map( (t) => t.Time);
minutesAxis = minutes.sort().filter( (d,i) => minutes.indexOf(d) === i); // sort n remove duplicates
minutesNo = minutes.map((d) => Number.parseFloat(d.replace(':', '.')).toFixed(2) );
//years   = data.map((d) =>  d3.timeParse(yrFmt)(d.Year));
years = data.map( (d) => d.Year);
//yearsAxis = years.sort().filter( (d,i) => years.indexOf(d) === i); // sort n remove duplicates

console.log(minutes + " count=" + minutes.length);
console.log(years + " count=" + years.length);



plotData = minutesNo.map( (d,i) => [Number(d), years[i]]);

console.log(plotData);

//console.log(minutes);
//  console.log(years);
  })
.then( (data) => {  // plot the graph



let minYr = (d3.min(years));
let maxYr = (d3.max(years));
console.log("minYr=" + minYr + " maxYear=" + maxYr);

//minutesAxis = minutes.map( (d) => String(d).replace('.', ':')) ;
minutesAxis = minutes.map( (d) => d3.timeParse(minFmt)(d));
console.log(minutesAxis);
yearsAxis= years.map( (d) => d3.timeParse(yrFmt)(d));


let minMins = d3.min(minutes);
let maxMins = d3.max(minutes);
console.log("minMins=" + minMins + " maxMins=" + maxMins);

let xScale = d3.scaleTime()
//.domain([minYr, maxYr])
              .domain(d3.extent(years))
              .range([padding, w-padding])
              

let yScale = d3.scaleTime()
               .domain(d3.extent(minutesAxis))
               .range([h-padding, padding])



let xAxis = d3.axisBottom(xScale)
              .tickFormat( (d,i) => plotData[i][1] );

let yAxis = d3.axisLeft(yScale)
             .tickFormat( (d, i) => plotData[i][0] ); 





let svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height",h);


let circle = svg.selectAll("circle")
                  .data(plotData)
                  .enter()
                  .append("circle")
                  .attr("cx", (d) => xScale(d[1]))
                  .attr("cy", (d) => yScale(d[0]))
                  .attr("r", 10)
                  .attr("fill","teal")





svg.append("g")
    .attr("id", "x-axis")
    .attr("class", "axis")
    .attr("transform", "translate(0, " + (h - padding) + ")")
    .call(xAxis)

svg.append("g")
    .attr("id", "y-axis")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis)








});
