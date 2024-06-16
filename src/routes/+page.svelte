<!-- src/routes/+page.svelte -->
<script lang="ts">
	type trade_data = {
		trading_date: string;
		close: string;
	};

	export let data: {
		data: trade_data[];
	};

	console.log("Parsed data:", data.data[0]);
</script>

<main>
	<h1>PostgreSQL 데이터</h1>
	<ul>
		{#each data.data as item}
			<li>{item.trading_date} : {item.close}</li>
		{/each}
	</ul>
</main>
