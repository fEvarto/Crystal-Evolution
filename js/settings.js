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
  const saveConfirmation = document.getElementById("saveConfirmation");
  saveConfirmation.style.display = "block";

  setTimeout(() => {
    saveConfirmation.style.display = "none";
  }, 2000); // Окно будет скрыто через 2 секунды
});

exportButton.addEventListener("click", () => {
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
});

document.addEventListener("DOMContentLoaded", function() {
  const savedGame = localStorage.getItem("gameSave");

  if (savedGame) {
    const saveDataStr = atob(savedGame);
    const saveData = JSON.parse(saveDataStr);
    crystalCount = saveData.crystalCount;
    miningRate = saveData.miningRate;
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
  crystalCount = 10;
  miningRate = 1;

  // Сбросьте количество и состояние всех улучшений
  clickUpgrades.forEach((upgrade) => {
    upgrade.amount = 0;
    upgrade.auto = false;
  });

  mainUpgrades.forEach((upgrade) => {
    upgrade.purchased = false;
  });

  // Обновите интерфейс
  updateUI();
  renderUpgrades();
  updateClickUpgradesContainer();

  // Дополнительные действия, если необходимо
}

setInterval(autoSave, 30000);