
  <script>
    export let data;
    $: parsedData = data ? JSON.parse(data) : undefined;
  </script>

  <style>
    .grocery-api-results-header {
      margin-bottom: 40px;
    }

    .grocery-api-results-each-result-title {
      margin-bottom: 25px;
    }
  </style>

 <div class="grocery-api-results">
 {#if parsedData && parsedData.data && parsedData.data.children}
  <h2 class="grocery-api-results-header">What are grocery shoppers on Reddit interested in?</h2>
  {#each parsedData.data.children as { data: _data } (_data.id)}
    <div class="grocery-api-results-each-result-container">
      <a href={`https://reddit.com${_data.permalink}`} target="_blank">
        <p class="grocery-api-results-each-result-title">{_data.title}</p>
      </a>
    </div>
  {/each}
 {:else }
  <p>No data found...</p>
 {/if}
 </div>
