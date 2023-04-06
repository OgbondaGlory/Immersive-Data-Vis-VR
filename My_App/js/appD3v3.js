var data = {
  "people": [
      {
          "firstName": "Joe",
          "lastName": "Jackson",
          "gender": "male",
          "age": 28,
          "number": "7349282382"
      },
      {
          "firstName": "James",
          "lastName": "Smith",
          "gender": "male",
          "age": 32,
          "number": "5678568567"
      },
      {
        "firstName": "James",
        "lastName": "Smith",
        "gender": "male",
        "age": 42,
        "number": "5678568567"
    },
    {
      "firstName": "James",
      "lastName": "Smith",
      "gender": "male",
      "age": 22,
      "number": "5678568567"
  },
  {
    "firstName": "James",
    "lastName": "Smith",
    "gender": "male",
    "age": 12,
    "number": "5678568567"
},
{
  "firstName": "James",
  "lastName": "Smith",
  "gender": "male",
  "age": 32,
  "number": "5678568567"
},
      {
          "firstName": "Emily",
          "lastName": "Jones",
          "gender": "female",
          "age": 24,
          "number": "456754675"
      }
  ]
};

data.people.sort((a, b) => a.age - b.age);

var names = data.people.map(person => person.firstName);
var dataset = data.people.map(person => person.age);
console.log(dataset.length);

var gridMax = Math.sqrt(dataset.length);
var chartWidth = gridMax * 0.9 + (gridMax - 1) * 0.1;
var chartHeight = d3.max(dataset) / 2;
var chartDepth = Math.ceil(dataset.length / gridMax) * 0.9 + (Math.ceil(dataset.length / gridMax) - 1) * 0.1;

var content = d3.select("#helloworld");

console.log(d3.scale);

var myBars = content
  .selectAll("a-box.bar")
  .data(dataset)
  .enter()
  .append("a-box")
  .classed("bar", true)
  .attr("position", function(d, i) {
    var x = i % gridMax;
    var z = Math.floor(i / gridMax);
    var y = d / 4 - chartHeight / 2;
    var posX = x * 1.1 - chartWidth / 2 + 0.5;
    var posZ = -z * 1.1 + chartDepth / 2 - 0.5;
    return posX + " " + y + " " + posZ;
  })
  .attr("height", function(d) {
    return d / 2;
  })
  .attr("width", function(d) {
    return 0.9;
  })
  .attr("depth", function(d) {
    return 0.9;
  })
  .attr("color", function(d) {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  });

// Add X-axis
var xAxis = content.append("a-box")
  .attr("width", chartWidth)
  .attr("height", 0.05)
  .attr("depth", 0.05)
  .attr("position", "0 " + (-chartHeight / 2 - 0.025) + " " + (chartDepth / 2 + 0.025))
  .attr("color", "white");

// Add Y-axis
var yAxis = content.append("a-box")
  .attr("width", 0.05)
  .attr("height", chartHeight)
  .attr("depth", 0.05)
  .attr("position", (-chartWidth / 2 - 0.025) + " 0 " + (chartDepth / 2 + 0.025))
  .attr("color", "white");

// Add Z-axis
var zAxis = content.append("a-box")
  .attr("width", 0.05)
  .attr("height", 0.05)
  .attr("depth", chartDepth)
  .attr("position", (chartWidth / 2 + 0.025) + " -" + (chartHeight / 2 + 0.025) + " 0")
  .attr("color", "white");

// Modify the Y-scale to use d3.nice()
var yScale = d3.scale.linear()
  .domain([0, d3.max(dataset)])
  .range([0, 1])
  .nice();

// Create X and Z scales with d3.nice()
var xScale = d3.scale.linear()
.domain([0, gridMax - 1])
.range([0, chartWidth])
.nice();

var zScale = d3.scale.linear()
.domain([0, Math.ceil(dataset.length / gridMax) - 1])
.range([0, chartDepth])
.nice();

// Add X-axis tick marks and labels
var xTicks = xScale.ticks(gridMax);
for (var i = 0; i < xTicks.length; i++) {
var x = xScale(xTicks[i]) - chartWidth / 2;
var label = xTicks[i] + 1;
content.append("a-box")
.attr("width", 0.05)
.attr("height", 0.05)
.attr("depth", 0.05)
.attr("position", x + " -" + (chartHeight / 2 + 0.075) + " " + (chartDepth / 2 - 0.05))
.attr("color", "gray");
content.append("a-text")
.attr("value", label)
.attr("position", x + " -" + (chartHeight / 2 + 0.125) + " " + (chartDepth / 2 + 0.05))
.attr("rotation", "0 0 90")
.attr("align", "center")
.attr("width", "12")
.attr("color", "white");
}

// Add Z-axis tick marks and labels
var zTicks = zScale.ticks(Math.ceil(dataset.length / gridMax));
for (var i = 0; i < zTicks.length; i++) {
var z = zScale(zTicks[i]) - chartDepth / 2;
var label = zTicks[i] + 1;
content.append("a-box")
.attr("width", 0.05)
.attr("height", 0.05)
.attr("depth", 0.05)
.attr("position", (chartWidth / 2 + 0.05) + " -" + (chartHeight / 2 + 0.075) + " " + z)
.attr("color", "gray");
content.append("a-text")
.attr("value", label)
.attr("position", (chartWidth / 2 + 0.15) + " -" + (chartHeight / 2 + 0.125) + " " + z)
.attr("align", "center")
.attr("width", "12")
.attr("color", "white");
}

function calculateTickCount(minValue, maxValue, scaleFactor) {
var dataRange = maxValue - minValue;

// Base calculation using the square root of the data range
var baseTickCount = Math.ceil(Math.sqrt(dataRange));

// If the data range is smaller than the maximum value, increase the base tick count
if (dataRange < maxValue) {
baseTickCount *= 1.5;
}

// Adjust the tick count using the scaleFactor
return Math.ceil(baseTickCount * scaleFactor);
}

// Calculate the number of Y-axis ticks based on the custom function
var minValue = 0;
var maxValue = d3.max(dataset);
var scaleFactor = 1.2; // Adjust this value to change the number of ticks

var yTickCount = calculateTickCount(minValue, maxValue, scaleFactor);

// Add Y-axis tick marks and labels
var yScale = d3.scale.linear()
  .domain([minHeight * scalingFactor, d3.max(dataset) * scalingFactor])
  .range([0, chartHeight * scalingFactor])
  .nice();

// Add Y-axis tick marks and labels
var yTicks = yScale.ticks(yTickCount);
for (var i = 0; i < yTicks.length; i++) {
  var scaledY = yTicks[i] - minHeight * scalingFactor;
  var label = yTicks[i] / scalingFactor; // Divide by scalingFactor to get the original value

  content.append("a-box")
    .attr("width", 0.05)
    .attr("height", 0.05)
    .attr("depth", 0.05)
    .attr("position", (-chartWidth / 2 - 0.075) + " " + ((scaledY / 2) + yOffset) + " " + (chartDepth / 2 + 0.025))
    .attr("color", "white");

  content.append("a-text")
    .attr("value", label)
    .attr("position", (-chartWidth / 2 - 0.125) + " " + ((scaledY / 2) + yOffset) + " " + (chartDepth / 2 + 0.025))
    .attr("rotation", "0 0 0")
    .attr("align", "right")
    .attr("width", "12")
    .attr("color", "white");
}
  
  // Add X-axis label
  content.append("a-text")
  .attr("value", "X Axis")
  .attr("position", "0 " + (-chartHeight / 2 - 0.2) + " " + (chartDepth / 2 + 0.2))
  .attr("rotation", "0 0 0")
  .attr("align", "center")
  .attr("width", "8")
  .attr("color", "white");
  
  // Add Y-axis label
  content.append("a-text")
  .attr("value", "Y Axis")
  .attr("position", (-chartWidth / 2 - 0.2) + " " + ((d3.max(yTicks) / 2) * chartHeight - chartHeight / 2) + " 0")
  .attr("rotation", "0 0 -90")
  .attr("align", "center")
  .attr("width", "8")
  .attr("color", "white");
  
  // Add Z-axis label
  content.append("a-text")
  .attr("value", "Z Axis")
  .attr("position", (chartWidth / 2 + 0.2) + " -" + (chartHeight / 2 + 0.2) + " 0")
  .attr("rotation", "0 90 0")
  .attr("align", "center")
  .attr("width", "8")
  .attr("color", "white");
  function formatTooltipContent(dataPoint) {
    // Replace this with the appropriate data point properties
    const { firstName, lastName, gender, age } = dataPoint;
    return `
      <strong>Name:</strong> ${firstName} ${lastName}<br>
      <strong>Gender:</strong> ${gender}<br>
      <strong>Age:</strong> ${age}
    `;
  }
  







  function getMousePositionRelativeToPage(event) {
    const { pageX, pageY } = event;
    return { x: pageX, y: pageY };
  }
  
  const undoStack = [];
  const redoStack = [];
  
  function saveSceneState() {
    const scene = document.querySelector('a-scene');
    const sceneState = scene.innerHTML;
    undoStack.push(sceneState);
    localStorage.setItem('savedSceneState', sceneState);
  }
  
  function undo() {
    if (undoStack.length === 0) {
      return;
    }
  
    const currentState = undoStack.pop();
    redoStack.push(currentState);
  
    if (undoStack.length > 0) {
      const prevState = undoStack[undoStack.length - 1];
      const scene = document.querySelector('a-scene');
      scene.innerHTML = prevState;
      localStorage.setItem('savedSceneState', prevState);
    }
  }
  
  function redo() {
    if (redoStack.length === 0) {
      return;
    }
  
    const nextState = redoStack.pop();
    undoStack.push(nextState);
  
    const scene = document.querySelector('a-scene');
    scene.innerHTML = nextState;
    localStorage.setItem('savedSceneState', nextState);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const savedSceneState = localStorage.getItem('savedSceneState');
    if (savedSceneState) {
      const scene = document.querySelector('a-scene');
      scene.innerHTML = savedSceneState;
      undoStack.push(savedSceneState);
    }
  
    const helloworld = document.querySelector('#helloworld');
  
    helloworld.addEventListener('componentchanged', (event) => {
      if (event.detail.name === 'position' || event.detail.name === 'rotation' || event.detail.name === 'scale') {
        saveSceneState();
        }
        });
        
        const undoBtn = document.querySelector('#undo');
        const redoBtn = document.querySelector('#redo');
        
        undoBtn.addEventListener('click', () => {
        undo();
        });
        
        redoBtn.addEventListener('click', () => {
        redo();
        });
        });
  

        function createColorScale(minHeight, maxHeight) {
          const colorDomain = [
            minHeight,
            minHeight + (maxHeight - minHeight) / 3,
            minHeight + (2 * (maxHeight - minHeight)) / 3,
            maxHeight,
          ];
        
          const colorRange = [
            "steelblue", // Low height
            "orange", // Medium height
            "red", // High height
          ];
        
          const colorScale = d3.scale.linear()
            .domain(colorDomain)
            .range(colorRange)
            .interpolate(d3.interpolateHcl);
        
          return colorScale;
        }
        
        

        function update3DBarChart(tableData, axes, tableName,selectedBar = null) {

          // Clear existing content
          var content = d3.select("#helloworld").html("");
        
          // Map the dataset from tableData using only axes.y and sort it
          var dataset = tableData
            .sort((a, b) => a[axes.y] - b[axes.y])
            .map((row) => row[axes.y]);
        
          const maxHeight = Math.max(...dataset);
          const logMaxHeight = Math.log10(maxHeight);
          const scalingFactor = maxHeight > 50 ? 50 / (logMaxHeight * maxHeight) : 1;
        
          const minHeight = Math.min(...dataset);
          const yOffset = (minHeight * scalingFactor) / 4;
        
          // Calculate the number of Y-axis ticks based on the custom function
          var minValue = 0;
          var maxValue = d3.max(dataset);
          var scaleFactor = 1.2; // Adjust this value to change the number of ticks
        
          var gridMax = Math.ceil(Math.sqrt(dataset.length));
          var chartWidth = gridMax * 0.9 + (gridMax - 1) * 0.1;
          var chartHeight = d3.max(dataset) / 2;
          var chartDepth = gridMax * 0.9 + (gridMax - 1) * 0.1;
        
          // Create the color scale
          const colorScale = createColorScale(minValue, maxValue);
        
          var myBars = content
            .selectAll("a-box.bar")
            .data(dataset)
            .enter()
            .append("a-box")
            .classed("bar", true);
        
          myBars.attr({
            position: function (d, i) {
              var x = i % gridMax;
              var z = Math.floor(i / gridMax);
              var y = (d * scalingFactor - minHeight * scalingFactor) / 4;
              var posX = x * 1.1 - chartWidth / 2 + 0.45;
              var posZ = -z * 1.1 + chartDepth / 2 - 0.5;
              return posX + " " + y + " " + posZ;
            },
            height: function (d) {
              return (d * scalingFactor) / 2;
            },
            width: function (d) {
              return 0.9;
            },
            depth: function (d) {
              return 0.9;
            },
            color: function (d, i) {
              const barHeight = d * scalingFactor;
              if (selectedBar === i) {
                return "red";
              } else {
                return colorScale(barHeight);
              }
            },
        
            "data-original-color": function (d) {
              const barHeight = d * scalingFactor;
              return colorScale(barHeight);
            },
        
          });
// Add a title to the chart
content.append("a-text")
.attr("value", tableName + " Distribution")
.attr("position", (chartWidth / 2 + 6.5) + " " + (chartHeight / 2 + 0.4) + " 0") // Adjust the x-coordinate to move the title to the right
.attr("rotation", "0 0 0")
.attr("align", "center")
.attr("baseline", "top")
.attr("width", "10")
.attr("color", "white");

// Create the legend items
const legendItems = [
  { label: "Low", color: "steelblue" },
  { label: "Medium", color: "orange" },
  { label: "High", color: "red" },
];

// Add a legend to the chart
var legend = content
.append("a-entity")
.attr("id", "legend")
.attr("position", (-chartWidth / 2 - 6.5) + " " + (chartHeight / 2 + 0.2) + " " + (-chartDepth / 2));

// Add legend items
var legendItem = legend.selectAll(".legend-item")
.data(legendItems)
.enter()
.append("a-entity")
.attr("class", "legend-item");

// Add legend color box
legendItem.append("a-box")
.attr("height", 1.5)
.attr("width", 1.5)
.attr("depth", 0.3)
.attr("color", (d) => d.color)
.attr("position", (d, i) => "0 " + (-i * 1.7) + " 0"); // Adjust the y-coordinate to accommodate the larger boxes

// Add legend label
legendItem.append("a-text")
.attr("value", (d) => d.label)
.attr("position", (d, i) => "2 " + (-i * 1.7 + 0.75) + " 0") // Adjust the x and y coordinates to align with the larger boxes
.attr("align", "left")
.attr("baseline", "center")
.attr("width", "10.5")
.attr("color", "white");



 // Add a function to determine if two data points are related based on their values
 function areRelated(value1, value2, tolerance) {
  return Math.abs(value1 - value2) <= tolerance;
}
  // ... existing code ...

// Add the VR tooltip to the 'mouseenter' event listener
myBars.on("mouseenter", function (d, i) {
  const tooltip = document.getElementById("tooltip");
  const tooltipContent = tooltip.querySelector(".tooltip-content");
  const vrTooltip = document.getElementById("vr-tooltip");
  const vrTooltipContent = document.getElementById("vr-tooltip-content");
  const columns = [axes.x, axes.y, axes.z];
  const formattedContent = formatTooltipContent(tableData[i], columns);
  const vrFormattedContent = formatVRTooltipContent(tableData[i], columns);

  tooltipContent.innerHTML = formattedContent;
  tooltip.style.display = "block";

  vrTooltipContent.setAttribute("value", vrFormattedContent);
  vrTooltip.setAttribute("visible", true);

  const bar = this;
  const barPosition = bar.getAttribute("position");

  const barHeight = d * scalingFactor / 2;
  const tooltipOffset = -10; // Adjust this value to change the distance between the tooltip and the bar in the VR scene

  // Calculate the position of the VR tooltip relative to the bar
  vrTooltip.setAttribute("position", {
    x: parseFloat(barPosition.x),
    y: parseFloat(barPosition.y) + barHeight + tooltipOffset,
    z: parseFloat(barPosition.z),
  });

 // Change opacity on hover
 // Store the original color and set the new color with reduced opacity
 const isSelected = bar.getAttribute("data-selected") === "true";
 if (!isSelected) {
   const originalColor = bar.getAttribute("material").color;
   bar.setAttribute("data-original-color", originalColor);
   bar.setAttribute("material", { color: originalColor, opacity: 0.5, transparent: true });
 }

});

// Add the VR tooltip to the 'mouseleave' event listener
myBars.on("mouseleave", function () {
  const tooltip = document.getElementById("tooltip");
  const vrTooltip = document.getElementById("vr-tooltip");
  tooltip.style.display = "none";
  vrTooltip.setAttribute("visible", false);

   // Reset the color and opacity when the mouse leaves
   const bar = this;
   const isSelected = bar.getAttribute("data-selected") === "true";
   const originalColor = bar.getAttribute("data-original-color");
 
   if (!isSelected) {
     bar.setAttribute("material", { color: originalColor, opacity: 1, transparent: false });
   }
});

// Add the VR tooltip to the 'mousemove' event listener
myBars.on("mousemove", function (d, i) {
  const mousePosition = getMousePositionRelativeToPage(d3.event);
  const tooltip = document.getElementById("tooltip");
  const vrTooltip = document.getElementById("vr-tooltip");
  const bar = this;
  const barPosition = bar.getAttribute("position");

  tooltip.style.left = `${mousePosition.x + 10}px`;
  tooltip.style.top = `${mousePosition.y - 10}px`;

  const barHeight = d * scalingFactor / 2;
  const tooltipOffsetY = 0.1; // Adjust this value to change the distance between the tooltip and the bar (Y-axis)
  const tooltipOffsetZ = 0.1; // Adjust this value to change the distance between the tooltip and the bar (Z-axis)
  vrTooltip.setAttribute("position", {
    x: parseFloat(barPosition.x),
    y: parseFloat(barPosition.y) + barHeight + tooltipOffsetY,
    z: parseFloat(barPosition.z) + tooltipOffsetZ,
  });
});

// Modify the 'click' event listener to toggle the "selected" state and change the color to green
myBars.on("click", function (d, i) {
  const bar = this;
  const isSelected = bar.getAttribute("data-selected") === "true";
  const originalColor = bar.getAttribute("data-original-color");

  if (isSelected) {
    // Reset the color when the bar is deselected
    bar.setAttribute("material", { color: originalColor });
    bar.setAttribute("data-selected", "false");
  } else {
    // Set the color to light green when the bar is selected
    bar.setAttribute("material", { color: "#90EE90" });
    bar.setAttribute("data-selected", "true");
  }
});

// Add scale line boxes for X, Y, and Z axes
var scaleLineWidth = 0.05;
var scaleLineHeight = 0.05;

// Add X-axis scale line box
content.append("a-box")
  .attr("width", chartWidth)
  .attr("height", scaleLineHeight)
  .attr("depth", scaleLineWidth)
  .attr("position", "0 " + (-yOffset - 0.075) + " " + (chartDepth / 2 + 0.025))
  .attr("color", "white");

// Add Y-axis scale line box
content.append("a-box")
  .attr("width", scaleLineWidth)
  .attr("height", chartHeight * scalingFactor)
  .attr("depth", scaleLineHeight)
  .attr("position", (-chartWidth / 2 - 0.075) + " " + ((chartHeight * scalingFactor) / 2 - yOffset) + " " + (chartDepth / 2 + 0.025))
  .attr("color", "white");

// Add Z-axis scale line box
content.append("a-box")
  .attr("width", scaleLineHeight)
  .attr("height", scaleLineWidth)
  .attr("depth", chartDepth)
  .attr("position", (chartWidth / 2 + 0.25) + " " + (-yOffset - 0.075) + " 0")
  .attr("color", "white");

            // Modify the Y-scale to use d3.nice()
            var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset) * scalingFactor])
            .range([0, 1])
              .nice();

            var xScale = d3.scale.linear()
            .domain([0, gridMax - 1])
            .range([0, chartWidth + 0.2])
            .nice();
          
            var zScale = d3.scale.linear()
                .domain([0, Math.ceil(dataset.length / gridMax) - 1])
                .range([0, chartDepth])
                .nice();

// Add X-axis tick marks and labels
var xTicks = Array.from({ length: gridMax }, (_, i) => i);
for (var i = 0; i < xTicks.length; i++) {
  var x = xScale(xTicks[i]);
  var label = xTicks[i];
    content.append("a-box")
    .attr("width", 0.05)
    .attr("height", 0.05)
    .attr("depth", 0.05)
    .attr("position", (x * 1.1 - chartWidth / 2) + " " + (-yOffset - 0.075) + " " + (chartDepth / 2 + 0.05))
    .attr("color", "white");

    content.append("a-text")
    .attr("value", label)
    .attr("position", (x * 1.1 - chartWidth / 2) + " " + (-yOffset - 0.125) + " " + (chartDepth / 2 + 0.05))
    .attr("rotation", "0 0 90")
    .attr("align", "center")
    .attr("width", "12")
    .attr("color", "white");
  
}

            console.log("test")
            console.log(content)

// Add Z-axis tick marks and labels
var zTicks = zScale.ticks(Math.ceil(dataset.length / gridMax));
for (var i = 0; i < zTicks.length; i++) {
    var z = zScale(zTicks[i]) - chartDepth / 2;
    var label = zTicks[i] + 1;
  content.append("a-box")
    .attr("width", 0.05)
    .attr("height", 0.05)
    .attr("depth", 0.05)
    .attr("position", (chartWidth / 2 + 0.05) + " " + (-yOffset - 0.075) + " " + z)
    .attr("color", "white");
  content.append("a-text")
    .attr("value", label)
    .attr("position", (chartWidth / 2 + 0.15) + " " + (-yOffset - 0.125) + " " + z)
    .attr("align", "center")
    .attr("width", "12")
    .attr("color", "white");
    }

                function calculateTickCount(minValue, maxValue, scaleFactor) {
                  var dataRange = maxValue - minValue;
                            
                  // Base calculation using the square root of the data range
                  var baseTickCount = Math.ceil(Math.sqrt(dataRange));
                            
                  // If the data range is smaller than the maximum value, increase the base tick count
                  if (dataRange < maxValue) {
                      baseTickCount *= 1.5;
                  }
                            
                  // Adjust the tick count using the scaleFactor
                  return Math.ceil(baseTickCount * scaleFactor);
              }
              
var yTickCount = calculateTickCount(minValue, maxValue, scaleFactor);

// Add Y-axis tick marks and labels
var yTicks = yScale.ticks(yTickCount);
for (var i = 0; i < yTicks.length; i++) {
  var scaledY = yTicks[i] - minHeight * scalingFactor;
  var label = yTicks[i] / scalingFactor; // Divide by scalingFactor to get the original value

  content.append("a-box")
    .attr("width", 0.05)
    .attr("height", 0.05)
    .attr("depth", 0.05)
    .attr("position", (-chartWidth / 2 - 0.075) + " " + ((scaledY / 2) + yOffset) + " " + (chartDepth / 2 + 0.025))
    .attr("color", "white");

  content.append("a-text")
    .attr("value", label)
    .attr("position", (-chartWidth / 2 - 0.125) + " " + ((scaledY / 2) + yOffset) + " " + (chartDepth / 2 + 0.025))
    .attr("rotation", "0 0 0")
    .attr("align", "right")
    .attr("width", "12")
    .attr("color", "white");
}
               // Add X-axis label
                content.append("a-text")
                .attr("value", "X Axis")
                .attr("position", "0 " + (-chartHeight / 2 - 0.2) + " " + (chartDepth / 2 + 0.2))
                .attr("rotation", "0 0 0")
                .attr("align", "center")
                .attr("width", "12")
                .attr("color", "white");
                
                // Add Y-axis label
                content.append("a-text")
                .attr("value", "Y Axis")
                .attr("position", (-chartWidth / 2 - 0.2) + " " + ((d3.max(yTicks) / 2) * chartHeight - chartHeight / 2) + " 0")
                .attr("rotation", "0 0 -90")
                .attr("align", "center")
                .attr("width", "12")
                .attr("color", "white");
                
                // Add Z-axis label
                content.append("a-text")
                .attr("value", "Z Axis")
                .attr("position", (chartWidth / 2 + 0.2) + " -" + (chartHeight / 2 + 0.2) + " 0")
                .attr("rotation", "0 90 0")
                .attr("align", "center")
                .attr("width", "12")
                .attr("color", "white");
                

    
    }
    

    

    
    






    
    