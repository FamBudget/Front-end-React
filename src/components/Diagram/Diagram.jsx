import React from "react";
import Chart from "react-apexcharts";

import "./Diagram.scss";

export const Diagram = ({ expenseCategories, expenses }) => {
  const categories = expenseCategories?.map((item) => item.name);

  console.log(categories);
  console.log(expenseCategories);
  console.log(expenses);
  return (
    <>
      <Chart
        type="donut"
        width={500}
        height={500}
        series={[50, 60, 100, 150, 200]}
        options={{
          labels: categories,
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true,
                  },
                },
              },
            },
          },
        }}
      />
    </>
  );
};
