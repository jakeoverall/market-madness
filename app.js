function sell(type) {
  let good = stock[type];
  if (!good) {
    return;
  }
  income.current += good.current * goods.find(g => g.id == type).price;
  if (income.current > income.total) {
    income.total = income.current;
  }
  good.current = 0;
}

function cycleMonth() {
  month++;
  if (month >= 12) {
    years++;
    month = 0;
    drawYear();
  }

  income.current -= overhead;

  adjustMonthlyGoods(goods);
  goods.sort((a, b) => b.price - a.price);
  drawGoods(goods);
  drawMonth();
}




function drawStock() {
  let template = ``;
  for (let key in stock) {
    let good = stock[key];
    template += `<div class="text-center stock">
      <small>${good.name}</small>
      <h5 class="m-0">${good.current.toFixed(0)}</h5>
    </div>`;
  }
  statsElem.innerHTML = template;
}

function drawMonth() {
  let disMonth = new Date(1, month, 1).toLocaleDateString("en-US", {
    month: "short"
  });

  monthElem.textContent = disMonth;
}
function drawYear() {
  yearElem.textContent = years.toString();
}

function drawCurrency() {
  income.current <= 0
    ? currencyElem.classList.add("text-danger")
    : currencyElem.classList.remove("text-danger");

  currencyElem.textContent = "$" + income.current.toFixed(2);
  overheadElem.textContent = "($" + overhead.toFixed(2) + ")";
}



function buyClickUpgrade(item) {
  if (!item) {
    return;
  }
  if (item.price > income.current) {
    return;
  }
  income.current -= item.price;
  item.quantity++;
  item.price *= 1.25;
  drawStore();
}
function buyAutoUpgrade(item) {
  if (!item) {
    return;
  }
  if (item.price > income.current) {
    return;
  }
  income.current -= item.price;
  overhead += item.price;
  item.quantity++;
  item.price *= 1.25;
  calcRPS();
  drawStore();
}

function getbtnTemplate(item) {
  return `
  <div class="d-flex align-items-center justify-content-between w-100 p-1">
  <div class="">
    <img src="assets/pay-money.png" height="25"/>
    <b>BUY</b>
    </div>
    <div>
    <small>${item.name} - $${item.price.toFixed(2)}</small>
  </div>
</div>`;
}

function drawStore() {
  clickStoreElem.innerHTML = "";
  autoStoreElem.innerHTML = "";
  for (let type in autoCollectors) {
    for (let key in clickUpgrades[type]) {
      let item = clickUpgrades[type][key];
      let button = document.createElement("button");
      button.onclick = e => buyClickUpgrade(item);
      button.innerHTML = getbtnTemplate(item);
      button.className = "clicker";
      clickStoreElem.appendChild(button);
    }
    for (let key in autoCollectors[type]) {
      let item = autoCollectors[type][key];
      let button = document.createElement("button");
      button.onclick = e => buyAutoUpgrade(item);
      button.innerHTML = getbtnTemplate(item);
      button.className = "auto-clicker";
      autoStoreElem.appendChild(button);
    }
  }
}

drawStore();

function collect(type) {
  let good = stock[type];
  if (!good) {
    return;
  }
  let n = 1;

  for (var key in clickUpgrades[type]) {
    let upgrade = clickUpgrades[type][key];
    n += upgrade.quantity * upgrade.multiplier;
  }

  good.current += n;
  if (good.current > good.total) {
    good.total = good.current;
  }
}

function autoCollect(type, delta) {
  let good = stock[type];
  if (!good) {
    return;
  }
  let n = rps[type].total / delta;
  good.current += n;
  if (good.current > good.total) {
    good.total = good.current;
  }
}

function calcRPS() {
  let template = "";
  for (var type in autoCollectors) {
    let n = 0;
    for (var key in autoCollectors[type]) {
      let upgrade = autoCollectors[type][key];
      n += upgrade.quantity * upgrade.multiplier;
    }
    rps[type].total = n;
    template += `
    <div>
      <small class="m-0">${n.toFixed(2)} / sec</small>
    </div>
    `;
  }
  rpsElem.innerHTML = template;
}

function timebar() {
  timebarElem.style.width =
    ((nextTicks.cycleMonth - lastTime) / ticks.cycleMonth) * 100 + "%";
}

function update() {
  for (var t in nextTicks) {
    if (nextTicks[t] < lastTime) {
      window[t]();
      nextTicks[t] = ticks[t] + lastTime;
    }
  }
  drawStock();
  drawCurrency();
}

function start() {
  requestAnimationFrame(start);
  currentTime = new Date();
  let delta = currentTime.getTime() - lastTime;
  if (delta > interval) {
    if (delta > nextTicks.cycleMonth) {
      let months = delta % nextTicks.cycleMonth;
      let years = months % 12;
    }

    lastTime = currentTime.getTime();
    processTimeDiff(delta);
    update();
  }
}

function processTimeDiff(delta) {
  for (let key in stock) {
    autoCollect(key, delta);
  }
}

calcRPS();
cycleMonth();
start();
bgMusic.volume = 0.2;
function togglePlay(e) {
  try {
    if (bgMusic.paused) {
      e.target.classList.remove("fa-volume-mute");
      e.target.classList.add("fa-volume-up");
      bgMusic.play();
    } else {
      e.target.classList.add("fa-volume-mute");
      e.target.classList.remove("fa-volume-up");
      bgMusic.pause();
    }
  } catch (e) { }
}
