<script>
	import AuthedMain from './AuthedMain.svelte';
	import LogInView from './LogInView.svelte';

	let userLoggedIn = false;
	let user = null;

	const handleLogin = ({ detail: { user: _user } }) => {
		user = _user;
		userLoggedIn = true;
	}
</script>

<style>
</style>

<h1>Flash Shopper Lite</h1>

{#if userLoggedIn && user}
	<AuthedMain />
	<p>Hello, {user.name}</p>
{:else}
	<LogInView on:logIn={handleLogin} />
{/if}

