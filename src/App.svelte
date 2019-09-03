<script>
	import { onMount } from 'svelte';
	import * as Cookies from 'js-cookie';
	import AuthedMain from './AuthedMain.svelte';
	import LogInView from './LogInView.svelte';

	let userLoggedIn = false;
	let user = null;

	const handleLogin = ({ detail: { user: _user } }) => {
		user = _user;
		userLoggedIn = true;
		Cookies.remove('svelteUser');
		Cookies.set('svelteUser', user, { expires: 2 });
	}

	onMount(() => {
		const userCookie = Cookies.get('svelteUser');
		if (userCookie) {
			user = JSON.parse(userCookie);
			userLoggedIn = true;
		}
	});
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

