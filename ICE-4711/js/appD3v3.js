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

// Add X-axis
var xAxis = content.append("a-box")
  .attr("width", chartWidth)
  .attr("height", 0.05)
  .attr("depth", 0.05)
  .attr("position", "0 " + (-chartHeight / 2 - 0.025) + " " + (chartDepth / 2 + 0.025))
  .attr("color", "black");

// Add Y-axis
var yAxis = content.append("a-box")
  .attr("width", 0.05)
  .attr("height", chartHeight)
  .attr("depth", 0.05)
  .attr("position", (-chartWidth / 2 - 0.025) + " 0 " + (chartDepth / 2 + 0.025))
  .attr("color", "black");

// Add Z-axis
var zAxis = content.append("a-box")
  .attr("width", 0.05)
  .attr("height", 0.05)
  .attr("depth", chartDepth)
  .attr("position", (chartWidth / 2 + 0.025) + " -" + (chartHeight / 2 + 0.025) + " 0")
  .attr("color", "black");

// Add X-axis tick marks and labels
for (var i = 0; i < gridMax; i++) {
  var x = i * 1.1 - chartWidth / 2;
  var label = i + 1;
  content.append("a-box")
    .attr("width", 0.05)
    .attr("height", 0.05)
    .attr("depth", 0.05)
    .attr("position", x + " -" + (chartHeight / 2 + 0.075) + " " + (chartDepth / 2 + 0.05))
    .attr("color", "gray");
  content.append("a-text")
    .attr("value", label)
    .attr("position", x + " -" + (chartHeight / 2 + 0.125) + " " + (chartDepth / 2 + 0.05))
    .attr("rotation", "0 0 90")
    .attr("align", "center")
    .attr("width", "1")
    .attr("color", "black");
}

// Add Z-axis tick marks and labels
for (var i = 0; i < Math.ceil(dataset.length / gridMax); i++) {
  var z = i * 1.1 - chartDepth / 2;
  var label = i + 1;
  content.append("a-box")
    .attr("width", 0.05)
    .attr("height", 0.05)
    .attr("depth", 0.05)
    .attr("position", (chartWidth / 2 + 0.05) + " -" + (chartHeight / 2 + 0.075) + " " + z)
    .attr("color", "gray");
  content.append("a-text")
    .attr("value", label)
    .attr("position", (chartWidth /2 + 0.15) + " -" + (chartHeight / 2 + 0.125) + " " + z)
    .attr("align", "center")
    .attr("width", "1")
    .attr("color", "black");
    }
    
    // Add Y-axis tick marks and labels
    var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, 1]);
    
    var yTicks = yScale.ticks(5);
    
    for (var i = 0; i < yTicks.length; i++) {
    var y = yScale(yTicks[i]);
    var label = yTicks[i];
    content.append("a-box")
    .attr("width", 0.05)
    .attr("height", 0.05)
    .attr("depth", 0.05)
    .attr("position", (-chartWidth / 2 - 0.075) + " " + (y * chartHeight - chartHeight / 2 + 0.025) + " 0")
    .attr("color", "gray");
    content.append("a-text")
    .attr("value", label)
    .attr("position", (-chartWidth / 2 - 0.15) + " " + (y * chartHeight - chartHeight / 2 + 0.025) + " 0")
    .attr("align", "right")
    .attr("width", "1")
    .attr("color", "black");
    }
    
    // Add X-axis label
    content.append("a-text")
    .attr("value", "X Axis")
    .attr("position", "0 " + (-chartHeight / 2 - 0.2) + " " + (chartDepth / 2 + 0.2))
    .attr("rotation", "0 0 0")
    .attr("align", "center")
    .attr("width", "2")
    .attr("color", "black");
    
    // Add Y-axis label
    content.append("a-text")
    .attr("value", "Y Axis")
    .attr("position", (-chartWidth / 2 - 0.2) + " " + ((d3.max(yTicks) / 2) * chartHeight - chartHeight / 2) + " 0")
    .attr("rotation", "0 0 -90")
    .attr("align", "center")
    .attr("width", "2")
    .attr("color", "black");
    
    // Add Z-axis label
    content.append("a-text")
    .attr("value", "Z Axis")
    .attr("position", (chartWidth / 2 + 0.2) + " -" + (chartHeight / 2 + 0.2) + " 0")
    .attr("rotation", "0 90 0")
    .attr("align", "center")
    .attr("width", "2")
    .attr("color", "black");
