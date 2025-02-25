import { computed, onMounted, ref } from 'vue'

export default function () {
  // data
  const sum = ref(0)
  const bigSum = computed(() => {
    return sum.value * 10
  })

  // methods
  function addSum() {
    sum.value++
  }

  onMounted(() => {
    sum.value += 100
  })
  return { sum, addSum, bigSum }
}
