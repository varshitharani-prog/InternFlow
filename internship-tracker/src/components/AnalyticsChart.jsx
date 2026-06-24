import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function AnalyticsChart({ analytics }) {
  const data = {
    labels: [
      "OA",
      "Interview",
      "Selected",
      "Rejected"
    ],
    datasets: [
      {
        data: [
          analytics.oa,
          analytics.interview,
          analytics.selected,
          analytics.rejected
        ],
         backgroundColor: [
          "#F59E0B", 
          "#8B5CF6", 
          "#10B981", 
          "#EF4444"  
        ],
        borderWidth: 2
      }
    ]
  };
  const values = [
  analytics.oa,
  analytics.interview,
  analytics.selected,
  analytics.rejected
  ];
  const total = values.reduce((sum, val) => sum + val, 0);
  if (total === 0) {
    return (
      <div className="analytics-chart-card">
        <p style={{color:"black"}}>No updated applications yet</p>
      </div>
    );
  }

  return (
    <div className="analytics-chart-card">
      <div className="chart-wrapper">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default AnalyticsChart;

