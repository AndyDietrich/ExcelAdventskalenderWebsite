// ===================================
// Calendar.js - Kalender-Grid Logik
// ===================================

const CalendarManager = {
    // Aufgaben-Metadaten mit Lösungscodes
    tasks: [
        { day: 1, title: "Das verschlüsselte Mitarbeiterverzeichnis", difficulty: 2, time: 15, solution: "S" },
        { day: 2, title: "Die Passwort-Matrix", difficulty: 2, time: 15, solution: "A" },
        { day: 3, title: "Die Zeitstempel-Analyse", difficulty: 2, time: 20, solution: "N" },
        { day: 4, title: "Die verschlüsselte Geschenkliste", difficulty: 2, time: 20, solution: "T" },
        { day: 5, title: "Das Produktions-Dashboard", difficulty: 2, time: 20, solution: "A" },
        { day: 6, title: "Der Lieferanten-Algorithmus", difficulty: 2, time: 20, solution: "C" },
        { day: 7, title: "Die zerbrochene Pivot-Struktur", difficulty: 3, time: 25, solution: "L" },
        { day: 8, title: "Das Makro-Rätsel", difficulty: 3, time: 25, solution: "A" },
        { day: 9, title: "Die Geo-Koordinaten", difficulty: 2, time: 20, solution: "U" },
        { day: 10, title: "Der Regex-Extraktor", difficulty: 3, time: 25, solution: "S" },
        { day: 11, title: "Die Wahrscheinlichkeits-Engine", difficulty: 3, time: 25, solution: "I" },
        { day: 12, title: "Das Power Query Labyrinth", difficulty: 3, time: 30, solution: "S" },
        { day: 13, title: "Der Neuronale Netzwerk-Simulator", difficulty: 4, time: 30, solution: "C" },
        { day: 14, title: "Die Blockchain-Geschenkliste", difficulty: 3, time: 25, solution: "O" },
        { day: 15, title: "Das Echtzeit-Dashboard", difficulty: 3, time: 25, solution: "M" },
        { day: 16, title: "Der Rekursions-Rechner", difficulty: 4, time: 30, solution: "I" },
        { day: 17, title: "Die Sentiment-Analyse", difficulty: 3, time: 25, solution: "N" },
        { day: 18, title: "Das Lagerverwaltungs-System", difficulty: 3, time: 25, solution: "G" },
        { day: 19, title: "Der Quanten-Zufallsgenerator", difficulty: 4, time: 30, solution: "T" },
        { day: 20, title: "Die Fraktal-Fabrik", difficulty: 4, time: 30, solution: "O" },
        { day: 21, title: "Der API-Konnektor", difficulty: 3, time: 25, solution: "T" },
        { day: 22, title: "Die Zeitreise-Tabelle", difficulty: 3, time: 30, solution: "O" },
        { day: 23, title: "Der Meta-Solver", difficulty: 4, time: 35, solution: "W" },
        { day: 24, title: "FINALE - Der GRINCH-Virus Boss-Fight", difficulty: 5, time: 40, solution: "N" }
    ],

    // Kalender-Grid rendern
    render(container) {
        const data = StorageManager.load();
        container.innerHTML = '';

        this.tasks.forEach(task => {
            const taskData = data.tasks.find(t => t.day === task.day);
            const isLocked = StorageManager.isDayLocked(task.day);

            const button = document.createElement('div');
            button.className = 'gift-button';
            button.dataset.day = task.day;

            // Status-Klassen
            if (isLocked) {
                button.classList.add('locked');
            } else if (taskData.solved) {
                button.classList.add('solved');
            } else if (taskData.downloaded) {
                button.classList.add('downloaded');
            } else {
                button.classList.add('available');
            }

            // Geschenk-Bild
            const img = document.createElement('img');
            img.src = 'assets/images/present.png';
            img.alt = `Tag ${task.day}`;
            img.className = 'gift-image';
            img.onerror = () => {
                // Fallback wenn Bild nicht gefunden
                img.style.display = 'none';
            };

            // Tag-Nummer
            const dayNum = document.createElement('div');
            dayNum.className = 'day-number';
            dayNum.textContent = task.day;

            button.appendChild(img);
            button.appendChild(dayNum);

            // Status-Badge
            if (taskData.downloaded && !isLocked) {
                const badge = document.createElement('div');
                badge.className = 'status-badge';
                badge.textContent = taskData.solved ? '✅' : '📥';
                button.appendChild(badge);
            }

            // Stern-Badge
            if (taskData.solved && taskData.stars) {
                const starBadge = document.createElement('div');
                starBadge.className = 'star-badge';
                starBadge.textContent = '⭐'.repeat(taskData.stars);
                button.appendChild(starBadge);
            }

            // Click-Handler
            if (!isLocked) {
                button.onclick = () => this.handleDownload(task.day);
                button.title = `Tag ${task.day}: ${task.title}`;
            } else {
                button.title = '🔒 Noch nicht freigeschaltet';
            }

            container.appendChild(button);
        });
    },

    // Download-Handler
    handleDownload(day) {
        const task = this.tasks.find(t => t.day === day);
        if (!task) return;

        // Download-Link generieren
        const filename = `Tag${String(day).padStart(2, '0')}_${this.getFilename(day)}`;
        const link = document.createElement('a');
        link.href = `assets/excel-files/${filename}`;
        link.download = filename;
        link.click();

        // Als heruntergeladen markieren
        StorageManager.updateTask(day, {
            downloaded: true
        });

        // Modal anzeigen
        showDownloadModal(day, task.title);

        // UI aktualisieren
        this.render(document.getElementById('calendar-grid'));
        updateProgressBar();
    },

    // Dateiname für Tag ermitteln
    getFilename(day) {
        const filenames = [
            'Mitarbeiterverzeichnis.xlsx',
            'Passwort_Matrix.xlsx',
            'Zeitstempel_Analyse.xlsx',
            'Geschenkliste.xlsx',
            'Produktions_Dashboard.xlsx',
            'Lieferanten_Algorithmus.xlsx',
            'Pivot_Struktur.xlsx',
            'VBA_Makro.xlsx',
            'Geo_Koordinaten.xlsx',
            'Regex_Extraktor.xlsx',
            'Wahrscheinlichkeit.xlsx',
            'Power_Query.xlsx',
            'Neural_Network.xlsx',
            'Blockchain.xlsx',
            'Dashboard.xlsx',
            'Rekursion.xlsx',
            'Sentiment.xlsx',
            'Lagerverwaltung.xlsx',
            'Quantum_RNG.xlsx',
            'Fraktal_Fabrik.xlsx',
            'API_Konnektor.xlsx',
            'Zeitreise_Tabelle.xlsx',
            'Meta_Solver.xlsx',
            'FINALE.xlsx'
        ];
        return filenames[day - 1] || 'Aufgabe.xlsx';
    },

    // Difficulty als Sterne
    getDifficultyStars(difficulty) {
        return '★'.repeat(difficulty);
    }
};
