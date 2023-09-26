let dust = 0; 
let dustRendered = false;
const dustBoosts = [
  {
    id: 1,
    unlocked: function() {
      return dust >= 1
    },
    getDescription: function() {
      return `<b>+${this.effect()}</b> to "Iron Finger" softcap value`;
    },
    effect: () => {
      let eff = 0
      if (dust >= 1){
      eff = Math.pow(dust, 1.25).toFixed(1)
      if (mainUpgrades.find(upgrade => upgrade.id === 35).purchased) {
        eff = Math.pow(eff, 1.05).toFixed(1);
      }}
      return eff;
    }
  },
  {
    id: 2,
    unlocked: function() {
      return dust >= 10
    },
    getDescription: function() {
      return `<b>x${this.effect()}</b> to "Pickaxe" effect`;
    },
    effect: () => {
      let eff = 1
      if (dust >= 10){
      eff = Math.pow(dust - 10, 0.25).toFixed(1)
      if (mainUpgrades.find(upgrade => upgrade.id === 35).purchased) {
        eff = Math.pow(eff, 1.05).toFixed(1)
      }
      return eff;
      } else {return eff;}
    }
  },
  {
    id: 3,
    unlocked: function() {
      return dust >= 100
    },
    getDescription: function() {
      return `<b>-${this.effect()}</b> to "Pickaxe storage" pickaxes to boost`;
    },
    effect: () => {
      let eff = 0
      if (dust >= 100)
      eff = Math.floor(Math.log10(dust))
      if (mainUpgrades.find(upgrade => upgrade.id === 35).purchased) {
        eff = Math.floor(Math.pow(eff, 1.05));
      }
      return eff;
    }
  },
]

function renderShredder(){
    if (dustRendered){
      return;
    }
    const shredder = document.getElementById("shredder");
    shredder.innerHTML = "";
    const dustCountElement = document.getElementById("dustCount");
    dustCountElement.textContent = dust;

    
    dustBoosts.forEach((upgrade) => {
      if (upgrade.unlocked()){

      const upgradeElement = document.createElement("span");
      upgradeElement.innerHTML = upgrade.getDescription();

      shredder.appendChild(upgradeElement);
    
      dustRendered = true;
    }});
}

const convertButton = document.getElementById("convertButton");
convertButton.addEventListener("click", () => {
  if (gemsCount >= 1) {
    gemsCount--;
    dust += dustGain;
    dustRendered = false;
  }
});