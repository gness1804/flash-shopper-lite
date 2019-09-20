<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import * as Cookies from 'js-cookie';
	import AuthedMain from './AuthedMain.svelte';
	import LogInView from './LogInView.svelte';
	import Toast from './Toast.svelte';

	let user = null;
	let showToast = false;
	let message = '';

	export let title;

	const handleLogin = ({ detail: { user: _user } }) => {
	  user = _user;
	  Cookies.remove('svelteUser');
	  Cookies.set('svelteUser', user, { expires: 2 });
	};

	const showToastFn = ({ detail }) => {
	  const { message: _message } = detail;
	  message = _message;
	  showToast = true;
	  setTimeout(() => {
	    message = '';
	    showToast = false;
	  }, 3000);
	};

	const logOut = () => {
	  const warn = confirm('Log out: are you sure?');
	  if (warn) {
	    user = null;
	    Cookies.remove('svelteUser');
	  }
	};

	onMount(() => {
	  const userCookie = Cookies.get('svelteUser');
	  if (userCookie) {
	    user = JSON.parse(userCookie);
	  }
	});
</script>

<style>
	.toast-container {
		position: fixed;
		max-width: 100px;
		margin: 0 auto;
    left: 50%;
    top: 2vh;
		display: flex;
    align-items: center;
    justify-content: center;
	}
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div id="app" class="text-center">
	<h1>Flash Shopper Lite</h1>
	{#if showToast && message}
		<div class="toast-container" transition:fade="{{ duration: 500 }}">
			<Toast {message} />
		</div>
	{/if}

	{#if user}
		<AuthedMain user={user} on:showToast={showToastFn} on:logOut={logOut} />
	{:else}
		<LogInView on:logIn={handleLogin} />
	{/if}
</div>


