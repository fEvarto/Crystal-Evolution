let PrestigeReset = 0;
const gemsCurrency = document.getElementById("gems");
const dustElement = document.getElementById("dust");

function checkPrestigeUnlocks(){
  if (mainUpgrades.find(upgrade => upgrade.id === 25).purchased || PrestigeReset >= 1){
    gemsCurrency.style.display = "flex"
  } else {
    gemsCurrency.style.display = "none"
  }

  if (PrestigeReset >= 1){
    prestigeTab.style.display = "flex"
    dustElement.style.display = "flex"
  } else {
    prestigeTab.style.display = "none"
    dustElement.style.display = "none"
  }
}

gemsCurrency.addEventListener("click", () => {
  if (crystalCount >= 50000){
  prestigeReset();
  }
});

function prestigeReset() {
    // Сбросьте все данные игры к начальному состоянию
    crystalCount = 10;
    
    // Сбросьте количество и состояние всех улучшений
    clickUpgrades.forEach((upgrade) => {
      if (upgrade.type === "crystal"){
        if (!upgrade.keep()){
        upgrade.amount = 0;
        upgrade.auto = false;
        } else {
        upgrade.amount = Math.floor(upgrade.amount * mainUpgrades.find(upgrade => upgrade.id === 114).effect())
        upgrade.auto = false;
        }
      }
    });
  
    mainUpgrades.forEach((upgrade) => {
      if (upgrade.type === "crystal"){
      if (!upgrade.keep()){
      upgrade.purchased = false;
      }}
    });

  upgradesRendered = false;
  mainUpgradesRendered = false;
  isAutoClickIntervalSet = false;
  dustRendered = false;
    // Установите новую валюту
    gemsCount = gemsCount.add(gemsGain); // Установите начальное значение новой валюты
    PrestigeReset++;
  }