/*********************************************
* Breast Cancer Rates
*********************************************/
    console.log('hello World');
    var svgRates = d3.select("#lineChart"),
    
    
    marginCR = {
        top: 20,
        right: 80,
        bottom: 50,
        left: 75
    },
    widthCR = svgRates.attr("width") - marginCR.left - marginCR.right,
    heightCR = svgRates.attr("height") - marginCR.top - marginCR.bottom,
    gRates = svgRates.append("g")
    .attr("transform", "translate(" + marginCR.left + "," + marginCR.top + ")")
    .attr('class','gRates'),
    over50 = ['50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85+'],
    under50 = ['15-19', "20-24", '25-29', '30-34', '35-39', '40-44', '45-49'];

        console.log(1)

        // define scales
        var xCR = d3.scaleLinear().range([0, widthCR]),
            yCR = d3.scaleLinear().range([heightCR, 0]),
            //define color scale
            zCR = d3.scaleOrdinal(d3.schemeCategory20b);

        console.log(2)
        //define the axes

        var xCRAxis = d3.axisBottom(xCR)
            .ticks(15)
            .tickFormat(d3.format('d'));

        var yCRAxis = d3.axisLeft(yCR);

        console.log(3)
        //define line generator
        var line = d3.line()
            .curve(d3.curveBasis)
            .x(function (d) {
                return xCR(d.year);
            })
            .y(function (d) {
                return yCR(d.rate);
            });

        //load data
        d3.csv("breaseByageSpread.csv", function (error, data) { 
            if (error) throw error;
            // console.log(data)
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

            //define x axis
            xCR.domain(d3.extent(data, function (d) {
                return d.year;
            }));

            //define y axis
            yCR.domain([
                d3.min(ages, function (c) {
                    return d3.min(c.values, function (d) {
                        return d.rate;
                    });
                }),
                d3.max(ages, function (c) {
                    return d3.max(c.values, function (d) {
                        return d.rate;
                    });
                })
            ]);


            // define color scale
            zCR.domain(ages.map(function (c) {
                return c.id;
            }));

            //append x axis
            gRates.append("g")
                .attr("class", "axisRates axis--x")
                .attr("transform", "translate(0," + heightCR + ")")
                .call(xCRAxis)
                .selectAll('text')
                .attr("y", 10)
                .attr("x", 9)
                .attr("dy", ".5em")
                .attr("transform", "rotate(45)")
                .style("text-anchor", "start");
                
            //append y axis
            gRates.append("g")
                .attr("class", "axisRates axis--y")
                .call(yCRAxis)
                .append("text")
                .attr('class', 'ylabelRates')
                .attr("transform", "rotate(-90)")
                .attr("y", -60)
                .attr('x', -125)
                .attr("dy", "0.71em")
                .text("Number of People per 100,000");

            //append rate data to svg
            var rate = gRates.selectAll(".rateRates")
                .data(ages)
                .enter().append("g")
                .attr("class", "ageRates");

            //append rate path to svg
            rate.append("path")
                .attr("class", "line")
                .attr("d", function (d) {
                    return line(d.values);
                })
                .style("stroke", function (d) {
                    return zCR(d.id);
                });

            rate.append("text")
                .datum(function (d) {
                    return {
                        id: d.id,
                        value: d.values[d.values.length - 1]
                    };
                })
                .attr("transform", function (d) {
                    return "translate(" + xCR(d.value.year) + "," + yCR(d.value.rate) + ")";
                })
                .attr("x", 3)
                .attr("dy", "0.35em")
                .attr('class', 'lineLabelsRates')
                .style('fill', function (d) {
                    return zCR(d.id)
                })
                .text(function (d) {
                    return d.id;
                });

        });
    

    function filterOver50() {
        d3.select('svg#lineChart').remove();
        d3.select('#cancerRatesChart').html('<svg id ="lineChart" width="700" height="500"></svg>');

        //define chart margines
        var svg = d3.select("svg#lineChart"),
            margin = {
                top: 20,
                right: 80,
                bottom: 50,
                left: 75
            },
            width = svg.attr("width") - margin.left - margin.right,
            height = svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
            over50 = ['50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85+'],
            under50 = ['15-19', "20-24", '25-29', '30-34', '35-39', '40-44', '45-49'];

        // define scales
        var x = d3.scaleLinear().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
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
            // console.log(data)
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

            var over50Filtered = ages.filter(function (d) {
                if (over50.indexOf(d.id) != -1) {
                    return d.id
                }
            })

            //define x axis
            x.domain(d3.extent(data, function (d) {
                return d.year;
            }));

            //define y axis
            y.domain([
                d3.min(over50Filtered, function (c) {
                    return d3.min(c.values, function (d) {
                        return d.rate;
                    });
                }),
                d3.max(over50Filtered, function (c) {
                    return d3.max(c.values, function (d) {
                        return d.rate;
                    });
                })
            ]);


            // define color scale
            z.domain(over50Filtered.map(function (c) {
                return c.id;
            }));

            //append x axis
            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
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
                .append("text")
                .attr('class', 'ylabel')
                .attr("transform", "rotate(-90)")
                .attr("y", -60)
                .attr('x', -125)
                .attr("dy", "0.71em")
                .text("Number of People per 100,000");

            //append rate data to svg
            var rate = g.selectAll(".rate")
                .data(over50Filtered)
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

    function filterUnder50() {
        d3.select('svg#lineChart').remove();
        d3.select('#cancerRatesChart').html('<svg id ="lineChart" width="700" height="500"></svg>');

        //define chart margines
        var svg = d3.select("svg#lineChart"),
            margin = {
                top: 20,
                right: 80,
                bottom: 50,
                left: 75
            },
            width = svg.attr("width") - margin.left - margin.right,
            height = svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
            over50 = ['50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85+'],
            under50 = ['15-19', "20-24", '25-29', '30-34', '35-39', '40-44', '45-49'];

        // define scales
        var x = d3.scaleLinear().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
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
            // console.log(data)
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

            var under50Filtered = ages.filter(function (d) {
                if (under50.indexOf(d.id) != -1) {
                    return d.id
                }
            })

            //define x axis
            x.domain(d3.extent(data, function (d) {
                return d.year;
            }));

            //define y axis
            y.domain([
                d3.min(under50Filtered, function (c) {
                    return d3.min(c.values, function (d) {
                        return d.rate;
                    });
                }),
                d3.max(under50Filtered, function (c) {
                    return d3.max(c.values, function (d) {
                        return d.rate;
                    });
                })
            ]);


            // define color scale
            z.domain(under50Filtered.map(function (c) {
                return c.id;
            }));

            //append x axis
            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
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
                .append("text")
                .attr('class', 'ylabel')
                .attr("transform", "rotate(-90)")
                .attr("y", -60)
                .attr('x', -125)
                .attr("dy", "0.71em")
                .text("Number of People per 100,000");

            //append rate data to svg
            var rate = g.selectAll(".rate")
                .data(under50Filtered)
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

    function resetGraphic() {
        d3.select('svg#lineChart').remove();
        d3.select('#cancerRatesChart').html('<svg id ="lineChart" width="700" height="500"></svg>');

        //define chart margines
        var svg = d3.select("svg"),
            margin = {
                top: 20,
                right: 80,
                bottom: 50,
                left: 75
            },
            width = svg.attr("width") - margin.left - margin.right,
            height = svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
            over50 = ['50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85+'],
            under50 = ['15-19', "20-24", '25-29', '30-34', '35-39', '40-44', '45-49'];

        console.log(1)

        // define scales
        var x = d3.scaleLinear().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            //define color scale
            z = d3.scaleOrdinal(d3.schemeCategory20b);

        console.log(2)
        //define the axes

        var xAxis = d3.axisBottom(x)
            .ticks(15)
            .tickFormat(d3.format('d'));

        var yAxis = d3.axisLeft(y);

        console.log(3)
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
            // console.log(data)
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

            //define x axis
            x.domain(d3.extent(data, function (d) {
                return d.year;
            }));

            //define y axis
            y.domain([
                d3.min(ages, function (c) {
                    return d3.min(c.values, function (d) {
                        return d.rate;
                    });
                }),
                d3.max(ages, function (c) {
                    return d3.max(c.values, function (d) {
                        return d.rate;
                    });
                })
            ]);


            // define color scale
            z.domain(ages.map(function (c) {
                return c.id;
            }));

            //append x axis
            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
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
                .append("text")
                .attr('class', 'ylabel')
                .attr("transform", "rotate(-90)")
                .attr("y", -60)
                .attr('x', -125)
                .attr("dy", "0.71em")
                .text("Number of People per 100,000");

            //append rate data to svg
            var rate = g.selectAll(".rate")
                .data(ages)
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


/*********************************************

    * Savings Rates
*********************************************/

    savingsData=[{
        'id':'$0',
        '2016': .34,
        '2017': .39
    },
    {
        'id':'<$1,000',
        '2016': .35,
        '2017': .18
    },
    {
        'id':'$1,000-$4,999',
        '2016': .11,
        '2017': .12
    },
    {
        'id':'$5,000-$9,999',
        '2016': .04,
        '2017': .06
    },   
    {
        'id':'$10,000+',
        '2016': .15,
        '2017': .25,
        //'valores': [{name: '2016', value: .15}, {name: '2017', value: .25}]
    }
    ]
    console.log(savingsData);

    var svgSavings = d3.select("#savingsChart"),
        marginSavings = {top: 80, right: 20, bottom: 30, left: 50},
        width = +svgSavings.attr("width") - marginSavings.left - marginSavings.right,
        height = +svgSavings.attr("height") - marginSavings.top - marginSavings.bottom,
        gSavings = svgSavings.append("g").attr("transform", "translate(" + marginSavings.left + "," + marginSavings.top + ")")
                            .attr('class','gSavings');

    var x0savings = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var x1savings = d3.scaleBand()
        .padding(0.05);

    var ysavings = d3.scaleLinear()
        .rangeRound([height, 0]);

    var zsavings = d3.scaleOrdinal()
        .range(["#333333", "#6097A0"]);



    //set up the data
    var options = d3.keys(savingsData[0]).filter(function(key) { return key !== "id"; });

    // d3.keys(savingsData[0]) // ['id', '2016', '2017'].filter >> ['2016', '2017']

    savingsData.forEach(function(d) {d.valores = options.map(function(name) { return {name: name, value: +d[name]}})});

    //define the domains    
    x0savings.domain(savingsData.map(function(d) { return d.id; }));
    x1savings.domain(options).rangeRound([0, x0savings.bandwidth()]);
    ysavings.domain([0, d3.max(savingsData, function(d) { 
        return d3.max(d.valores, function(d) { 
            return d.value; 
        })
    })])


    //x-axis                
    gSavings.append("g")
        .attr("class", "axisSavingsX")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0savings));

    //y-axis    
    gSavings.append("Savings")
        .attr("class", "axisSavingsY")
        .call(d3.axisLeft(ysavings)
                .tickFormat(d3.format('.0%')))
        .append("text") // axis label
            .attr("x", -height/2)
            .attr('transform','rotate(-90)')
            .attr("y", -marginSavings.left+10)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "middle")
            .text("Percent of Study Population");
                    


    var chart = gSavings.selectAll(".barSavings")
        .data(savingsData) // outer array: data
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + x0savings(d.id) + ",0)"; })
        
    chart.selectAll("rect")
    .data(function(d) { return d.valores;}) // inner array: the actual bars
    .enter().append("rect")
        .attr("x", function(d) { return x1savings(d.name); })
        .attr("y", function(d) { return ysavings(d.value); })
        .attr("width", x1savings.bandwidth())
        .attr("height", function(d) { return height - ysavings(d.value); })
        .attr("fill", function(d) { return zsavings(d.name); });


    chart.selectAll("text")
        .data(function(d) { return d.valores;})
        .enter().append('text')
        .attr('class','savingsDataLabels')
        .attr("x", function(d) { return x1savings(d.name) + 20;  })
        .attr("y", function(d) { return ysavings(d.value) - 20; })
        .attr("dy", ".35em")
        .text(function(d) { return d3.format('.0%')(d.value);});


    var legend = svgSavings.selectAll(".legend")
        .data(options.slice())
        .enter().append("g")
        .attr("class", "legendSavings")
        .attr("transform", function(d, i) { return "translate(-100," + (25*i+50) + ")"; });
    
    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d){return zsavings(d);});
    
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .attr('class', 'legendSavingText')
        .style("text-anchor", "end")
        .text(function(d) { return d; });
        
 
        
/*******Scrolling Fanciness */
$(document).ready(function(){
    
    // Init ScrollMagic
    var controller = new ScrollMagic.Controller();
    var time=1000;    
    var margin=100;
    var fadeScene = new ScrollMagic.Scene({
        triggerElement: '#startfade1', 
        triggerHook:0.9,
        reverse:false
        })
        .on('start', function () {
            $(".element").each(function(i){
                    $(this).fadeIn(time).css('margin-left',margin+'px')
                    time+=2500;
                    margin=Math.random()*250;
                    })
                })
        // .addIndicators()
        .addTo(controller);
    })