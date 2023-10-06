let dust = new Decimal(0); 
let dustRendered = false;
const dustBoosts = [
  {
    id: 1,
    req: 1,
    unlocked: function() {
      return dust >= this.req
    },
    getDescription: function() {
      return `<b>x${this.effect().toFixed(2)}</b> to "Pickaxe" effect`;
    },
    effect: () => {
      let eff = new Decimal(1)
      if (dust >= 1){
      eff = Decimal.pow(dust, 0.25)
      if (mainUpgrades.find(upgrade => upgrade.id === 35).purchased) {
        eff = eff.pow(1.05)
      }
      return eff;
      } else {return eff;}
    }
  },
  {
    id: 2,
    req: 10,
    unlocked: function() {
      return dust >= this.req
    },
    getDescription: function() {
      return `<b>+${this.effect().toFixed(2)}</b> to "Iron Finger" softcap value`;
    },
    effect: function(){
      let eff = new Decimal(1)
      if (dust >= 10){
      eff = Decimal.pow(dust,1.2).add(dust);
      if (mainUpgrades.find(upgrade => upgrade.id === 35).purchased) {
        eff = Decimal.pow(eff, 1.05);
      }}
      return eff;
    }
  },
  {
    id: 3,
    req: 100,
    unlocked: function() {
      return dust >= this.req
    },
    getDescription: function() {
      return `<b>-${this.effect()}</b> to "Pickaxe storage" pickaxes to boost`;
    },
    effect: () => {
      let eff = new Decimal(100)
      if (dust >= 100)
      eff = Decimal.log10(dust);
      if (mainUpgrades.find(upgrade => upgrade.id === 35).purchased) {
        eff = Decimal.pow(eff, 1.05);
      }
      return eff.toFixed(1);
    }
  },
]

function renderShredder(){
    if (dustRendered){
      return;
    }
    const shredder = document.getElementById("shredder");
    shredder.innerHTML = "";

    for (const upgrade of dustBoosts) {
      if (!upgrade.unlocked()) {
        const upgradeElement = document.createElement("span");
        upgradeElement.innerHTML = `<br><b><i>Next bonus at ${upgrade.req} dust</b></i>`;
        shredder.appendChild(upgradeElement);
        break;
      } else if (upgrade.unlocked()){

      const upgradeElement = document.createElement("span");
      upgradeElement.innerHTML = upgrade.getDescription();

      shredder.appendChild(upgradeElement);
    
      dustRendered = true;
      }
  };
    const dustCountElement = document.getElementById("dustCount");
    dustCountElement.textContent = dust;
}

const convertButton = document.getElementById("convertButton");
convertButton.addEventListener("click", () => {
  if (gemsCount >= 1) {
    gemsCount--;
    dust = Decimal.add(dust, dustGain);
    dustRendered = false;
  }
});
dustElement.addEventListener("click", () =>{
  convertButton.click();
})