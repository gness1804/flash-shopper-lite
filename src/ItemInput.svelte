  <script>
    import { createEventDispatcher } from 'svelte';
    import Item from './models/Item';

    const dispatch = createEventDispatcher();

    let name = '';
    let aisle = '';
    let quantity = '';
    let note = '';

    const clearInputs = () => {
      name = '';
      aisle = '';
      quantity = '';
      note = '';
    }

    const handleSubmit = () => {
      if (!name) {
        alert('Error: name required.');
        return;
      }
      const item = new Item({ name, aisle, quantity, note });
      dispatch('addItem', item);
      clearInputs();
    }
  </script>

  <style>
  .item-input-text-input {
     display: block;
     margin-left: auto;
     margin-right: auto;
  }

  .item-input {
    text-align: center;
    margin-bottom: 30px;
  }

  .item-input-note-input {
    margin-left: auto;
    margin-right: auto;
  }

  .item-input-submit-button {
    display: block;
    margin: 0 auto;
  }

  </style>

  <div class="item-input">
  <form>
    <slot name="title">
      <h2>Items Input</h2>
    </slot>
    <input placeholder="Enter name of item." bind:value={name} class="item-input-text-input" />
    <input placeholder="Enter aisle of item." bind:value={aisle} class="item-input-text-input" />
    <input placeholder="Enter quantity of item." bind:value={quantity} class="item-input-text-input" />
    <textarea bind:value={note} class="item-input-note-input" placeholder="Note..."></textarea>
    <button on:click|preventDefault={handleSubmit} class="item-input-submit-button">
      Submit
    </button>
  </form>
  </div>
