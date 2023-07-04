import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Diagram.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Diagram = ({ expenses }) => {
  console.log(expenses);
  let res = Object.fromEntries(expenses.map((item) => [item.category.name, 0]));
  expenses.forEach((item) => {
    res[item.category.name] += item.amount;
  });

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        rtl: false,
        labels: {
          usePointStyle: false,
          tension: 10,
          color: "rgba(38, 56, 52, 1)",
          padding: 24,
          boxWidth: 38,
          boxHeight: 12,
          radius: 0,
          font: {
            size: 16,
            lineHeight: 1.375,
            family: "Gilroy",
            weight: 500,
          },
        },
      },
    },
  };

  const data = {
    labels: Object.keys(res),
    datasets: [
      {
        data: Object.values(res),
        backgroundColor: [
          "rgba(248, 93, 93, 1)",
          "rgba(93, 136, 248, 1)",
          "rgba(248, 214, 93, 1)",
          "rgba(152, 93, 248, 1)",
        ],
      },
    ],
  };

  return <Doughnut width={500} height={300} data={data} options={options} />;
};
