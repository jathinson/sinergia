

var speedCanvas = document.getElementById("speedChart");


var scaleData = {
      labels: ["Barite", "Calcite", "Siderite", "Strontianite", "Witherite"],
      datasets: [
        {
          label: "Scale",
          fill: false,
          hidden: true,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          data: [25.48,54.16,7.61,8.06,4.45]
        }
      ]
    };

var scaleOptions =  {
      title: {
        display: false,
        text: 'Scale Well'
      }
    };


    var color = Chart.helpers.color;
    var config = {
      type: 'radar',
      data: scaleData
      ,
      options: scaleOptions
    };

    window.onload = function() {
      window.myRadar = new Chart(document.getElementById('wellscale'), config);
      window.myRadar2 = new Chart(document.getElementById('wellstac'), config);
    };




    var colorNames = Object.keys(window.chartColors);
    

