class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(selector);
    this.targetDate = targetDate.getTime();

    this.refs = {
      days: this.selector.querySelector('[data-value="days"]'),
      hours: this.selector.querySelector('[data-value="hours"]'),
      mins: this.selector.querySelector('[data-value="mins"]'),
      secs: this.selector.querySelector('[data-value="secs"]'),
    };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateClockFace(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    this.refs.days.textContent = days;
    this.refs.hours.textContent = hours;
    this.refs.mins.textContent = mins;
    this.refs.secs.textContent = secs;
  }

  updateTimer() {
    this.timerId = setInterval(() => {
      const timeLeft = this.targetDate - Date.now();
      this.updateClockFace(timeLeft);

      if (timeLeft < 0) {
        clearInterval(this.timerId);
        this.updateClockFace(0);
      }
    }, 1000);
  }
}

const birthdayTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(2021, 1, 17),
});

birthdayTimer.updateTimer();
