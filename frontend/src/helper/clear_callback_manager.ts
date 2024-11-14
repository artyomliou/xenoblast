export default class ClearCallbackManager {
  callbacks: Function[] = [];

  register(cb: Function) {
    this.callbacks.push(cb)
  }

  call() {
    this.callbacks.forEach(cb => cb())
  }
}