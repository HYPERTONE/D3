// ---------- 
// ---------- Transitions with axes update
// ---------- 

// 1. Declare height, width, padding
// 2. Construct Scale
// 3. Construct Axis/Axes
// 4. Create SVG Element (and bars)
// 5. Create Labels
// 6. Create Axis/Axes

// 1. Add an event listener
// 2. Update data, scale, axes, all rects, all labels

// // For each axis, we do the following:
// 1. Select the axis
// 2. Initiate a transition
// 3. Set the transition's duration
// 4. Call the appropriate axis generator


// There are times when you want to make something happen at the start or end of a transition:

on("start", function() {} ) // expects an anonymous function
on("end", function() {} )

// Be default, only one transition can be active on any given element at any given time.

// ---------- 
// ---------- Clipping Paths
// ---------- 

A clipping path is an SVG element that contains data within the chart boundary/area.

To use a clipping path, we must do the following:

1. Define clipPath and give it an ID.
2. Put visual elements within the clipPath (usually just a rect, but this could be circles or any other visual elements).
3. Add a reference to the clipPath from whatever element(s) you wish to be masked.

Note that the attribute name is 'clip-path' yet the element name is 'clipPath'.





// ---------- 
// ---------- Example
// ---------- 


<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>D3: Transitioning points to randomized values</title>
		<script type="text/javascript" src="../d3.js"></script>
		<style type="text/css">
			/* No style rules here yet */
		</style>
	</head>
	<body>
	
		<p>Click on this text to update the chart with new data values as many times as you like!</p>
	
	
		<script type="text/javascript">

			// Height, width, and padding
			var w = 500;
			var h = 300;
			var padding = 30;
			
			// Dynamic, random dataset
			var dataset = [];											// Initialize empty array
			var numDataPoints = 50;										// Number of dummy data points to create
			var maxRange = Math.random() * 1000;						// Max range of new values
			for (var i = 0; i < numDataPoints; i++) {					// Loop numDataPoints times
				var newNumber1 = Math.floor(Math.random() * maxRange);	// New random integer
				var newNumber2 = Math.floor(Math.random() * maxRange);	// New random integer
				dataset.push([newNumber1, newNumber2]);					// Add new number to array
			}

			// Create scale functions
			var xScale = d3.scaleLinear()
								 .domain([0, d3.max(dataset, function(d) { return d[0]; })])
								 .range([padding, w - padding * 2]);

			var yScale = d3.scaleLinear()
								 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
								 .range([h - padding, padding]);

			// Define X axis
			var xAxis = d3.axisBottom()
							  .scale(xScale)
							  .ticks(5);

			// Define Y axis
			var yAxis = d3.axisLeft()
							  .scale(yScale)
							  .ticks(5);
							  

			// Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
						
						
			// Define clipping path
			svg.append("clipPath")          // note that the element name is clipPath
			   .attr("id", "chart-area")
			   .append("rect")
			   .attr("x", padding)
			   .attr("y", padding)
			   .attr("width", w - padding * 3)
			   .attr("height", h - padding * 2);

			// Create circles
			svg.append("g")             // now we removed svg.selectAll("circle") and instead created
			   .attr("id", "circles") 	// a group 'g' that encompasses all circles
			   .attr("clip-path", "url(#chart-area)") // note that the attribute name is 'clip-path' and the element name was 'clipPath'
			   .selectAll("circle")
			   .data(dataset)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("cy", function(d) {
			   		return yScale(d[1]);
			   })
			   .attr("r", 2);
			
			// Create X axis
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (h - padding) + ")")
				.call(xAxis);
			
			// Create Y axis
			svg.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(" + padding + ",0)")
				.call(yAxis);



			// On click, update with new data			
			d3.select("p")
				.on("click", function() {

					// New values for dataset
					var numValues = dataset.length;						 		// Count original length of dataset
					var maxRange = Math.random() * 1000;						// Max range of new values
					dataset = [];  						 				 		// Initialize empty array
					for (var i = 0; i < numValues; i++) {				 		// Loop numValues times
						var newNumber1 = Math.floor(Math.random() * maxRange);	// New random integer
						var newNumber2 = Math.floor(Math.random() * maxRange);	// New random integer
						dataset.push([newNumber1, newNumber2]);					// Add new number to array
					}
					
					// Update scale domains
					xScale.domain([0, d3.max(dataset, function(d) { return d[0]; })]);
					yScale.domain([0, d3.max(dataset, function(d) { return d[1]; })]);
					
					// Update axes
					svg.select(".x.axis")
					   .transition()
					   .duration(1000)
					   .call(xAxis);
					svg.select(".y.axis")
					   .transition()
					   .duration(1000)
					   .call(yAxis);

					// Update all circles
					svg.selectAll("circle")
					   .data(dataset)
					   .transition()
   					   .duration(1000)
					   .on("start", function() {		// on click, execute this statement
							d3.select(this)				// where 'this' is the current element
							  .attr("fill", "magenta")
							  .attr("r", 3);
						})
					   .attr("cx", function(d) {
					   		return xScale(d[0]);
					   })
					   .attr("cy", function(d) {
					   		return yScale(d[1]);
					   })
					   .on("end", function() {			// on end, execute this statement
							d3.select(this)				// 
							  .transition()				// additional transitions can be thrown in 'end' but not 'start'
							  .duration(1000)
							  .attr("fill", "black")
							  .attr("r", 2);
						});

				});


		</script>
	</body>
</html>
