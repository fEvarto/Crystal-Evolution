const patronsButton = document.getElementById("supporters");
const patronsPopup = document.getElementById("patronsPopup");
const closePopup = document.getElementById("closePopup");
function fetchPatrons() {
  fetch('https://my-nodejs-server-fa4f804a2ced.herokuapp.com/webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json', // Указываем, что ожидаем JSON-ответ
    },
    // Другие параметры запроса, если необходимо
  })
  .then(response => response.json()) // Обрабатываем JSON-ответ
  .then(data => {
    displayPatrons(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
  
  // Функция для отображения данных о патронах в интерфейсе
  function displayPatrons(patronsData) {
    const patronsList = document.getElementById('patronsList'); // Замените на актуальный ID элемента, где будет отображаться список
    const progress = document.getElementById('fileBar');
    const progressPerc = document.getElementById('boostPerc')
    // Очищаем список патронов перед обновлением
    patronsList.innerHTML = '';
    console.log(patronsData);
    const patrons = patronsData.patrons;
    const totalPledgeAmount = patronsData.totalPledgeAmount;

if (Object.keys(patrons).length > 0) {
  for (const key in patrons) {
    const patron = patrons[key];
    const patronElement = document.createElement('div');
    //patronElement.innerHTML = `<img src="${patron.patronAvatar}"></img>${patron.patronName} (${patron.patronLevel})`;
    patronElement.innerHTML = `${patron.patronName} (${patron.patronLevel})`;
    progress.value = totalPledgeAmount;
    progressPerc.innerHTML = ` ${((totalPledgeAmount / 500) * 100).toFixed(2)}%`;
    patronsList.appendChild(patronElement);
  }
} else {
  // Если нет данных о патронах, вы можете вывести сообщение об этом
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `No patrons yet`;
  progress.value = 0;
  progressPerc.innerHTML = `<strong> 0.00%</strong>`;
  patronsList.appendChild(messageElement);
}
  }
  patronsButton.addEventListener("click", () => {
    patronsPopup.style.display = "block"; // Открываем окно
  });
  
  closePopup.addEventListener("click", () => {
    patronsPopup.style.display = "none"; // Закрываем окно
  });
  // Вызываем функцию для получения данных о патронах
  fetchPatrons();
  setInterval(fetchPatrons, 30000);