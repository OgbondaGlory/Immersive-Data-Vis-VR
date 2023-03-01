// load the data from the JSON file
d3.json('https://ebubegloryogbonda.dev/data.json').then(function(data) {
    // select the chart element
    var chart = d3.select('#chart');
    
    // calculate the maximum value in the dataset
    var max = d3.max(data, function(d) {
      return d.value;
    });
    
    // set the height of the chart
    var chartHeight = 3;
    
    // set the width of each bar
    var barWidth = 0.3;
    
    // set the gap between bars
    var barGap = 0.2;
    
    // set the initial x position of the first bar
    var xPos = -(data.length * (barWidth + barGap) / 2);
    
    // create a <a-entity> element for each data point
    var bars = chart.selectAll('.bar')
      .data(data)
      .enter()
      .append('a-entity')
      .classed('bar', true)
      .attr('template', '#bar-template')
      .attr('position', function(d, i) {
        // calculate the y position of the bar based on the data value
        var yPos = d.value / max * chartHeight / 2;
        return xPos + i * (barWidth + barGap) + ' ' + yPos + ' 0';
      })
      .attr('scale', function(d) {
        // calculate the height of the bar based on the data value
        var height = d.value / max * chartHeight;
        return '1 ' + height + ' 1';
      })
      .on('click', function(d) {
        // Display more information about the bar when clicked
        var info = document.createElement('a-entity');
        info.setAttribute('position', '0 1 -3');
        info.setAttribute('text', {
          value: 'Label: ' + d.label + '\nValue: ' + d.value,
          align: 'center',
          color: 'black'
        });
        this.appendChild(info);
      });
    
    // increment the x position for the next bar
    xPos += barWidth + barGap;
    
    // add text labels to the bars
    bars.append('a-entity')
      .attr('text', function(d) {
        return {
          value: d.label,
          align: 'center',
          color: 'black',
          side: 'double',
          width: 2
        };
      })
      .attr('position', '0 -0.75 0');
  });
  