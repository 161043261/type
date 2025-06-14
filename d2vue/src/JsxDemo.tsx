import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

// 选项式
export default defineComponent({
  data() {
    return {
      age: 22,
    }
  },
  methods: {
    addAge() {
      this.age++
    },
  },
  render() {
    return (
      <main>
        <div>{this.age}</div>
        <ElButton onClick={this.addAge}>addAge</ElButton>
      </main>
    )
  },
})
