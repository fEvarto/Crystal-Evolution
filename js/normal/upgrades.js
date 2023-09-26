const mainUpgrades = [
    {
      name: "Iron finger",
      unlocked: function(){
        return true
      },
      keep: function(){
        return false
      },
      getDescription: function() {
        return `Adds 1% of your current crystals to click impact. Softcaps after some gained crystals. <b>Currently: +${this.effect()}</b>`;
      },
      id: 11,
      type: "crystal",
      effect: () => {
        let eff; let base = 0.01; let softcapValue = 150;
        if (mainUpgrades.find(upgrade => upgrade.id === 23).purchased) {
          base += mainUpgrades.find(upgrade => upgrade.id === 23).effect();
        }
        if (dustBoosts.find(boost => boost.id === 1).unlocked) {
          softcapValue += parseFloat(dustBoosts.find(boost => boost.id === 1).effect());
        }
        if (mainUpgrades.find(upgrade => upgrade.id === 13).purchased) {
          softcapValue *= mainUpgrades.find(upgrade => upgrade.id === 13).effect();
        }
        if (crystalCount >= softcapValue){
            eff = Math.round((softcapValue * base) + (Math.pow((crystalCount / softcapValue), 0.4)))
        } else {eff = Math.round(crystalCount * base);}
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
      keep: function(){
        return mainUpgrades.find(upgrade => upgrade.id === 111).purchased
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
      keep: function(){
        return false
      },
      id: 13,
      type: "crystal",
      effect: () => {
        let eff = 1; let base = 1.35
        if (crystalCount != 0) {eff = Number(Math.pow(base, Math.log10(crystalCount)).toFixed(2));}
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
        return `Reduces base autoclick cooldown by 1 second and current - by 10% per each crystal upgrade bought. <b>Currently: -${(1 - this.effect().second)*100}%</b>`;
      },
      keep: function(){
        return mainUpgrades.find(upgrade => upgrade.id === 111).purchased
      },
      id: 14,
      type: "crystal",
        effect: () => {
          let eff = {}, base = 0.9;
          if (mainUpgrades.find(upgrade => upgrade.id === 121).purchased) {
            base -= mainUpgrades.find(upgrade => upgrade.id === 121).effect()
          }
          console.log(base)
          let upgradesOfType = mainUpgrades.filter(upgrade => upgrade.type === "crystal" && upgrade.purchased);
          eff.first = 4000;
          if (mainUpgrades.find(upgrade => upgrade.id === 14).purchased) {
            eff.first -= 1000;
          }
          eff.second = Number(Math.pow(base, upgradesOfType.length).toFixed(2));
          if (mainUpgrades.find(upgrade => upgrade.id === 14).purchased) {
            eff.first *= eff.second;
          }
          console.log(eff.first);
          return eff;
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
      keep: function(){
        return mainUpgrades.find(upgrade => upgrade.id === 113).purchased
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
        return mainUpgrades.find(upgrade => upgrade.id === 15).purchased || PrestigeReset >= 1
      },
      getDescription: function() {
        return `Pickaxes boosts itself, increasing their own base by 1 + (current boost /10) per each 8 + (current boost). <b>Currently: +${this.effect()}</b>`;
      },
      keep: function(){
        return false
      },
      id: 21,
      type: "crystal",
      effect: () => {
        let eff = 0; let base = 8;
        if (mainUpgrades.find(upgrade => upgrade.id === 24).purchased) {
          base -= mainUpgrades.find(upgrade => upgrade.id === 24).effect();
        }
        if (dustBoosts.find(upgrade => upgrade.id === 3).unlocked) {
          base -= dustBoosts.find(upgrade => upgrade.id === 3).effect();
        }
        let pickaxes = clickUpgrades.find(upgrade => upgrade.id === 1).amount;
        for (let i = 0; ; i++){
        if (pickaxes >= base){
          pickaxes -= base;
          base++;
          eff += (1 + (i/10));
        }
        else {break;}
      }
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
        return mainUpgrades.find(upgrade => upgrade.id === 15).purchased || PrestigeReset >= 1
      },
      keep: function(){
        return mainUpgrades.find(upgrade => upgrade.id === 111).purchased
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
        return mainUpgrades.find(upgrade => upgrade.id === 15).purchased || PrestigeReset >= 1
      },
      keep: function(){
        return false
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
        return mainUpgrades.find(upgrade => upgrade.id === 15).purchased || PrestigeReset >= 1
      },
      keep: function(){
        return false
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
        return mainUpgrades.find(upgrade => upgrade.id === 15).purchased || PrestigeReset >= 1
      },
      keep: function(){
        return mainUpgrades.find(upgrade => upgrade.id === 113).purchased
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
    {
      name: "Pefrect-established logictics",
      unlocked: function(){
        return PrestigeReset >= 1
      },
      keep: function(){
        return false
      },
      getDescription: function() {
        return `Allows to autobuy grinder stones once per second`;
      },
      id: 31,
      type: "crystal",
      effect: () => {
        
      },
      getCost: () => {
        return 2.5e5
      },
      
      purchased: false
    },
    {
      name: "Crystal Urn",
      unlocked: function(){
        return PrestigeReset >= 1
      },
      keep: function(){
        return false
      },
      getDescription: function() {
        return `x2 to dust gain.`;
      },
      id: 32,
      type: "crystal",
      effect: () => {
        return 2
      },
      getCost: () => {
        return 4e5
      },
      
      purchased: false
    },
    {
      name: "Better conversion",
      unlocked: function(){
        return PrestigeReset >= 1
      },
      getDescription: function() {
        return `Rounded down in the dust gain replaces by rounded`;
      },
      keep: function(){
        return false
      },
      id: 33,
      type: "crystal",
      effect: () => {
        
      },
      getCost: () => {
        return 5e5
      },
      
      purchased: false
    },
    {
      name: "Deepened mine",
      unlocked: function(){
        return PrestigeReset >= 1
      },
      getDescription: function() {
        return `+2% to gems gain. -20% to gems gaining threshold (doesn't affect prestige requirements)`;
      },
      keep: function(){
        return false
      },
      id: 34,
      type: "crystal",
      effect: () => {
        return 1.02
      },
      getCost: () => {
        return 6e5
      },
      
      purchased: false
    },
    {
      name: "Increased ash density",
      unlocked: function(){
        return PrestigeReset >= 1
      },
      getDescription: function() {
        return `Dust boosts are ^1.05 stronger`;
      },
      keep: function(){
        return false
      },
      id: 35,
      type: "crystal",
      effect: () => {
        return 1.05
      },
      getCost: () => {
        return 1e6
      },
      
      purchased: false
    },
    //PRESTIGE
    {
      name: "Better contractors",
      unlocked: function(){
        return PrestigeReset >= 1
      },
      keep: function(){
        return false
      },
      getDescription: function() {
        return `Keep "Grinder stone", "Miner slave" and "Pickaxe reinforcement" upgrades on prestige reset`;
      },
      id: 111,
      type: "prestige",
      effect: () => {
        return 1
      },
      getCost: () => {
        return 1
      },
      
      purchased: false
    },
    {
      name: "Fingerprint",
      unlocked: function(){
        return PrestigeReset >= 1
      },
      keep: function(){
        return false
      },
      getDescription: function() {
        return `Allows to hold "Mine crystal" button. In this case the button will operate 5 times per second`;
      },
      id: 112,
      type: "prestige",
      effect: () => {
        return 1
      },
      getCost: () => {
        return 2
      },
      
      purchased: false
    },
    {
      name: "Wholesale purchase",
      unlocked: function(){
        return PrestigeReset >= 1
      },
      keep: function(){
        return false
      },
      getDescription: function() {
        return `Keep "Crystal bootleg" and "Crystal prestige" upgrades on prestige reset`;
      },
      id: 113,
      type: "prestige",
      effect: () => {
        return 1
      },
      getCost: () => {
        return 2
      },
      
      purchased: false
    },
    {
      name: "It turns out you can move with your belongings?",
      unlocked: function(){
        return PrestigeReset >= 1
      },
      keep: function(){
        return false
      },
      getDescription: function() {
        return `Keep half of pickaxes, grinder stones and reinforcements on prestige reset (rounded down)`;
      },
      id: 114,
      type: "prestige",
      effect: () => {
        let eff = 0.5
        return eff
      },
      getCost: () => {
        return 2
      },
      
      purchased: false
    },
    {
      name: "Gem replica",
      unlocked: function(){
        return PrestigeReset >= 1
      },
      keep: function(){
        return false
      },
      getDescription: function() {
        return `+3% gem gain. Unlocks more prestige upgrades`;
      },
      id: 115,
      type: "prestige",
      effect: () => {
        return 1.03
      },
      getCost: () => {
        return 3
      },
      
      purchased: false
    },
    {
      name: "Whip",
      unlocked: function(){
        return mainUpgrades.find(upgrade => upgrade.id === 115).purchased
      },
      keep: function(){
        return false
      },
      getDescription: function() {
        return `+0.4% "Miner slave" base cooldown reduction per upgrade in this row. <b>Currently: +${this.effect() * 100}%</b>`;
      },
      id: 121,
      type: "prestige",
      effect: () => {
        let eff = 0;
        if (mainUpgrades.find(upgrade => upgrade.id === 121).purchased) {
          eff += 0.004
        }
        if (mainUpgrades.find(upgrade => upgrade.id === 122).purchased) {
          eff += 0.004
        }
        return eff
      },
      getCost: () => {
        return 4
      },
      
      purchased: false
    },
    {
      name: "Augmented dust",
      unlocked: function(){
        return mainUpgrades.find(upgrade => upgrade.id === 115).purchased
      },
      keep: function(){
        return false
      },
      getDescription: function() {
        return `Unlocks new dust resource (WIP)`;
      },
      id: 122,
      type: "prestige",
      effect: () => {
        
      },
      getCost: () => {
        return 4
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
  let upgradesRendered;
  function purchaseUpgrade(upgradeIndex) {
    const upgrade = mainUpgrades[upgradeIndex];
    const cost = upgrade.getCost();
  
    if (!upgrade.purchased && upgrade.type === "crystal" && crystalCount >= cost) {
      crystalCount -= cost;
      upgrade.purchased = true; // Устанавливаем статус "куплено"
      upgradesRendered = false;
      mainUpgradesRendered = false;
      isAutoClickIntervalSet = false;
    }
    if (!upgrade.purchased && upgrade.type === "prestige" && gemsCount >= cost) {
      gemsCount -= cost;
      upgrade.purchased = true; // Устанавливаем статус "куплено"
      upgradesRendered = false;
      mainUpgradesRendered = false;
      isAutoClickIntervalSet = false;
    }
  }

  const upgradeList = document.getElementById("upgradeList");
  const tooltip = document.getElementById("tooltip");

  // Функция для добавления улучшений на страницу
 function renderUpgrades() {
  if (upgradesRendered) {
    return; // Улучшения уже были отрисованы, нет необходимости в повторной отрисовке
  }

  const upgradeGrid = document.getElementById("mainupgradeGrid");
  const presGrid = document.getElementById("presupgradeGrid");
  upgradeGrid.innerHTML = ""; // Очищаем сетку перед обновлением
  presGrid.innerHTML = "";

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
    if (upgrade.type === "crystal"){
    upgradeGrid.appendChild(upgradeElement);
    } else if (upgrade.type === "prestige"){
      presGrid.appendChild(upgradeElement);
    }

    upgradesRendered = true;
  }});
}

function showTooltip(upgrade, element) {
  if (upgrade.type === "crystal"){
  tooltip.innerHTML = `
    <h3>${upgrade.name}</h3><p>${upgrade.getDescription()}</p><p>${upgrade.getCost()} crystals</p>
  `;}
  else if (upgrade.type === "prestige"){
    tooltip.innerHTML = `
      <h3>${upgrade.name}</h3><p>${upgrade.getDescription()}</p><p>${upgrade.getCost()} gems</p>
    `;}
  tooltip.style.display = "block";
  tooltip.style.left = `${element.offsetLeft + element.offsetWidth}px`;
  tooltip.style.top = `${element.offsetTop}px`;
}

// Функция для скрытия всплывающей подсказки
function hideTooltip() {
  tooltip.style.display = "none";
}