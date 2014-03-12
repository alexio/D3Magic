(function() {

    var json = [{
      'categories':'AC',
      'values': 213,
      'color':'#0000b4'
    }, {
      'categories':'AP',
      'values': 156,
      'color':'#0082ca'
    },{
      'categories':'AB',
      'values': 180,
      'color':'#0000b4'
    }, {
      'categories':'AD',
      'values': 120,
      'color':'#0082ca'
    }];

    genChart('#chart', json);
})();

function genChart(elementId, json) {

    var categories = [];
    var values = [];
    var colors = [];

    json.forEach(function(item) {
        categories.push(item.categories);
        values.push(item.values);
        colors.push(item.color);
    });

    var grid = d3.range(25).map(function(i) {
        return {
            'x1': 0,
            'y1': 0,
            'x2': 0,
            'y2': categories.length*28
        };
    });

    var tickVals = grid.map(function(d, i) {
        if (i > 0) {
            return i * 10;
        } else if (i === 0) {
            return "100";
        }
    });

    var width = d3.max(values)*3.5;
    var xscale = d3.scale.linear()
        .domain([0, d3.max(values)+30])
        .range([0, width]);

    var yscale = d3.scale.linear()
        .domain([0, categories.length])
        .range([0, categories.length*28]);

    var colorScale = d3.scale.quantize()
        .domain([0, categories.length])
        .range(colors);

    var canvas = d3.select(elementId)
        .append('svg')
        .attr({
            'width': d3.max(values)*4.5,
            'height': 31.25*categories.length
        });

    var grids = canvas.append('g')
        .attr('id', 'grid')
        .attr('transform', 'translate(150,10)')
        .selectAll('line')
        .data(grid)
        .enter()
        .append('line')
        .attr({
            'x1': function(d, i) {
                return i * 30;
            },
            'y1': function(d) {
                return d.y1;
            },
            'x2': function(d, i) {
                return i * 30;
            },
            'y2': function(d) {
                return d.y2;
            },
        })
        .style({
            'stroke': '#adadad',
            'stroke-width': '1px'
        });

    var xAxis = d3.svg.axis();
    xAxis
        .orient('bottom')
        .scale(xscale)
        .tickValues(tickVals);

    var yAxis = d3.svg.axis();
    yAxis
        .orient('left')
        .scale(yscale)
        .tickSize(2)
        .tickFormat(function(d, i) {
            return categories[i];
        })
        .tickValues(d3.range(17));

    var y_xis = canvas.append('g')
        .attr("transform", "translate(150,0)")
        .attr('id', 'yaxis')
        .call(yAxis);

    var x_xis = canvas.append('g')
        .attr("transform", "translate(150,480)")
        .attr('id', 'xaxis')
        .call(xAxis);

    var chart = canvas.append('g')
        .attr("transform", "translate(150,0)")
        .attr('id', 'bars')
        .selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('height', 19)
        .attr({
            'x': 0,
            'y': function(d, i) {
                return yscale(i) + 19;
            }
        })
        .style('fill', function(d, i) {
            return colorScale(i);
        })
        .attr('width', function(d) {
            return 0;
        });


    var transit = d3.select("svg").selectAll("rect")
        .data(values)
        .transition()
        .duration(1000)
        .attr("width", function(d) {
            return xscale(d);
        });

    var transitext = d3.select('#bars')
        .selectAll('text')
        .data(values)
        .enter()
        .append('text')
        .attr({
            'x': function(d) {
                return xscale(d) - 200;
            },
            'y': function(d, i) {
                return yscale(i) + 35;
            }
        })
        .text(function(d) {
            return d;
        }).style({
            'fill': '#fff',
            'font-size': '14px'
        });



}
