// ===================================
// App.js - Haupt-Anwendungs-Logik
// ===================================

// === GLOBALE VARIABLEN ===
let currentTab = 'home';

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Prüfe ob erste Nutzung
    const data = StorageManager.load();
    if (!data.userName) {
        showWelcomeModal();
    }

    // Initial render
    CalendarManager.render(document.getElementById('calendar-grid'));
    TrackerManager.render();
    updateProgressBar();
    renderAllTasks();

    // Event Listeners
    setupEventListeners();

    // FAQ Accordions
    setupFAQ();
}

// === EVENT LISTENERS ===
function setupEventListeners() {
    // Tab-Navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Daily Release Toggle
    const toggleEl = document.getElementById('daily-release-toggle');
    const data = StorageManager.load();
    toggleEl.checked = data.settings.dailyRelease;

    toggleEl.addEventListener('change', (e) => {
        data.settings.dailyRelease = e.target.checked;
        StorageManager.save(data);
        CalendarManager.render(document.getElementById('calendar-grid'));
    });

    // Username
    document.getElementById('user-name').addEventListener('change', (e) => {
        const data = StorageManager.load();
        data.userName = e.target.value;
        StorageManager.save(data);
    });

    // Solution Form
    document.getElementById('solution-form').addEventListener('submit', handleSolutionSubmit);

    // Star Buttons
    document.querySelectorAll('.star-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.star-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('stars-input').value = this.dataset.stars;
        });
    });

    // Export/Import/Reset
    document.getElementById('export-btn').addEventListener('click', () => {
        StorageManager.exportData();
        showNotification('Export erfolgreich!', 'success');
    });

    document.getElementById('import-btn').addEventListener('click', () => {
        document.getElementById('import-file').click();
    });

    document.getElementById('import-file').addEventListener('change', handleImport);

    document.getElementById('reset-btn').addEventListener('click', handleReset);

    // Download All (ZIP)
    document.getElementById('download-all-btn').addEventListener('click', downloadAllAsZip);

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterTasks(this.dataset.filter);
        });
    });

    // Welcome Modal Start Button
    document.getElementById('welcome-start-btn').addEventListener('click', handleWelcomeStart);
}

// === TAB-SWITCHING ===
function switchTab(tabName) {
    // Tabs updaten
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Content updaten
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');

    currentTab = tabName;

    // Tracker neu rendern wenn gewechselt
    if (tabName === 'progress') {
        TrackerManager.render();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === PROGRESS BAR ===
function updateProgressBar() {
    const data = StorageManager.load();
    const progress = (data.stats.solvedCount / 24) * 100;

    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${data.stats.solvedCount}/24`;

    // Stats in Home
    document.getElementById('total-points').textContent = data.stats.totalPoints;
    document.getElementById('gold-count').textContent = data.stats.goldCount;
    document.getElementById('silver-count').textContent = data.stats.silverCount;
    document.getElementById('bronze-count').textContent = data.stats.bronzeCount;
}

// === LÖSUNG SPEICHERN ===
function handleSolutionSubmit(e) {
    e.preventDefault();

    const day = parseInt(document.getElementById('task-select').value);
    const time = document.getElementById('time-input').value;
    const stars = document.getElementById('stars-input').value;
    const code = document.getElementById('code-input').value.trim();

    if (!day) {
        alert('Bitte wähle einen Tag aus!');
        return;
    }

    if (!stars) {
        alert('Bitte wähle eine Stern-Bewertung!');
        return;
    }

    if (!code) {
        alert('Bitte gib den Lösungscode ein!');
        return;
    }

    // Lösungscode validieren
    const task = CalendarManager.tasks.find(t => t.day === day);
    if (task && task.solution) {
        if (code.toUpperCase() !== task.solution.toUpperCase()) {
            alert(`Der Lösungscode ist nicht korrekt! Bitte überprüfe deine Lösung und versuche es erneut.`);
            return;
        }
    }

    TrackerManager.saveSolution(day, time, stars, code);

    // Form reset
    e.target.reset();
    document.querySelectorAll('.star-btn').forEach(b => b.classList.remove('active'));
}

// === IMPORT/EXPORT ===
function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const success = StorageManager.importData(event.target.result);
        if (success) {
            showNotification('Import erfolgreich!', 'success');
            location.reload();
        } else {
            alert('Fehler beim Import! Bitte prüfe die Datei.');
        }
    };
    reader.readAsText(file);
}

function handleReset() {
    if (confirm('Möchtest du wirklich alle Daten zurücksetzen? Dies kann nicht rückgängig gemacht werden!')) {
        if (confirm('Bist du sicher? Exportiere vorher deinen Fortschritt!')) {
            StorageManager.reset();
            showNotification('Alle Daten wurden gelöscht!', 'success');
            setTimeout(() => location.reload(), 1000);
        }
    }
}

// === ALLE AUFGABEN ANZEIGEN ===
function renderAllTasks() {
    const data = StorageManager.load();
    const container = document.getElementById('tasks-grid');
    container.innerHTML = '';

    CalendarManager.tasks.forEach(task => {
        const taskData = data.tasks.find(t => t.day === task.day);

        const card = document.createElement('div');
        card.className = `task-card ${taskData.solved ? 'solved' : ''}`;
        card.dataset.day = task.day;
        card.dataset.status = taskData.solved ? 'solved' : 'open';

        // Status
        let status = 'Verfügbar';
        let stars = taskData.stars ? ' ★'.repeat(taskData.stars) : '';
        if (taskData.solved) status = `Gelöst (${taskData.timeMinutes || '--'} Min${stars})`;
        else if (taskData.downloaded) status = 'Heruntergeladen';

        card.innerHTML = `
            <div class="task-info">
                <div class="task-title">Tag ${task.day}: ${task.title}</div>
                <div class="task-meta">
                    <span>Schwierigkeit: ${CalendarManager.getDifficultyStars(task.difficulty)}</span>
                    <span>~${task.time} Min</span>
                    <span>${status}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="excel-button" onclick="downloadTask(${task.day})">Download</button>
            </div>
        `;

        container.appendChild(card);
    });
}

function downloadTask(day) {
    CalendarManager.handleDownload(day);
}

// === TASK FILTER ===
function filterTasks(filter) {
    const cards = document.querySelectorAll('.task-card');

    cards.forEach(card => {
        const status = card.dataset.status;

        if (filter === 'all') {
            card.style.display = '';
        } else if (filter === 'solved' && status === 'solved') {
            card.style.display = '';
        } else if (filter === 'open' && status !== 'solved') {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// === DOWNLOAD ALL (ZIP) ===
function downloadAllAsZip() {
    alert('Die ZIP-Download-Funktion benötigt eine Bibliothek wie JSZip. Alternativ kannst du jede Aufgabe einzeln herunterladen oder alle Excel-Dateien als ZIP-Paket bereitstellen.');
}

// === MODALS ===
function showDownloadModal(day, title) {
    const modal = document.getElementById('download-modal');
    document.getElementById('modal-title').textContent = `Tag ${day} heruntergeladen!`;
    document.getElementById('modal-text').textContent = `"${title}" - Viel Erfolg beim Lösen!`;
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('download-modal').classList.remove('show');
}

function showWelcomeModal() {
    document.getElementById('welcome-modal').classList.add('show');
}

function closeWelcomeModal(skip = false) {
    document.getElementById('welcome-modal').classList.remove('show');

    if (!skip) {
        const name = document.getElementById('welcome-name').value;
        if (name) {
            const data = StorageManager.load();
            data.userName = name;
            StorageManager.save(data);
            document.getElementById('user-name').value = name;
        }
    }
}

function handleWelcomeStart() {
    closeWelcomeModal(false);
}

// === FAQ ACCORDION ===
function setupFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            const wasOpen = item.classList.contains('open');

            // Alle schließen
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

            // Dieses öffnen/schließen
            if (!wasOpen) {
                item.classList.add('open');
            }
        });
    });
}

// === UTILITIES ===
// Modal-Schließen bei Klick außerhalb
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});

// Tastatur-Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('show'));
    }
});
