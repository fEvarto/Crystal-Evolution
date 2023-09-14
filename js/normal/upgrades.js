const mainUpgrades = [
    {
      name: "Iron finger",
      unlocked: function(){
        return true
      },
      getDescription: function() {
        return `Adds 1% of your current crystals to click impact. Softcaps after some gained crystals. <b>Currently: +${this.effect()}</b>`;
      },
      id: 11,
      type: "crystal",
      effect: () => {
        let eff; let base = 0.01; let softcapValue = 1.5e2;
        if (mainUpgrades.find(upgrade => upgrade.id === 23).purchased) {
          base += mainUpgrades.find(upgrade => upgrade.id === 23).effect();
        }
        if (mainUpgrades.find(upgrade => upgrade.id === 13).purchased) {
          softcapValue *= mainUpgrades.find(upgrade => upgrade.id === 13).effect();
        }
        eff = Math.round(crystalCount * base);
        if (crystalCount >= softcapValue){
            eff = Math.round((softcapValue * base) + (Math.pow(crystalCount - softcapValue), 0.25))
        }
        return eff;
      },
      getCost: () => {
        return 250
      },
      
      purchased: false
    },
    {
      name: "Grinder stone",
      unlocked: function(){
        return true
      },
      getDescription: function() {
        return `Provides possibility to sharpen your pickaxes`;
      },
      id: 12,
      type: "crystal",
      effect: () => {

      },
      getCost: () => {
        return 1000
      },
      
      purchased: false
    },
    {
      name: "Gypsum",
      unlocked: function(){
        return true
      },
      getDescription: function() {
        return `Softcap of "Iron Finger" starts x1.35 later per each OoM of crystals. <b>Currently: x${this.effect()}</b>`;
      },
      id: 13,
      type: "crystal",
      effect: () => {
        let eff = 1;
        if (crystalCount != 0) {eff = Math.pow(1.35, Math.log10(crystalCount)).toFixed(2);}
        return eff;
      },
      getCost: () => {
        return 5000
      },
      
      purchased: false
    },
    {
      name: "Miner slave",
      unlocked: function(){
        return true
      },
      getDescription: function() {
        return `Passively autoclicks once per ${this.effect() / 1000} seconds`;
      },
      id: 14,
      type: "crystal",
      effect: () => {
        let eff = 4000

        return eff
      },
      getCost: () => {
        return 7500
      },
      purchased: false
    },
    {
      name: "Crystal bootleg",
      unlocked: function(){
        return true
      },
      getDescription: function() {
        return `Unlocks more crystal upgrades`;
      },
      id: 15,
      type: "crystal",
      effect: () => {
        let eff;
        return eff;
      },
      getCost: () => {
        return 8500
      },
      
      purchased: false
    },
    {
      name: "Pickaxe storage",
      unlocked: function(){
        return mainUpgrades.find(upgrade => upgrade.id === 15).purchased
      },
      getDescription: function() {
        return `Pickaxes boosts itself, increasing their own base by 1 per each 10. <b>Currently: +${this.effect()}</b>`;
      },
      id: 21,
      type: "crystal",
      effect: () => {
        let eff; let base = 10;
        if (mainUpgrades.find(upgrade => upgrade.id === 24).purchased) {
          base -= mainUpgrades.find(upgrade => upgrade.id === 24).effect();
        }
        eff = Math.floor((clickUpgrades.find(upgrade => upgrade.id === 1).amount) / base)
        return eff;
      },
      getCost: () => {
        return 12000
      },
      
      purchased: false
    },
    {
      name: "Pickaxe reinforcement",
      unlocked: function(){
        return mainUpgrades.find(upgrade => upgrade.id === 15).purchased
      },
      getDescription: function() {
        return `Provides possibility to reinforce your pickaxes`;
      },
      id: 22,
      type: "crystal",
      effect: () => {

      },
      getCost: () => {
        return 16500
      },
      
      purchased: false
    },
    {
      name: "Titan finger",
      unlocked: function(){
        return mainUpgrades.find(upgrade => upgrade.id === 15).purchased
      },
      getDescription: function() {
        return `Increase "Iron finger" percent base by 0.5 per each OoM of crystals <b>Currently: +${this.effect() * 100}%</b>`;
      },
      id: 23,
      type: "crystal",
      effect: () => {
        let eff;
        eff = Math.floor(Math.log10(crystalCount)) * 0.005;
        return eff;
      },
      getCost: () => {
        return 30000
      },
      
      purchased: false
    },
    {
      name: "Well-established logistics",
      unlocked: function(){
        return mainUpgrades.find(upgrade => upgrade.id === 15).purchased
      },
      getDescription: function() {
        return `Allows to autobuy pickaxes once per second. -1 to pickaxes to boost in "Pickaxe storage"`;
      },
      id: 24,
      type: "crystal",
      effect: () => {
        return 1
      },
      getCost: () => {
        return 40000
      },
      purchased: false
    },
    {
      name: "Crystal prestige",
      unlocked: function(){
        return mainUpgrades.find(upgrade => upgrade.id === 15).purchased
      },
      getDescription: function() {
        return `Unlocks crystal prestige`;
      },
      id: 25,
      type: "crystal",
      effect: () => {
        return 1
      },
      getCost: () => {
        return 50000
      },
      
      purchased: false
    },
  ];

  function hasUpgrade(upgradeIndex){
    console.log("Upgrade Index:", upgradeIndex);
    if (upgradeIndex >= 0 && upgradeIndex < mainUpgrades.length) {
      const upgrade = mainUpgrades[upgradeIndex];
      return upgrade.purchased;
    }
  }

  function purchaseUpgrade(upgradeIndex) {
    const upgrade = mainUpgrades[upgradeIndex];
    const cost = upgrade.getCost();
  
    if (!upgrade.purchased && crystalCount >= cost) {
      crystalCount -= cost; // Вычитаем стоимость улучшения из кристаллов
      upgrade.purchased = true; // Устанавливаем статус "куплено"
      renderUpgrades(); // Перерисовываем список улучшений
      updateUI();
      updateClickUpgradesContainer();
    }
  }

  const upgradeList = document.getElementById("upgradeList");
  const tooltip = document.getElementById("tooltip");

  // Функция для добавления улучшений на страницу
 function renderUpgrades() {
  const upgradeGrid = document.getElementById("mainupgradeGrid");
  upgradeGrid.innerHTML = ""; // Очищаем сетку перед обновлением

  mainUpgrades.forEach((upgrade, index) => {
    if (upgrade.unlocked()){
    const upgradeElement = document.createElement("div");
    upgradeElement.classList.add("mainupgrade");
    upgradeElement.classList.add(upgrade.type);
    
    if (upgrade.purchased){
    upgradeElement.classList.add("bought");
    }

    upgradeElement.addEventListener("mouseover", () => {
      showTooltip(upgrade, upgradeElement);
    });

    upgradeElement.addEventListener("mouseout", () => {
      hideTooltip();
    });

    // Добавляем обработчик события клика на улучшение
    upgradeElement.addEventListener("click", () => {
      purchaseUpgrade(index); // Вызываем функцию покупки улучшения
    });

    upgradeGrid.appendChild(upgradeElement);
  }});
}

function showTooltip(upgrade, element) {
  tooltip.innerHTML = `
    <h3>${upgrade.name}</h3>
    <p>${upgrade.getDescription()}</p>
    <p>${upgrade.getCost()} crystals</p>
  `;
  tooltip.style.display = "block";
  tooltip.style.left = `${element.offsetLeft + element.offsetWidth}px`;
  tooltip.style.top = `${element.offsetTop}px`;
}

// Функция для скрытия всплывающей подсказки
function hideTooltip() {
  tooltip.style.display = "none";
}

renderUpgrades();