const tap = document.querySelector('.tap')
const amount = document.querySelector('.amount')
const increaseByTapNumber = document.querySelector('.increase_by_tap_number')
const energyEl = document.querySelector('.energy')
const tg = window.Telegram.WebApp
const coin = {
  amount: 0,
  inceaseByTap: 3,
}
const energy = {
  decrease: 1,
  current: 2000,
  total: 2000,
}

// Добавить имя
const user = document.querySelector('.user')

const firstName = tg.initDataUnsafe.user.first_name
const lastName = tg.initDataUnsafe.user.last_name

const userName = firstName + ' ' + lastName

user.textContent = userName
// ------------------------
// Установить значение увеличения по клику
increaseByTapNumber.textContent = '+' + coin.inceaseByTap
// ------------------------
// Установить энергию
energyEl.textContent = `${energy.current} / ${energy.total}`
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