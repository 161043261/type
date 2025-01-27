type TBus = {
  emit: (eventName: string) => void
  on: (eventName: string) => void
}
