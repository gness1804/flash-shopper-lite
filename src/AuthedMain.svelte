<script>
  import { onMount } from 'svelte';
  import * as Cookies from 'js-cookie';
  import ItemInput from './ItemInput.svelte';

  let items = [];
  export let user;
  $: itemsCount = items.length;

  const addItem = ({ detail }) => {
    items = [...items, detail];
    Cookies.remove('svelteItems'); // TODO: enhancement: make these two lines fire only if items changes.
    Cookies.set('svelteItems', items, { expires: 2 });
  }

  onMount(() => {
		const itemsCookie = Cookies.get('svelteItems');
		if (itemsCookie) {
			items = JSON.parse(itemsCookie);
		}
	});
</script>

<style>
  .authed-main-top-message-container {
    margin-bottom: 40px;
  }
</style>

<div class="authed-main">
  <div class="authed-main-top-message-container">
    {#if user}
    <p>Hello, {user.name}</p>
    {/if}

    {#if itemsCount > 0}
      <p>There are {itemsCount} items in your cart.</p>
    {:else}
      <p>There are no items in your cart. Please add one now.</p>
    {/if}
  </div>
  <ItemInput on:addItem={addItem}>
    <h2 slot="title">Add an Item!</h2>
  </ItemInput>
  <div class="authed-main-items-container">
    {#each items as item (item.id)}
      <p>{item.name}</p>
    {/each}
  </div>
</div>

