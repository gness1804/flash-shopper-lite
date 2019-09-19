
<script>
  import { sortAlpha, sortNumeric } from './helpers/sort';

  export let data;
  $: parsedData = data ? JSON.parse(data) : undefined;

  let sortType = 'default';
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

    .grocery-api-results-top-buttons-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
    }

    .grocery-api-results-top-button {
      margin: 0 5px;
    }
  </style>

 <div class="grocery-api-results">
 {#if parsedData && parsedData.data && parsedData.data.children}
  <h2 class="grocery-api-results-header">What are grocery shoppers on Reddit interested in?</h2>
  <div class="grocery-api-results-top-buttons-container">
    <button on:click="{ () => sortType = 'alpha' }" class="grocery-api-results-top-button">
      Sort Alpha
    </button>
    <button on:click="{ () => sortType = 'date' }" class="grocery-api-results-top-button">
     Sort by Date
    </button>
    <button on:click="{ () => sortType = 'popularity' }" class="grocery-api-results-top-button">
     Sort by Popularity
    </button>
  </div>
  {#if sortType === 'alpha'}
    {#each sortAlpha(parsedData.data.children, 'title') as { data: _data } (_data.id)}
      <a
        href={`https://reddit.com${_data.permalink}`}
        target="_blank"
        class="grocery-api-results-each-result-title-link"
        title={_data.title}
      >
        {_data.title}
      </a>
    {/each}
  {:else if sortType === 'date'}
    {#each sortNumeric(parsedData.data.children, 'created_utc') as { data: _data } (_data.id)}
      <a
        href={`https://reddit.com${_data.permalink}`}
        target="_blank"
        class="grocery-api-results-each-result-title-link"
        title={_data.title}
      >
        {_data.title}
      </a>
    {/each}
  {:else if sortType === 'popularity'}
      {#each sortNumeric(parsedData.data.children, 'ups') as { data: _data } (_data.id)}
      <a
        href={`https://reddit.com${_data.permalink}`}
        target="_blank"
        class="grocery-api-results-each-result-title-link"
        title={_data.title}
      >
        {_data.title}
      </a>
    {/each}
  {:else}
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
  {/if}
 {:else }
  <p>Click the button above to see Reddit grocery data.</p>
 {/if}
 </div>
