import App from './App.svelte';
import './main.css';

const app = new App({
  target: document.body,
  props: {
    title: 'Flash Shopper Lite',
  },
});

window.app = app;

export default app;
