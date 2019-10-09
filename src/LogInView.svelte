<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const user = {
    name: '',
    password: '',
  };

  let errorMessage = '';

  const logIn = e => {
    if (!user.name || !user.password) {
      e.preventDefault();
      errorMessage =
        'Error: user name and password required. Please try again.';
      return;
    }
    dispatch('logIn', { user });
    errorMessage = '';
  };
</script>

<form>
  <label>
    <input
      placeholder="Enter Name"
      type="text"
      bind:value={user.name}
      class="user-name-input"
      autocomplete="username" />
  </label>

  <label class="mb-8">
    <input
      placeholder="Enter Password"
      type="password"
      bind:value={user.password}
      autocomplete="current-password"
      class="mb-0 password-input" />
  </label>

  {#if errorMessage}
    <p class="text-red-700 error-message-display">{errorMessage}</p>
  {/if}

  <button on:click={logIn} class="login-button bg-green-600 text-white">
    Log In
  </button>
</form>
