// correspond to ../components/pinia/Cat.vue
import { defineStore } from 'pinia'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { reactive } from 'vue'

const _useCatStore = defineStore('cat', {
  actions: {
    async addCat() {
      const { data } = await axios.get('https://api.thecatapi.com/v1/images/search')
      const cat = { id: nanoid(), title: data[0].cat as string }
      this.catList.unshift(cat)
    }
  },
  state() {
    return {
      // JSON.parse(null) = null; null || [] = [];
      catList: JSON.parse(localStorage.getItem('catList') as string) || []
    }
  }
})

export const useCatStore = defineStore('cat', () => {
  const catList = reactive(JSON.parse(localStorage.getItem('catList') as string) || [])

  async function addCat() {
    const { data } = await axios.get('https://api.thecatapi.com/v1/images/search')
    const cat = { id: nanoid(), title: data[0].url as string }
    catList.unshift(cat)
  }

  return { catList, addCat }
})
