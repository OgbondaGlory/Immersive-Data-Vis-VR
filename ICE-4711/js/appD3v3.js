var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25, 22, 18, 15, 18, 10];
console.log(dataset.length);

var gridMax = Math.sqrt(dataset.length);
var chartWidth = gridMax * 0.9 + (gridMax - 1) * 0.1;
var chartDepth = Math.ceil(dataset.length / gridMax) * 0.9 + (Math.ceil(dataset.length / gridMax) - 1) * 0.1;

var content = d3.select("#helloworld");

var myBars = content
  .selectAll("a-box.bar")
  .data(dataset)
  .enter()
  .append("a-box")
  .classed("bar", true);

myBars.attr({
  position: function(d, i) {
    var x = i % gridMax;
    var z = Math.floor(i / gridMax);
    var y = d / 4;
    var posX = x * 1.1 - chartWidth / 2;
    var posZ = z * 1.1 - chartDepth / 2;
    return posX + " " + y + " " + posZ;
  },
  height: function(d) {
    return d / 2;
  },
  width: function(d) {
    return 0.9;
  },
  depth: function(d) {
    return 0.9;
  },
  color: function(d) {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});

// Add 3D axis to the chart
var axis = d3.select("#axis")
  .attr("position", "0 0 0")
  .attr("rotation", "-90 0 0");

axis.append("a-cylinder")
  .attr("position", "0 0 " + chartDepth / 2)
  .attr("height", chartWidth)
  .attr("radius", 0.02)
  .attr("rotation", "90 0 0")
  .attr("color", "gray");

axis.append("a-cylinder")
  .attr("position", chartWidth / 2 + " 0 0")
  .attr("height", chartDepth)
  .attr("radius", 0.02)
  .attr("rotation", "0 0 0")
  .attr("color", "gray");

// Add X-axis tick marks and labels
for (var i = 0; i < gridMax; i++) {
  var x = i * 1.1 - chartWidth / 2;
  axis.append("a-cylinder")
  .attr("position", x + " 0 " + chartDepth / 2)
  .attr("height", 0.05)
  .attr("radius", 0.02)
  .attr("rotation", "90 0 0")
  .attr("color", "gray");
  axis.append("a-text")
  .attr("value", i + 1)
  .attr("position", x + " -0.1 " + chartDepth / 2)
  .attr("rotation", "0 0 90")
  .attr("align", "center")
  .attr("width", "1")
  .attr("color", "black");
  }
  
  // Add Z-axis tick marks and labels
  for (var i = 0; i < Math.ceil(dataset.length / gridMax); i++) {
  var z = i * 1.1 - chartDepth / 2;
  axis.append("a-cylinder")
  .attr("position", "0 0 " + z)
  .attr("height", 0.05)
  .attr("radius", 0.02)
  .attr("color", "gray");
  axis.append("a-text")
  .attr("value", i + 1)
  .attr("position", "0 -0.1 " + z)
  .attr("align", "center")
  .attr("width", "1")
  .attr("color", "black");
  }
  
  // Add Y-axis tick marks and labels
  for (var i = 0; i < 6; i++) {
  var y = i * 5 / 4;
  axis.append("a-cylinder")
  .attr("position", "0 " + y + " 0")
  .attr("height", 0.05)
  .attr("radius", 0.02)
  .attr("color", "gray");
  axis.append("a-text")
  .attr("value", i * 5)
  .attr("position", "-0.1 " + y + " 0")
  .attr("align", "right")
  .attr("width", "1")
  .attr("color", "black");
  }
  
  // Add axis labels
  axis.append("a-text")
  .attr("value", "X Axis")
  .attr("position", chartWidth / 2 + " -0.1 " + chartDepth / 2)
  .attr("rotation", "0 0 -90")
  .attr("align", "center")
  .attr("width", "2")
  .attr("color", "black");
  
  axis.append("a-text")
  .attr("value", "Y Axis")
  .attr("position", "0 " + (chartDepth / 2 + 0.2) + " 0")
  .attr("rotation", "-90 0 0")
  .attr("align", "center")
  .attr("width", "2")
  .attr("color", "black");
  
  axis.append("a-text")
  .attr("value", "Z Axis")
  .attr("position", "0 -0.1 " + chartDepth / 2)
  .attr("rotation", "0 0 0")
  .attr("align", "center")
  .attr("width", "2")
  .attr("color", "black");
