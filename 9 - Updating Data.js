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



// Height, width, padding
var w = 600;
var h = 250;

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
               11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

// Construct Scale
var xScale = d3.scaleBand()                         // scaleBand is used for ordinal data (think of bins or categories)
               .domain(d3.range(dataset.length))    // returns the full range incremented by 1
               .rangeRound([0, w])                  // rounds to the nearest whole pixel so everything looks crisp
               .paddingInner(0.05);                 // specifies the bands or bars to have padding in between one another

var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset)])
               .range([0, h]);


// Create SVG Element                      
var svg = d3.select("body")         // Insert new <svg> element before </body>
            .append("svg")          // and assigns the given width/height.
            .attr("width", w)
            .attr("height", h);

// Create Bars
svg.selectAll("rect")               // take all the datapoints and structure them
   .data(dataset)
   .enter()                         // return placeholder reference to the new element
   .append("rect")                  // append bars to the end of the SVG element
   .attr("x", function(d, i) {      // x is ordinal, so we associate the index with the ordinal datum
      return xScale(i);
   })
   .attr("y", function(d) {         // y only depends on the data value
      return h - yScale(d);
   })
   .attr("height", function(d) {    // height only depends on the data value
      return yScale(d);
   })
   .attr("fill", function(d) {      // we will change the color depending on the data value
      return "rgb (0, 0, " + Math.round(d * 10) + ")";
   });





