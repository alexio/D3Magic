(function() {

    var json = [{
        'category': 'Acc',
        'value': 3,
        'color': '#3090C7'
    }];

    genChart('#chart', json);
})();

function genChart(elementId, json) {

    var categories = [];
    var values = [];
    var colors = [];

    categories.push('');
    values.push(0);
    json.forEach(function(item) {
        categories.push(item.category);
        values.push(item.value);
        colors.push(item.color);
    });


    var grid = d3.range(6).map(function(i) {
        return {
            'x1': 0,
            'y1': 0,
            'x2': 0,
            'y2': categories.length * 40
        };
    });

    var tickVals = grid.map(function(d, i) {
        if (i > 0) {
            return i;
        } else if (i === 0) {
            return "";
        }
    });

    var xscale = d3.scale.linear()
        .domain([0, 5])
        .range([0, 722]);

    var yscale = d3.scale.linear()
        .domain([0, categories.length])
        .range([0, categories.length * 41]);

    var colorScale = d3.scale.quantize()
        .domain([0, categories.length])
        .range(colors);

    var canvas = d3.select(elementId)
        .append('svg')
        .attr({
            'width': 900,
            'height': categories.length * 70
        });


    var grids = canvas.append('g')
        .attr('id', 'grid')
        .attr('transform', 'translate(150,32)')
        .selectAll('line')
        .data(grid)
        .enter()
        .append('line')
        .attr({
            'x1': function(d, i) {
                return i * 144;
            },
            'y1': function(d) {
                return d.y1;
            },
            'x2': function(d, i) {
                return i * 144;
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
        .tickValues(d3.range(6));

    var y_xis = canvas.append('g')
        .attr("transform", "translate(150,28)")
        .attr('id', 'yaxis')
        .call(yAxis);

    var xaxis_len = categories.length * 51 + 10;
    var x_xis = canvas.append('g')
        .attr("transform", "translate(150," + xaxis_len + ")")
        .attr('id', 'xaxis')
        .call(xAxis);

    var chart = canvas.append('g')
        .attr("transform", "translate(150,0)")
        .attr('id', 'bars')
        .selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('height', 64)
        .attr({
            'x': 0,
            'y': function(d, i) {
                console.log("The Ticks!!!, " + d + " , " + i);
                console.log(d);
                return yscale(i) + 0;
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
                return yscale(i) + 28;
            }
        })
        .text(function(d) {
            return d;
        }).style({
            'fill': '#fff',
            'font-size': '14px'
        });
}
