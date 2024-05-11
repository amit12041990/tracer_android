import React from 'react';
import { View,Text,Dimensions,ScrollView} from 'react-native';
import {WebView} from 'react-native-webview'

const screenWidth = Dimensions.get('window').width;

const ScreenChartComponent = (prop) => {
 
    const screenData = prop.data
   const [series,xAxis]=screenData

    const newLocal = `
    <!DOCTYPE HTML>
    <html>
    <head>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script type="text/javascript">
    window.onload = function () {
    
      
      var options = {
      chart: {
        type: 'area',
        height:600
        
      },
      series: [{
        name: "Screen Time",
        data: ${JSON.stringify(series)}
      }],
      dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
    },
    
      xaxis: {
        type: "datetime",
        categories: ${JSON.stringify(xAxis)}
      }
    }
    
    var chart = new ApexCharts(document.querySelector("#newChart"), options);
    
    chart.render();
    }
    
    </script>
    </head>
    <body>
    <div id="newChart"></div>
    </body>
    </html>
          `;

    return (
        <View style={{ height:250,}}>
           
      
                <WebView source={{ html: newLocal }} style={{ flex: 1, width: screenWidth-20,
                 }} />
         
        </View>
    );
};

export default ScreenChartComponent;
