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
        <p class="card-label">Produkty</p>
        <h3>0</h3>
        <p>Tu będą produkty do dodania na sklep i eBay.</p>
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

  Produkty: () => `
    <header class="topbar">
      <div>
        <p class="eyebrow">Magazyn pracy</p>
        <h2>Produkty do ogarnięcia</h2>
      </div>

      <div class="version">Presta / eBay</div>
    </header>

    <section class="dashboard">
      <article class="card card-priority">
        <p class="card-label">Produkty</p>
        <h3>Lista produktów do dodania</h3>
        <p>Tutaj później dodamy pola: nazwa, EAN, cena zakupu, status i notatka.</p>
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