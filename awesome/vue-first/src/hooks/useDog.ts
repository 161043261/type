import axios from 'axios'
import { onMounted, reactive } from 'vue'

export default function () {
  // data
  const dogList = reactive<string[]>([])

  // methods
  async function addDog() {
    // axios.get("https://dog.ceo/api/breed/pembroke/images/random").then(
    //     (resp: any) => { console.log(resp.data); },
    //     (err: any) => { console.log(err); });
    try {
      const resp = await axios.get('https://dog.ceo/api/breeds/image/random')
      dogList.push(resp.data.message as string)
    } catch (err) {
      alert(err)
    }
  }

  onMounted(() => {
    addDog()
  })
  return { dogList, addDog }
}
