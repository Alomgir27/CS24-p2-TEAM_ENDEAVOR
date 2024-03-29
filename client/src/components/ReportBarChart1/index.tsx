import Chart from "../../base-components/Chart";
import { ChartData, ChartOptions } from "chart.js/auto";
import { getColor } from "../../utils/colors";
import { selectColorScheme } from "../../stores/colorSchemeSlice";
import { selectDarkMode } from "../../stores/darkModeSlice";
import { useAppSelector } from "../../stores/hooks";
import { useMemo } from "react";

interface MainProps extends React.ComponentPropsWithoutRef<"canvas"> {
  width: number;
  height: number;
  data: any;
  dataKey: string;
  data1: any;
  dataKey1: string;
}

function Main(props: MainProps) {
  const colorScheme = useAppSelector(selectColorScheme);
  const darkMode = useAppSelector(selectDarkMode);

  const data: ChartData = useMemo(() => {
    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: props?.dataKey || "React Template",
          barThickness: 8,
          maxBarThickness: 6,
          data: props?.data?.map((item: any) => item.cost) || [60, 150, 30, 200, 180, 50, 180, 120, 230, 180, 250, 270],
          backgroundColor: colorScheme ? getColor("primary") : "",
        },
        {
          label: props?.dataKey1 || "Vue Template",
          barThickness: 8,
          maxBarThickness: 6,
          data: props?.data1?.map((item: any) => item.distance) || [50, 135, 40, 180, 190, 60, 150, 90, 250, 170, 240, 250],
          backgroundColor: darkMode
            ? getColor("darkmode.400")
            : getColor("slate.300"),
        },
      ],
    };
  }, [colorScheme, darkMode, props.data, props.data1, props.dataKey, props.dataKey1]);

  const options: ChartOptions = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 11,
            },
            color: getColor("slate.500", 0.8),
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            display: false,
          },
          grid: {
            color: darkMode
              ? getColor("darkmode.300", 0.8)
              : getColor("slate.300"),
            borderDash: [2, 2],
            drawBorder: false,
          },
        },
      },
    };
  }, [colorScheme, darkMode]);

  return (
    <Chart
      type="bar"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

Main.defaultProps = {
  width: "auto",
  height: "auto",
  className: "",
};

export default Main;
