  <script>
    import { createEventDispatcher } from 'svelte';

    let editMode = false;

    export let name;
    export let aisle;
    export let quantity;
    export let note;
    export let id;

    let newName = name;
    let newAisle = aisle;
    let newQuantity = quantity;
    let newNote = note;

    const dispatch = createEventDispatcher();

    const deleteItem = () => {
      dispatch('deleteItem', id);
    }

    const toggleEdit = () => {
      if (editMode) {
        dispatch('updateItem', {
          name: newName,
          aisle: newAisle,
          quantity: newQuantity,
          note: newNote,
          id,
        });
      }
      editMode = !editMode;
    }

    const toggleInCart = () => {
      // TODO: build out functionality.
    }
  </script>

  <style>
  .item-container {
    margin-bottom: 30px;
  }

  .item-container-input {
    display: block;
    margin: 0 auto 10px;
  }

  .item-container-text-box {
    margin: 0 auto 10px;
    display: block;
  }

  .item-container-buttons-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item-container-delete-button {
    background-color: #f00;
    color: #fff;
  }

  .item-container-shopping-cart-icon {
    height: 50px;
  }

  .icon {
    margin-right: 8px;
  }

  .item-container-shopping-cart-icon:hover {
    cursor: pointer;
  }
  </style>

<div class="item-container">
  {#if !editMode}
    <p>{name}</p>
    {#if aisle}
      <p>Aisle: {aisle}</p>
    {/if}
    {#if quantity}
      <p>Quantity: {quantity}</p>
    {/if}
    {#if note}
      <p>Note: {note}</p>
    {/if}
  {:else}
    <input bind:value={newName} placeholder="Enter Name." class="item-container-input"/>
    <input bind:value={newAisle} placeholder="Enter Aisle." class="item-container-input"/>
    <input bind:value={newQuantity} placeholder="Enter Quantity." class="item-container-input"/>
    <textarea bind:value={newNote} class="item-container-text-box"></textarea>
  {/if}
  <div class="item-container-buttons-container">
    <button on:click={deleteItem} class="item-container-delete-button icon">
      X
    </button>
    <button on:click={toggleEdit} class="icon">
    {editMode ? 'Save' : 'Edit'}
    </button>
    <img src="shopping_cart.svg" alt="Shopping cart." class="item-container-shopping-cart-icon icon" on:click={toggleInCart}/>
  </div>
</div>
