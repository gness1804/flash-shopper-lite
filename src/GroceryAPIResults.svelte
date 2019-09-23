<script>
  import { sortAlpha, sortNumeric } from './helpers/sort';

  export let data;
  $: parsedData = data ? JSON.parse(data) : undefined;

  let sortType = 'default';

  const linkStyle = 'mb-6 block link py-3';
</script>

<style>
  .link:nth-child(odd) {
    background-color: #d8d9da;
  }
</style>

<div class="grocery-api-results">
  {#if parsedData && parsedData.data && parsedData.data.children}
    <h2 class="mb-10">What are grocery shoppers on Reddit interested in?</h2>
    <div class="flex items-center justify-center mb-10">
      <button on:click={() => (sortType = 'alpha')} class="my-0 mx-1">
        Sort Alpha
      </button>
      <button on:click={() => (sortType = 'date')} class="my-0 mx-1">
        Sort by Date
      </button>
      <button on:click={() => (sortType = 'popularity')} class="my-0 mx-1">
        Sort by Popularity
      </button>
    </div>
    {#if sortType === 'alpha'}
      {#each sortAlpha(parsedData.data.children, 'title') as { data: _data } (_data.id)}
        <a
          href={`https://reddit.com${_data.permalink}`}
          target="_blank"
          class={linkStyle}
          title={_data.title}>
          {_data.title}
        </a>
      {/each}
    {:else if sortType === 'date'}
      {#each sortNumeric(parsedData.data.children, 'created_utc') as { data: _data } (_data.id)}
        <a
          href={`https://reddit.com${_data.permalink}`}
          target="_blank"
          class={linkStyle}
          title={_data.title}>
          {_data.title}
        </a>
      {/each}
    {:else if sortType === 'popularity'}
      {#each sortNumeric(parsedData.data.children, 'ups') as { data: _data } (_data.id)}
        <a
          href={`https://reddit.com${_data.permalink}`}
          target="_blank"
          class={linkStyle}
          title={_data.title}>
          {_data.title}
        </a>
      {/each}
    {:else}
      {#each parsedData.data.children as { data: _data } (_data.id)}
        <a
          href={`https://reddit.com${_data.permalink}`}
          target="_blank"
          class={linkStyle}
          title={_data.title}>
          {_data.title}
        </a>
      {/each}
    {/if}
  {:else}
    <p>Click the button above to see Reddit grocery data.</p>
  {/if}
</div>
