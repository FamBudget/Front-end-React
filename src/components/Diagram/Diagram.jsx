import React from "react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import "./Diagram.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Diagram = ({operation, currency, incomes}) => {
    let res

    if (operation) {
        res = Object.fromEntries(operation?.map((item) => [item.category.name, 0]));
        operation?.forEach((item) => {
            res[item.category.name] += item.amount;
        });
    }
let symbol= incomes ? "+" : "-";
    const textCenter = {
        id: "textCenter",
        beforeDatasetDraw(chart) {
            const {ctx, data} = chart;

            const xCoor = chart.getDatasetMeta(0).data[0]?.x;
            const yCoor = chart.getDatasetMeta(0).data[0]?.y;
            ctx.save();
            ctx.font = "bolder 36px Gilroy ";
            ctx.fillStyle = incomes ? "#1B9B85" : "rgba(255, 58, 58, 1)";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(
                `${symbol} ${data.datasets[0].data.reduce(
                    (acc, el) => acc + el,
                    0
                )} ${currency}`,
                xCoor,
                yCoor
            );

            ctx.font = "bolder 20px Gilroy ";
            ctx.fontStyle = "uppercase";
            ctx.fillStyle = "rgba(144, 144, 144, 1)";
        },
    };

    const options = {
        maintainAspectRatio: false,
        cutout: 150,
        cutoutPercentage: 90,


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
                    "rgba(86, 153, 144, 1)",
                    "rgba(130, 43, 102, 1)",
                    "rgba(170, 63, 57, 1)",
                    "rgba(113, 113, 113, 1)",
                    "rgba(196, 122, 90, 1)",
                    "rgba(233, 183, 56, 1)",
                    "rgba(23, 84, 174, 1)",
                    "rgba(122, 221, 24, 1)",
                    "rgba(0, 17, 105, 1)",
                    "rgba(229, 0, 55, 1)",
                    "rgba(198, 138, 22, 1)",
                    "rgba(245, 170, 43, 1)",
                ],
            },
        ],
    };

    return (
        <div className="chartBox">
            <Doughnut plugins={[textCenter]} data={data} options={options}/>
        </div>
    );
};
