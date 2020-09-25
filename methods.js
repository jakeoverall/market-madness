function adjustMonthlyGoods(goods) {
  goods.forEach(g => {
    let multiplier = 1;
    let sway = Math.random();
    if (sway < 0.4 && g.price > 1) {
      multiplier = 0;
    }
    if (sway > 0.4 && multiplier) {
      sway = 0.4;
    }
    if (sway < 0.6 && !multiplier) {
      sway = 0.6;
    }
    g.price = parseFloat((g.price * (sway + multiplier)).toFixed(2));
    g.elem.innerHTML = getGoodTemplate(g)
  });
}

function getGoodTemplate(good) {
  return /*html*/`
    <div class="d-flex align-items-center justify-content-between w-100 p-1">
      <div class="d-md-flex flex-column align-items-center d-none">
        <img src="assets/money.png" height="25"/>
        <b>SELL</b>
      </div>
      <div class="d-flex flex-column align-items-center">
        <span>
          ${good.name} 
        </span>
        <span>$${good.price.toFixed(2)}</span>
      </div>
    </div>
    `;
}

function drawGoods(goods) {
  if (window.screen.availWidth < 700) {
    return;
  }

  goods.forEach((g, i) => {
    g.elem.style.transform = `translate3d(0, ${i * 100}%, 0)`;
  });
}