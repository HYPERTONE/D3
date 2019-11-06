
// Input Domain
// A scale's input domain is the range of possible input data values.

// Output Range
// A scale's output range is the range of possible output values, commonly used as display values in pixel units.


// ---------- 
// 1. Set height, width, padding
// 2. Create scales
// 3. Create SVG element
// 4. Add labels


// Height, width, padding
var w = 500;  
var h = 300;
var padding = 20;

var dataset = [
		[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
		[410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
	      ];

// Create Scales
var xScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                .range([0, w]);			// or if we wanted edge padding: .range([padding, w - padding * 2]);

var yScale = d3.scaleLinear()             
		.domain([0, d3.max(dataset, function (d) { return d[1]; })])
		.range([0, h]); 		// or if we wanted invert/edge padding: .range([h - padding, padding]);

var rScale = d3.scaleLinear()
	    	.domain([0, d3.max(dataset, function(d) { return d[1]; })])
	        .range([2, 5]);

// Create SVG element

var svg = d3.select("body")	// This inserts a new <svg> element just before closing the </body> tag,
	    .append("svg")	// and assigns the given width/height.
	    .attr("width", w + padding)
	    .attr("height", h + padding);

svg.selectAll("circle")		// take all the datapoints and structure them
	    .data(dataset)	// data() binds our data to the elements we're about to create
	    .enter()		// enter() returns a placeholder reference to the new element
            .append("circle")	// append circles to the end of the SVG element
	    .attr("cx", function(d) { return xScale(d[0]); }) // return the scaled element
	    .attr("cy", function(d) { return yScale(d[1]); }) 
	    .attr("r", function(d) { return rScale(d[1]); }); 


// Add Labels
svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d) { return d[0] + "," + d[1]; }) // specify the text elements contents
		.attr("x", function(d) { return xScale(d[0]); }) // specify text position with scale
		.attr("y", function(d) { return yScale(d[0]); }) 
		.attr("r", function(d) { return rScale(d[0]); });
		


// ----------




// Other Methods

nice ()               // rounds inputs (given irrational inputs); [0.19878, 0.9887] -> [0.2, 1.0]

rangeRound()          // rounds to the nearest whole number

clamp()               // rounds to the range's low or high value (whatever is closest)

var scale = d3.scaleLinear()
              .domain([0.123, 4.567])
              .range([0, 500])
              .nice();



// Other Scales

scaleSqrt             // square root 

scalePow              // power scale; "to the power of" some exponent

scaleLog              // logarithmic scale

scaleQuantize         // linear scale with discrete values for its output (if you want to put data into "buckets")

scaleQuantile         // linear scale with discrete values for its input domain (when you already have "buckets")

scaleOrdinal          // ordinal scales use nonquantitative values (like category name) for output

schemeCategory10      // preset ordinal scales that output either 10 or 20 categorical colors
schemeCategory20
schemeCategory20b
schemeCategory20c

scaleTime             // scale method for date and time values, with special handling of ticks for dates
