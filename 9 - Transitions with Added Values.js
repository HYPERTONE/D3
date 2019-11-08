// ---------- 
// ---------- Transitions with added values and elements
// ---------- 

// 1. Declare height, width, padding
// 2. Construct Scale
// 3. Construct Axis/Axes
// 4. Create SVG Element (and bars)
// 5. Create Labels
// 6. Create Axis/Axes

// Adding elements
// 1. Enter new elements
// 2. Update visual attributes of all remaining elements


Whenever there are more data values than corresponding DOM elements, the enter() selection contains references to those elements 
that do not yet exist.


// Removing elements

Whenever there are more DOM elements than data values, the exit() selection contains references to thsoe elements without data.

We can remove one value from the dataset using shift():
dataset.shift();

Exiting elements are those that are on their way out.

remove() is a special transition method that waits until the transition is complete, and then deletes the element from the DOM forever.



// ---------- 
// ---------- Example
// ---------- 


<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>D3: Dynamically adjusting the vertical scale</title>
		<script type="text/javascript" src="../d3.js"></script>
		<style type="text/css">
			/* No style rules here yet */		
		</style>
	</head>
	<body>
	
		<p>Click on this text to update the chart with new data values as many times as you like!</p>
			
		<script type="text/javascript">

			// Height, width
			var w = 600;
			var h = 250;
			
			var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
							11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
			
			var xScale = d3.scaleBand()
							.domain(d3.range(dataset.length))
							.rangeRound([0, w])
							.paddingInner(0.05);

			var yScale = d3.scaleLinear()
							.domain([0, d3.max(dataset)])
							.range([0, h]);
			
			// Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			// Create bars
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
			   		return xScale(i) + xScale.bandwidth() / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");




			// On click, update with new data			
			d3.select("p")
				.on("click", function() {

					// New values for dataset
					var numValues = dataset.length;						 		    // Count original length of dataset
					var maxValue = 100;											          // Highest possible new value
					dataset = [];  						 				 		            // Initialize empty array
					for (var i = 0; i < numValues; i++) {				 		  // Loop numValues times
						var newNumber = Math.floor(Math.random() * maxValue);	// New random integer (0-100)
						dataset.push(newNumber);			 			 		        // Add new number to array
					}
					
					// Update scale domain
					// Recalibrate the scale domain, given the new max value in dataset
					yScale.domain([0, d3.max(dataset)]);

					//Update all rects
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

			
		</script>
	</body>
</html>
