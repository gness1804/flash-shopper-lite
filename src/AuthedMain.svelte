<script>
  let items = [];
  export let user;
  $: itemsCount = items.length;
</script>

<style>
</style>

{#if user}
<p>Hello, {user.name}</p>
{/if}

{#if itemsCount > 0}
  <p>There are {itemsCount} items in your cart.</p>
{:else}
  <p>There are no items in your cart. Please add one now.</p>
{/if}
