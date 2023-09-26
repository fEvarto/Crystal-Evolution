let crystalCount = 10;
let gemsCount = 0;
let miningRate;

const crystalCountElement = document.getElementById("crystalCount");
const gemsCountElement = document.getElementById("gemsCount");
const mineButton = document.getElementById("mineButton");
const upgradeButton = document.getElementById("upgradeButton");

const clickUpgrades = [
  {
    name: "Pickaxe",
    unlocked: function(){
      return true;
    },
    getDescription: function() {
      return `+${this.effect(this.amount)} to mining rate`;
    },
    keep: function(){
      return mainUpgrades.find(upgrade => upgrade.id === 114).purchased;
    },
    id: 1,
    amount: 0,
    type: "crystal",
    effect: (x) => {
      let base = 2
      if (clickUpgrades.find(upgrade => upgrade.id === 2).amount > 0) {
        base += clickUpgrades.find(upgrade => upgrade.id === 2).effect(clickUpgrades.find(upgrade => upgrade.id === 2).amount);
      }
      if (mainUpgrades.find(upgrade => upgrade.id === 21).purchased) {
        base += mainUpgrades.find(upgrade => upgrade.id === 21).effect();
      }
      if (dustBoosts.find(upgrade => upgrade.id === 2).unlocked) {
        base *= dustBoosts.find(upgrade => upgrade.id === 2).effect();
      }
      return (base * x);
    },
    cost: (x) => {
      return Math.round(10 * Math.pow(1.5, x))
    },
    autoUnlocked: function(){
      return (mainUpgrades.find(upgrade => upgrade.id === 24).purchased);
    },
    auto: false,
  },
  {
    name: "Grinder stone",
    unlocked: function(){
      return (mainUpgrades.find(upgrade => upgrade.id === 12).purchased);
    },
    getDescription: function() {
      return `+${this.effect(this.amount)} to pickaxe base`;
    },
    keep: function(){
      return mainUpgrades.find(upgrade => upgrade.id === 114).purchased;
    },
    id: 2,
    amount: 0,
    type: "crystal",
    effect: (x) => {
      let base = 2
      if (clickUpgrades.find(upgrade => upgrade.id === 3).amount > 0) {
        base += clickUpgrades.find(upgrade => upgrade.id === 3).effect(clickUpgrades.find(upgrade => upgrade.id === 3).amount);
      }
      return base * x;
    },
    cost: (x) => {
      return Math.round(1000 * Math.pow(2.5, x))
    },
    autoUnlocked: function(){
      return (mainUpgrades.find(upgrade => upgrade.id === 31).purchased);
    },
    auto: false,
  },
  {
    name: "Reinforcement",
    unlocked: function(){
      return (mainUpgrades.find(upgrade => upgrade.id === 22).purchased);
    },
    getDescription: function() {
      return `+${this.effect(this.amount)} grinder stone base`;
    },
    keep: function(){
      return mainUpgrades.find(upgrade => upgrade.id === 114).purchased;
    },
    id: 3,
    amount: 0,
    type: "crystal",
    effect: (x) => {
      let base = 1
      return base * x;
    },
    cost: (x) => {
      return Math.round(5000 * Math.pow(5, x))
    },
    autoUnlocked: function(){
      return false;
      return (mainUpgrades.find(upgrade => upgrade.id === 24).purchased);
    },
    auto: false,
  },
  {
    name: "Drill",
    unlocked: function(){
      return PrestigeReset >= 1;
    },
    getDescription: function() {
      return `^${this.effect(this.amount)} to mining rate`;
    },
    keep: function(){
      return false;
    },
    id: 4,
    amount: 0,
    type: "prestige",
    effect: (x) => {
      let base = 1
      return base + (x * 0.02);
    },
    cost: (x) => {
      return x + 1
    },
    autoUnlocked: function(){
      return false;
    },
    auto: false,
  },
];
let mainUpgradesRendered;
function updateClickUpgradesContainer() {
  if (mainUpgradesRendered) {
    return; // Улучшения уже были отрисованы, нет необходимости в повторной отрисовке
  }

  const clickUpgradesContainer = document.getElementById("clickUpgrades");
  clickUpgradesContainer.innerHTML = ""; // Очищаем контейнер перед обновлением

  clickUpgrades.forEach((upgrade, index) => {
    if (upgrade.unlocked()) {
      const upgradeElement = document.createElement("div");
      upgradeElement.classList.add("upgrade");
      upgradeElement.classList.add("click-upgrade");

      const nameElement = document.createElement("h3");
      nameElement.classList.add("upgrade-name");
      nameElement.textContent = upgrade.name + ` (${upgrade.amount})`;

      const upgradeIconElement = document.createElement("a");
      upgradeIconElement.classList.add("upgrade-icon");

      const descriptionElement = document.createElement("p");
      descriptionElement.classList.add("upgrade-description");
      descriptionElement.textContent = upgrade.getDescription();
      const buttonElement = document.createElement("button");
      
      buttonElement.classList.add("upgrade-button");
      if (upgrade.type === "crystal"){
      buttonElement.textContent = `${upgrade.cost(upgrade.amount)} crystals`;
      buttonElement.classList.add("crystal");
      } else if (upgrade.type === "prestige"){
      buttonElement.textContent = `${upgrade.cost(upgrade.amount)} gems`;
      buttonElement.classList.add("prestige");
      }
      

      // Добавьте обработчик события клика на кнопку
      buttonElement.addEventListener("click", () => {
        purchaseClickUpgrade(index);
      });

      upgradeElement.appendChild(upgradeIconElement);
      upgradeElement.appendChild(nameElement);
      upgradeElement.appendChild(buttonElement);

      let buttonAuto;
      if(upgrade.autoUnlocked()){
        buttonAuto = document.createElement("button");
        buttonAuto.classList.add("auto-button");
        if (upgrade.type === "crystal"){
          buttonAuto.classList.add("crystal");
          } else if (upgrade.type === "prestige"){
          buttonAuto.classList.add("prestige");
          }
        buttonAuto.textContent = `AUTO: ${upgrade.auto == true ? "ON" : "OFF"}`;
  
        buttonAuto.addEventListener("click", () => {
          switchAuto(index);
        })
        upgradeElement.appendChild(buttonAuto);
      }

      upgradeElement.appendChild(descriptionElement);

      clickUpgradesContainer.appendChild(upgradeElement);

      mainUpgradesRendered = true;
    }
  });
}

function purchaseClickUpgrade(upgradeIndex) {
  const upgrade = clickUpgrades[upgradeIndex];
  const cost = upgrade.cost(upgrade.amount);

  if (upgrade.type === "crystal" && crystalCount >= cost) {
    crystalCount -= cost;
    upgrade.amount++;
    mainUpgradesRendered = false;
    console.log("Purchased")
  } if (upgrade.type === "prestige" && gemsCount >= cost) {
    gemsCount -= cost;
    upgrade.amount++;
    mainUpgradesRendered = false;
    console.log("Purchased")
  }
}

function switchAuto(upgradeIndex) {
  const upgrade = clickUpgrades[upgradeIndex];
  mainUpgradesRendered = false;
  upgrade.auto = !upgrade.auto
}

mineButton.addEventListener("click", () => {
  crystalCount += miningRate;
  updateUI();
});

//AUTOMATION AND UPDATING
function updateUI() {
  miningRate = upgradeEffects.miningRate();
  gemsGain = upgradeEffects.gemsGain();
  dustGain = upgradeEffects.dustGain();
  crystalCountElement.textContent = Math.round(crystalCount);
  if (crystalCount >= 50000){
  gemsCountElement.innerHTML = `${gemsCount.toFixed(2)}<br>(+${Math.max(Math.log10(crystalCount / 50000), 1).toFixed(2)})`;}
  else {gemsCountElement.innerHTML = `${gemsCount.toFixed(2)}`;}
}

let miningInterval = null;

mineButton.addEventListener("mousedown", () => {
  startMining();
});

mineButton.addEventListener("mouseup", () => {
  stopMining();
});

mineButton.addEventListener("mouseleave", () => {
  stopMining();
});

function startMining() {
  if (mainUpgrades.find(upgrade => upgrade.id === 112).purchased){
  miningInterval = setInterval(() => {
    mineButton.click();
  }, 200); // Интервал между добычей (в миллисекундах)
}
}

function stopMining() {
  clearInterval(miningInterval);
}

function autoClick() {
  mineButton.click(); // Вызываем событие клика на кнопке
  console.log("Clicked")
}
let autoClickInterval; let isAutoClickIntervalSet = false;
function updateAutoClickInterval() {
  if (!isAutoClickIntervalSet) {
    const effect = mainUpgrades.find(upgrade => upgrade.id === 14).effect();
    clearInterval(autoClickInterval);
    autoClickInterval = setInterval(autoClick, effect.first); // Установите интервал только один раз
    isAutoClickIntervalSet = true; // Установите флаг, что интервал установлен
    console.log(autoClickInterval);
  }
}

function autoPurchaseClickUpgrades() {
  setInterval(() => {
    // Пройдитесь по всем улучшениям клика, которые могут быть автоматически куплены
    clickUpgrades.forEach((upgrade, index) => {
      if (upgrade.autoUnlocked() && upgrade.auto) {
        const cost = upgrade.cost(upgrade.amount);
        if (crystalCount >= cost) {
          purchaseClickUpgrade(index);
        }
      }
    });
  }, 1000); // Проверять каждую секунду
}
function updateGame() {
  updateUI();
  updateClickUpgradesContainer();
  updateAutoClickInterval();
  autoPurchaseClickUpgrades();
  renderUpgrades();
  checkPrestigeUnlocks();
  renderShredder();
}

let updateGameInterval = setInterval(updateGame, 160);