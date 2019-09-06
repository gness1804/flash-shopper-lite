
  <script>
    export let data;
    $: parsedData = data ? JSON.parse(data) : undefined;
  </script>

  <style>
  </style>

 <div class="grocery-api-results">
 {#if parsedData && parsedData.data && parsedData.data.children}
  <h3>What are grocery shoppers on Reddit interested in?</h3>
  {#each parsedData.data.children as { data: _data } (_data.id)}
    <div class="grocery-api-results-each-result-container">
      <a href={`https://reddit.com${_data.permalink}`} target="_blank">
        <p>{_data.title}</p>
      </a>
    </div>
  {/each}
 {:else }
  <p>No data found...</p>
 {/if}
 </div>
