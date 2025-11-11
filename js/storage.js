// ===================================
// Storage.js - localStorage Management
// ===================================

const StorageManager = {
    STORAGE_KEY: 'excelAdventCalendar',

    // Default-Datenstruktur
    getDefaultData() {
        return {
            userName: '',
            startDate: new Date().toISOString(),
            settings: {
                dailyRelease: false,
                soundEffects: false
            },
            tasks: Array.from({ length: 24 }, (_, i) => ({
                day: i + 1,
                downloaded: false,
                solved: false,
                timeMinutes: null,
                stars: null,
                code: '',
                points: 0,
                solvedAt: null
            })),
            achievements: {
                firstBlood: false,
                speedRunner: false,
                problemSolver: false,
                detective: false,
                excelMaster: false,
                perfectionist: false
            },
            stats: {
                totalPoints: 0,
                totalTime: 0,
                solvedCount: 0,
                goldCount: 0,
                silverCount: 0,
                bronzeCount: 0
            }
        };
    },

    // Daten laden
    load() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                // Merge mit defaults für neue Felder
                return { ...this.getDefaultData(), ...parsed };
            }
        } catch (error) {
            console.error('Fehler beim Laden:', error);
        }
        return this.getDefaultData();
    },

    // Daten speichern
    save(data) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Fehler beim Speichern:', error);
            return false;
        }
    },

    // Daten zurücksetzen
    reset() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Fehler beim Reset:', error);
            return false;
        }
    },

    // Task aktualisieren
    updateTask(day, updates) {
        const data = this.load();
        const taskIndex = data.tasks.findIndex(t => t.day === day);

        if (taskIndex !== -1) {
            data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...updates };

            // Punkte berechnen
            if (updates.stars !== undefined) {
                data.tasks[taskIndex].points = updates.stars || 0;
            }

            // Stats aktualisieren
            this.updateStats(data);

            // Achievements prüfen
            this.checkAchievements(data);

            this.save(data);
        }

        return data;
    },

    // Stats neu berechnen
    updateStats(data) {
        data.stats.solvedCount = data.tasks.filter(t => t.solved).length;
        data.stats.totalPoints = data.tasks.reduce((sum, t) => sum + (t.points || 0), 0);
        data.stats.totalTime = data.tasks.reduce((sum, t) => sum + (t.timeMinutes || 0), 0);
        data.stats.goldCount = data.tasks.filter(t => t.stars === 3).length;
        data.stats.silverCount = data.tasks.filter(t => t.stars === 2).length;
        data.stats.bronzeCount = data.tasks.filter(t => t.stars === 1).length;
    },

    // Achievements prüfen
    checkAchievements(data) {
        const ach = data.achievements;

        // First Blood: Erste Aufgabe gelöst
        if (data.stats.solvedCount >= 1) {
            ach.firstBlood = true;
        }

        // Speed Runner: 5 Aufgaben unter 10 Min
        const fastSolves = data.tasks.filter(t => t.timeMinutes && t.timeMinutes < 10).length;
        if (fastSolves >= 5) {
            ach.speedRunner = true;
        }

        // Problem Solver: 10 Aufgaben gelöst
        if (data.stats.solvedCount >= 10) {
            ach.problemSolver = true;
        }

        // Excel Master: Alle 24 gelöst
        if (data.stats.solvedCount === 24) {
            ach.excelMaster = true;
        }

        // Perfectionist: Alle mit Gold
        if (data.stats.goldCount === 24) {
            ach.perfectionist = true;
        }
    },

    // Export als JSON
    exportData() {
        const data = this.load();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `excel-adventskalender-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    // Import von JSON
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            // Validierung
            if (data.tasks && Array.isArray(data.tasks)) {
                this.save(data);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Fehler beim Import:', error);
            return false;
        }
    },

    // Prüfen ob Tägliche Freischaltung aktiv
    isDayLocked(day) {
        const data = this.load();
        if (!data.settings.dailyRelease) {
            return false; // Alle Tage freigeschaltet
        }

        // Berechne welcher Tag heute ist (1. Dez = Tag 1)
        const now = new Date();
        const december = new Date(now.getFullYear(), 11, 1); // 11 = Dezember (0-indexed)

        if (now < december) {
            // Vor Dezember - alle gesperrt
            return true;
        }

        const dayOfMonth = now.getDate();
        return day > dayOfMonth; // Tag ist gesperrt wenn größer als aktuelles Datum
    }
};
