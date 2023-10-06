let crystalCount = new Decimal(10);
let gemsCount = new Decimal(0);

const crystalCountElement = document.getElementById("crystalCount");
const gemsCountElement = document.getElementById("gemsCount");
const mineButton = document.getElementById("mineButton");
const upgradeButton = document.getElementById("upgradeButton");

const clickUpgrades = [
  {
    name: "Pickaxe",
    icon: "images/Pickaxe.png",
    unlocked: function(){
      return true;
    },
    getDescription: function() {
      const effect = toScientificNotation(this.effect(this.amount));
      const effectText = typeof effect === 'number' ? effect.toFixed() : effect;
      return `+${effectText} to mining rate`;
    },
    keep: function(){
      return mainUpgrades.find(upgrade => upgrade.id === 114).purchased;
    },
    id: 1,
    amount: 0,
    type: "crystal",
    effect: (x) => {
      let base = new Decimal("2")
      if (clickUpgrades.find(upgrade => upgrade.id === 2).amount > 0) {
        base = base.add(clickUpgrades.find(upgrade => upgrade.id === 2).effect(clickUpgrades.find(upgrade => upgrade.id === 2).amount));
      }
      if (mainUpgrades.find(upgrade => upgrade.id === 21).purchased) {
        base = base.add(mainUpgrades.find(upgrade => upgrade.id === 21).effect());
      }
      if (dustBoosts.find(upgrade => upgrade.id === 1).unlocked) {
        base = base.times(dustBoosts.find(upgrade => upgrade.id === 1).effect());
      }
      return base.times(x);
    },
    cost: (x) => {
      return Decimal.round(new Decimal(10).times(Decimal.pow(1.5,x)))
    },
    autoUnlocked: function(){
      return (mainUpgrades.find(upgrade => upgrade.id === 24).purchased);
    },
    auto: false,
  },
  {
    name: "Grinder stone",
    icon: "images/GrinderStone.png",
    unlocked: function(){
      return (mainUpgrades.find(upgrade => upgrade.id === 12).purchased);
    },
    getDescription: function() {
      const effect = toScientificNotation(this.effect(this.amount));
      const effectText = typeof effect === 'number' ? effect.toFixed() : effect;
      return `+${effectText} to pickaxe base`;
    },
    keep: function(){
      return mainUpgrades.find(upgrade => upgrade.id === 114).purchased;
    },
    id: 2,
    amount: 0,
    type: "crystal",
    effect: (x) => {
      let base = new Decimal(2)
      if (clickUpgrades.find(upgrade => upgrade.id === 3).amount > 0) {
        base = base.add(clickUpgrades.find(upgrade => upgrade.id === 3).effect(clickUpgrades.find(upgrade => upgrade.id === 3).amount));
      }
      return base.times(x);
    },
    cost: (x) => {
      return Decimal.round(new Decimal(1000).times(Decimal.pow(2.5,x)))
    },
    autoUnlocked: function(){
      return (mainUpgrades.find(upgrade => upgrade.id === 31).purchased);
    },
    auto: false,
  },
  {
    name: "Reinforcement",
    icon: "images/Reinforcement.png",
    unlocked: function(){
      return (mainUpgrades.find(upgrade => upgrade.id === 22).purchased);
    },
    getDescription: function() {
      const effect = toScientificNotation(this.effect(this.amount));
      const effectText = typeof effect === 'number' ? effect.toFixed() : effect;
      return `+${effectText} to grinder stone base`;
    },
    keep: function(){
      return mainUpgrades.find(upgrade => upgrade.id === 114).purchased;
    },
    id: 3,
    amount: 0,
    type: "crystal",
    effect: (x) => {
      let base = new Decimal(1)
      return base.times(x);
    },
    cost: (x) => {
      return Decimal.round(new Decimal(5000).times(Decimal.pow(5,x)))
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
      return `^${toScientificNotation(this.effect(this.amount))} to mining rate`;
    },
    keep: function(){
      return false;
    },
    id: 4,
    amount: 0,
    type: "prestige",
    effect: (x) => {
      let base = new Decimal(1)
      return base.add(x * 0.02).toFixed(2);
    },
    cost: (x) => {
      return new Decimal(x + 1)
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
      if (upgrade.icon){
      const iconImage = document.createElement("img");
      iconImage.src = upgrade.icon;
      upgradeIconElement.appendChild(iconImage);
    }
      const descriptionElement = document.createElement("p");
      descriptionElement.classList.add("upgrade-description");
      descriptionElement.textContent = upgrade.getDescription();
      const buttonElement = document.createElement("button");
      
      buttonElement.classList.add("upgrade-button");
      if (upgrade.type === "crystal"){
      buttonElement.textContent = `${toScientificNotation(upgrade.cost(upgrade.amount)).toString()} crystals`;
      buttonElement.classList.add("crystal");
      } else if (upgrade.type === "prestige"){
      buttonElement.textContent = `${toScientificNotation(upgrade.cost(upgrade.amount)).toString()} gems`;
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

  if (upgrade.type === "crystal" && crystalCount.gte(cost)) {
    crystalCount = crystalCount.sub(cost);
    upgrade.amount++;
    mainUpgradesRendered = false;
    console.log("Purchased")
  } if (upgrade.type === "prestige" && gemsCount.gte(cost)) {
    gemsCount = gemsCount.sub(cost);
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
  crystalCount = Decimal.add(crystalCount, miningRate);
  updateUI();
});

//AUTOMATION AND UPDATING
function updateUI() {
  miningRate = upgradeEffects.miningRate();
  gemsGain = upgradeEffects.gemsGain();
  dustGain = upgradeEffects.dustGain();
  crystalCount = new Decimal(crystalCount);
  gemsCount = new Decimal(gemsCount);
  crystalCountElement.textContent = toScientificNotation(crystalCount).toString();
  if (crystalCount.gte(new Decimal(50000))){
  gemsCountElement.innerHTML = `${gemsCount.toFixed(2)}<br>(+${gemsGain.toFixed(2).toString()})`;}
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
        if (crystalCount.gte(cost)) {
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

let updateGameInterval = setInterval(updateGame, 33);