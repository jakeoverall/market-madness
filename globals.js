let fish = document.getElementById("fish");
let wood = document.getElementById("wood");
let ore = document.getElementById("ore");
let yearElem = document.getElementById("year");
let monthElem = document.getElementById("month");
let timebarElem = document.getElementById("timebar");
let statsElem = document.getElementById("stats");
let currencyElem = document.getElementById("currency");
let overheadElem = document.getElementById("overhead");
let clickStoreElem = document.getElementById("clickUpgrades");
let autoStoreElem = document.getElementById("autoUpgrades");
let rpsElem = document.getElementById("rps");
let bgMusic = document.getElementById("bgMusic");

let month = 12;
let years = 0;
let overhead = 50;

let currentTime = new Date();
let lastTime = currentTime.getTime();
let fps = 30;
let interval = 1000 / fps;
let ticks = {
  cycleMonth: 12000,
  autoCollect: 6000,
  timebar: 250
};

let nextTicks = {
  cycleMonth: ticks.cycleMonth + lastTime,
  autoCollect: ticks.autoCollect + lastTime,
  timebar: ticks.timebar + lastTime
};

let income = {
  current: 75,
  total: 75
};

let rps = {
  fish: {
    total: 0
  },
  wood: {
    total: 0
  },
  ore: {
    total: 0
  }
};

let stock = {
  fish: {
    name: "Fish",
    icon: "fas fa-fish",
    current: 0,
    total: 0
  },
  wood: {
    name: "Lumber",
    icon: "fas fa-tree",
    current: 0,
    total: 0
  },
  ore: {
    name: "Ore",
    icon: "fas fa-cloud-meatball",
    current: 0,
    total: 0
  }
};

let clickUpgrades = {
  fish: {
    bait: {
      name: "Live Bait",
      quantity: 0,
      multiplier: 1,
      price: 30
    }
  },
  wood: {
    edge: {
      name: "Sharpen Edge",
      quantity: 0,
      multiplier: 1,
      price: 30
    }
  },
  ore: {
    pick: {
      name: "Harden Pick",
      quantity: 0,
      multiplier: 1,
      price: 30
    }
  }
};

let autoCollectors = {
  fish: {
    nets: {
      name: "Fishermen",
      quantity: 0,
      multiplier: 4,
      price: 150
    }
  },
  wood: {
    edge: {
      name: "Lumberjacks",
      quantity: 0,
      multiplier: 4,
      price: 150
    }
  },
  ore: {
    pick: {
      name: "Miners",
      quantity: 0,
      multiplier: 4,
      price: 150
    }
  }
};

let goods = [
  {
    id: "fish",
    name: "Fish",
    price: 3,
    elem: fish
  },
  {
    id: "wood",
    name: "Lumber",
    price: 3,
    elem: wood
  },
  {
    id: "ore",
    name: "Ore",
    price: 3,
    elem: ore
  }
];
