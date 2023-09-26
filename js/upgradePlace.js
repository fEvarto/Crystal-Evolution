const upgradeEffects = {
    miningRate: () => {
      let totalEffect = 1;
      if (mainUpgrades.find(upgrade => upgrade.id === 11).purchased) {
        totalEffect += mainUpgrades.find(upgrade => upgrade.id === 11).effect();
      }
      if (clickUpgrades.find(upgrade => upgrade.id === 1).amount > 0) {
        totalEffect += clickUpgrades.find(upgrade => upgrade.id === 1).effect(clickUpgrades.find(upgrade => upgrade.id === 1).amount);
      }
      if (clickUpgrades.find(upgrade => upgrade.id === 4).amount > 0) {
        totalEffect = Math.pow(totalEffect, clickUpgrades.find(upgrade => upgrade.id === 4).effect(clickUpgrades.find(upgrade => upgrade.id === 4).amount));
      }
      return totalEffect;
    },
    gemsGain: () => {
      let threshold = 50000;
      if (mainUpgrades.find(upgrade => upgrade.id === 34).purchased) {
        threshold *= 0.8;
      }
      let totalEffect = Math.max(Math.log10(crystalCount / threshold), 1);
      if (mainUpgrades.find(upgrade => upgrade.id === 34).purchased) {
        totalEffect *= mainUpgrades.find(upgrade => upgrade.id === 34).effect();
      }
      if (mainUpgrades.find(upgrade => upgrade.id === 115).purchased) {
        totalEffect *= mainUpgrades.find(upgrade => upgrade.id === 115).effect();
      }

      return totalEffect;
    },
    dustGain: () => {
      let totalEffect
      if(mainUpgrades.find(upgrade => upgrade.id === 33).purchased) {
        totalEffect = Math.round(Math.random() * 6) + 4;
      } else {totalEffect = Math.floor(Math.random() * 6) + 4;}
      
      if (mainUpgrades.find(upgrade => upgrade.id === 32).purchased) {
        totalEffect *= mainUpgrades.find(upgrade => upgrade.id === 32).effect();
      }
      return totalEffect;
    }
  };