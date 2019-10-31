
// Scalable Vector Graphs (SVG)

// - Text (XML) based image format
// - Can draw rect, circle, ellipse, line, text


// All SVG properties are specified as attributes:

<element property="value"></element>


<!-- Create SVG Element -->

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











