// https://gist.github.com/joshnuss/aa3539daf7ca412202b4c10d543bc077

import { writable as internal, get } from 'svelte/store'
import { browser } from '$app/environment';

export function writable(key, initialValue) {
    
  const store = internal(initialValue)
  const {subscribe, set} = store
  // check if in client
  if(browser){
    const json = localStorage.getItem(key)
    if (json) { set(JSON.parse(json)) }
  } 
  
  return {
    set(value) {
    // check if in client
      if(browser){
        localStorage.setItem(key, JSON.stringify(value))
      }
      set(value)
    },
    update(cb) {
      const value = cb(get(store))
      this.set(value)
    },
    subscribe
  }
} 