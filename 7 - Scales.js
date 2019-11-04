
// Input Domain
// A scale's input domain is the range of possible input data values.

// Output Range
// A scale's output range is the range of possible output values, commonly used as display values in pixel units.



// Creating a scale

var scale = d3.scaleLinear();

scale.domain([100, 500])    // Set scale input domain
scale.range([10, 350])      // Set output range


// Example


var w = 500;  // width, height, padding
var h = 300;
var padding = 20;

var dataset = [
							[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
							[410, 12], [475, 44], [25, 67], [85, 21], [220, 88], [600, 150]
						  ];

var xScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                .range([0, w]);

var xScale = d3.scaleLinear()             // or if we wanted to create some edge padding
							.domain([0, d3.max(dataset, function (d) { return d[0]; })])
							.range([padding, w - padding * 2]); 





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
