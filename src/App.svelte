<script>
	import AuthedMain from './AuthedMain.svelte';
	let userLoggedIn = false;
</script>

<style>
</style>

<h1>Flash Shopper Lite</h1>

{#if userLoggedIn}
	<AuthedMain />
{/if}

