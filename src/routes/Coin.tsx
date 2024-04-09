import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
	Link,
	Route,
	Switch,
	useLocation,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import { styled } from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
	width: 100%;
	height: 100%;
	padding: 0px 20px;
	max-width: 440px;
	margin: 0 auto;
`;

const Header = styled.header`
	width: 100%;
	height: 15vh;
	display: flex;
	align-items: center;
	margin: 20px 0px;
`;

const BackHome = styled.div`
	width: 30%;
	height: 50%;
	display: flex;
	align-items: center;
	a {
		width: 35px;
		height: 35px;
		border-radius: 10px;
	}
`;

const Title = styled.h1`
	display: flex;
	align-items: center;
	width: 70%;
	height: 50%;
	font-size: 46px;
	font-weight: 700;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.h1`
	font-size: 48px;
	height: 60vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-around;
	background-color: ${(props) => props.theme.cardBgColor};
	padding: 10px 20px;
	margin: 15px 0px;
	border-radius: 10px;
	box-shadow: 0px 0px 5px 0px white;
	border: 1px solid ${(props) => props.theme.textColor};
`;
const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;
const Description = styled.p`
	margin: 15px 0px;
	background-color: ${(props) => props.theme.cardBgColor};
	padding: 20px 20px;
	border-radius: 10px;
	box-shadow: 0px 0px 5px 0px white;
	border: 1px solid ${(props) => props.theme.textColor};
`;

const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
	gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 18px;
	font-weight: 400;
	/* background-color: rgba(0, 0, 0, 0.5); */
	padding: 14px 0px;
	border-radius: 10px;
	color: ${(props) =>
		props.$isActive ? props.theme.accentColor : props.theme.textColor};
	a {
		position: relative;
		display: block;
		&::after {
			content: "";
			position: absolute;
			height: 2px;
			bottom: -10px;
			left: 87px;
			width: 20px;
			border-radius: 1px;
			background-color: ${(props) =>
				props.$isActive ? props.theme.accentColor : props.theme.textColor};
			transition: background-color 0.3s ease 0s;
		}
	}
`;

interface RouteParams {
	coinId: string;
}

interface RouteStates {
	name: string;
}

interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	logo: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
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

function Coin() {
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<RouteStates>();
	const priceMatch = useRouteMatch("/:coinId/price");
	const chartMatch = useRouteMatch("/:coinId/chart");
	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
		["info", coinId],
		() => fetchCoinInfo(coinId),
	);
	const { isLoading: tickersLoading, data: tickerData } = useQuery<PriceData>(
		["tickers", coinId],
		() => fetchCoinTickers(coinId),
	);

	const loading = infoLoading && tickersLoading;
	return (
		<Container>
			<Helmet>
				<title>
					{state?.name
						? state.name
						: loading
						? "코인 로딩중..."
						: infoData?.name}
				</title>
			</Helmet>
			<Header>
				<BackHome>
					<Link to={`/`}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
							/>
						</svg>
					</Link>
				</BackHome>
				<Title>
					{state?.name
						? state.name
						: loading
						? "코인 로딩중..."
						: infoData?.name}
				</Title>
			</Header>
			{loading ? (
				<Loader>😫loading😫</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>심볼</span>
							<span>${infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>순위</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>가격</span>
							<span>{tickerData?.quotes.USD.price.toFixed(2)}</span>
						</OverviewItem>
					</Overview>
					<Overview>
						<OverviewItem>
							<span>총량</span>
							<span>{tickerData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>최대 발행량</span>
							<span>{tickerData?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>

					<Tabs>
						<Tab $isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab $isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>Price</Link>
						</Tab>
					</Tabs>

					<Switch>
						<Route path={`/:coinId/price`}>
							<Price />
						</Route>
						<Route path={`/:coinId/chart`}>
							<Chart coinId={coinId} />
						</Route>
					</Switch>
				</>
			)}
		</Container>
	);
}

export default Coin;
