const content = document.getElementById('content');
let previousTabClass = null;

const homeTab = document.getElementById("homeTab");
const upgradesTab = document.getElementById("upgradesTab");
const prestigeTab = document.getElementById("prestigeTab");
const settingsTab = document.getElementById("settingsTab");
const homeContent = document.getElementById("homeContent");
const upgradesContent = document.getElementById("upgradesContent");
const prestigeContent = document.getElementById("prestigeContent");
const settingsContent = document.getElementById("settingsContent");

showTab("home");

homeTab.addEventListener("click", () => {
  showTab("home");
});

upgradesTab.addEventListener("click", () => {
  showTab("upgrades");
});

prestigeTab.addEventListener("click", () => {
  showTab("prestige");
});

settingsTab.addEventListener("click", () => {
  showTab("settings");
});

function showTab(tabName) {
  const tabs = [homeTab, upgradesTab, prestigeTab, settingsTab];
  tabs.forEach(tab => tab.classList.remove("active"));
  
  const tabContents = [homeContent, upgradesContent, prestigeContent, settingsContent];
  tabContents.forEach(content => content.style.display = "none");

  const selectedTab = document.getElementById(`${tabName}Tab`);
  const selectedContent = document.getElementById(`${tabName}Content`);
  selectedTab.classList.add("active");
  content.classList.remove(previousTabClass);
  content.classList.add(`${tabName}Tab`);

  previousTabClass = `${tabName}Tab`;
  
  selectedContent.style.display = "block";
}
//FUNCS
function toScientificNotation(number) {
  if (number instanceof Decimal || typeof number === 'number') {
    if (number >= 1e9) {
      return number.toExponential(2).replace('e+', 'e');
    } else {
      return number.toFixed(0);
    }
  }
  return number;
}
/*function signalToRefresh(){

}*/