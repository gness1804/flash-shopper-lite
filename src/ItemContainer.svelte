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
      dispatch('updateItem', {
        inCart: !inCart,
        id,
      });
    }
  </script>

  <style>
  .item-container {
    border: 2px solid #ece9e9;
    max-width: 60vw;
    margin: 0 auto 30px;
  }

  .item-container-name-display {
    font-weight: 600;
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

  .in-cart {
    color:#b5b5bd;
    text-decoration: line-through;
  }
  </style>

<div class="item-container">
  {#if !editMode}
    <p class="item-container-name-display" class:in-cart={inCart}>{name}</p>
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
    <input bind:value={newName} placeholder="Enter Name." class="item-container-input"/>
    <input bind:value={newAisle} placeholder="Enter Aisle." class="item-container-input"/>
    <input bind:value={newQuantity} placeholder="Enter Quantity." class="item-container-input"/>
    <textarea bind:value={newNote} class="item-container-text-box" placeholder="Note..."></textarea>
  {/if}
  <div class="item-container-buttons-container">
    <button on:click={deleteItem} class="item-container-delete-button icon">
      X
    </button>
    <button on:click={toggleEdit} class="icon">
    {editMode ? 'Save' : 'Edit'}
    </button>
    <img src="shopping_cart.svg" alt="Shopping cart." class="item-container-shopping-cart-icon icon" on:click={toggleInCart}/>
    <a href={link.replace(/{{query}}/, newName)} target="_blank">
      Store Search
    </a>
  </div>
</div>
