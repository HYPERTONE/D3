
// ---------- 
// 1. Declare height, width, padding
// 2. Construct Scale
// 3. Construct Axis/Axes
// 4. Create SVG element
// 5. Create Labels
// 6. Create Axis/Axes


// Set height, width, padding
var w = 500;
var h = 300;
var padding = 30;

var dataset = [
		[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
		[410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
		[600, 150]
	      ];


// Create Scale
var xScale = d3.scaleLinear()
	       .domain([0, d3.max(dataset, function(d) { return d[0]; })])
	       .range([padding, w - padding]);
var yScale = d3.scaleLinear()
	       .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	       .range([h - padding, padding]);
var rScale = d3.scaleLinear()
	       .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	       .range([0, 10]);

var formatAsSigned = d3.format("+5");

// Create Axes
// X Axis
var xAxis = d3.axisBottom()
	      .scale(xScale) 			// each axis needs to be told at what scale to operate
	      .ticks(5)				// set rough number of ticks
	      .tickFormat(formatAsSigned); 	// set format style

// Y Axis
var yAxis = d3.axisLeft()
	      .scale(yScale) 
	      .ticks(5)	
	      .tickFormat(formatAsSigned); 

// Create SVG element
var svg = d3.select("body")		// Insert new <svg> element before </body>
	    .append("svg")		
	    .attr("width", w + padding)
	    .attr("height", h + padding);


svg.selectAll("circle")
   .data(dataset)
   .enter()				// return placeholder reference to the new element
   .append("circle")			// append circles to the end of the SVG element
   .attr("cx", function(d) { return xScale(d[0]); })
   .attr("cy", function(d) { return yScale(d[1]); })
   .attr("r", function(d) { return rScale(d[1]); });

//Create labels
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) { return d[0] + "," + d[1]; })
   .attr("x", function(d) { return xScale(d[0]); }) // specify the text elements contents
   .attr("y", function(d) { return yScale(d[1]); })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "red");



//Create X axis
svg.append("g")			// "g" is an invisible element; allows transformations
   .attr("class", "axis")
   .attr("transform", "translate(0," + (h - padding) + ")")
   .call(xAxis);		// call axis to generate it

//Create Y axis
svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(" + padding + ",0)")
   .call(yAxis);		// call axis to generate it




// ---------- 



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
