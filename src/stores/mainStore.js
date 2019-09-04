import { writable, derived } from 'svelte/store';

export const items = writable([]);

export const itemsSortedByAlpha = derived(
  items,
  $items => $items.sort((a, b) => {
    if (!a.name || !b.name) {
      return 0;
    }
    const lowerA = a.name.toLowerCase();
    const lowerB = b.name.toLowerCase();
    if (lowerA < lowerB) {
      return -1;
    }
    if (lowerA > lowerB) {
      return 1;
    }
    return 0;
  })
);
