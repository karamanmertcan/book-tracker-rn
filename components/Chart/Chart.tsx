import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface IChartProps {}

const Chart: React.FunctionComponent<IChartProps> = (props) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white'
        }}>
        Okuma Grafiğim
      </Text>
      <LineChart
        data={{
          labels: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.floor(Math.random() * 100),
                0
              ]
            }
          ]
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel=''
        yAxisSuffix=''
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#2980b9',
          backgroundGradientFrom: '#2980b9',
          backgroundGradientTo: '#3498db',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#3498db'
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
};

export default Chart;
