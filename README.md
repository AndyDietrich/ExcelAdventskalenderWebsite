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

## 🚀 Quick Start

### 1. Assets vorbereiten

**Bilder kopieren:**
```bash
# Kopiere background.png und present.png nach assets/images/
cp background.png assets/images/
cp present.png assets/images/
```

**Excel-Dateien kopieren:**
```bash
# Kopiere alle 24 Excel-Aufgaben nach assets/excel-files/
cp ../Aufgaben/*.xlsx assets/excel-files/
```

### 2. Lokal testen

Öffne `index.html` in einem Browser:
- **Option A:** Doppelklick auf `index.html`
- **Option B:** Live-Server (VS Code Extension)
- **Option C:** Python HTTP Server:
  ```bash
  python -m http.server 8000
  # Öffne: http://localhost:8000
  ```

### 3. Auf GitHub Pages deployen

**Schritt-für-Schritt:**

1. **GitHub Repository erstellen:**
   - Gehe zu https://github.com/new
   - Name: `excel-adventskalender` (oder beliebig)
   - Public oder Private (Public für GitHub Pages gratis)
   - Erstellen

2. **Code hochladen:**
   ```bash
   # Im Website-Ordner
   git init
   git add .
   git commit -m "Initial commit: Excel Adventskalender Website"
   git branch -M main
   git remote add origin https://github.com/DEIN-USERNAME/excel-adventskalender.git
   git push -u origin main
   ```

3. **GitHub Pages aktivieren:**
   - Gehe zu Repository → Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` → Ordner: `/ (root)`
   - Save

4. **Warten (~1-2 Minuten)**
   - Deine Website ist dann verfügbar unter:
     `https://DEIN-USERNAME.github.io/excel-adventskalender/`

## ⚙️ Features

### ✅ Implementiert:

- **24 Geschenk-Buttons** mit visuellen Status (verfügbar/heruntergeladen/gelöst)
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

## 🔧 Anpassungen

### Texte ändern:

Alle Texte sind direkt in `index.html` editierbar.

### Styling anpassen:

Farben und Styles in `css/style.css`:
```css
:root {
    --excel-green: #217346;      /* Hauptfarbe */
    --christmas-red: #C00000;    /* Akzentfarbe */
    --christmas-gold: #FFD700;   /* Highlight */
}
```

### Aufgaben-Metadaten:

In `js/calendar.js` → `CalendarManager.tasks`:
```javascript
{
    day: 1,
    title: "Dein Titel",
    difficulty: 2,    // 1-5
    time: 15          // Minuten
}
```

## 🐛 Troubleshooting

### Problem: Excel-Dateien werden nicht gefunden

**Lösung:**
```bash
# Prüfe ob Dateien korrekt benannt sind:
ls assets/excel-files/

# Format: Tag01_*.xlsx bis Tag24_*.xlsx
# Beispiel: Tag01_Mitarbeiterverzeichnis.xlsx
```

### Problem: Bilder werden nicht angezeigt

**Lösung:**
1. Prüfe ob `background.png` und `present.png` in `assets/images/` sind
2. Bildformat: PNG empfohlen
3. Bei Fehlen: Browser zeigt Fallback

### Problem: localStorage funktioniert nicht

**Ursache:** Private/Inkognito-Modus oder localStorage blockiert

**Lösung:**
- Normale Browser-Session verwenden
- Browser-Einstellungen: Cookies/localStorage erlauben

### Problem: Download funktioniert nicht lokal

**Ursache:** `file://` Protokoll hat Einschränkungen

**Lösung:**
- Nutze einen lokalen Webserver (siehe Quick Start #2)
- Oder deploye auf GitHub Pages

## 📊 Analytics (Optional)

Um Nutzung zu tracken, füge Google Analytics hinzu:

```html
<!-- In index.html vor </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚀 Performance-Optimierung

### Bilder komprimieren:

```bash
# Mit ImageMagick
convert background.png -quality 85 -resize 1920x1080 background_optimized.png
convert present.png -quality 85 -resize 512x512 present_optimized.png
```

### Excel-Dateien komprimieren:

Erstelle ein ZIP-Archiv für "Alle herunterladen":
```bash
cd assets/excel-files
zip -r alle-aufgaben.zip *.xlsx
```

## 📞 Support

Bei Problemen:
1. Browser-Konsole prüfen (F12)
2. localStorage löschen und neu starten
3. Issue auf GitHub erstellen

## 📝 Lizenz

Für nicht-kommerzielle Nutzung frei verwendbar.

## 🎄 Credits

- **Design:** Excel-inspiriert mit weihnachtlichen Akzenten
- **Framework:** Vanilla JavaScript (kein Framework-Overhead)
- **Icons:** Unicode Emojis (keine externe Abhängigkeit)
- **Hosting:** GitHub Pages (kostenlos)

---

**Viel Erfolg mit deinem Excel-Adventskalender! 🎅**
