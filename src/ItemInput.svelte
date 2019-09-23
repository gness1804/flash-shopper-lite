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
  };

  const handleSubmit = () => {
    if (!name) {
      alert('Error: name required.');
      return;
    }
    const item = new Item({
      name,
      aisle,
      quantity,
      note,
    });
    dispatch('addItem', item);
    dispatch('showToast', {
      message: `${name} was successfully added.`,
    });
    clearInputs();
  };
</script>

<div class="text-center mb-8">
  <form class="max-w-lg my-0 mx-auto">
    <slot name="title">
      <h2>Items Input</h2>
    </slot>
    <div class="flex flex-col lg:flex-row">
      <input
        placeholder="Enter name of item."
        bind:value={name}
        class="block mx-auto" />
      <input
        placeholder="Enter aisle of item."
        bind:value={aisle}
        class="block mx-auto" />
    </div>
    <div class="flex flex-col mb-6 lg:flex-row">
      <input
        placeholder="Enter quantity of item."
        bind:value={quantity}
        class="block mx-auto" />
      <textarea bind:value={note} class="mx-auto" placeholder="Note..." />
    </div>
    <button
      on:click|preventDefault={handleSubmit}
      class="block mx-auto my-0 hover:border-black"
      disabled={!name}>
      Submit
    </button>
  </form>
</div>
