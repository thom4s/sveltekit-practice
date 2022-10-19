<nav>
  <div class="wrapper">
    <a href="/" data-sveltekit-prefetch>Home</a>
    <a href="/feed" data-sveltekit-prefetch>Feed</a>
    <a href="/catalog" data-sveltekit-prefetch>Catalog</a>
    <a href="https://kit.svelte.dev/" target="_blank">Sveltekit Doc</a>
    <a href="https://www.youtube.com/c/Huntabyte" target="_blank">Helper Code</a>
  </div>
</nav>

<main class="wrapper">

<slot></slot>
</main>

<style>
  nav {
    display: flex;
    width: 100%;
    justify-content: space-around;
    border-bottom: 1px solid cornflowerblue;
    padding: 20px 0;
    margin-bottom: 40px;
  }

  nav a {
    text-transform: uppercase;
    text-decoration: none;
    padding: 3px 10px;
    color: cornflowerblue;
  }
  nav a:hover {
    color: black;
  }
</style>