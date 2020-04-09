let dataset = [];
let length =0;
let minutes = [];
let years = [];

let minFmt = d3.timeParse("%M:%S");
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

  minutes= data.map( (t) => minFmt(t.Time));
  years = data.map( (d) => d.Year);

console.log(minutes + " count=" + minutes.length);
console.log(years + " count=" + years.length);


  })
.then( (data) => {  // plot the graph


let minYr = (d3.min(years));
let maxYr = (d3.max(years));
console.log("MinYr=" + minYr + " maxYr=" + maxYr);

let minMins = d3.min(minutes);
let maxMins = d3.max(minutes);
console.log("MinMins=" + minMins + " maxMins="+maxMins);


let xScale = d3.scaleLinear()
//.domain([minYr, maxYr])
              .domain([minYr -1, maxYr+1])
              .range([padding, w-padding])
              

let yScale = d3.scaleTime()
               .domain(d3.extent(minutes))
               .range([h-padding, padding])



let xAxis = d3.axisBottom(xScale)

let yAxis = d3.axisLeft(yScale)
              .tickFormat(d3.timeFormat("%M:%S"))



let svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height",h);



var tooltip = d3.select('#main')
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0)





let circle = svg.selectAll("circle")
                  .data(dataset)
                  .enter()
                  .append("circle")
                  .attr("cx", (d,i) => xScale(d.Year))
                  .attr("cy", (d,i) => yScale(minutes[i]))
                  .attr("r", 10)
                  .attr("fill", (d,i) => { return ( d.Doping.length === 0) ? "teal" : "red";} )
                  .attr("stroke", "black")
                  .attr("class", "dots")
                  .attr("data-xdata", (d,i) => d.Year)
                  .attr("data-ydata", (d,i) => minutes[i])
				  .on("mouseover", (d,i) => {
						tooltip.transition()
							    .duration(20)
								.style("opacity", 1)
tooltip.html( d.Year + " - " + d.Time + "<br>" + d.Name + ', ' + d.Nationality + "<br>" + d.Doping )
								.attr("data-date", d[0])
								.style("left", d3.event.pageX - 50 + 'px')
								.style("top", d3.event.pageY - 20 + 'px')
								.style("transform", "translateX(60px)");
					})
				  .on("mouseout", (d,i) => {
						tooltip.transition()
								.duration(100)
								.style("opacity",0)
						});







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



// add legend

svg.append("text")
   .attr("id", "legend")


});
