const upgradeEffects = {
    miningRate: () => {
      let totalEffect = 1;
      if (mainUpgrades.find(upgrade => upgrade.id === 11).purchased) {
        totalEffect += mainUpgrades.find(upgrade => upgrade.id === 11).effect();
      }
      if (clickUpgrades.find(upgrade => upgrade.id === 1).amount > 0) {
        totalEffect += clickUpgrades.find(upgrade => upgrade.id === 1).effect(clickUpgrades.find(upgrade => upgrade.id === 1).amount);
      }
      return totalEffect;
    },
    
  };