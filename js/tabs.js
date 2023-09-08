const homeTab = document.getElementById("homeTab");
const upgradesTab = document.getElementById("upgradesTab");
const settingsTab = document.getElementById("settingsTab");
const homeContent = document.getElementById("homeContent");
const upgradesContent = document.getElementById("upgradesContent");
const settingsContent = document.getElementById("settingsContent");

showTab("home");

homeTab.addEventListener("click", () => {
  showTab("home");
});

upgradesTab.addEventListener("click", () => {
  showTab("upgrades");
});

settingsTab.addEventListener("click", () => {
  showTab("settings");
});

function showTab(tabName) {
  const tabs = [homeTab, upgradesTab, settingsTab];
  tabs.forEach(tab => tab.classList.remove("active"));
  
  const tabContents = [homeContent, upgradesContent, settingsContent];
  tabContents.forEach(content => content.style.display = "none");

  const selectedTab = document.getElementById(`${tabName}Tab`);
  const selectedContent = document.getElementById(`${tabName}Content`);
  selectedTab.classList.add("active");
  selectedContent.style.display = "block";
}