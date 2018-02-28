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
    

    
