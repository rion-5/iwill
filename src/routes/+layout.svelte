<!-- src/routes/+layout.svelte -->
<script>
    // export let data;
</script>

<nav>
    <ul>
        <li><a href="/iwill">Home</a></li>
        <li><a href="/iwill/d3-test">d3-test</a></li>
        <li><a href="/iwill/chart2">chart2</a></li>
    </ul>
</nav>

<main>
    <slot />
</main>

<style>
    nav ul {
        display: flex;
        list-style-type: none;
    }
    nav ul li {
        margin-right: 1rem;
    }
</style>
