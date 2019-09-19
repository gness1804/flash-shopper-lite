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

<style>
</style>

<label>
  <input placeholder="Enter Name" type="text" bind:value={user.name} />
</label>

<label>
  <input placeholder="Enter Password" type="password" bind:value={user.password} />
</label>

<button on:click={logIn}>
  Log In
</button>
