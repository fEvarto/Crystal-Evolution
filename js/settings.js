const saveButton = document.getElementById("saveButton");
const exportButton = document.getElementById("exportButton");
const loadButton = document.getElementById("loadButton");
const saveCodeInput = document.getElementById("saveCodeInput");

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
    gemsCount: gemsCount,
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
    prestigeResets: PrestigeReset,
    dust: dust,
  };
  const saveDataStr = JSON.stringify(saveData);
  const encodedData = btoa(saveDataStr);
  localStorage.setItem("gameSave", encodedData);
  const saveConfirmation = document.getElementById("saveConfirmation");
  saveConfirmation.style.display = "block";

  setTimeout(() => {
    saveConfirmation.style.display = "none";
  }, 2000); // Окно будет скрыто через 2 секунды
});

exportButton.addEventListener("click", () => {
  const saveData = {
    crystalCount: crystalCount,
    gemsCount: gemsCount,
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
    prestigeResets: PrestigeReset,
    dust: dust,
  };
  const saveDataStr = JSON.stringify(saveData);
  const encodedData = btoa(saveDataStr);
  const textArea = document.createElement("textarea");
  textArea.value = encodedData;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  const copyConfirmation = document.getElementById("copyConfirmation");
  copyConfirmation.style.display = "block";

  setTimeout(() => {
    copyConfirmation.style.display = "none";
  }, 2000); // Окно будет скрыто через 2 секунды
});

function autoSave(){
  saveButton.click()
}

loadButton.addEventListener("click", () => {
  const saveCode = saveCodeInput.value.trim(); // Получите значение из текстового поля

  if (saveCode) {
    try {
      const saveDataStr = atob(saveCode);
      const saveData = JSON.parse(saveDataStr);
      console.log("Loaded Save Data:", saveData);
      
      // Восстанавливайте состояние из сохранения
      crystalCount = saveData.crystalCount || new Decimal(0);
      gemsCount = saveData.gemsCount || new Decimal(0);
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
      
      PrestigeReset = saveData.prestigeResets || 0;
      dust = saveData.dust || 0;
    } catch (error) {
      console.error("Ошибка при разборе кода сохранения:", error);
    }
  } else {
    console.log("Введите код сохранения");
  }
  const loadConfirmation = document.getElementById("importConfirmation");
  loadConfirmation.style.display = "block";

  setTimeout(() => {
    loadConfirmation.style.display = "none";
  }, 2000); // Окно будет скрыто через 2 секунды

  upgradesRendered = false;
  mainUpgradesRendered = false;
  isAutoClickIntervalSet = false;
  dustRendered = false;
});

document.addEventListener("DOMContentLoaded", function() {
  const savedGame = localStorage.getItem("gameSave");

  if (savedGame) {
    const saveDataStr = atob(savedGame);
    const saveData = JSON.parse(saveDataStr);
    crystalCount = saveData.crystalCount || new Decimal(10);
    gemsCount = saveData.gemsCount || new Decimal(0);
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

    PrestigeReset = saveData.prestigeResets || 0;
    dust = saveData.dust || new Decimal(0);
  }
});

const resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", () => {
  const confirmation = window.confirm("Are you confident in game resetting?");
  if (confirmation) {
    resetGame();
  }
});

function resetGame() {
  // Удалите данные из локального хранилища
  localStorage.removeItem("gameSave");

  // Сбросьте все переменные игры к начальному состоянию
  crystalCount = new Decimal(10);
  gemsCount = new Decimal(0);

  // Сбросьте количество и состояние всех улучшений
  clickUpgrades.forEach((upgrade) => {
    upgrade.amount = 0;
    upgrade.auto = false;
  });

  mainUpgrades.forEach((upgrade) => {
    upgrade.purchased = false;
  });

  PrestigeReset = 0;
  dust = new Decimal(0);
  // Дополнительные действия, если необходимо
  upgradesRendered = false;
  mainUpgradesRendered = false;
  isAutoClickIntervalSet = false;
  dustRendered = false;
}

setInterval(autoSave, 30000);