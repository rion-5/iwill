<script lang="ts">
    import * as d3 from "d3";
    let width = 1600;
    let height = 200;

    let points: { name: string; value: number }[] = [
        { name: "2024-01-02", value: 185.64 },
        { name: "2024-01-03", value: 184.25 },
        { name: "2024-01-04", value: 181.91 },
        { name: "2024-01-05", value: 181.18 },
        { name: "2024-01-08", value: 185.56 },
        { name: "2024-01-09", value: 185.14 },
        { name: "2024-01-10", value: 186.19 },
        { name: "2024-01-11", value: 185.59 },
        { name: "2024-01-12", value: 185.92 },
        { name: "2024-01-16", value: 183.63 },
        { name: "2024-01-17", value: 182.68 },
        { name: "2024-01-18", value: 188.63 },
        { name: "2024-01-19", value: 191.56 },
        { name: "2024-01-22", value: 193.89 },
        { name: "2024-01-23", value: 195.18 },
        { name: "2024-01-24", value: 194.5 },
    ];
    let xTicks: string[] = points.map((item: { name: string }) => item.name);
    //let yTicks: number[] = [];
    const yTicks: number[] = [0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200];
    const padding = { top: 20, right: 15, bottom: 20, left: 25 };

    function formatMobile(tick: any) {
        return "'" + tick.toString().slice(-2);
    }

    $: xScale = d3
        .scaleLinear()
        .domain([0, xTicks.length])
        .range([padding.left, width - padding.right]);

    $: yScale = d3
        .scaleLinear()
        .domain([0, Math.max.apply(null, yTicks)])
        .range([height - padding.bottom, padding.top]);

    $: innerWidth = width - (padding.left + padding.right);
    $: barWidth = innerWidth / xTicks.length;
    // $: barWidth =20 ;
</script>

<h2>TSLA stock</h2>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
    {#if points.length > 0}
        <svg>
            <!-- y axis -->
            <g class="axis y-axis">
                {#each yTicks as tick}
                    <g
                        class="tick tick-{tick}"
                        transform="translate(0, {yScale(tick)})"
                    >
                        {console.log("tick = " + tick)}

                        <line x2="100%" />
                        <text y="-4">{tick} {tick === 200 ? " $" : ""}</text>
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
                        height={yScale(0) - yScale(point.value)}
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
