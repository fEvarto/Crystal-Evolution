const saveButton = document.getElementById("saveButton");
const loadButton = document.getElementById("loadButton");

function replacer(key, value) {
  if (typeof value === 'function') {
    return value.toString();
  }
  return value;
}

// Пользовательская функция для восстановления
function revive(key, value) {
  if (typeof value === 'string' && value.startsWith('function')) {
    return eval(`(${value})`);
  }
  return value;
}

saveButton.addEventListener("click", () => {
  const saveData = {
    crystalCount: crystalCount,
    miningRate: miningRate,
    clickUpgradesData: clickUpgrades.map(upgrade => ({
      id: upgrade.id,
      amount: upgrade.amount,
      auto: upgrade.auto,
    })),
    mainUpgradesData: mainUpgrades.map(upgrade => ({
      id: upgrade.id,
      purchased: upgrade.purchased,
    })),
  };
  const saveDataStr = JSON.stringify(saveData);
  const encodedData = btoa(saveDataStr);
  localStorage.setItem("gameSave", encodedData);
  alert("Game Saved!");
});

loadButton.addEventListener("click", () => {
  const encodedData = localStorage.getItem("gameSave");
  if (encodedData) {
    const saveDataStr = atob(encodedData);
    const saveData = JSON.parse(saveDataStr);
    console.log("Loaded Save Data:", saveData);
    
    // Восстанавливайте состояние из сохранения
    crystalCount = saveData.crystalCount;
    miningRate = saveData.miningRate;
    
    // Обновите существующие массивы
    saveData.clickUpgradesData.forEach(savedUpgradeData => {
      const existingUpgrade = clickUpgrades.find(upgrade => upgrade.id === savedUpgradeData.id);
      if (existingUpgrade) {
        existingUpgrade.amount = savedUpgradeData.amount;
        existingUpgrade.auto = savedUpgradeData.auto;
      }
    });

    // Восстановление mainUpgrades
    saveData.mainUpgradesData.forEach(savedUpgradeData => {
      const existingUpgrade = mainUpgrades.find(upgrade => upgrade.id === savedUpgradeData.id);
      if (existingUpgrade) {
        existingUpgrade.purchased = savedUpgradeData.purchased;
      }
    });
    
    updateUI();
    renderUpgrades();
    updateClickUpgradesContainer();
    alert("Game Loaded!");
  } else {
    alert("There are no save data");
  }
});