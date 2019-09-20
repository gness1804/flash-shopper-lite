  <script>
    import { createEventDispatcher } from 'svelte';

    let editMode = false;

    export let name;
    export let aisle;
    export let quantity;
    export let note;
    export let inCart;
    export let id;
    export let link;

    let newName = name;
    let newAisle = aisle;
    let newQuantity = quantity;
    let newNote = note;

    const dispatch = createEventDispatcher();

    const deleteItem = () => {
      dispatch('deleteItem', id);
      dispatch('showToast', {
        message: `${name} was successfully removed.`,
      });
    };

    const toggleEdit = () => {
      if (editMode) {
        dispatch('updateItem', {
          name: newName,
          aisle: newAisle,
          quantity: newQuantity,
          note: newNote,
          id,
        });
        dispatch('showToast', {
          message: 'Changes saved.',
        });
      }
      editMode = !editMode;
    };

    const toggleInCart = () => {
      dispatch('updateItem', {
        inCart: !inCart,
        id,
      });
    };
</script>

  <style>
  .delete-button {
    background-color: #f00;
  }

  .in-cart {
    color:#b5b5bd;
    text-decoration: line-through;
  }
  </style>

<div class="border-2 border-solid border-gray-400 mt-0 mx-auto mb-8 max-w-md">
  {#if !editMode}
    <p class="font-semibold" class:in-cart={inCart}>{name}</p>
    {#if aisle}
      <p class="item-container-aisle-display" class:in-cart={inCart}>Aisle: {aisle}</p>
    {/if}
    {#if quantity}
      <p class="item-container-quantity-display" class:in-cart={inCart}>Quantity: {quantity}</p>
    {/if}
    {#if note}
      <p class="item-container-note-display" class:in-cart={inCart}>Note: {note}</p>
    {/if}
  {:else}
    <input bind:value={newName} placeholder="Enter Name." class="block mt-0 mx-auto mb-3"/>
    <input bind:value={newAisle} placeholder="Enter Aisle." class="block mt-0 mx-auto mb-3"/>
    <input bind:value={newQuantity} placeholder="Enter Quantity." class="block mt-0 mx-auto mb-3"/>
    <textarea bind:value={newNote} class="block mt-0 mx-auto mb-3" placeholder="Note..."></textarea>
  {/if}
  <div class="flex items-center justify-center">
    <button on:click={deleteItem} class="delete-button text-white mr-2">
      X
    </button>
    <button on:click={toggleEdit} class="mr-2">
    {editMode ? 'Save' : 'Edit'}
    </button>
    <img src="shopping_cart.svg" alt="Shopping cart." class="h-10 mr-2 cursor-pointer" on:click={toggleInCart} />
    <a href={link.replace(/{{query}}/, newName)} target="_blank">
      Store Search
    </a>
  </div>
</div>
