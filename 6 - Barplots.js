
// [Scalable Vector Graphs (SVG)]

// - Text (XML) based image format
// - Can draw rect, circle, ellipse, line, text


// All SVG properties are specified as attributes:
<element property="value"></element>

//////////////////////////////
// <!-- Create SVG Element --> Circle
//////////////////////////////


// Width and Height
var w = 500; 
var h = 50;


var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);



var dataset = [ 5, 10, 15, 20, 25 ];

var circles = svg.selectAll("circle") // selectAll() will return empty references to all circles (which don't exist yet)
                  .data(dataset)      // data() binds our data to the elements we're about to create
                  .enter()            // enter() returns a placeholder reference to the new element
                  .append("circle");  // append() adds a circle to the DOM - in this case appending circles to the end of the SVG element


circles.attr("cx", function(d, i) {   // cx is the x-position value of the center of the circle
            return (i * 50) + 25;     // d is the data value; i is the index value (auto populated by D3)
        })                            // so each circle is getting pushed to the right (0 * 50) + 25, etc.
        .attr("cy", h/2)              // cy is the y-position value of the center of each circle (h = 50)
        .attr("r", function (d) {     // r is the radius of the circle, which we set to the data value
              return d;
        });


// Add some color
circles.attr("fill", "yellow")
       .attr("stroke", "orange")
       .attr("stroke-width", function(d) {
             return d/2;
        });




//////////////////////////////
// <!-- Create SVG Element --> Rect
//////////////////////////////

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
               11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

// Width and Height
var w = 500; 
var h = 100;
var barPadding = 1;

var svg = d3.select("body")         // This inserts a new <svg> element just before closing the </body> tag,
            .append("svg")          // and assigns the given width/height.
            .attr("width", w / dataset.length - barPadding)
            .attr("height", h);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {				// x location
		return i * (w / dataset.length); 
	})                   
    .attr("y", function(d) {				// y location
		return h - (d * 4);
	})                   
    .attr("width", w / dataset.length - barPadding)                     // width of rect
    .attr("height", function(d) {
		return d * 4; 										// height of rect
	})
	.attr("fill", function(d) {
		return "rgb(0, 0, " + Math.round(d * 10) + ")";
	});
	
	
svg.selectAll("text")					// add text labels to plot
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
		return d;
   })
   .attr("x", function(d, i) {				// position label values
		return i * (w / dataset.length) + 		// set the x-pos to the left edge of
		(w / dataset.length - barPadding) / 2;	// each bar plus half the bar width
   })
   .attr("y", function(d) {
		return h - (d * 4) + 14;		// offset them so they're even
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")				// set font size and color
   .attr("fill", "white")
   .attr("text-anchor", "middle");				// anchor text
           












