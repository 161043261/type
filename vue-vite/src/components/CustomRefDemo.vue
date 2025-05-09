<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { customRef, ref } from 'vue'
const loading = ref(false)

function refWithCache(url: string) {
  const cache = ref<any>(null)
  return customRef((track: () => void, trigger: () => void) => {
    return {
      get() {
        track()
        if (cache.value) {
          return cache.value
        }
        loading.value = true
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            loading.value = false
            cache.value = data
            trigger()
            setTimeout(
              () => {
                cache.value = null
                trigger()
              },
              60 * 60 * 1000,
            )
          })
          .catch((e) => {
            console.error(e)
            cache.value = null
            trigger()
          })
        return cache.value
      },
      set(newValue) {
        cache.value = newValue
        trigger()
      },
    }
  })
}

const cachedRefTimeData = refWithCache(
  'https://timeapi.io/api/time/current/zone?timeZone=Asia/Shanghai',
)
</script>

<template>
  <div v-if="loading">Loading time data...</div>
  <div v-else>Time data: {{ cachedRefTimeData }}</div>
</template>

<style lang="css" scoped></style>
