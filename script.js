const tap = document.querySelector('.tap')
const amount = document.querySelector('.amount')
const increaseByTap = document.querySelector('.increase_by_tap')
const increaseByTime = document.querySelector('.increase_by_time')
const energyEl = document.querySelector('.energy')
const main = document.querySelector('.main')
const menu2 = document.querySelector('.menu2')
const menuBtn1 = document.querySelector('.menu_btn_1')
const menuBtn2 = document.querySelector('.menu_btn_2')
const tg = window.Telegram.WebApp
const coin = {
  amount: 0,
  amountByTime: 0,
  inceaseByTap: 3,
  increaseByHour: 3600,
  increaseBySecond: 3600 / 3600,
  delayIncrease: 3600 / 3600 * 1000,
}
const energy = {
  decrease: 3,
  current: 2000,
  total: 2000,
  increase: 3,
  increaseDelay: 1000,
}

// -------------------------------------
// -------------------------------------
// -------------------------------------
// -------------------------------------
// Функция, вызываемая перед закрытием окна браузера
window.addEventListener('beforeunload', (event) => {
  // Сохранение текущего времени
  let currentTime = Date.now();
  localStorage.setItem('lastTime', currentTime * 1000);
});

// Функция для проверки разницы во времени
function checkTimeDifference() {
  let unixTime = localStorage.getItem('lastTime')
  let savedTime = new Date(unixTime / 1000)
  
  console.log(savedTime);

  let currentUnitTime = Date.now()
  let currentTime = new Date(currentUnitTime)

  console.log(currentTime);

  let difference = Math.floor((currentUnitTime - savedTime) / 1000)

  console.log(difference);
}

// Функция, вызываемая при загрузке страницы
document.addEventListener('DOMContentLoaded', checkTimeDifference);
// -------------------------------------
// -------------------------------------
// -------------------------------------
// -------------------------------------

// tg.CloudStorage.setItem('coin', coin)
// tg.CloudStorage.setItem('energy', energy)

// tg.CloudStorage.removeItem('coin')
// tg.CloudStorage.removeItem('amoint')

tg.CloudStorage.getKeys((err, item) => {
  console.log(item)
});

tg.expand()

menuBtn1.classList.add('menu_btn_active')

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
// Установить значение монет
// tg.CloudStorage.getItem('amount', (err, data) => {
//   if (err) console.log(err)

//   coin.amount = +data
//   amount.textContent = coin.amount
// })
// ------------------------
// Уменьшить энергию
function energise() {
  energy.current -= energy.decrease
  energyEl.textContent = `${energy.current} / ${energy.total}`
}
// ------------------------
// Увеличить монеты через клик
function increaseCoinByTap() {
  coin.amount += coin.inceaseByTap
  amount.textContent = coin.amount

  tg.CloudStorage.setItem('amount', coin.amount)

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
// function increaseCoinByTime() {
  // coin.amount += coin.increaseBySecond
  // amount.textContent = coin.amount

  // tg.CloudStorage.setItem('amount', coin.amount)

  // let time = Date.now()

  // localStorage.setItem('date', time)

  // tg.CloudStorage.setItem('time', time)
  // console.log('Time saved: ' + time);
// }

// setInterval(increaseCoinByTime, coin.delayIncrease)

// Переключиться на меню 2

menuBtn2.addEventListener('click', () => {
  main.style.display = 'none'
  menu2.style.display = 'flex'
  menuBtn1.classList.remove('menu_btn_active')
  menuBtn2.classList.add('menu_btn_active')
  const profit = document.querySelector('.menu2_profit_item_number')
  profit.textContent = coin.increaseByHour
})

menuBtn1.addEventListener('click', () => {
  main.style.display = 'flex'
  menu2.style.display = 'none'
  menuBtn2.classList.remove('menu_btn_active')
  menuBtn1.classList.add('menu_btn_active')
})

