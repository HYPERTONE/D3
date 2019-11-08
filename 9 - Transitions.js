
// ---------- 
// ---------- Updating Data
// ---------- 

// 1. Declare height, width, padding
// 2. Construct Scale
// 3. Construct Axis/Axes
// 4. Create SVG Element (and bars)
// 5. Create Labels
// 6. Create Axis/Axes

// 1. Add an event listener
// 2. Rebind new values to existing elements
// 3. Update visual attributes, referencing the data values


transition() // D3 evaluates every attr() statement immediately and thus transitions them in time
duration() // Controls the transition() time; default is 250 ms; must be specified after transition()
ease(d3.easeLinear) // Controls the quality of motion ('easing into place')
  ease(d3.easeCircleIn) // ease in until elements snap into place
  ease(d3.easeElasticOut) // springy
  ease(d3.easeBounceOut) // like a ball bouncing and coming to rest
delay() // specifies when the transition() begins; the delay happens first, followed by the transition itself




// Height, width, padding
var w = 600;
var h = 250;

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
							11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

// Construct Scales
var xScale = d3.scaleBand()         // ordinal data scale
               .domain(d3.range(dataset.length))
               .rangeRound([0, w])
               .paddingInner(0.05);

var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset)])
               .range([0, h]);
               
               
// Create SVG Element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)

// Create Bars
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
      return xScale(i);
   })
   .attr("y", function(d) {
      return h - yScale(d);
   })
   .attr("width", xScale.bandwidth())
   .attr("height", function(d) {
      return yScale(d);
   })
   .attr("fill", function(d) {
    return "rgb(0, 0, " + Math.round(d * 10) + ")";
   });
        

// Create labels
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
      return d;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
      return xScale(i) + xScale.bandwidth() / 2; // let D3 carry out the padding using bandwidth()
   })
   .attr("y", function(d) {
      return h - yScale(d) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white");    
         
         
         
//On click, update with new data
d3.select("p")
  .on("click", function() {

    //New values for dataset
    var numValues = dataset.length;						// Count original length of dataset
    var maxValue = 100;											// Highest possible new value
    dataset = [];  						 				 		// Initialize empty array
    for (var i = 0; i < numValues; i++) {				 		// Loop numValues times
      var newNumber = Math.floor(Math.random() * maxValue);	//New random integer (0-100)
      dataset.push(newNumber);			 			 		// Add new number to array
    }

    // Update scale domain
    // Recalibrate the scale domain, given the new max value in dataset
    yScale.domain([0, d3.max(dataset)]);

    // Update all rects
    svg.selectAll("rect")
       .data(dataset)
       .transition()
       .delay(function(d, i) {
         return i / dataset.length * 1000;
       })
       .duration(500)
       .attr("y", function(d) {
          return h - yScale(d);
       })
       .attr("height", function(d) {
          return yScale(d);
       })
       .attr("fill", function(d) {
        return "rgb(0, 0, " + Math.round(d * 10) + ")";
       });

    // Update all labels
    svg.selectAll("text")
       .data(dataset)
       .transition()
       .delay(function(d, i) {
         return i / dataset.length * 1000;
       })
       .duration(500)
       .text(function(d) {
          return d;
       })
       .attr("x", function(d, i) {
          return xScale(i) + xScale.bandwidth() / 2;
       })
       .attr("y", function(d) {
          return h - yScale(d) + 14;
       });

  });
   
         
         
         
         
         
         
