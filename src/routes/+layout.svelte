<script>
  import { userName, logout } from '$lib/stores.js';

  function handleClick() {
		alert('no more alerts')
	}
  
  console.log(userName);
  console.log(logout);

</script>

<nav>
  <div class="wrapper">
    <div>
      <a href="/" data-sveltekit-prefetch>Home</a>
      <a href="/feed" data-sveltekit-prefetch>Feed</a>
      <a href="/catalog" data-sveltekit-prefetch>Catalog</a>
      <a href="/register" data-sveltekit-prefetch>Register</a>
      <a href="/login" data-sveltekit-prefetch>Login</a>
      <a href="https://kit.svelte.dev/" target="_blank">Sveltekit Doc</a>
      <a href="https://www.youtube.com/c/Huntabyte" target="_blank">Helper Code</a>
    </div>

    <div>Hello {$userName} 
      {#if $userName === 'stranger' }
        <a href="/login" class="btn">login</a>
      {:else}
        <a href="#" on:click|preventDefault={logout} class="btn">log out</a>
      {/if}
    </div>
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

  .wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>