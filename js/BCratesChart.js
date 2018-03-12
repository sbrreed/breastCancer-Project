/*********************************************
 * Breast Cancer Rates
 *********************************************/


app.cancerRatesArrays = [
    ['15-19', "20-24", '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85+'],
    ['50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85+'],
    ['15-19', "20-24", '25-29', '30-34', '35-39', '40-44', '45-49']
]

var run;
app.CurrentPosition = 0
window.onresize = function () {
    clearTimeout(run);
    run = setTimeout(function () {
        defineCancerRatesData(app.CurrentPosition);
    }, 200);
};


function defineCancerRatesData(value) {
    var position = value;
    app.CurrentPosition = value;
    app.filteredCancerArray = app.cancerRatesArrays[position];

    // preserveAspectRatio="xMinYMin meet" viewBox= "0 0 650 550"
    d3.select('svg#lineChart').remove();

    var container= d3.select('#cancerRatesChart')
    //define chart margins
    var margin = {
            top: 20,
            right: 80,
            bottom: 50,
            left: 80
        },
        width = container.node().getBoundingClientRect().width,
        height = container.node().getBoundingClientRect().height,
        viz_width = width - margin.left - margin.right,
        viz_height = height- margin.top - margin.bottom;
        // viz_width = width,
        // viz_height = height;

        // g = svg.append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    console.log(width);
    console.log(viz_width);
    console.log(viz_height);
    console.log(viz_height-10);
 
    var svg=d3.select('#cancerRatesChart').append('svg')
        .attr("width", viz_width+ margin.left + margin.right)
        .attr("height", viz_height+ margin.top+ margin.bottom)
        .attr('id','lineChart')
        .attr('class','cancerLineChart')
        
    var g=svg.append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // define scales
    var x = d3.scaleLinear().range([0, viz_width]),
        y = d3.scaleLinear().range([viz_height, 0]),
        //define color scale
        z = d3.scaleOrdinal(d3.schemeCategory20b);

    //define the axes

    var xAxis = d3.axisBottom(x)
        .ticks(15)
        .tickFormat(d3.format('d'));

    var yAxis = d3.axisLeft(y);

    //define line generator
    var line = d3.line()
        .curve(d3.curveBasis)
        .x(function (d) {
            return x(d.year);
        })
        .y(function (d) {
            return y(d.rate);
        });

    //load data
    d3.csv("breaseByageSpread.csv", function (error, data) { /* fixed typo in filename (or... unfixed it? anyway it points to the file now) - DD */
        if (error) throw error;
        var ages = data.columns.slice(1).map(function (id) {
            return {
                id: id,
                values: data.map(function (d) {
                    return {
                        year: d.year,
                        rate: +d[id]
                    };
                })
            };
        });

        //filter data according to which button is pressed by checking against array
        var filteredData = ages.filter(function (d) {
            if (app.filteredCancerArray.indexOf(d.id) != -1) {
                return d.id
            }
        })

        //define x axis
        x.domain(d3.extent(data, function (d) {
            return d.year;
        }));

        //define y axis
        y.domain([
            d3.min(filteredData, function (c) {
                return d3.min(c.values, function (d) {
                    return d.rate;
                });
            }),
            d3.max(filteredData, function (c) {
                return d3.max(c.values, function (d) {
                    return d.rate;
                });
            })
        ]);


        // define color scale
        z.domain(filteredData.map(function (c) {
            return c.id;
        }));

        //append x axis
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + viz_height + ")")
            .call(xAxis)
            .selectAll('text')
            .attr("y", 10)
            .attr("x", 9)
            .attr("dy", ".5em")
            .attr("transform", "rotate(45)")
            .style("text-anchor", "start");

        //append y axis
        g.append("g")
            .attr("class", "axis axis--y")
            .call(yAxis)
            // .append("text")
            // .attr('class', 'ylabel')
            // .attr("transform", "rotate(-90)")
            // .attr("y", -60)
            // .attr('x', -55)
            // .attr("dy", "0.71em")
            // .text("Number of People per 100,000");

        //append rate data to svg
        var rate = g.selectAll(".rate")
            .data(filteredData)
            .enter().append("g")
            .attr("class", "age");

        //append rate path to svg
        rate.append("path")
            .attr("class", "line")
            .attr("d", function (d) {
                return line(d.values);
            })
            .style("stroke", function (d) {
                return z(d.id);
            });

        rate.append("text")
            .datum(function (d) {
                return {
                    id: d.id,
                    value: d.values[d.values.length - 1]
                };
            })
            .attr("transform", function (d) {
                return "translate(" + x(d.value.year) + "," + y(d.value.rate) + ")";
            })
            .attr("x", 3)
            .attr("dy", "0.35em")
            .attr('class', 'lineLabels')
            .style('fill', function (d) {
                return z(d.id)
            })
            .text(function (d) {
                return d.id;
            });

    });
}

// function reDraw() {
//     var position = app.CurrentPosition;
//     app.filteredCancerArray = app.cancerRatesArrays[position];

//     // preserveAspectRatio="xMinYMin meet" viewBox= "0 0 650 550"
//     d3.select('svg#lineChart').remove();

//     var container= d3.select('#cancerRatesChart')
//     //define chart margins
//     var margin = {
//             top: 20,
//             right: 80,
//             bottom: 50,
//             left: 80
//         },
//         width = container.node().getBoundingClientRect().width,
//         height = container.node().getBoundingClientRect().height,
//         viz_width = width - margin.left - margin.right,
//         viz_height = height- margin.top - margin.bottom;
//         // viz_width = width,
//         // viz_height = height;

//         // g = svg.append("g")
//     //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     console.log(width);
//     console.log(viz_width);
//     console.log(viz_height);
//     console.log(viz_height-10);
 
//     var svg=d3.select('#cancerRatesChart').append('svg')
//         .attr("width", viz_width+ margin.left + margin.right)
//         .attr("height", viz_height+ margin.top+ margin.bottom)
     
        
//     var g=svg.append('g')
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//     // define scales
//     var x = d3.scaleLinear().range([0, viz_width]),
//         y = d3.scaleLinear().range([viz_height, 0]),
//         //define color scale
//         z = d3.scaleOrdinal(d3.schemeCategory20b);

//     //define the axes

//     var xAxis = d3.axisBottom(x)
//         .ticks(15)
//         .tickFormat(d3.format('d'));

//     var yAxis = d3.axisLeft(y);

//     //define line generator
//     var line = d3.line()
//         .curve(d3.curveBasis)
//         .x(function (d) {
//             return x(d.year);
//         })
//         .y(function (d) {
//             return y(d.rate);
//         });

//     //load data
//     d3.csv("breaseByageSpread.csv", function (error, data) { /* fixed typo in filename (or... unfixed it? anyway it points to the file now) - DD */
//         if (error) throw error;
//         var ages = data.columns.slice(1).map(function (id) {
//             return {
//                 id: id,
//                 values: data.map(function (d) {
//                     return {
//                         year: d.year,
//                         rate: +d[id]
//                     };
//                 })
//             };
//         });

//         //filter data according to which button is pressed by checking against array
//         var filteredData = ages.filter(function (d) {
//             if (app.filteredCancerArray.indexOf(d.id) != -1) {
//                 return d.id
//             }
//         })

//         //define x axis
//         x.domain(d3.extent(data, function (d) {
//             return d.year;
//         }));

//         //define y axis
//         y.domain([
//             d3.min(filteredData, function (c) {
//                 return d3.min(c.values, function (d) {
//                     return d.rate;
//                 });
//             }),
//             d3.max(filteredData, function (c) {
//                 return d3.max(c.values, function (d) {
//                     return d.rate;
//                 });
//             })
//         ]);


//         // define color scale
//         z.domain(filteredData.map(function (c) {
//             return c.id;
//         }));

//         //append x axis
//         g.append("g")
//             .attr("class", "axis axis--x")
//             .attr("transform", "translate(0," + viz_height + ")")
//             .call(xAxis)
//             .selectAll('text')
//             .attr("y", 10)
//             .attr("x", 9)
//             .attr("dy", ".5em")
//             .attr("transform", "rotate(45)")
//             .style("text-anchor", "start");

//         //append y axis
//         g.append("g")
//             .attr("class", "axis axis--y")
//             .call(yAxis)
//             .append("text")
//             .attr('class', 'ylabel')
//             .attr("transform", "rotate(-90)")
//             .attr("y", -60)
//             .attr('x', -55)
//             .attr("dy", "0.71em")
//             .text("Number of People per 100,000");

//         //append rate data to svg
//         var rate = g.selectAll(".rate")
//             .data(filteredData)
//             .enter().append("g")
//             .attr("class", "age");

//         //append rate path to svg
//         rate.append("path")
//             .attr("class", "line")
//             .attr("d", function (d) {
//                 return line(d.values);
//             })
//             .style("stroke", function (d) {
//                 return z(d.id);
//             });

//         rate.append("text")
//             .datum(function (d) {
//                 return {
//                     id: d.id,
//                     value: d.values[d.values.length - 1]
//                 };
//             })
//             .attr("transform", function (d) {
//                 return "translate(" + x(d.value.year) + "," + y(d.value.rate) + ")";
//             })
//             .attr("x", 3)
//             .attr("dy", "0.35em")
//             .attr('class', 'lineLabels')
//             .style('fill', function (d) {
//                 return z(d.id)
//             })
//             .text(function (d) {
//                 return d.id;
//             });

//     });
// }


