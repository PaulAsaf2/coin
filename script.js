const tap = document.querySelector('.tap')
const amount = document.querySelector('.amount')
const increaseByTap = document.querySelector('.increase_by_tap')
const increaseByTime = document.querySelector('.increase_by_time')
const energyEl = document.querySelector('.energy')
const tg = window.Telegram.WebApp
const coin = {
  amount: 0,
  inceaseByTap: 3,
  increaseByHour: 3600,
  increaseBySecond: 3600 / 3600,
  delayIncrease: 3600 / 3600 * 1000,
}
const energy = {
  decrease: 1,
  current: 2000,
  total: 2000,
  increase: 3,
  increaseDelay: 1000,
}

tg.expand()

// Добавить имя
const user = document.querySelector('.user')

const firstName = tg.initDataUnsafe.user.first_name
const lastName = tg.initDataUnsafe.user.last_name

const userName = firstName + ' ' + lastName

user.textContent = userName
// ------------------------
// Установить значение увеличения по клику
increaseByTap.textContent = '+' + coin.inceaseByTap
// ------------------------
// Установить энергию
energyEl.textContent = `${energy.current} / ${energy.total}`
// ------------------------
// Установить увеличение монет по времени
increaseByTime.textContent = '+' + coin.increaseByHour
// ------------------------
// Уменьшить энергию
function energise() {
  energy.current -= energy.decrease
  energyEl.textContent = `${energy.current} / ${energy.total}`
}
// ------------------------
// Увеличить сумму через клик
function increaseCoinByTap() {
  coin.amount += coin.inceaseByTap
  amount.textContent = coin.amount

  energise()
}

tap.addEventListener('click', increaseCoinByTap)

// Увеличить энергию
function increaseEnergy() {
  if (energy.current < energy.total) {
    energy.current += energy.increase

    if (energy.current > energy.total) {
      energy.current = energy.total
    }
  }

  energyEl.textContent = `${energy.current} / ${energy.total}`
}

setInterval(increaseEnergy, energy.increaseDelay)

// Увеличить монеты по времени
function increaseCoinByTime() {
  coin.amount += coin.increaseBySecond
  amount.textContent = coin.amount
}

setInterval(increaseCoinByTime, coin.delayIncrease)