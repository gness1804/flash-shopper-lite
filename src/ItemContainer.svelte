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

  const inputStyle = 'block mt-0 mx-auto mb-3';

  const buttonStyle = 'mr-2 lg:mr-5 hover:border-black';

  const inCartStyle = 'text-gray-600 line-through';

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

<div
  class="item-container border-2 border-solid border-gray-400 mt-0 mx-auto mb-8
  max-w-md">
  {#if !editMode}
    <p class={`item-name-display font-semibold ${inCart ? inCartStyle : ''}`}>
      {name}
    </p>
    {#if aisle}
      <p class={`item-aisle-display ${inCart ? inCartStyle : ''}`}>
        Aisle: {aisle}
      </p>
    {/if}
    {#if quantity}
      <p class={`item-quantity-display ${inCart ? inCartStyle : ''}`}>
        Quantity: {quantity}
      </p>
    {/if}
    {#if note}
      <p class={`item-note-display mb-8 ${inCart ? inCartStyle : ''}`}>
        Note: {note}
      </p>
    {/if}
  {:else}
    <input
      bind:value={newName}
      placeholder="Enter Name."
      class={`item-name-input-in-container ${inputStyle} mt-3`} />
    <input
      bind:value={newAisle}
      placeholder="Enter Aisle."
      class={`item-aisle-input-in-container ${inputStyle}`} />
    <input
      bind:value={newQuantity}
      placeholder="Enter Quantity."
      class={`item-quantity-input-in-container ${inputStyle}`} />
    <textarea
      bind:value={newNote}
      class={`item-note-input-in-container ${inputStyle} mb-8`}
      placeholder="Note..." />
  {/if}
  <div class="flex items-center justify-center">
    <button
      on:click={deleteItem}
      class={`delete-item-button bg-red-600 text-white ${buttonStyle}`}>
      X
    </button>
    <button on:click={toggleEdit} class={`edit-button ${buttonStyle}`}>
      {editMode ? 'Save' : 'Edit'}
    </button>
    <img
      src="shopping_cart.svg"
      alt="Shopping cart."
      class={`toggle-in-cart-button h-10 cursor-pointer ${buttonStyle}`}
      on:click={toggleInCart} />
    <a
      class="item-store-link"
      href={link.replace(/{{query}}/, newName)}
      target="_blank">
      Store Search
    </a>
  </div>
</div>
