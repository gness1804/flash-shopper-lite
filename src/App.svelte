<script>
	import AuthedMain from './AuthedMain.svelte';
	import LogInView from './LogInView.svelte';
	let userLoggedIn = false;
	let user = null;
</script>

<style>
</style>

<h1>Flash Shopper Lite</h1>

{#if userLoggedIn && user}
	<AuthedMain />
{:else}
	<LogInView />
{/if}

