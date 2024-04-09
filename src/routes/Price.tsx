import React from "react";
import { useParams } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import { useQuery } from "react-query";
import { styled } from "styled-components";

const Container = styled.div``;

const HighBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	background-color: rgba(0, 0, 0, 0.5);
`;

const TextBox = styled.span`
	margin-left: 10px;
	color: white;
	opacity: 0.5;
	line-height: 30px;
`;

const PriceBox = styled.h1`
	margin-right: 10px;
	font-size: 28px;
	text-shadow: white 1px 0 3px;
`;

interface RouteParams {
	coinId: string;
}

interface PriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

export default function Price() {
	const { coinId } = useParams<RouteParams>();
	const { isLoading, data } = useQuery<PriceData>(["tickers", coinId], () =>
		fetchCoinTickers(coinId),
	);
	let date: string = "";
	isLoading ? console.log("로딩중") : (date = data?.quotes.USD.ath_date as "");
	//2024-03-14T07:07:09Z
	date = `${date.substring(0, 4)}. ${date.substring(5, 7)}. ${date.substring(
		8,
		10,
	)}. ${date.substring(11, 13)}:${date.substring(14, 16)}:${date.substring(
		17,
		19,
	)}`;
	return (
		<Container>
			{isLoading ? (
				<HighBox>로딩중..😎</HighBox>
			) : (
				<HighBox>
					<TextBox>
						{date}
						<br /> 최고가 달성
					</TextBox>
					<PriceBox>${data?.quotes.USD.ath_price.toFixed(3)}</PriceBox>
				</HighBox>
			)}
		</Container>
	);
}
