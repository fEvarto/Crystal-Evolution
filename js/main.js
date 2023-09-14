let crystalCount = 0;
let miningRate;

const crystalCountElement = document.getElementById("crystalCount");
const mineButton = document.getElementById("mineButton");
const upgradeButton = document.getElementById("upgradeButton");

const clickUpgrades = [
  {
    name: "Pickaxe",
    unlocked: function(){
      return true;
    },
    getDescription: function() {
      return `Buy a pickaxe that boosts mining per click by ${this.effect(this.amount)}`;
    },
    id: 1,
    amount: 0,
    type: "crystal",
    effect: (x) => {
      let base = 1
      if (clickUpgrades.find(upgrade => upgrade.id === 2).amount > 0) {
        base += clickUpgrades.find(upgrade => upgrade.id === 2).effect(clickUpgrades.find(upgrade => upgrade.id === 2).amount);
      }
      if (mainUpgrades.find(upgrade => upgrade.id === 21).purchased) {
        base += mainUpgrades.find(upgrade => upgrade.id === 21).effect();
      }
      return base * x;
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
      return `Sharpen your pickaxes, increasing their base by ${this.effect(this.amount)}`;
    },
    id: 2,
    amount: 0,
    type: "crystal",
    effect: (x) => {
      let base = 1
      if (clickUpgrades.find(upgrade => upgrade.id === 3).amount > 0) {
        base += clickUpgrades.find(upgrade => upgrade.id === 3).effect(clickUpgrades.find(upgrade => upgrade.id === 3).amount);
      }
      return base * x;
    },
    cost: (x) => {
      return Math.round(1000 * Math.pow(2.5, x))
    },
    autoUnlocked: function(){
      return false;
      return (mainUpgrades.find(upgrade => upgrade.id === 24).purchased);
    },
    auto: false,
  },
  {
    name: "Reinforcement",
    unlocked: function(){
      return (mainUpgrades.find(upgrade => upgrade.id === 22).purchased);
    },
    getDescription: function() {
      return `Reinforce your pickaxes, increasing effectiveness of sharping by ${this.effect(this.amount)}`;
    },
    id: 3,
    amount: 0,
    type: "crystal",
    effect: (x) => {
      return 0.5 * x;
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
];

function updateUI() {
  miningRate = upgradeEffects.miningRate();
  crystalCountElement.textContent = Math.round(crystalCount);
}

function updateClickUpgradesContainer() {
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
      buttonElement.textContent = `${upgrade.cost(upgrade.amount)} crystals`;
      

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
        buttonAuto.textContent = `AUTO: ${upgrade.auto == true ? "ON" : "OFF"}`;
  
        buttonAuto.addEventListener("click", () => {
          switchAuto(index);
        })
        upgradeElement.appendChild(buttonAuto);
      }

      upgradeElement.appendChild(descriptionElement);

      clickUpgradesContainer.appendChild(upgradeElement);
    }
  });
}

function purchaseClickUpgrade(upgradeIndex) {
  const upgrade = clickUpgrades[upgradeIndex];
  const cost = upgrade.cost(upgrade.amount);

  if (crystalCount >= cost) {
    crystalCount -= cost;
    upgrade.amount++;
    updateClickUpgradesContainer()
    updateUI();
    renderUpgrades()
    console.log("Purchased")
  } else {
    console.log("Недостаточно кристаллов для покупки улучшения");
  }
}

function switchAuto(upgradeIndex) {
  const upgrade = clickUpgrades[upgradeIndex];

  upgrade.auto = !upgrade.auto
  updateClickUpgradesContainer()
    updateUI();
}

mineButton.addEventListener("click", () => {
  crystalCount += miningRate;
  updateUI();
});
//Hold a button
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
  miningInterval = setInterval(() => {
    mineButton.click();
  }, 200); // Интервал между добычей (в миллисекундах)
}

function stopMining() {
  clearInterval(miningInterval);
}
updateUI();
updateClickUpgradesContainer();

function autoClick() {
  if (mainUpgrades.find(upgrade => upgrade.id === 14).purchased){
  mineButton.click(); // Вызываем событие клика на кнопке
  }
}

setInterval(autoClick, mainUpgrades.find(upgrade => upgrade.id === 14).effect());

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

autoPurchaseClickUpgrades();