
// There are 4 different axis function constructors:
d3.axisTop
d3.axisBottom
d3.axisLeft
d3.axisRight


// Setting up an Axis
// Create scale functions
var xScale = d3.scaleLinear()
								 .domain([0, d3.max(dataset, function(d) { return d[0]; })])    // domain of input values
								 .range([padding, w - padding * 2]);                            // range of output values

var xAxis = d3.axisBottom()
              .scale(xScale)
              .ticks(5);      // loosely specifies the number of ticks to use

svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(0," + (h - padding) + ")")
   .call(xAxis);


// A "g" element is a group element. Group elements are invisible, unlike line/rect/circle, and they have no visual presence.
// "g" elements can be used to contain (or "group") other elements, which keeps our code nice and tidy. We can also apply
// transformations to "g" elements.

// To actually generate the axis and insert all those little lines and labels in SVG, we must "call" the xAxis function.

// "translate" is a transform that pushes the whole "g" group over and down by some amount.



// Formatting Tick Labels
var formatAsPercentage = d3.format(".1%");

var xAxis = d3.axisBottom() 
          .scale(xScale)
          .ticks(5)
          .tickFormat(formatAsPercentage);
