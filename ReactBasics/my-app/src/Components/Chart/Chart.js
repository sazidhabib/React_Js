import React from "react";

import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
  return (
    <div className="chart">
      {props.dataCharts.map((dataChart) => (
        <ChartBar
          key={dataChart.label}
          value={dataChart.value}
          maxValue={null}
          label={dataPoint.lable}
        />
      ))}
    </div>
  );
};

export default Chart;
