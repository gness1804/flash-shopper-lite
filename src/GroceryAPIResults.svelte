
  <script>
    export let data;
    $: parsedData = data ? JSON.parse(data) : undefined;
  </script>

  <style>
    .grocery-api-results-header {
      margin-bottom: 40px;
    }

    .grocery-api-results-each-result-title-link {
      margin-bottom: 25px;
      display: block;
    }

    .grocery-api-results-each-result-title-link:nth-child(odd) {
      background-color: #d8d9da;
    }
  </style>

 <div class="grocery-api-results">
 {#if parsedData && parsedData.data && parsedData.data.children}
  <h2 class="grocery-api-results-header">What are grocery shoppers on Reddit interested in?</h2>
  {#each parsedData.data.children as { data: _data } (_data.id)}
      <a
        href={`https://reddit.com${_data.permalink}`}
        target="_blank"
        class="grocery-api-results-each-result-title-link"
        title={_data.title}
      >
        {_data.title}
      </a>
  {/each}
 {:else }
  <p>Click the button above to see Reddit grocery data.</p>
 {/if}
 </div>
