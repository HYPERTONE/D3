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
		<title>D3: Adding and removing values from a chart (dynamic labels included)</title>
		<script type="text/javascript" src="../d3.js"></script>
		<style type="text/css">
			/* No style rules here yet */
		</style>
	</head>
	<body>
	
		<p id="add">Add a new data value</p>
		<p id="remove">Remove a data value</p>
			
		<script type="text/javascript">

// Height and width
var w = 600;
var h = 250;

var dataset = [ { key: 0, value: 5 },				// dataset is now an array of objects.
				{ key: 1, value: 10 },		// Each object has a 'key' and a 'value'.
				{ key: 2, value: 13 },
				{ key: 3, value: 19 },
				{ key: 4, value: 21 },
				{ key: 5, value: 25 },
				{ key: 6, value: 22 },
				{ key: 7, value: 18 },
				{ key: 8, value: 15 },
				{ key: 9, value: 13 },
				{ key: 10, value: 11 },
				{ key: 11, value: 12 },
				{ key: 12, value: 15 },
				{ key: 13, value: 20 },
				{ key: 14, value: 18 },
				{ key: 15, value: 17 },
				{ key: 16, value: 16 },
				{ key: 17, value: 18 },
				{ key: 18, value: 23 },
				{ key: 19, value: 25 } ];

var xScale = d3.scaleBand()				// ordinal data
		.domain(d3.range(dataset.length))
		.rangeRound([0, w])
		.paddingInner(0.05);

var yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, function(d) { return d.value; })])
		.range([0, h]);

// Define key function, to be used when binding data
var key = function(d) {
	return d.key;
};

// Create SVG element
var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

// Create bars
svg.selectAll("rect")
   .data(dataset, key)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
		return xScale(i);
   })
   .attr("y", function(d) {
		return h - yScale(d.value);
   })
   .attr("width", xScale.bandwidth())
   .attr("height", function(d) {
		return yScale(d.value);
   })
   .attr("fill", function(d) {
		return "rgb(0, 0, " + (d.value * 10) + ")";
   });

// Create labels
svg.selectAll("text")
   .data(dataset, key)
   .enter()
   .append("text")
   .text(function(d) {
		return d.value;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
		return xScale(i) + xScale.bandwidth() / 2;
   })
   .attr("y", function(d) {
		return h - yScale(d.value) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white");




// On click, update with new data			
d3.selectAll("p")
	.on("click", function() {

		// See which p was clicked
		var paragraphID = d3.select(this).attr("id");

		// Decide what to do next
		if (paragraphID == "add") {
			//Add a data value
			var minValue = 2;
			var maxValue = 25 - minValue;
			var newNumber = Math.floor(Math.random() * maxValue) + minValue;
			var lastKeyValue = dataset[dataset.length - 1].key;
			dataset.push({
				key: lastKeyValue + 1,
				value: newNumber
			});
		} else {
			// Remove a value
			dataset.shift();	// Remove one value from dataset
		}

		// Update scale domains
		xScale.domain(d3.range(dataset.length));
		yScale.domain([0, d3.max(dataset, function(d) { return d.value; })]);

		// Select…
		var bars = svg.selectAll("rect")
			      .data(dataset, key);

		// Enter…
		bars.enter()
			.append("rect")
			.attr("x", w)
			.attr("y", function(d) {
				return h - yScale(d.value);
			})
			.attr("width", xScale.bandwidth())
			.attr("height", function(d) {
				return yScale(d.value);
			})
			.attr("fill", function(d) {
				return "rgb(0, 0, " + (d.value * 10) + ")";
			})
			.merge(bars)	// Update… (updates the enter() selections)
			.transition()
			.duration(500)
			.attr("x", function(d, i) {
				return xScale(i);
			})
			.attr("y", function(d) {
				return h - yScale(d.value);
			})
			.attr("width", xScale.bandwidth())
			.attr("height", function(d) {
				return yScale(d.value);
			});

		// Exit…
		bars.exit()
			.transition()
			.duration(500)
			.attr("x", -xScale.bandwidth())
			.remove();



		// Update all labels

		// Select…
		var labels = svg.selectAll("text")
			.data(dataset, key);

		// Exit…
		labels.exit()
			.transition()
			.duration(500)
			.attr("x", -xScale.bandwidth())
			.remove();

		// Enter…
		labels.enter()
			.append("text")
			.text(function(d) {
				return d.value;
			})
			.attr("text-anchor", "middle")
			.attr("x", w)
			.attr("y", function(d) {
				return h - yScale(d.value) + 14;
			})						
		   .attr("font-family", "sans-serif")
		   .attr("font-size", "11px")
		   .attr("fill", "white")
		   .merge(labels)	// Update…
		   .transition()
		   .duration(500)
		   .attr("x", function(d, i) {
				return xScale(i) + xScale.bandwidth() / 2;
		   });

	});


		</script>
	</body>
</html>
