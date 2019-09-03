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
  </style>

  <div class="item-input">
  <form>
    <slot name="title">
      Items Input
    </slot>
    <input placeholder="Enter name of item." bind:value={name} />
    <input placeholder="Enter aisle of item." bind:value={aisle} />
    <input placeholder="Enter quantity of item." bind:value={quantity} />
    <textarea bind:value={note}></textarea>
    <button on:click|preventDefault={handleSubmit}>
      Submit
    </button>
  </form>
  </div>
