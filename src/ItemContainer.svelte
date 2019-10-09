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

  const notInCartStyle = '';

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
      <p class={inCart ? inCartStyle : notInCartStyle}>Aisle: {aisle}</p>
    {/if}
    {#if quantity}
      <p class={inCart ? inCartStyle : notInCartStyle}>Quantity: {quantity}</p>
    {/if}
    {#if note}
      <p class={inCart ? `${inCartStyle} mb-8` : `${notInCartStyle} mb-8`}>
        Note: {note}
      </p>
    {/if}
  {:else}
    <input
      bind:value={newName}
      placeholder="Enter Name."
      class={`${inputStyle} mt-3`} />
    <input
      bind:value={newAisle}
      placeholder="Enter Aisle."
      class={inputStyle} />
    <input
      bind:value={newQuantity}
      placeholder="Enter Quantity."
      class={inputStyle} />
    <textarea
      bind:value={newNote}
      class={`${inputStyle} mb-8`}
      placeholder="Note..." />
  {/if}
  <div class="flex items-center justify-center">
    <button
      on:click={deleteItem}
      class={`bg-red-600 text-white ${buttonStyle}`}>
      X
    </button>
    <button on:click={toggleEdit} class={`${buttonStyle}`}>
      {editMode ? 'Save' : 'Edit'}
    </button>
    <img
      src="shopping_cart.svg"
      alt="Shopping cart."
      class={`h-10 cursor-pointer ${buttonStyle}`}
      on:click={toggleInCart} />
    <a href={link.replace(/{{query}}/, newName)} target="_blank">
      Store Search
    </a>
  </div>
</div>
