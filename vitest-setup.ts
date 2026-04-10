const memory = new Map<string, string>()

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (key: string) => memory.get(key) ?? null,
    setItem: (key: string, value: string) => {
      memory.set(key, value)
    },
    removeItem: (key: string) => {
      memory.delete(key)
    },
    clear: () => {
      memory.clear()
    },
    key: (i: number) => Array.from(memory.keys())[i] ?? null,
    get length() {
      return memory.size
    }
  },
  configurable: true,
  writable: true
})
