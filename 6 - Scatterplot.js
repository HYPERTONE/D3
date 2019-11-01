
// A scatterplot is a common type of visualization that represents two sets of corresponding values on two different
// axes: horizon and vertical x and y.

// In D3 - when using function(d), D3 automatically hands off the current data value as d to your function.


// width and height
			var w = 500;
			var h = 100;
			
			var dataset = [
							[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
							[410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
						  ];
										
			// Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h)
			
			svg.selectAll("circle")	
				.data(dataset)
				.enter()
				.append("circle")
				
				.attr("cx", function(d) {	// the center x is the first element
					return d[0]
				})
				.attr("cy", function(d) {	// the center x is the first element
					return d[1]
				})
	         	// .attr("r", 5);				// radius of 5	
				
				// .attr("r", function(d) {	// set the size to vary by data value (A=pi*r^2)
				//	return Math.sqrt( (h - d[1]) / Math.PI );
				// });
				
				.attr("r", function(d) {	// set the size to vary by data value (A=pi*r^2)
					return Math.sqrt( (h - d[1]) ); // or we can omit pi to simplify things
				});
			
			// Add labels
			svg.selectAll("text") 
				.data(dataset)
				.enter()
				.append("text")
				
				.text(function(d) {
					return d[0] + "," + d[1];
				})
				.attr("x", function(d) {
					return d[0];
				})
				.attr("y", function(d) {
					return d[1]
				})
				.attr("font-family", "sans-serif")
				.attr("font-size", "11px")
				.attr("fill", "red");
