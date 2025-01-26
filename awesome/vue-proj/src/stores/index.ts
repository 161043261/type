import { defineStore } from 'pinia'
import { computed, type ComputedRef, type Ref, ref } from 'vue'
import type { Result, User } from '@/types'
import { profileService } from '@/apis'

// Composition API
export const useTokenStore = defineStore(
  'token',
  () => {
    // state
    const token = ref(sessionStorage.getItem('token') || '')

    // getters (redundant)
    const jwtString: ComputedRef<string> = computed(() => {
      console.log('get jwtString')
      return token.value
    })

    function removeToken() {
      sessionStorage.removeItem('token')
      token.value = ''
    }

    return { token, jwtString, removeToken }
  },
  { persist: true }
) // options

export const useProfileStore = defineStore(
  'profile',
  () => {
    // state
    const profile: Ref<User> = ref({
      username: '',
      name: '',
      avatar: '',
      email: 'example@example.com'
    })

    async function getProfile() {
      const response = await profileService()
      const result = response.data as Result
      profile.value = result.data
    }

    function removeProfile() {
      profile.value.username = ''
      profile.value.name = ''
      profile.value.avatar = ''
      profile.value.email = 'example@example.com'
    }

    return { profile, getProfile, removeProfile }
  },
  { persist: true }
)
