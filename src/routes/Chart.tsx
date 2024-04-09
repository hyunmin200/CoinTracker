import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import { isDarkAtom } from "../Atoms";
import { useRecoilValue } from "recoil";

interface ChartProps {
	coinId: string;
}

interface IHistorical {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

export default function Chart({ coinId }: ChartProps) {
	const isDark = useRecoilValue(isDarkAtom);
	const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
		fetchCoinHistory(coinId),
	);
	const isError = !Array.isArray(data);
	return (
		<div>
			{isLoading ? (
				"Loading Chart"
			) : isError ? (
				<h1>값이 존재하지 않습니다..😭</h1>
			) : (
				<ReactApexChart
					type="line"
					series={[
						{
							name: "price",
							data: data?.map((price) => Number(price.close)) ?? [],
						},
					]}
					options={{
						theme: {
							mode: isDark ? "dark" : "light",
						},
						chart: {
							height: 400,
							width: 500,
							toolbar: {
								show: false,
							},
							background: "transparent",
						},
						grid: { show: false },
						stroke: {
							width: 5,
						},
						yaxis: { show: false },
						xaxis: {
							labels: { show: false },
							axisTicks: { show: false },
							axisBorder: { show: false },
							type: "datetime",
							categories:
								data?.map((price) =>
									new Date(Number(price.time_close) * 1000).toUTCString(),
								) ?? [],
						},
						fill: {
							type: "gradient",
							gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
						},
						colors: ["#0fbcf9"],
						tooltip: {
							y: {
								formatter: (value) => `$ ${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}
