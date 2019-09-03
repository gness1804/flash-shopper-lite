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
  </script>

  <style>
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
    <input bind:value={newName} placeholder="Enter Name."/>
    <input bind:value={newAisle} placeholder="Enter Aisle."/>
    <input bind:value={newQuantity} placeholder="Enter Quantity."/>
    <textarea bind:value={newNote}></textarea>
  {/if}
  <button on:click={deleteItem}>
    X
  </button>
  <button on:click={toggleEdit}>
  {editMode ? 'Save' : 'Edit'}
  </button>
</div>
