var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25, 22, 18, 15, 18, 10 ];

var gridMax = Math.sqrt(dataset.length);
var content = d3.select("#helloworld");

var myBars = content.selectAll("a-entity.bar")
                   .data(dataset)
                   .enter()
                   .append("a-entity")
                   .classed("bar", true)
                   .on("click", function(d, i) {
                     alert("You clicked on bar " + i + " with value " + d + "!");
                   });

myBars.append("a-box")
      .attr({
        height: function(d) { return d / 2; },
        width: function() { return 0.9; },
        depth: function() { return 0.9; },
        color: function() {
          var letters = '0123456789ABCDEF'.split('');
          var color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }
      });
