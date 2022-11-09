import {useQuery} from "@tanstack/react-query"
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";


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
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () =>fetchCoinHistory(coinId),
    {refetchInterval: 10000}
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
          mode: isDark? `dark`: `light`,
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
          labels: {
            show:false,
            datetimeFormatter : {
              month: "MMM 'yy",
            }
          },
          type: "datetime",
          categories: data?.map((price) => new Date(price.time_close * 1000).toISOString()),
        },
        fill: {type: "gradient", gradient:{gradientToColors:["#00c6ad"], stops: [0,100]}},
        colors: ["#1847e5"],
      }}/>
    }
  </div>) ;
}
  
  export default Chart;