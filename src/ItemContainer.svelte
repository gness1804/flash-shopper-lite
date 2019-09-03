  <script>
    export let name;
    export let aisle;
    export let quantity;
    export let note;
  </script>

  <style>
  </style>

<div class="item-container">
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
</div>
