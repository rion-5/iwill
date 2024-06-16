<script lang="ts">
	import * as d3 from "d3";
	import { onMount } from "svelte";

	let width = 1600;
	let height = 400;
	
	let points: { name: string; value: number }[] = [];
	let xTicks: string[] = [];
	//let yTicks: number[] = [];
	const yTicks: number[] = [165,170,175,180,185,190,195,200];


	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

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
				points = data.series;
				xTicks = data.series.map((item: { name: string }) => item.name);
				//yTicks = data.series.map((item: { value: number }) => item.value);
			} else {
				console.error("Invalid data structure:", data);
			}

			console.log(points); // 확인용 출력
			console.log(xTicks);
			console.log(yTicks);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}



	function formatMobile(tick: any) {
		return "'" + tick.toString().slice(-2); 
	}

	$: xScale = d3
		.scaleLinear()
		.domain([0, xTicks.length])
		.range([padding.left, width - padding.right]);

	$: yScale = d3
		.scaleLinear()
		.domain([150, Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);

	$: innerWidth = width - (padding.left + padding.right);
	$: barWidth = innerWidth / xTicks.length ;
	// $: barWidth =20 ;

	onMount(() => {
		fetchData();
	});
</script>

<h2>TSLA stock</h2>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	{#if points.length > 0}
		<svg>
			<!-- y axis -->
			<g class="axis y-axis">
				{#each yTicks as tick}
					<g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
						{console.log("tick = " + tick )}

						<line x2="100%" />
						<text y="-4">{tick} {tick === 200 ? ' $' : ''}</text>
					</g>
				{/each}
			</g>

			<!-- x axis -->
			<g class="axis x-axis">
				{#each points as point, i}
					<g class="tick" transform="translate({xScale(i)},{height})">
						<text x={barWidth / 2} y="-4">
							{i}
							<!-- {width > 380 ? point.name : formatMobile(point.name)} -->
						</text>
					</g>
				{/each}
			</g>

			<g class="bars">
				{#each points as point, i}
					<rect
						x={xScale(i) + 2}
						y={yScale(point.value)}
						width={barWidth - 4}
						height={yScale(170) - yScale(point.value)}
					/>
				{/each}
			</g>
		</svg>
	{:else}
		<p>Loading data...</p>
	{/if}
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
	}
</style>
