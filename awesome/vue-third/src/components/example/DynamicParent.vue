<script lang="ts" setup>
import { reactive } from 'vue';
import DynamicA from './DynamicA.vue';
import DynamicB from './DynamicB.vue';
import DynamicC from './DynamicC.vue';

const coms = reactive([{
  name: 'DynamicA',
 com: DynamicA
}, {
  name: 'DynamicB',
  com: DynamicB
}])
</script>

<template>
  <div>

  </div>
</template>

<style lang="css" scoped>

</style>
