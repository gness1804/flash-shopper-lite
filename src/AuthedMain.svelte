<script>
  import { onMount } from 'svelte';
  import * as Cookies from 'js-cookie';
  import ItemInput from './ItemInput.svelte';
  import ItemContainer from './ItemContainer.svelte';
  import { items } from './stores/mainStore';
  import {
  sortAlpha,
  sortAisle,
  sortDate,
} from './helpers/sort';

  export let user;

  let sortState = 'alpha';
  $: itemsCount = $items.length;

  const sortOptions = [
    {
      name: 'Alpha',
      value: 'alpha',
    },
    {
      name: 'Aisle',
      value: 'aisle',
    },
    {
      name: 'Date Added',
      value: 'date',
    },
  ];

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

  const updateItem = ({detail}) => {
    const newItems = $items.map(_item => {
      if (_item.id === detail.id) {
        return Object.assign({}, _item, {...detail});
      }
      return _item;
    });
  items.set(newItems);
  updateItemsCookie();
  }

  const deleteAllItems = () => {
    const warn = confirm('This will delete ALL items! Are you sure?');
    if (warn) {
      items.set([]);
      updateItemsCookie();
    }
  }

  onMount(() => {
		updateItemsFromCookie();
	});
</script>

<style>
  .authed-main-top-message-container {
    margin-bottom: 40px;
  }

  .authed-main-delete-all-items-button {
    background-color: #f00;
    color: #fff;
    margin-bottom: 60px;
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
  <button on:click={deleteAllItems} disabled={itemsCount === 0} class="authed-main-delete-all-items-button">
    Delete All Items
  </button>
  <span>Sort By:</span>
  <select bind:value={sortState}>
    {#each sortOptions as { name, value }}
      <option value={value}>{name}</option>
    {/each}
  </select>
  <div class="authed-main-items-container">
    {#if sortState === 'alpha'}
      {#each sortAlpha($items) as item (item.id)}
        <ItemContainer {...item} on:deleteItem={deleteItem} on:updateItem={updateItem} />
      {/each}
    {:else if sortState === 'aisle'}
      {#each sortAisle($items) as item (item.id)}
        <ItemContainer {...item} on:deleteItem={deleteItem} on:updateItem={updateItem} />
      {/each}
    {:else if sortState === 'date'}
      {#each sortDate($items) as item (item.id)}
        <ItemContainer {...item} on:deleteItem={deleteItem} on:updateItem={updateItem} />
      {/each}
    {/if}
  </div>
</div>

