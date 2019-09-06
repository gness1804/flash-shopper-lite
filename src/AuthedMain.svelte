<script>
  import { onMount } from 'svelte';
  import * as Cookies from 'js-cookie';
  import ItemInput from './ItemInput.svelte';
  import ItemContainer from './ItemContainer.svelte';
  import GroceryAPIResults from './GroceryAPIResults.svelte';
  import { items } from './stores/mainStore';
  import {
  sortAlpha,
  sortAisle,
  sortDate,
} from './helpers/sort';

  export let user;

  let sortState = 'alpha';
  let selectedGroceryStore = 'heb';
  let groceryDataPromise;
  $: itemsCount = $items.length;
  $: itemsInCart = $items.filter(_item => _item.inCart).length
  let link;

  $: if (selectedGroceryStore === 'heb') {
    link = 'https://www.heb.com/search/results?Ntt={{query}}';
  } else if (selectedGroceryStore === 'walmart') {
    link = 'https://www.walmart.com/search/search-ng.do?search_query={{query}}';
  } else {
    link = 'https://www.kroger.com/search?query={{query}}';
  }

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

  const groceryStores = [
    {
      name: 'H-E-B',
      value: 'heb',
    },
    {
      name: 'Wal-Mart',
      value: 'walmart',
    },
    {
      name: 'Kroger',
      value: 'kroger',
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

  const fetchGroceryAPIData = async () => {
    const res = await fetch('https://www.reddit.com/r/grocery.json');
    const text = await res.text();
    if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
  }

  const showRedditData = () => {
    groceryDataPromise = fetchGroceryAPIData();
  }

  const hideRedditData = () => {
    groceryDataPromise = undefined;
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
    margin-bottom: 0;
    margin-right: 10px;
  }

  .authed-main-my-store-selector-container {
    margin-bottom: 40px;
  }

  .authed-main-controls-top-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .authed-main-sort-type-selector {
     margin-bottom: 0;
  }

  .authed-main-sort-type-label {
    margin-right: 10px;
  }

  .authed-main-my-store-selector-label:hover {
    cursor: pointer;
  }
</style>

<div class="authed-main">
  <div class="authed-main-top-message-container">
    {#if user}
    <p>Hello, {user.name}</p>
    {/if}

    {#if itemsCount > 0}
      <p>You have {itemsCount} {itemsCount > 1 ? 'items' : 'item'} on your list. {itemsInCart} {itemsInCart !== 1 ? 'items are' : 'item is'} in your cart now.</p>
    {:else}
      <p>There are no items on your list. Please add one now.</p>
    {/if}
  </div>
  <ItemInput on:addItem={addItem} on:showToast>
    <h2 slot="title">Add an Item!</h2>
  </ItemInput>
  <div class="authed-main-controls-top-container">
    <button on:click={deleteAllItems} disabled={itemsCount === 0} class="authed-main-delete-all-items-button">
      Delete All Items
    </button>
    <span class="authed-main-sort-type-label">Sort By:</span>
    <select bind:value={sortState} class="authed-main-sort-type-selector">
      {#each sortOptions as { name, value }}
        <option value={value}>{name}</option>
      {/each}
    </select>
  </div>
  <div class="authed-main-my-store-selector-container">
    <h4>My Store:</h4>
    {#each groceryStores as { name, value }}
      <label class="authed-main-my-store-selector-label">
        <input type="radio" value={value} bind:group={selectedGroceryStore} />
        {name}
      </label>
    {/each}
  </div>
  <div class="authed-main-items-container">
    {#if sortState === 'alpha'}
      {#each sortAlpha($items, 'name') as item (item.id)}
        <ItemContainer {...item} on:deleteItem={deleteItem} on:updateItem={updateItem} on:showToast {link}/>
      {/each}
    {:else if sortState === 'aisle'}
      {#each sortAisle($items) as item (item.id)}
        <ItemContainer {...item} on:deleteItem={deleteItem} on:updateItem={updateItem} on:showToast {link}/>
      {/each}
    {:else if sortState === 'date'}
      {#each sortDate($items) as item (item.id)}
        <ItemContainer {...item} on:deleteItem={deleteItem} on:updateItem={updateItem} on:showToast {link}/>
      {/each}
    {/if}
  </div>
  {#if !groceryDataPromise}
    <button on:click={showRedditData}>
      Show Reddit Data!
    </button>
  {:else}
    <button on:click={hideRedditData}>
      Hide Reddit Data
    </button>
  {/if}
  {#await groceryDataPromise}
    <p>Loading...</p>
  {:then result}
    <GroceryAPIResults data={result} />
  {:catch error}
    <p>Error loading Reddit grocery store data: {error.message || error}</p>
  {/await}
</div>

