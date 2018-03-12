console.log('listening');
var labels = ['Income', 'Expenses'];
var income = [{
    'Tom': 6620,
    'Karina': 400
}];
var expenses = [{
    'Housing': 935,
    'Food': 782,
    'Transportation': 608,
    'Health Insurance': 600,
    'Taxes': 502,
    'Other Necessities': 829
}];
Chart.defaults.global.defaultFontFamily = "'Oswald', sans-serif";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontStyle = "lighter";

//budget Chart 1
var bar_ctx = document.getElementById('budgetChart1');
var budget_chart1 = new Chart(bar_ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
                title: 'Tom',
                data: [6620, 0],
                backgroundColor: "#6F425B",
                hoverBackgroundColor: "#1D1E26",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                title: 'Karina',
                data: [400, 0],
                backgroundColor: "#56193A",
                hoverBackgroundColor: "#313340",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                title: 'Housing',
                data: [0, 935],
                backgroundColor: "#2E4E4D",
                hoverBackgroundColor: "#1D1E26",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                title: 'Food',
                data: [0, 782],
                backgroundColor: "#233B3A",
                hoverBackgroundColor: "#313340",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                title: 'Transportation',
                data: [0, 608],
                backgroundColor: "#ABB8B8",
                hoverBackgroundColor: "#626673",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                title: 'Health Insurance',
                data: [0, 600],
                backgroundColor: "#587171",
                hoverBackgroundColor: "#BFC7D9",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                title: 'Other Medical Expenses',
                data: [0, 200],
                backgroundColor: "#5BBDBD",
                hoverBackgroundColor: "#BFC7D9",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                title: 'Child Related',
                data: [0, 650],
                backgroundColor: "#94BDBD",
                hoverBackgroundColor: "#BFC7D9",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                title: 'Taxes',
                data: [0, 502],
                backgroundColor: "#303E3E",
                hoverBackgroundColor: "#A8B0BF",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                title: 'Other Necessities',
                data: [0, 829],
                backgroundColor: "#546E6E",
                hoverBackgroundColor: "#6F7C8A",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
        ]
    },
    options: {
        responsive: false,
        legend: false,
        animation: {
            duration: 1000
        },
        title:{
            display:true,
            text:"Karina and Tom's Monthly Budget",
            fontFamily:"'Quatrocentro', serif",
            fontSize:20
        } ,
        tooltips: {
            mode: 'nearest',
            callbacks: {
                label: function (tooltipItem, data) {
                    return "$" + tooltipItem.xLabel.toString();
                },
                title: function(tooltipItem, data) {
                    return tooltipItem['index'].title;
                }
                
            }
        },
        scales: {
            fontFamily:"'Quatrocentro', serif",
            fontSize:16,
            xAxes: [{
                stacked: true,
                gridLines: {
                    display: false
                },
                ticks: {
                    callback: function (value, index, values) {
                        return '$' + value;
                    }
                }
            }],
            yAxes: [{
                stacked: true,
            
            }], 
            legend: {
                display: true
            }
        } // options
    }
});

console.log('stillListening');

//budget Chart 2
var bar_ctx2 = document.getElementById('budgetChart2');
var budget_chart2 = new Chart(bar_ctx2, {
    type: 'horizontalBar',
    data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
                label: 'Tom',
                data: [5314, 0],
                backgroundColor: "#6F425B",
                hoverBackgroundColor: "#1D1E26",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Karina',
                data: [100, 0],
                backgroundColor: "#56193A",
                hoverBackgroundColor: "#313340",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Housing',
                data: [0, 935],
                backgroundColor: "#2E4E4D",
                hoverBackgroundColor: "#1D1E26",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Food',
                data: [0, 782],
                backgroundColor: "#233B3A",
                hoverBackgroundColor: "#313340",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Transportation',
                data: [0, 608],
                backgroundColor: "#ABB8B8",
                hoverBackgroundColor: "#626673",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Health Insurance',
                data: [0, 600],
                backgroundColor: "#587171",
                hoverBackgroundColor: "#BFC7D9",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Other Medical Expenses',
                data: [0, 400],
                backgroundColor: "#5BBDBD",
                hoverBackgroundColor: "#BFC7D9",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Child Related',
                data: [0, 650],
                backgroundColor: "#94BDBD",
                hoverBackgroundColor: "#BFC7D9",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Taxes',
                data: [0, 502],
                backgroundColor: "#8EBABA",
                hoverBackgroundColor: "#A8B0BF",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Other Necessities',
                data: [0, 829],
                backgroundColor: "#546E6E",
                hoverBackgroundColor: "#6F7C8A",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
        ]
    },
    options: {
        responsive: false,
        legend: false,
        animation: {
            duration: 1000
        },
        title:{
            display:true,
            text:"Karina and Tom's Monthly Budget",
            fontFamily:"'Quatrocentro', serif",
            fontSize:20,
        } ,
        tooltips: {
            mode: 'nearest',
            callbacks: {
                label: function (tooltipItem, data) {
                    return "$" + tooltipItem.xLabel.toString();

                }
            }
        },
        scales: {
            fontFamily:"'Quatrocentro', serif",
            fontSize:16,
            xAxes: [{
                stacked: true,
                gridLines: {
                    display: false
                },
                ticks: {
                    callback: function (value, index, values) {
                        return '$' + value;
                    }
                }
            }],
            yAxes: [{
                stacked: true,
            }], 
            legend: {
                display: true
            }
        } 
    }
});

//budget Chart 3
var bar_ctx3 = document.getElementById('budgetChart3');
var budget_chart3 = new Chart(bar_ctx3, {
    type: 'horizontalBar',
    data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
                label: 'Tom',
                data: [1100, 0],
                backgroundColor: "#6F425B",
                hoverBackgroundColor: "#1D1E26",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Karina',
                data: [100, 0],
                backgroundColor: "#56193A",
                hoverBackgroundColor: "#313340",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Housing',
                data: [0, 935],
                backgroundColor: "#2E4E4D",
                hoverBackgroundColor: "#1D1E26",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Food',
                data: [0, 600],
                backgroundColor: "#233B3A",
                hoverBackgroundColor: "#313340",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Transportation',
                data: [0, 608],
                backgroundColor: "#ABB8B8",
                hoverBackgroundColor: "#626673",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Health Insurance',
                data: [0, 555],
                backgroundColor: "#587171",
                hoverBackgroundColor: "#BFC7D9",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Other Medical Expenses',
                data: [0, 400],
                backgroundColor: "#5BBDBD",
                hoverBackgroundColor: "#BFC7D9",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Child Related',
                data: [0, 400],
                backgroundColor: "#94BDBD",
                hoverBackgroundColor: "#BFC7D9",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Taxes',
                data: [0, 200],
                backgroundColor: "#8EBABA",
                hoverBackgroundColor: "#A8B0BF",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: 'Other Necessities',
                data: [0, 600],
                backgroundColor: "#546E6E",
                hoverBackgroundColor: "#6F7C8A",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
        ]
    },
    options: {
        responsive: false,
        legend: false,
        animation: {
            duration: 1000
        },
        title:{
            display:true,
            text:"Karina and Tom's Monthly Budget",
            fontFamily:"'Quatrocentro', serif",
            fontSize:20,
        } ,
        tooltips: {
            mode: 'nearest',
            callbacks: {
                label: function (tooltipItem, data) {
                    return "$" + tooltipItem.xLabel.toString();
                },
            }
        },
        scales: {
            fontFamily:"'Quatrocentro', serif",
            fontSize:16,
            xAxes: [{
                stacked: true,
                gridLines: {
                    display: false
                },
                ticks: {
                    callback: function (value, index, values) {
                        return '$' + value;
                    }
                }
            }],
            yAxes: [{
                stacked: true,
                // ticks: {
                // 		callback: function(value) { return numberWithCommas(value); },
                // 		}, 
                // }],
            }], // scales
            legend: {
                display: true
            }
        } // options
    }
});