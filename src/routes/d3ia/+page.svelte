<script src="https://d3js.org/d3.v7.min.js">
    import * as d3 from "d3";

    function myFunction() {
        d3.select("circle").remove();
    }
</script>

<div id="infovizDiv">
    <svg style="width:500px;height:500px;border:1px lightgray solid;">
        <path
            d="M 10,60 40,30 50,50 60,30 70,80"
            style="fill:black;stroke:gray;storke-width:4px;"
        />
        <polygon
            style="fill:gray;"
            points="80,400 120,400 160,440 120,480 60,460"
        />
        <g>
            <line
                x1="200"
                y1="100"
                x2="450"
                y2="225"
                style="strock:black;stroke-width:2px;"
            />
            <circle cy="100" cx="200" r="30" />
            <rect
                x="410"
                y="200"
                width="100"
                height="50"
                style="fill:pink;stroke:black;stroke-width:1px;"
            />
        </g>
    </svg>
</div>
<button on:click={myFunction}>Click Me!</button>
