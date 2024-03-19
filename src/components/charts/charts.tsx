import { autocompleteClasses, Box, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useAuthenticatedFetch from "../../services/fetchService";

import "./charts.scss";

const dataHeader = ["date", "low", "open", "close", "high", "ave", "sigmah", "sigmal"];

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
	series: { 1: { type: "line", color: 'orange', curveType: "function" }, 2: { type: "line", color: "skyblue", curveType: "function"  }, 3: { type: "line", color: 'skyblue', curveType: "function"  }, 4: { type: "line", color: "green" } }
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
	// TODO: add interface
	const [rates, setRates] = useState([] as any[]);
	const [dataLoading, setDataLoading] = useState(true);
	const [chartData, setChartData] = useState([] as any[]);
	const {authedFetch} = useAuthenticatedFetch();
	var data: any[] = [];
	const init = () => {
		authedFetch("/rates/candle?numOfBar=8&dataInBar=4&nForSigma=2").then(res => {
			setRates(res);
		})
	}

	useEffect(() => {
		setDataLoading(true);
		data = [];
		data.push(dataHeader);
		rates.forEach((rate: any) => {
			var datum: any[] = [];
			datum.push(rate["date"]);
			datum.push(rate["low"]);
			datum.push(rate["open"]);
			datum.push(rate["close"]);
			datum.push(rate["high"]);
			datum.push(rate["ave"]);
			datum.push(rate["sigma_high"]);
			datum.push(rate["sigma_low"]);
			data.push(datum);
		})
		setChartData(data);
		setDataLoading(false)
	}, [rates])

	useEffect(() => {
		init()
	}, []);

	var rate = 100.4;
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
					data={chartData}
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