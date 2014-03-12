(function() {

    var json = [{
        'category': 'Acc',
        'value': 3,
        'color': '#074285'
    },{
        'category': 'Acewc',
        'value': 2,
        'color': '#074285'
    },{
        'category': 'Aewcc',
        'value': 1,
        'color': '#074285'
    },{
        'category': 'Awewecc',
        'value': 4,
        'color': '#074285'
    },{
        'category': 'Acewc',
        'value': 5,
        'color': '#074285'
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
        console.log("The GRID!!!, " +i);
        return {
            'x1': 0,
            'y1': 0,
            'x2': 0,
            'y2': categories.length*48
        };
    });

    var tickVals = grid.map(function(d, i) {
        console.log("The Ticks!!!, " + d + " , " +i);
        console.log(d);
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
        .range([0, categories.length*50]);

    var colorScale = d3.scale.quantize()
        .domain([0, categories.length])
        .range(colors);

    var canvas = d3.select(elementId)
        .append('svg')
        .attr({
            'width': 900,
            'height': categories.length*70
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
        .attr("transform", "translate(150,15)")
        .attr('id', 'yaxis')
        .call(yAxis);

    var xaxis_len = categories.length*48+10;
    var x_xis = canvas.append('g')
        .attr("transform", "translate(150,"+xaxis_len+")")
        .attr('id', 'xaxis')
        .call(xAxis);

    var chart = canvas.append('g')
        .attr("transform", "translate(150,0)")
        .attr('id', 'bars')
        .selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('height', 35)
        .attr({
            'x': 0,
            'y': function(d, i) {
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
                return yscale(i) + 15;
            }
        })
        .text(function(d) {
            return d;
        }).style({
            'fill': '#fff',
            'font-size': '14px'
        });
}
