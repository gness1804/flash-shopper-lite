<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import * as Cookies from 'js-cookie';
  import ItemInput from './ItemInput.svelte';
  import ItemContainer from './ItemContainer.svelte';
  import GroceryAPIResults from './GroceryAPIResults.svelte';
  import { items } from './stores/mainStore';
  import { sortAlpha, sortNumeric } from './helpers/sort';

  export let user;

  let sortState = 'alpha';
  let selectedGroceryStore = 'heb';
  let groceryDataPromise;
  $: itemsCount = $items.length;
  $: itemsInCart = $items.filter(_item => _item.inCart).length;
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

  const dispatch = createEventDispatcher();

  const logOut = () => {
    dispatch('logOut');
  };

  const updateItemsCookie = () => {
    Cookies.remove('svelteItems');
    Cookies.set('svelteItems', $items, { expires: 2 });
  };

  const updateItemsFromCookie = () => {
    const itemsCookie = Cookies.get('svelteItems');
    if (itemsCookie) {
      items.set(JSON.parse(itemsCookie));
    }
  };

  const addItem = ({ detail }) => {
    items.update(_items => [..._items, detail]);
    updateItemsCookie();
  };

  const deleteItem = ({ detail: id }) => {
    const newItems = $items.filter(item => item.id !== id);
    items.set(newItems);
    updateItemsCookie();
  };

  const updateItem = ({ detail }) => {
    const newItems = $items.map(_item => {
      if (_item.id === detail.id) {
        return Object.assign({}, _item, { ...detail });
      }
      return _item;
    });
    items.set(newItems);
    updateItemsCookie();
  };

  const deleteAllItems = () => {
    const warn = confirm('This will delete ALL items! Are you sure?');
    if (warn) {
      items.set([]);
      updateItemsCookie();
    }
  };

  const fetchGroceryAPIData = async () => {
    const res = await fetch('https://www.reddit.com/r/grocery.json');
    const text = await res.text();
    if (res.ok) {
      return text;
    }
    throw new Error(text);
  };

  const showRedditData = () => {
    groceryDataPromise = fetchGroceryAPIData();
  };

  const hideRedditData = () => {
    groceryDataPromise = undefined;
  };

  onMount(() => {
    updateItemsFromCookie();
  });
</script>

<style>
  .destructive-button {
    background-color: #f00;
  }
</style>

<div class="authed-main">
  <div class="mb-10 user-info-display">
    {#if user}
      <p>
        Hello,
        <span class="font-bold">{user.name}</span>
      </p>
      <button class="destructive-button mb-0 text-white" on:click={logOut}>
        Log Out
      </button>
    {/if}

    {#if itemsCount > 0}
      <p>
        You have {itemsCount} {itemsCount > 1 ? 'items' : 'item'} on your list. {itemsInCart}
        {itemsInCart !== 1 ? 'items are' : 'item is'} in your cart now.
      </p>
    {:else}
      <p>There are no items on your list. Please add one now.</p>
    {/if}
  </div>
  <ItemInput on:addItem={addItem} on:showToast>
    <h2 slot="title">Add an Item!</h2>
  </ItemInput>
  <div class="flex justify-center items-center mb-2 flex-col md:flex-row">
    <button
      on:click={deleteAllItems}
      disabled={itemsCount === 0}
      class="destructive-button text-white mb-3 md:mb-0 md:mr-4">
      Delete All Items
    </button>
    <span class="mr-0 mb-3 md:mr-4 md:mb-0">Sort By:</span>
    <select bind:value={sortState} class="mb-0">
      {#each sortOptions as { name, value }}
        <option {value}>{name}</option>
      {/each}
    </select>
  </div>
  <div class="mb-10">
    <h4>My Store:</h4>
    {#each groceryStores as { name, value }}
      <label class="cursor-pointer">
        <input type="radio" {value} bind:group={selectedGroceryStore} />
        {name}
      </label>
    {/each}
  </div>
  <div class="authed-main-items-container">
    {#if sortState === 'alpha'}
      {#each sortAlpha($items, 'name') as item (item.id)}
        <ItemContainer
          {...item}
          on:deleteItem={deleteItem}
          on:updateItem={updateItem}
          on:showToast
          {link} />
      {/each}
    {:else if sortState === 'aisle'}
      {#each sortNumeric($items, 'aisle') as item (item.id)}
        <ItemContainer
          {...item}
          on:deleteItem={deleteItem}
          on:updateItem={updateItem}
          on:showToast
          {link} />
      {/each}
    {:else if sortState === 'date'}
      {#each sortNumeric($items, 'id') as item (item.id)}
        <ItemContainer
          {...item}
          on:deleteItem={deleteItem}
          on:updateItem={updateItem}
          on:showToast
          {link} />
      {/each}
    {/if}
  </div>
  {#if !groceryDataPromise}
    <button class="hover:border-black" on:click={showRedditData}>
      Show Reddit Data!
    </button>
  {:else}
    <button on:click={hideRedditData}>Hide Reddit Data</button>
  {/if}
  {#await groceryDataPromise}
    <p>Loading...</p>
  {:then result}
    <GroceryAPIResults data={result} />
  {:catch error}
    <p>Error loading Reddit grocery store data: {error.message || error}</p>
  {/await}
</div>
