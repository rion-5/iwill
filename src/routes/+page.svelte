<script lang="ts">
	import { onMount } from "svelte";
	import { Stock, Series } from "./Stock";
	import * as d3 from "d3";

	let stock_data: Stock = new Stock("", []);

	async function fetchData() {
		try {
			const response = await fetch(
				"https://rion5.kro.kr:8443/stock?symbol=TSLA&start_date=2024-05-01&end_date=2024-05-30",
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// 응답 데이터 구조를 확인하고 유효성 검사 추가
			if (data && Array.isArray(data.series)) {
				const seriesData = data.series.map(
					(item: any) => new Series(item.name, item.value),
				);
				stock_data = new Stock(data.name || "", seriesData);
			} else {
				console.error("Invalid data structure:", data);
				stock_data = new Stock("", []);
			}

			console.log(stock_data); // 확인용 출력
			updateChart();

		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	onMount(() => {
		fetchData();
	});

	let width = 500;
	let height = 200;

	function updateChart(){
		d3.select("svg#viz")
		.selectAll("circle")
		.data(stock_data.series)
		.enter()
		.append("circle")
		.attr("r", 5)
		.attr("cx", function (d, i) {
			return i * 10;
		})
		.attr("cy", function (d) {
			return d.value;
		});
	}

	// function updateChart() {
	// 	const svg = d3.select("svg#viz")
	// 		.attr("width", width)
	// 		.attr("height", height);

	// 	const circles = svg.selectAll("circle")
	// 		.data(stock_data.series);

	// 	circles.enter()
	// 		.append("circle")
	// 		.merge(circles)
	// 		.attr("r", 5)
	// 		.attr("cx", (d, i) => i * 10)
	// 		.attr("cy", d => height - d.value);

	// 	circles.exit().remove();
	// }


</script>

<h2>Quant</h2>
<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	{#if stock_data.name}
		<ul>
			<li>Symbol: {stock_data.name}</li>
			{#each stock_data.series as subitem}
				<li>{subitem.name} : {subitem.value}</li>
			{/each}
		</ul>
	{:else}
		<p>Loading...</p>
	{/if}

	<!-- {#if stock_data}
		<ul>
			{#each stock_data as item}
				<li>Symbol: {item.name}</li>

				{#each item.series as subitem}
					<li>{subitem.name} : {subitem.value}</li>
				{/each}
			{/each}
		</ul>
	{:else}
		<p>Loading...</p>
	{/if} -->

	<!-- <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
		<circle
			cx="50"
			cy="50"
			r="40"
			stroke="green"
			stroke-width="4"
			fill="yellow"
		/>
	</svg> -->
<!-- </div>
<div> -->
	<svg id="viz"> </svg>
</div>

<style>
	h2 {
		text-align: center;
	}

	.chart {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 200px;
	}
	/* 
	.tick {
		font-family: Helvetica, Arial;
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #ccc;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.bars rect {
		fill: #a11;
		stroke: none;
		opacity: 0.65;
	} */
</style>
