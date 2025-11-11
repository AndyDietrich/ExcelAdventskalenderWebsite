# 🎄 Excel Adventskalender - Website

Eine interaktive Web-Anwendung für den Excel-Adventskalender mit Download-Funktion und Online-Fortschritts-Tracking.

## 📁 Projekt-Struktur

```
Website/
├── index.html              # Haupt-HTML-Datei
├── css/
│   └── style.css           # Excel-orientiertes Styling
├── js/
│   ├── storage.js          # localStorage Management
│   ├── calendar.js         # Kalender-Grid Logik
│   ├── tracker.js          # Fortschritts-Tracking
│   └── app.js              # Haupt-Anwendungs-Logik
├── assets/
│   ├── images/
│   │   ├── background.png  # Hintergrund-Bild
│   │   └── present.png     # Geschenk-Icon
│   └── excel-files/        # Alle 24 Excel-Aufgaben
│       ├── Tag01_Mitarbeiterverzeichnis.xlsx
│       ├── Tag02_Passwort_Matrix.xlsx
│       └── ... (bis Tag24_FINALE.xlsx)
└── README.md               # Diese Datei
```

## ⚙️ Features

### ✅ Implementiert:

- **24 Türchen** mit visuellen Status (verfügbar/heruntergeladen/gelöst)
- **Tägliche Freischaltung** (optional, Toggle)
- **Download-Funktion** für Excel-Aufgaben
- **Online-Tracking** (localStorage):
  - Zeit-Eingabe
  - Stern-Bewertung (Gold/Silber/Bronze)
  - Lösungscode
  - Automatische Punkte-Berechnung
- **6 Achievements** mit automatischer Freischaltung
- **Fortschrittsbalken** und Statistiken
- **5 Tabs:**
  - Kalender (Hauptseite)
  - Fortschritt (Tracker)
  - Alle Aufgaben (Übersicht)
  - Info & Anleitung
  - FAQ (Accordion)
- **Export/Import** (JSON-Backup)
- **Responsive Design** (Desktop/Tablet/Mobile)
- **Excel-Style** mit weihnachtlichen Akzenten

### 🔒 Kein Backend benötigt:

- Alle Daten werden im Browser gespeichert (localStorage)
- Keine Server-Kosten
- Datenschutzfreundlich (keine Server-Kommunikation)
- Offline-fähig (nach erstem Laden)

## 🎨 Design

**Excel-orientiert:**
- Grünes Farbschema (Excel-Grün: `#217346`)
- Klare Grid-Layouts
- Tabellarische Darstellung
- "Excel-Cards" als Basis-Component
- Professionelle Button-Styles

**Weihnachtliche Akzente:**
- Rot & Gold für Highlights
- Geschenk-Icons
- Festliche Emojis
- Background.png als Hintergrund

## 📱 Browser-Support

Getestet in:
- ✅ Chrome 120+
- ✅ Firefox 120+
- ✅ Safari 17+
- ✅ Edge 120+

**Benötigt:**
- localStorage Support
- ES6+ JavaScript
- CSS Grid & Flexbox

---

**Viel Erfolg mit deinem Excel-Adventskalender! 🎅**
