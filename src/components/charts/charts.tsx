import { autocompleteClasses, Box, Paper, Stack } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";

import "./charts.scss";

export const data = [
	["day", "low", "open", "close", "high", "ave", "sigmah", "sigmal"],
	[0, 125.58, 125.68, 125.61, 125.68, null, null, null],
	[1, 125.56, 125.62, 125.58, 125.6, null, null, null],
	[2, 125.48, 125.59, 125.49, 125.58, null, null, null],
	[3, 124.9, 125.48, 124.9, 125.58, null, null, null],
	[4, 124.93, 124.96, 125.2, 125.28, null, null, null],
	[5, 125.13, 125.28, 125.13, 125.24, null, null, null],
	[6, 125.15, 125.17, 125.24, 125.25, null, null, null],
	[7, 125.08, 125.24, 125.25, 125.27, null, null, null],
	[8, 125.17, 125.24, 125.2, 125.28, null, null, null],
	[9, 125.25, 125.24, 125.28, 125.32, null, null, null],
	[10, 125.28, 125.28, 125.32, 125.34, null, null, null],
	[11, 125.33, 125.34, 125.4, 125.4, null, null, null],
	[12, 125.37, 125.38, 125.4, 125.4, null, null, null],
	[13, 125.37, 125.39, 125.38, 125.4, null, null, null],
	[14, 125.42, 125.4, 125.43, 125.49, null, null, null],
	[15, 125.44, 125.42, 125.59, 125.61, null, null, null],
	[16, 125.55, 125.59, 125.58, 125.61, null, null, null],
	[17, 125.54, 125.59, 125.58, 125.64, null, null, null],
	[18, 125.5, 125.58, 125.5, 125.55, null, null, null],
	[19, 125.53, 125.52, 125.6, 125.61, 125.383, 125.7579186578446, 125.00808134215539],
	[20, 125.59, 125.61, 125.62, 125.69, 125.38349999999998, 125.75965289444585, 125.00734710555412]
];

const RSIforEx = [
	["x", "y1", "y2"],
	[0, 13, 15],
	[1, 14, 16],
	[2, 14, 18],
	[3, 13, 19],
	[4, 14, 15],
]

export const options = {
	legend: 'left',
	explorer: { axis: 'horizontal', keepInBounds: true },
	candlestick: {
		fallingColor: { stroke: '#0000ff', strokeWidth: 3, fill: '#0000ff' },
		risingColor: { stroke: '#ff0000', strokeWidth: 3, fill: '#ff0000' }
	},
	chartArea: {
		backgroundColor: "#fefefe",
		margin: "auto",
		width:'90%',
		height:'90%'
	},
	colors: ['black'],
	seriesType: "candlesticks",
	series: { 1: { type: "line", color: 'orange' }, 2: { type: "line", color: "skyblue" }, 3: { type: "line", color: 'skyblue' }, 4: { type: "line", color: "green" } }
};

const RSIopForEx = {
	curveType: "function",
	chartArea: {
		backgroundColor: "#fefefe",
		margin: "auto",
		width:'90%',
		height:'90%'
	}
}

export function Charts() {
	var rate = 100.3;
	// TODO: 一つ目のChartはLineChartのIntervalsを利用するように変更したい
	return (
		<div id="chartOuter">
			<div id="chartHeader">
				<Stack direction="row" sx={{ justifyContent: "space-between", m: 1 }}>
					<Paper sx={{ backgroundColor: "#f1f1f1", p: 1, width: "fit-content", marginLeft: 6 }}>
						USD/JPY: {rate}
					</Paper>

					<Paper sx={{ backgroundColor: "#f1f1f1", p: 1, width: "fit-content", marginLeft: 2 }}>
						<span>USD/JPY</span><span>5分足</span>
					</Paper>

				</Stack>

			</div>
			<div id="chartMain">
				<Chart
					chartType="ComboChart"
					data={data}
					options={options}
					legendToggle
					width={"100%"}
					height={"100%"}
				></Chart>
			</div>
			<div id="chartSub">
				<Chart
					chartType="LineChart"
					data={RSIforEx}
					options={RSIopForEx}
					legendToggle
					width={"100%"}
					height={"100%"}
				></Chart>
			</div>

		</div>
	)
}