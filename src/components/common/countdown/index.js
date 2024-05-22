export class Countdown {
  constructor() {
    this.countdown = document.querySelector(".countdown");
    this.time = 3;
    this.interval = null;
    this.countdown.style.display = "none";
  }

  startCountdown() {
    this.interval = setInterval(() => {
      this.time--;
      this.countdown.textContent = this.time;
      if (this.time === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  stopCountdown() {
    clearInterval(this.interval);
    this.countdown.style.display = "none";
  }
}