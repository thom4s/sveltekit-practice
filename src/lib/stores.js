// good tuto => https://www.youtube.com/watch?v=jOOrWeYfmlQ
import { redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';

import { writable } from 'svelte/store'
import { browser } from '$app/environment';


// Define vars to be in localStorage

export const userName = writable(browser && (localStorage.getItem('userName') || 'stranger'));
userName.subscribe( (val) => browser && localStorage.setItem("userName", val))

export const userToken = writable(browser && (localStorage.getItem('userToken') || 'xxxxxx'));
userToken.subscribe( (val) => browser && localStorage.setItem("userToken", val))


export const logout = function() {
  userName.update( () => '') ;
  userToken.update( () => '') ;

  goto('/login', { state: { foo: 'bar' } });
}