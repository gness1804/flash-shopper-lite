<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const user = {
    name: '',
    password: '',
  };

  const logIn = () => {
    if (!user.name || !user.password) {
      alert('Error: user name and password required. Please try again.');
      return;
    }
    dispatch('logIn', { user });
  };
</script>

<form>
  <label>
    <input
      placeholder="Enter Name"
      type="text"
      bind:value={user.name}
      autocomplete="username" />
  </label>

  <label class="mb-8">
    <input
      placeholder="Enter Password"
      type="password"
      bind:value={user.password}
      autocomplete="current-password"
      class="mb-0" />
  </label>

  <button on:click={logIn} class="bg-green-600 text-white">Log In</button>
</form>
