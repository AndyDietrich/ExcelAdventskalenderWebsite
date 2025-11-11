// ===================================
// Tracker.js - Fortschritts-Tracking
// ===================================

const TrackerManager = {
    achievements: [
        { id: 'firstBlood', icon: '', name: 'First Blood', desc: 'Erste Aufgabe gelöst' },
        { id: 'speedRunner', icon: '', name: 'Speed Runner', desc: '5 Aufgaben unter 10 Min' },
        { id: 'problemSolver', icon: '', name: 'Problem Solver', desc: '10 Aufgaben gelöst' },
        { id: 'detective', icon: '', name: 'Detective', desc: 'Alle Easter Eggs gefunden' },
        { id: 'excelMaster', icon: '', name: 'Excel Master', desc: 'Alle 24 Aufgaben gemeistert' },
        { id: 'perfectionist', icon: '', name: 'Perfectionist', desc: 'Alle mit Gold-Stern' }
    ],

    // Tracker-Tab rendern
    render() {
        const data = StorageManager.load();

        // Username
        document.getElementById('user-name').value = data.userName || '';

        // Stats
        document.getElementById('solved-count').textContent = `${data.stats.solvedCount} / 24`;
        document.getElementById('total-points-detail').textContent = `${data.stats.totalPoints} / 72`;
        document.getElementById('total-time').textContent = `${data.stats.totalTime} Min`;

        const avgTime = data.stats.solvedCount > 0
            ? Math.round(data.stats.totalTime / data.stats.solvedCount)
            : 0;
        document.getElementById('avg-time').textContent = avgTime > 0 ? `${avgTime} Min` : '-- Min';

        // Achievements
        this.renderAchievements(data);

        // Tabelle
        this.renderTable(data);

        // Task-Select
        this.populateTaskSelect();
    },

    // Achievements rendern
    renderAchievements(data) {
        const container = document.getElementById('achievements-grid');
        container.innerHTML = '';

        this.achievements.forEach(ach => {
            const isUnlocked = data.achievements[ach.id];

            const div = document.createElement('div');
            div.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;

            div.innerHTML = `
                <div class="achievement-icon">${ach.icon}</div>
                <div class="achievement-name">${ach.name}</div>
                <div class="achievement-desc">${ach.desc}</div>
            `;

            container.appendChild(div);
        });
    },

    // Tabelle rendern
    renderTable(data) {
        const tbody = document.getElementById('progress-table-body');
        tbody.innerHTML = '';

        data.tasks.forEach(task => {
            const taskMeta = CalendarManager.tasks.find(t => t.day === task.day);

            const tr = document.createElement('tr');

            // Status
            let status = 'Offen';
            if (task.solved) status = 'Gelöst';
            else if (task.downloaded) status = 'Heruntergeladen';

            // Sterne
            let stars = '';
            if (task.stars === 3) stars = '★★★';
            else if (task.stars === 2) stars = '★★';
            else if (task.stars === 1) stars = '★';

            tr.innerHTML = `
                <td>${task.day}</td>
                <td>${taskMeta ? taskMeta.title : 'Tag ' + task.day}</td>
                <td>${status}</td>
                <td>${task.timeMinutes || '--'}</td>
                <td>${stars}</td>
                <td>${task.code || '--'}</td>
                <td><strong>${task.points || 0}</strong></td>
            `;

            tbody.appendChild(tr);
        });
    },

    // Task-Select füllen
    populateTaskSelect() {
        const select = document.getElementById('task-select');
        select.innerHTML = '<option value="">Tag auswählen...</option>';

        CalendarManager.tasks.forEach(task => {
            const option = document.createElement('option');
            option.value = task.day;
            option.textContent = `Tag ${task.day}: ${task.title}`;
            select.appendChild(option);
        });
    },

    // Lösung speichern
    saveSolution(day, timeMinutes, stars, code) {
        const updates = {
            solved: true,
            timeMinutes: parseInt(timeMinutes) || 0,
            stars: parseInt(stars) || 0,
            code: code || '',
            solvedAt: new Date().toISOString()
        };

        StorageManager.updateTask(day, updates);

        // UI aktualisieren
        this.render();
        CalendarManager.render(document.getElementById('calendar-grid'));
        updateProgressBar();
        renderAllTasks();

        // Success-Nachricht
        showNotification('Lösung gespeichert!', 'success');

        // Achievement-Check
        this.checkForNewAchievements();
    },

    // Neue Achievements prüfen
    checkForNewAchievements() {
        const data = StorageManager.load();
        const newAchievements = [];

        this.achievements.forEach(ach => {
            if (data.achievements[ach.id] && !data.achievements[ach.id + '_shown']) {
                newAchievements.push(ach);
                data.achievements[ach.id + '_shown'] = true;
            }
        });

        if (newAchievements.length > 0) {
            StorageManager.save(data);
            newAchievements.forEach(ach => {
                showNotification(`Achievement freigeschaltet: ${ach.name}!`, 'success');
            });
        }
    }
};

// Hilfsfunktion: Notification anzeigen
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#00B050' : '#4472C4'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
