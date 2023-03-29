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

var dataset = data.people.map(person => person.age);console.log(dataset.length);

var gridMax = Math.sqrt(dataset.length);
var chartWidth = gridMax * 0.9 + (gridMax - 1) * 0.1;
var chartHeight = d3.max(dataset) / 2 ;
var chartDepth = Math.ceil(dataset.length / gridMax) * 0.9 + (Math.ceil(dataset.length / gridMax) - 1) * 0.1;

var content = d3.select("#helloworld");

console.log(d3.scale)

var myBars = content
  .selectAll("a-box.bar")
  .data(dataset)
  .enter()
  .append("a-box")
  .classed("bar", true)
  .attr({
    position: function(d, i) {
      var x = i % gridMax;
      var z = Math.floor(i / gridMax);
      var y = d / 4 - chartHeight/2;
      var posX = x * 1.1 - chartWidth / 2 + 0.5;
      var posZ = -z * 1.1 + chartDepth / 2 - 0.5;
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
     .attr("position", (chartWidth / 2 + 0.05) + " -" + (chartHeight / 2 + 0.075) + " " + z)
     .attr("color", "gray");
   content.append("a-text")
     .attr("value", label)
     .attr("position", (chartWidth /2 + 0.15) + " -" + (chartHeight / 2 + 0.125) + " " + z)
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
    var yTicks = yScale.ticks(yTickCount);

    

     
     for (var i = 0; i < yTicks.length; i++) {
     var y = yScale(yTicks[i]);
     var label = yTicks[i];
     content.append("a-box")
     .attr("width", 0.05)
     .attr("height", 0.05)
     .attr("depth", 0.05)
     .attr("position", (-chartWidth / 2 - 0.075) + " " + (y * chartHeight - chartHeight / 2 + 0.025) + " " + chartDepth / 2 + 0.05)
     .attr("color", "gray");
     content.append("a-text")
     .attr("value", label)
     .attr("position", (-chartWidth / 2 - 0.15) + " " + (y * chartHeight - chartHeight / 2 + 0.025) + " " + chartDepth / 2 + 0.05)
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







    
    function update3DBarChart(tableData, axes) 
    {

      

              // Clear existing content
              var content = d3.select("#helloworld").html("");

              // Map the dataset from tableData using only axes.y and sort it
              var dataset = tableData
                  .sort((a, b) => a[axes.y] - b[axes.y])
                  .map((row) => row[axes.y]);

              const maxHeight = Math.max(...dataset);
              const logMaxHeight = Math.log10(maxHeight);
              const scalingFactor = maxHeight > 50 ? 50 / (logMaxHeight * maxHeight) : 1;
              const rescaledMaxHeight = maxHeight * scalingFactor;
              // Calculate the number of Y-axis ticks based on the custom function
              var minValue = 0;
              var maxValue = d3.max(dataset);
              var scaleFactor = 1.2; // Adjust this value to change the number of ticks



              var gridMax = Math.ceil(Math.sqrt(dataset.length));
              var chartWidth = gridMax * 0.9 + (gridMax - 1) * 0.1;
              var chartHeight = d3.max(dataset) / 2;
              var chartDepth = gridMax * 0.9 + (gridMax - 1) * 0.1;
                  
                  
                  console.log(d3.scale)

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
                var y = (d * scalingFactor) / 4 - chartHeight / 2;
                var posX = x * 1.1 - chartWidth / 2;
                var posZ = - z * 1.1 + chartDepth / 2 - 0.5 ;
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
              color: function (d) {
                var letters = "0123456789ABCDEF".split("");
                var color = "#";
                for (var i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
              },
            });

            // Add X-axis
            var xAxis = content.append("a-box")
              .attr("width", chartWidth)
              .attr("height", 0.05)
              .attr("depth", 0.05)
              .attr("position", "0 " + (-chartHeight / 2 - 0.025) + " " + (chartDepth / 2 + 0.025))
              .attr("color", "white");

            // Add Y-axis
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
           // Modify the Y-scale to use d3.nice()
// Modify the Y-scale to use d3.nice()
var yScale = d3.scale.linear()
  .domain([0, d3.max(dataset)])
  .range([0, 1])
  .nice();



            // Create X and Z scales with d3.nice()
            // var xScale = d3.scale.linear()
            //     .domain([0, gridMax - 1])
            //     .range([0, chartWidth])
            //     .nice();
            // Create an ordinal scale for the X-axis using the categorical data
            
            
            var xScale = d3.scale.ordinal()
            .domain(tableData.map((row) => row[axes.x]))
            .rangeRoundBands([0, chartWidth], 0.1);
            
            var zScale = d3.scale.linear()
                .domain([0, Math.ceil(dataset.length / gridMax) - 1])
                .range([0, chartDepth])
                .nice();

            // Add X-axis tick marks and labels
            var xTicks = xScale.domain();
            for (var i = 0; i < xTicks.length; i++) {
              var x = xScale(xTicks[i]);
              var label = xTicks[i];
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
                .attr("position", (chartWidth / 2 + 0.05) + " -" + (chartHeight / 2 + 0.075) + " " + z)
                .attr("color", "gray");
              content.append("a-text")
                .attr("value", label)
                .attr("position", (chartWidth /2 + 0.15) + " -" + (chartHeight / 2 + 0.125) + " " + z)
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
                // Add Y-axis tick marks and labels
// Add Y-axis tick marks and labels
// Add Y-axis tick marks and labels
var yTicks = yScale.ticks(yTickCount);
for (var i = 0; i < yTicks.length; i++) {
  var y = yScale(yTicks[i]);
  var label = yTicks[i];
  content.append("a-box")
    .attr("width", 0.05)
    .attr("height", 0.05)
    .attr("depth", 0.05)
    .attr("position", (-chartWidth / 2 - 0.075) + " " + (y * chartHeight - chartHeight / 2 + 0.025) + " " + (chartDepth / 2 + 0.025))
    .attr("color", "gray");
  content.append("a-text")
    .attr("value", label)
    .attr("position", (-chartWidth / 2 - 0.15) + " " + (y * chartHeight - chartHeight / 2 + 0.025) + " " + (chartDepth / 2 + 0.025))
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
    

    

    
    






