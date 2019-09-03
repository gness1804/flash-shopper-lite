<script>
  import { onMount } from 'svelte';
  import * as Cookies from 'js-cookie';
  import ItemInput from './ItemInput.svelte';
  import ItemContainer from './ItemContainer.svelte';
  import { items } from './stores/mainStore';

  export let user;
  $: itemsCount = $items.length;

  const updateItemsCookie = () => {
    Cookies.remove('svelteItems');
    Cookies.set('svelteItems', $items, { expires: 2 });
  }

  const updateItemsFromCookie = () => {
    const itemsCookie = Cookies.get('svelteItems');
		if (itemsCookie) {
      items.set(JSON.parse(itemsCookie));
		}
  }

  const addItem = ({ detail }) => {
    items.update(_items => [..._items, detail]);
    updateItemsCookie();
  }

  const deleteItem = ({ detail: id }) => {
    const newItems = $items.filter(item => item.id !== id);
    items.set(newItems);
    updateItemsCookie();
  }

  onMount(() => {
		updateItemsFromCookie();
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
    {#each $items as item (item.id)}
      <ItemContainer {...item} on:deleteItem={deleteItem} />
    {/each}
  </div>
</div>

