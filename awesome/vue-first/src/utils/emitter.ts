import mitt from 'mitt'
// emitter can bind event and trigger event
const emitter = mitt()

//TODO mitt test
function test() {
  // bind event
  emitter.on('test1', () => {
    console.log('test1 is emitted')
  })

  // bind event
  emitter.on('test2', () => {
    console.log('test2 is emitted')
  })

  // trigger event
  setInterval(() => {
    emitter.emit('test1')
    emitter.emit('test2')
  }, 500)

  // unbind event
  setTimeout(() => {
    emitter.off('test1')
  }, 5_000)

  // unbind all events
  setTimeout(() => {
    emitter.all.clear()
  }, 10_000)
}

export default emitter
