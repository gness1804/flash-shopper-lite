<script>
  import ItemInput from './ItemInput.svelte';

  let items = [];
  export let user;
  $: itemsCount = items.length;
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
  <ItemInput>
    <h2 slot="title">Add an Item!</h2>
  </ItemInput>
</div>

