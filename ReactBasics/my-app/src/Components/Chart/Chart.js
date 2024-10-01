import React from "react";

import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
  const datapointValues = props.dataCharts.map((dataChart) => dataChart.value);
  const totalMaximum = Math.max(...datapointValues);
  return (
    <div className="chart">
      {props.dataCharts.map((dataChart) => (
        <ChartBar
          key={dataChart.label}
          value={dataChart.value}
          maxValue={totalMaximum}
          label={dataChart.label}
        />
      ))}
    </div>
  );
};

export default Chart;
