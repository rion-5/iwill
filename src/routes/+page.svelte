<script>
	/**
	 * @type {any}
	 */
	let stock_data;

	async function fetchData() {
		const response = await fetch(
			"https://rion5.kro.kr:8443/tradeDataForChart?symbol=AAPL&start_date=2024-05-01&end_date=2024-05-30",
		);
		stock_data = await response.json();
	}

	fetchData();

	let width = 500;
	let height = 200;
</script>

<h2>Quant</h2>
<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	{#if stock_data}
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
	{/if}

	<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
		<circle
			cx="50"
			cy="50"
			r="40"
			stroke="green"
			stroke-width="4"
			fill="yellow"
		/>
	</svg>
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
