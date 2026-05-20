const menuItems = document.querySelectorAll('.menu-item');
const mainContent = document.querySelector('.main');

let tasks = loadTasks();

const pages = {
  Dashboard: () => `
    <header class="topbar">
      <div>
        <p class="eyebrow">Dzisiaj</p>
        <h2>Centrum dowodzenia Piaskraft</h2>
      </div>

      <div class="version">v1.0</div>
    </header>

    <section class="dashboard">
      <article class="card card-priority">
        <p class="card-label">Priorytet dnia</p>
        <h3>Ogarnąć jeden konkretny krok</h3>
        <p>Bez chaosu. Jedno zadanie, potem następne.</p>
      </article>

      <article class="card">
        <p class="card-label">Zadania</p>
        <h3>${tasks.length}</h3>
        <p>Lista zadań działa w zakładce Zadania.</p>
      </article>

      <article class="card">
  <p class="card-label">eBay Builder</p>
  <h3>v1.0</h3>
  <p>Moduł do analizy produktów Piaskraft pod sprzedaż na eBay.de.</p>
</article>

      <article class="card">
        <p class="card-label">Szybkie linki</p>
        <h3>Presta / Base / eBay</h3>
        <p>Panel startowy do codziennej pracy.</p>
      </article>
    </section>
  `,

  Zadania: () => `
    <header class="topbar">
      <div>
        <p class="eyebrow">Lista pracy</p>
        <h2>Zadania</h2>
      </div>

      <div class="version">Moduł zadań</div>
    </header>

    <section class="dashboard">
      <article class="card card-priority">
        <p class="card-label">Dodaj zadanie</p>
        <h3>Co robimy?</h3>

        <form class="task-form">
          <input
            type="text"
            class="task-input"
            placeholder="Np. Dodać 3 produkty na eBay"
          />

         <select class="task-category">
  <option>Piaskraft</option>
  <option>eBay</option>
  <option>PrestaShop</option>
  <option>Marketing</option>
  <option>Katalog B2B</option>
  <option>Nauka</option>
  <option>Prywatne</option>
</select>

<select class="task-priority">
  <option>Dzisiaj</option>
  <option>Wysoki</option>
  <option>Średni</option>
  <option>Niski</option>
</select>

<button type="submit" class="task-button">Dodaj zadanie</button>
        </form>
      </article>

      <article class="card">
        <p class="card-label">Lista zadań</p>
        <h3>Dzisiejsze zadania</h3>

        <ul class="task-list">
          <li class="empty-info">Brak zadań. Dodaj pierwsze zadanie.</li>
        </ul>
      </article>
    </section>
  `,

'eBay Builder': () => `
  <header class="topbar">
    <div>
      <p class="eyebrow">Analiza eBay.de</p>
      <h2>eBay Builder</h2>
    </div>

    <div class="version">Piaskraft / eBay</div>
  </header>

  <section class="dashboard">
    <article class="card card-priority">
      <p class="card-label">Nowa analiza</p>
      <h3>Wklej link produktu z Piaskraft</h3>
      <p>W tym module później dodamy analizę ceny, wysyłki, prowizji eBay i konkurencji.</p>
    </article>

    <article class="card">
      <p class="card-label">Link produktu</p>
      <h3>Produkt Piaskraft</h3>
      <input
        type="text"
        class="task-input"
        placeholder="https://www.piaskraft.com/..."
      />
    </article>

   <article class="card">
  <p class="card-label">Koszty wysyłki</p>
  <h3>Tabela wagowa</h3>
  <p>0–1 kg: 5.20 €</p>
  <p>1–3 kg: 5.82 €</p>
  <p>3–5 kg: 6.03 €</p>
  <p>5–10 kg: 7.05 €</p>
  <p>10–20 kg: 7.56 €</p>
  <p>20–31.5 kg: 7.81 €</p>
</article>
<article class="card">
  <p class="card-label">Prowizje eBay</p>
  <h3>Stawki per kategoria</h3>
  <p>Narzędzia / Werkzeug: 11% testowo</p>
  <p>Motoryzacja / Auto: 10% testowo</p>
  <p>Akcesoria warsztatowe: 12% testowo</p>
  <p>Inna kategoria: 13% testowo</p>
  <p class="calculator-note">
    Uwaga: stawki prowizji eBay są testowe. Docelowo będą pobierane lub konfigurowane per kategoria.
  </p>
</article>
</article>
<article class="card ebay-calculator-card">
  <p class="card-label">Kalkulator ceny</p>
  <h3>Podstawowe dane</h3>

  <input
  type="number"
  class="task-input"
  id="ebay-purchase-price"
  placeholder="Cena zakupu netto €"
/>

 <input
  type="number"
  class="task-input"
  id="ebay-weight"
  placeholder="Waga produktu kg"
/>

<select class="task-input" id="ebay-category">
  <option value="tools">Narzędzia / Werkzeug</option>
  <option value="auto">Motoryzacja / Auto</option>
  <option value="workshop">Akcesoria warsztatowe</option>
  <option value="other">Inna kategoria</option>
</select>

 <input
  type="number"
  class="task-input"
  id="ebay-margin"
  placeholder="Marża %"
/>

<button type="button" class="task-button" id="calculate-shipping-button">
  Oblicz cenę eBay
</button>

<p id="purchase-result">Cena zakupu netto: —</p>
<p id="shipping-result">Koszt wysyłki: —</p>
<p id="base-result">Koszt bazowy: —</p>
<p id="margin-result">Marża: —</p>
<p id="fee-result">Prowizja eBay: —</p>
<p id="price-result">Sugerowana cena sprzedaży eBay: —</p>
<p class="calculator-note">Darmowa wysyłka: koszt wysyłki jest wliczony w cenę.</p>
</article>
  </section>
`,

  Marketing: () => `
    <header class="topbar">
      <div>
        <p class="eyebrow">Promocja</p>
        <h2>Marketing Piaskraft</h2>
      </div>

      <div class="version">Content / Ads</div>
    </header>

    <section class="dashboard">
      <article class="card card-priority">
        <p class="card-label">Marketing</p>
        <h3>Pomysły na rolki, reklamy i posty</h3>
        <p>Tu będzie miejsce na TikTok, Instagram, Facebook, Google Ads i eBay.</p>
      </article>
    </section>
  `,

  Linki: () => `
    <header class="topbar">
      <div>
        <p class="eyebrow">Szybki dostęp</p>
        <h2>Linki robocze</h2>
      </div>

      <div class="version">Narzędzia</div>
    </header>

    <section class="dashboard">
      <article class="card card-priority">
        <p class="card-label">Linki</p>
        <h3>PrestaShop, BaseLinker, eBay, GA4</h3>
        <p>W kolejnym etapie dodamy przyciski otwierające narzędzia.</p>
      </article>
    </section>
  `,

  Ustawienia: () => `
    <header class="topbar">
      <div>
        <p class="eyebrow">Konfiguracja</p>
        <h2>Ustawienia aplikacji</h2>
      </div>

      <div class="version">Setup</div>
    </header>

    <section class="dashboard">
      <article class="card card-priority">
        <p class="card-label">Ustawienia</p>
        <h3>Podstawowe ustawienia panelu</h3>
        <p>Później dodamy nazwę użytkownika, reset danych i ustawienia aplikacji.</p>
      </article>
    </section>
  `,
};

function renderPage(pageName) {
  const page = pages[pageName];

  if (!page) {
    mainContent.innerHTML = pages.Dashboard();
    return;
  }

  mainContent.innerHTML = page();

  if (pageName === 'Zadania') {
    setupTasksPage();
  }
  if (pageName === 'eBay Builder') {
  setupEbayBuilderPage();
}
}

function saveTasks() {
  localStorage.setItem('piaskraftTasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem('piaskraftTasks');

  if (!savedTasks) {
    return [];
  }

  try {
    return JSON.parse(savedTasks);
  } catch (error) {
    console.error('Błąd odczytu zadań z LocalStorage:', error);
    return [];
  }
}

function setupTasksPage() {
  const taskForm = document.querySelector('.task-form');
  const taskInput = document.querySelector('.task-input');
  const taskCategory = document.querySelector('.task-category');
  const taskList = document.querySelector('.task-list');
  const taskPriority = document.querySelector('.task-priority');

if (!taskForm || !taskInput || !taskCategory || !taskPriority || !taskList) {
  return;
}

  renderTasks(taskList);

  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === '') {
      return;
    }

    const newTask = {
  id: Date.now(),
  text: taskText,
  category: taskCategory.value,
  priority: taskPriority.value,
  done: false,
};

    tasks.push(newTask);
    saveTasks();

    taskInput.value = '';

    renderTasks(taskList);
  });
}

function renderTasks(taskList) {
  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="empty-info">Brak zadań. Dodaj pierwsze zadanie.</li>';
    return;
  }

  let html = '';

  tasks.forEach((task) => {
    html += `
      <li class="task-item ${task.done ? 'task-done' : ''}">
        <div>
          <strong>${escapeHtml(task.text)}</strong>
          <span>${escapeHtml(task.category)}</span>
<span class="task-priority-badge ${getPriorityClass(task.priority)}">
  ${escapeHtml(task.priority || 'Dzisiaj')}
</span>
        </div>

        <div class="task-actions">
          <button class="task-done-button" data-id="${task.id}">
            ${task.done ? 'Cofnij' : 'Zrobione'}
          </button>

          <button class="task-delete-button" data-id="${task.id}">
            Usuń
          </button>
        </div>
      </li>
    `;
  });

  taskList.innerHTML = html;

  const doneButtons = document.querySelectorAll('.task-done-button');
  const deleteButtons = document.querySelectorAll('.task-delete-button');

  doneButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const taskId = Number(button.dataset.id);
      const task = tasks.find((item) => item.id === taskId);

      if (!task) {
        return;
      }

      task.done = !task.done;
      saveTasks();
      renderTasks(taskList);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const taskId = Number(button.dataset.id);
      const taskIndex = tasks.findIndex((item) => item.id === taskId);

      if (taskIndex === -1) {
        return;
      }

      tasks.splice(taskIndex, 1);
      saveTasks();
      renderTasks(taskList);
    });
  });
}
function getPriorityClass(priority) {
  if (priority === 'Wysoki') {
    return 'priority-high';
  }

  if (priority === 'Średni') {
    return 'priority-medium';
  }

  if (priority === 'Niski') {
    return 'priority-low';
  }

  return 'priority-today';
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
function setupEbayBuilderPage() {
const purchasePriceInput = document.querySelector('#ebay-purchase-price');
const weightInput = document.querySelector('#ebay-weight');
const categoryInput = document.querySelector('#ebay-category');
const marginInput = document.querySelector('#ebay-margin');
const calculateButton = document.querySelector('#calculate-shipping-button');
const purchaseResult = document.querySelector('#purchase-result');
const shippingResult = document.querySelector('#shipping-result');
const baseResult = document.querySelector('#base-result');
const marginResult = document.querySelector('#margin-result');
const feeResult = document.querySelector('#fee-result');
const priceResult = document.querySelector('#price-result');

 if (!purchasePriceInput || !weightInput || !categoryInput || !marginInput || !calculateButton || !purchaseResult || !shippingResult || !baseResult || !marginResult || !feeResult || !priceResult) {
  return;
}

  calculateButton.addEventListener('click', () => {
 const purchasePrice = Number(purchasePriceInput.value.replace(',', '.'));
const weight = Number(weightInput.value.replace(',', '.'));
const category = categoryInput.value;
const margin = Number(marginInput.value.replace(',', '.'));

const shippingCost = getShippingCost(weight);
const ebayFeeRate = getEbayFeeRate(category);

  if (!shippingCost) {
    shippingResult.textContent = 'Koszt wysyłki: wpisz wagę od 0.01 do 31.5 kg';
    priceResult.textContent = `Sugerowana cena sprzedaży eBay: ${finalPrice.toFixed(2)} €`;
    return;
  }

  if (!purchasePrice || purchasePrice <= 0) {
    shippingResult.textContent = `Koszt wysyłki: ${shippingCost.toFixed(2)} €`;
    priceResult.textContent = 'Cena testowa bez prowizji eBay: wpisz cenę zakupu';
    return;
  }

  if (margin < 0) {
    priceResult.textContent = 'Cena testowa bez prowizji eBay: marża nie może być ujemna';
    return;
  }



const basePrice = purchasePrice + shippingCost;
const marginValue = basePrice * (margin / 100);
const priceBeforeEbayFee = basePrice + marginValue;
const finalPrice = priceBeforeEbayFee / (1 - ebayFeeRate / 100);

purchaseResult.textContent = `Cena zakupu netto: ${purchasePrice.toFixed(2)} €`;
shippingResult.textContent = `Koszt wysyłki: ${shippingCost.toFixed(2)} €`;
baseResult.textContent = `Koszt bazowy: ${basePrice.toFixed(2)} €`;
marginResult.textContent = `Marża ${margin}%: ${marginValue.toFixed(2)} €`;
feeResult.textContent = `Prowizja eBay: ${ebayFeeRate}%`;
priceResult.textContent = `Sugerowana cena sprzedaży eBay: ${finalPrice.toFixed(2)} €`;
});
}

function getEbayFeeRate(category) {
  const ebayFeeRates = {
    tools: 11,
    auto: 10,
    workshop: 12,
    other: 13,
  };

  return ebayFeeRates[category] || ebayFeeRates.other;
}

function getShippingCost(weight) {
  if (weight > 0 && weight <= 1) {
    return 5.20;
  }

  if (weight > 1 && weight <= 3) {
    return 5.82;
  }

  if (weight > 3 && weight <= 5) {
    return 6.03;
  }

  if (weight > 5 && weight <= 10) {
    return 7.05;
  }

  if (weight > 10 && weight <= 20) {
    return 7.56;
  }

  if (weight > 20 && weight <= 31.5) {
    return 7.81;
  }

  return null;
}

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    menuItems.forEach((button) => {
      button.classList.remove('active');
    });

    item.classList.add('active');

    const pageName = item.textContent.trim();
    renderPage(pageName);
  });
});

renderPage('Dashboard');

console.log('Piaskraft Control Center działa');