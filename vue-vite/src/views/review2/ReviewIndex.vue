<script lang="ts">
export default {
  name: 'ReviewIndex',
  beforeCreate() {
    console.log('beforeCreate') // vue2
  },
  created() {
    console.log('created')
  },
}
</script>
<script lang="ts" setup>
import CustomRef from './CustomRef.vue'
import MarkRaw from './MarkRaw.vue'
</script>

<template>
  <div>
    <CustomRef />
    <MarkRaw />
  </div>
</template>

<style lang="css" scoped></style>
