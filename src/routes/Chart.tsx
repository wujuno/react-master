import {useQuery} from "@tanstack/react-query"
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";


interface ChartProps {
  coinId: string;
}
interface IHistoricalData {
  time_open: number,
  time_close: number,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  market_cap: number
}


function Chart({coinId}:ChartProps) {
  const { isLoading, data } = useQuery<IHistoricalData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );  
  return (<div>
    {isLoading 
    ? "Loading Chart..." 
    : <ApexChart 
      type="line"
      series= {[
        {
          name: "Price",
          data: data?.map(x => parseFloat(x.close)) as number[],
        },
      ]}
      options={{
        theme: {
          mode: `dark`,
          palette: `palette6`
        },
        chart: {
          height:500,
          width:500,
          toolbar: {
            show: false,
          },
          background: "transparent"
        },
        stroke: {
          show: true,
          curve: 'smooth',
        },
        grid : {show: false},
        yaxis: {
          show: false,
        },
        xaxis: {
          axisBorder: {show: false},
          axisTicks:{show:false},
          labels: {show:false}
        }
      }}/>
    }
  </div>) ;
}
  
  export default Chart;