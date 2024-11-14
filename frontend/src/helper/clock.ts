const TICK_INTERVAL = 1000;

export default class Clock {
  seconds: number = 0;
  isTicking = false;
  tickIntervalHandler: any;
  onTickCallbacks: Function[] = [];

  constructor(seconds: number) {
    this.setSeconds(seconds)
  }

  setSeconds(seconds: number) {
    if (seconds < 0) {
      throw new Error("cannot set seconds less than 0")
    }
    this.seconds = seconds
  }

  secondsToString() {
    const min = Math.floor(this.seconds / 60).toString().padStart(2, '0');
    const sec = (this.seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }

  registerOnTickCallback(callback: Function) {
    this.onTickCallbacks.push(callback)
  }

  startTick() {
    if (!this.tickIntervalHandler) {
      this.tickIntervalHandler = setInterval(() => {
        this.onTickCallbacks.forEach(callback => callback());
      }, TICK_INTERVAL);
    }
  }

  stopTick() {
    if (this.tickIntervalHandler) {
      clearInterval(this.tickIntervalHandler)
      this.tickIntervalHandler = undefined
    }
  }
}