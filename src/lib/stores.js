// good tuto => https://www.youtube.com/watch?v=jOOrWeYfmlQ
import { redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';

import { writable } from 'svelte/store'
import { browser } from '$app/environment';



// Params

export const api_url = `https://pactice-strapi-cms.herokuapp.com/api`


// Define vars to be in localStorage

export const userName = writable(browser && (localStorage.getItem('userName') || 'stranger'));
userName.subscribe( (val) => browser && localStorage.setItem("userName", val))

export const userToken = writable(browser && (localStorage.getItem('userToken') || 'xxxxxx'));
userToken.subscribe( (val) => browser && localStorage.setItem("userToken", val))

export const userID = writable(browser && (localStorage.getItem('userID') || 'xxxxxx'));
userID.subscribe( (val) => browser && localStorage.setItem("userID", val))

export const logout = function() {
  userName.update( () => '') ;
  userToken.update( () => '') ;
  userID.update( () => '') ;

  goto('/login', { state: { foo: 'bar' } });
}