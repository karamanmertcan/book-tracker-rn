import { useAtom } from 'jotai';
import moment from 'moment';
import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useQuery } from 'react-query';
import * as UserService from '../../api/services/User';
import { myToken } from '../../store';

interface IChartProps {}

const Chart: React.FunctionComponent<IChartProps> = (props) => {
  const [token, setToken] = useAtom(myToken);

  const { isLoading, isError, data, error, refetch } = useQuery(
    'pageDetails',
    () => UserService.getUserDetails(token),
    {
      refetchInterval: 3000 // turned off by default, manual refetch is needed
    }
  );

  const dates =
    data &&
    data.user[0] &&
    data.user[0].readPages &&
    data.user[0].readPages.map((page: any) => {
      return {
        date: moment(page.date).format('dddd'),
        page: page.pageNumber
      };
    });
  const daySeperator = (inputDay: string) => {
    const day = dates && dates.filter((item: any) => item.date === inputDay);

    return day === undefined ? 0 : day;
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text
          style={{
            color: 'white'
          }}>
          Loading...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{
          backgroundColor: '#f2f',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text>Error...</Text>
      </View>
    );
  }

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
          labels: ['Pazartesi', 'Salı', 'Çarş', 'Perş', 'Cuma', 'Cumartesi', 'Pazar'],
          datasets: [
            {
              data: [
                dates
                  ? daySeperator('Monday').reduce((acc: any, item: any) => acc + item.page, 0)
                  : 0,
                dates
                  ? daySeperator('Tuesday').reduce((acc: any, item: any) => acc + item.page, 0)
                  : 0,
                dates
                  ? daySeperator('Wednesday').reduce((acc: any, item: any) => acc + item.page, 0)
                  : 0,
                dates
                  ? daySeperator('Thursday').reduce((acc: any, item: any) => acc + item.page, 0)
                  : 0,
                dates
                  ? daySeperator('Friday').reduce((acc: any, item: any) => acc + item.page, 0)
                  : 0,
                dates
                  ? daySeperator('Saturday').reduce((acc: any, item: any) => acc + item.page, 0)
                  : 0,
                dates
                  ? daySeperator('Sunday').reduce((acc: any, item: any) => acc + item.page, 0)
                  : 0
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
