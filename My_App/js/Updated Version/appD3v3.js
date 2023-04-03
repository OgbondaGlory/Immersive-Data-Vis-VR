// var data = {
//   "people": [
//       {
//           "firstName": "Joe",
//           "lastName": "Jackson",
//           "gender": "male",
//           "age": 28,
//           "number": "7349282382"
//       },
//       {
//           "firstName": "James",
//           "lastName": "Smith",
//           "gender": "male",
//           "age": 32,
//           "number": "5678568567"
//       },
//       {
//         "firstName": "James",
//         "lastName": "Smith",
//         "gender": "male",
//         "age": 42,
//         "number": "5678568567"
//     },
//     {
//       "firstName": "James",
//       "lastName": "Smith",
//       "gender": "male",
//       "age": 22,
//       "number": "5678568567"
//   },
//   {
//     "firstName": "James",
//     "lastName": "Smith",
//     "gender": "male",
//     "age": 12,
//     "number": "5678568567"
// },
// {
//   "firstName": "James",
//   "lastName": "Smith",
//   "gender": "male",
//   "age": 32,
//   "number": "5678568567"
// },
//       {
//           "firstName": "Emily",
//           "lastName": "Jones",
//           "gender": "female",
//           "age": 24,
//           "number": "456754675"
//       }
//   ]
// };

// data.people.sort((a, b) => a.age - b.age);

// var names = data.people.map(person => person.firstName);
// var dataset = data.people.map(person => person.age);
// console.log(dataset.length);

// var gridMax = Math.sqrt(dataset.length);
// var chartWidth = gridMax * 0.9 + (gridMax - 1) * 0.1;
// var chartHeight = d3.max(dataset) / 2;
// var chartDepth = Math.ceil(dataset.length / gridMax) * 0.9 + (Math.ceil(dataset.length / gridMax) - 1) * 0.1;

// var content = d3.select("#helloworld");

// console.log(d3.scale);

// var myBars = content
//   .selectAll("a-box.bar")
//   .data(dataset)
//   .enter()
//   .append("a-box")
//   .classed("bar", true)
//   .attr("position", function(d, i) {
//     var x = i % gridMax;
//     var z = Math.floor(i / gridMax);
//     var y = d / 4 - chartHeight / 2;
//     var posX = x * 1.1 - chartWidth / 2 + 0.5;
//     var posZ = -z * 1.1 + chartDepth / 2 - 0.5;
//     return posX + " " + y + " " + posZ;
//   })
//   .attr("height", function(d) {
//     return d / 2;
//   })
//   .attr("width", function(d) {
//     return 0.9;
//   })
//   .attr("depth", function(d) {
//     return 0.9;
//   })
//   .attr("color", function(d) {
//     var letters = "0123456789ABCDEF".split("");
//     var color = "#";
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   });

// // Add X-axis
// var xAxis = content.append("a-box")
//   .attr("width", chartWidth)
//   .attr("height", 0.05)
//   .attr("depth", 0.05)
//   .attr("position", "0 " + (-chartHeight / 2 - 0.025) + " " + (chartDepth / 2 + 0.025))
//   .attr("color", "white");

// // Add Y-axis
// var yAxis = content.append("a-box")
//   .attr("width", 0.05)
//   .attr("height", chartHeight)
//   .attr("depth", 0.05)
//   .attr("position", (-chartWidth / 2 - 0.025) + " 0 " + (chartDepth / 2 + 0.025))
//   .attr("color", "white");

// // Add Z-axis
// var zAxis = content.append("a-box")
//   .attr("width", 0.05)
//   .attr("height", 0.05)
//   .attr("depth", chartDepth)
//   .attr("position", (chartWidth / 2 + 0.025) + " -" + (chartHeight / 2 + 0.025) + " 0")
//   .attr("color", "white");

// // Modify the Y-scale to use d3.nice()
// var yScale = d3.scale.linear()
//   .domain([0, d3.max(dataset)])
//   .range([0, 1])
//   .nice();

// // Create X and Z scales with d3.nice()
// var xScale = d3.scale.linear()
// .domain([0, gridMax - 1])
// .range([0, chartWidth])
// .nice();

// var zScale = d3.scale.linear()
// .domain([0, Math.ceil(dataset.length / gridMax) - 1])
// .range([0, chartDepth])
// .nice();

// // Add X-axis tick marks and labels
// var xTicks = xScale.ticks(gridMax);
// for (var i = 0; i < xTicks.length; i++) {
// var x = xScale(xTicks[i]) - chartWidth / 2;
// var label = xTicks[i] + 1;
// content.append("a-box")
// .attr("width", 0.05)
// .attr("height", 0.05)
// .attr("depth", 0.05)
// .attr("position", x + " -" + (chartHeight / 2 + 0.075) + " " + (chartDepth / 2 - 0.05))
// .attr("color", "gray");
// content.append("a-text")
// .attr("value", label)
// .attr("position", x + " -" + (chartHeight / 2 + 0.125) + " " + (chartDepth / 2 + 0.05))
// .attr("rotation", "0 0 90")
// .attr("align", "center")
// .attr("width", "12")
// .attr("color", "white");
// }

// // Add Z-axis tick marks and labels
// var zTicks = zScale.ticks(Math.ceil(dataset.length / gridMax));
// for (var i = 0; i < zTicks.length; i++) {
// var z = zScale(zTicks[i]) - chartDepth / 2;
// var label = zTicks[i] + 1;
// content.append("a-box")
// .attr("width", 0.05)
// .attr("height", 0.05)
// .attr("depth", 0.05)
// .attr("position", (chartWidth / 2 + 0.05) + " -" + (chartHeight / 2 + 0.075) + " " + z)
// .attr("color", "gray");
// content.append("a-text")
// .attr("value", label)
// .attr("position", (chartWidth / 2 + 0.15) + " -" + (chartHeight / 2 + 0.125) + " " + z)
// .attr("align", "center")
// .attr("width", "12")
// .attr("color", "white");
// }

// function calculateTickCount(minValue, maxValue, scaleFactor) {
// var dataRange = maxValue - minValue;

// // Base calculation using the square root of the data range
// var baseTickCount = Math.ceil(Math.sqrt(dataRange));

// // If the data range is smaller than the maximum value, increase the base tick count
// if (dataRange < maxValue) {
// baseTickCount *= 1.5;
// }

// // Adjust the tick count using the scaleFactor
// return Math.ceil(baseTickCount * scaleFactor);
// }

// // Calculate the number of Y-axis ticks based on the custom function
// var minValue = 0;
// var maxValue = d3.max(dataset);
// var scaleFactor = 1.2; // Adjust this value to change the number of ticks

// var yTickCount = calculateTickCount(minValue, maxValue, scaleFactor);

// // Add Y-axis tick marks and labels
// var yTicks = yScale.ticks(yTickCount);

// for (var i = 0; i < yTicks.length; i++) {
//   var y = yScale(yTicks[i]);
//   var label = yTicks[i];
//   content.append("a-box")
//   .attr("width", 0.05)
//   .attr("height", 0.05)
//   .attr("depth", 0.05)
//   .attr("position", (-chartWidth / 2 - 0.075) + " " + (y * chartHeight - chartHeight / 2 + 0.025) + " " + chartDepth / 2 + 0.05)
//   .attr("color", "gray");
//   content.append("a-text")
//   .attr("value", label)
//   .attr("position", (-chartWidth / 2 - 0.15) + " " + (y * chartHeight - chartHeight / 2 + 0.025) + " " + chartDepth / 2 + 0.05)
//   .attr("align", "right")
//   .attr("width", "12")
//   .attr("color", "white");
//   }
  
//   // Add X-axis label
//   content.append("a-text")
//   .attr("value", "X Axis")
//   .attr("position", "0 " + (-chartHeight / 2 - 0.2) + " " + (chartDepth / 2 + 0.2))
//   .attr("rotation", "0 0 0")
//   .attr("align", "center")
//   .attr("width", "8")
//   .attr("color", "white");
  
//   // Add Y-axis label
//   content.append("a-text")
//   .attr("value", "Y Axis")
//   .attr("position", (-chartWidth / 2 - 0.2) + " " + ((d3.max(yTicks) / 2) * chartHeight - chartHeight / 2) + " 0")
//   .attr("rotation", "0 0 -90")
//   .attr("align", "center")
//   .attr("width", "8")
//   .attr("color", "white");
  
//   // Add Z-axis label
//   content.append("a-text")
//   .attr("value", "Z Axis")
//   .attr("position", (chartWidth / 2 + 0.2) + " -" + (chartHeight / 2 + 0.2) + " 0")
//   .attr("rotation", "0 90 0")
//   .attr("align", "center")
//   .attr("width", "8")
//   .attr("color", "white");
//   function formatTooltipContent(dataPoint) {
//     // Replace this with the appropriate data point properties
//     const { firstName, lastName, gender, age } = dataPoint;
//     return `
//       <strong>Name:</strong> ${firstName} ${lastName}<br>
//       <strong>Gender:</strong> ${gender}<br>
//       <strong>Age:</strong> ${age}
//     `;
//   }
  




// Our More Extensive Code and Edits Begins on this line 


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
  

  //Updated Fucntion of initial Code that uses D3.js to create a 3D bar chart within an A-Frame scene
  //A-Frame has its own way of managing 3D scenes and objects, which is not directly compatible with D3.js. 
  //Instead of using D3.js to create the 3D elements, we used A-Frame components and entities
  //Here's a revised version of the code function that creates an A-Frame 3D bar chart without using D3.js:
  
  function update3DBarChart(data, axes, selectedBar = null) {
    const content = d3.select("#helloworld").html("");
    const dataset = data.sort((a, b) => a[axes.y] - b[axes.y]).map((row) => row[axes.y]);
  
    const maxHeight = Math.max(...dataset);
    const logMaxHeight = Math.log10(maxHeight);
    const scalingFactor = maxHeight > 50 ? 50 / (logMaxHeight * maxHeight) : 1;
    const rescaledMaxHeight = maxHeight * scalingFactor;
  
    const gridMax = Math.ceil(Math.sqrt(dataset.length));
    const chartWidth = gridMax * 0.9 + (gridMax - 1) * 0.1;
    const chartHeight = d3.max(dataset) / 2;
    const chartDepth = gridMax * 0.9 + (gridMax - 1) * 0.1;
  
    const myBars = content.selectAll("a-box.bar")
      .data(dataset)
      .enter()
      .append("a-box")
      .classed("bar", true);
  
    myBars.attr({
      position: function (d, i) {
        const x = i % gridMax;
        const z = Math.floor(i / gridMax);
        const y = (d * scalingFactor) / 4 - chartHeight / 2;
        const posX = x * 1.1 - chartWidth / 2 + 0.45;
        const posZ = -z * 1.1 + chartDepth / 2 - 0.5;
        return `${posX} ${y} ${posZ}`;
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
        if (selectedBar === i) {
          return "red";
        } else {
          return "steelblue";
        }
      },
    });
  
    myBars.on("mouseenter", function (d, i) {
      d3.select(this).attr("color", "red");
    });
  
    myBars.on("mouseleave", function (d, i) {
      if (selectedBar !== i) {
        d3.select(this).attr("color", "steelblue");
      }
    });
  
    myBars.on("click", function (d, i) {
      if (selectedBar === i) {
        selectedBar = null;
      } else {
        selectedBar = i;
      }
  
      update3DBarChart(data, axes, selectedBar);
    });
  
    const xAxis = content.append("a-entity")
      .attr("id", "xAxis")
      .attr("position", `${-chartWidth / 2} ${-chartHeight / 2} ${chartDepth / 2}`);
  
    const yAxis = content.append("a-entity")
      .attr("id", "yAxis")
      .attr("position", `${-chartWidth / 2} ${-chartHeight / 2} ${chartDepth / 2}`);
  
    const zAxis = content.append("a-entity")
      .attr("id", "zAxis")
      .attr("position", `${-chartWidth / 2} ${-chartHeight / 2} ${chartDepth / 2}`);
  
      const xLabels = data.map((d) => d[axes.x]);
      const yLabels = d3.range(0, maxHeight, maxHeight / 5).concat([maxHeight]);
      const zLabels = data.map((d) => d[axes.z]);
    
      addLabels(xAxis, xLabels, "x");
      addLabels(yAxis, yLabels, "y");
      addLabels(zAxis, zLabels, "z");

      // Add scale line boxes for X, Y, and Z axes
var scaleLineWidth = 0.02;
var scaleLineHeight = 0.2;

// Add X-axis scale line box
content.append("a-box")
  .attr("width", chartWidth)
  .attr("height", scaleLineHeight)
  .attr("depth", scaleLineWidth)
  .attr("position", "0 " + (-chartHeight / 2 - scaleLineHeight / 2) + " " + (chartDepth / 2 + scaleLineWidth / 2))
  .attr("color", "blue");

// Add Y-axis scale line box
content.append("a-box")
  .attr("width", scaleLineWidth)
  .attr("height", chartHeight * scalingFactor)
  .attr("depth", scaleLineHeight)
  .attr("position", (-chartWidth / 2 - scaleLineWidth / 2) + " " + ((chartHeight * scalingFactor) / 2 - chartHeight / 2) + " " + (chartDepth / 2 + scaleLineHeight / 2))
  .attr("color", "green");

// Add Z-axis scale line box
content.append("a-box")
  .attr("width", scaleLineHeight)
  .attr("height", scaleLineWidth)
  .attr("depth", chartDepth)
  .attr("position", (chartWidth / 2 + scaleLineHeight / 2) + " " + (-chartHeight / 2 + scaleLineWidth / 2) + " 0")
  .attr("color", "red");

    }
    
    function addLabels(axis, labels, axisName) {
      const axisLabels = axis.selectAll(`a-text.${axisName}Label`)
        .data(labels)
        .enter()
        .append("a-text")
        .classed(`${axisName}Label`, true);
    
      axisLabels.attr({
        value: function (d) {
          return d;
        },
        color: "#fff",
        position: function (d, i) {
          const x = axisName === "x" ? i * 1.1 - chartWidth / 2 : (axisName === "y" ? -chartWidth / 2 - 0.25 : chartWidth / 2 + 0.25);
          const y = axisName === "x" ? -chartHeight / 2 - 0.25 : (axisName === "y" ? i * (rescaledMaxHeight / 5) - chartHeight / 2 + 0.025 : -chartHeight / 2 + 0.25);
          const z = axisName === "x" ? chartDepth / 2 + 0.25 : (axisName === "y" ? chartDepth / 2 + 0.25 : -i * 1.1 + chartDepth / 2);
          return `${x} ${y} ${z}`;
        },
      });
    
      const ticks = axis.selectAll(`a-box.${axisName}Tick`)
        .data(labels)
        .enter()
        .append("a-box")
        .classed(`${axisName}Tick`, true)
        .attr({
          color: "#fff",
          position: function (d, i) {
            const x = axisName === "x" ? i * 1.1 - chartWidth / 2 : (axisName === "y" ? -chartWidth / 2 - 0.125 : chartWidth / 2 + 0.125);
            const y = axisName === "x" ? -chartHeight / 2 + 0.125 : (axisName === "y" ? i * (rescaledMaxHeight / 5) - chartHeight / 2 + 0.025 : -chartHeight / 2 + 0.125);
            const z = axisName === "x" ? chartDepth / 2 + 0.125 : (axisName === "y" ? chartDepth / 2 + 0.125 : -i * 1.1 + chartDepth / 2);
            return `${x} ${y} ${z}`;
          },
          height: 0.02,
          width: axisName === "x" ? 0.02 : 0.05,
          depth: axisName === "z" ? 0.02 : 0.05,
        });
    
      const scaleLines = axis.selectAll(`a-line.${axisName}ScaleLine`)
        .data(labels)
        .enter()
        .append("a-line")
        .classed(`${axisName}ScaleLine`, true)
        .attr("color", "gray");
    
      scaleLines.attr({
        start: function (d, i) {
          if (axisName === "x") {
            return         `${i * 1.1 - chartWidth / 2} ${-chartHeight / 2} ${chartDepth / 2}`;
          } else if (axisName === "y") {
            return `${-chartWidth / 2} ${i * (rescaledMaxHeight / 5) - chartHeight / 2} ${chartDepth / 2}`;
          } else {
            return `${-chartWidth / 2} ${-chartHeight / 2} ${-i * 1.1 + chartDepth / 2}`;
          }
        },
        end: function (d, i) {
          if (axisName === "x") {
            return `${i * 1.1 - chartWidth / 2} ${-chartHeight / 2} ${-chartDepth / 2}`;
          } else if (axisName === "y") {
            return `${chartWidth / 2} ${i * (rescaledMaxHeight / 5) - chartHeight / 2} ${chartDepth / 2}`;
          } else {
            return `${chartWidth / 2} ${-chartHeight / 2} ${-i * 1.1 + chartDepth / 2}`;
          }
        },
      });
    }
    
      
    
  
  
  



  
  const sampleData = [
    { x: "A", y: 10, z: "Z1" },
    { x: "B", y: 20, z: "Z1" },
    { x: "C", y: 30, z: "Z1" },
    { x: "D", y: 40, z: "Z1" },
    { x: "E", y: 50, z: "Z1" },
    { x: "F", y: 60, z: "Z1" },
    { x: "G", y: 70, z: "Z1" },
    { x: "H", y: 80, z: "Z1" },
  ];
  
  const axes = {
    x: "x",
    y: "y",
    z: "z",
  };
  
  // Initialize the 3D bar chart with sample data and axes.
  update3DBarChart(sampleData, axes);
  
  // Add interactivity by updating the chart with new data.
  document.querySelector("#updateData").addEventListener("click", () => {
    const newData = [
      { x: "A", y: Math.random() * 80, z: "Z1" },
      { x: "B", y: Math.random() * 80, z: "Z1" },
      { x: "C", y: Math.random() * 80, z: "Z1" },
      { x: "D", y: Math.random() * 80, z: "Z1" },
      { x: "E", y: Math.random() * 80, z: "Z1" },
      { x: "F", y: Math.random() * 80, z: "Z1" },
      { x: "G", y: Math.random() * 80, z: "Z1" },
      { x: "H", y: Math.random() * 80, z: "Z1" },
    ];
  
    update3DBarChart(newData, axes);
  });
  
  
    

    

    
    






    
    