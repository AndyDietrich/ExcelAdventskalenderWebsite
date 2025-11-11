# Assets Setup - Anleitung

## Schritt 1: Bilder vorbereiten

### Benötigte Bilder:

1. **background.png** - Hintergrund für die Website
2. **present.png** - Geschenk-Icon für die 24 Buttons

### Kopier-Anleitung:

```bash
# Im Hauptordner ausführen:
# Kopiere deine Bilder in den Website-Ordner

# Windows (PowerShell):
Copy-Item "background.png" -Destination "Website\assets\images\background.png"
Copy-Item "present.png" -Destination "Website\assets\images\present.png"

# Windows (CMD):
copy background.png Website\assets\images\background.png
copy present.png Website\assets\images\present.png
```

### Bild-Anforderungen:

**background.png:**
- Empfohlene Größe: 1920x1080px oder höher
- Format: PNG (transparenter Hintergrund möglich)
- Inhalt: Weihnachtliches Motiv, nicht zu dominant
- Dateigröße: < 2 MB (für schnelles Laden)

**present.png:**
- Empfohlene Größe: 512x512px
- Format: PNG mit Transparenz
- Inhalt: Geschenk-Icon (rot, grün, weihnachtlich)
- Dateigröße: < 100 KB

### Alternative: Fallback-Design

Falls du die Bilder noch nicht hast, funktioniert die Website auch ohne:
- Background: Die Website zeigt einen einfarbigen Hintergrund
- Present: Die Buttons zeigen nur die Tageszahl mit grünem Hintergrund

## Schritt 2: Excel-Dateien kopieren

### Alle 24 Aufgaben kopieren:

```bash
# Windows (PowerShell):
Copy-Item "Aufgaben\*.xlsx" -Destination "Website\assets\excel-files\"

# Windows (CMD):
xcopy Aufgaben\*.xlsx Website\assets\excel-files\ /Y
```

### Manuelle Methode:

1. Öffne den Ordner `Aufgaben/`
2. Markiere alle 24 Excel-Dateien (Tag01_*.xlsx bis Tag24_*.xlsx)
3. Kopiere sie (Strg+C)
4. Navigiere zu `Website/assets/excel-files/`
5. Füge sie ein (Strg+V)

### Dateinamen-Prüfung:

Die Dateien MÜSSEN folgendes Format haben:
```
Tag01_Mitarbeiterverzeichnis.xlsx
Tag02_Passwort_Matrix.xlsx
Tag03_Zeitstempel_Analyse.xlsx
...
Tag24_FINALE.xlsx
```

**Wichtig:**
- Zweistellige Tageszahl mit führender Null (Tag01, nicht Tag1)
- Unterstrich nach der Tageszahl
- Dateiendung .xlsx

### Prüfen ob alles da ist:

```bash
# Windows (PowerShell):
Get-ChildItem Website\assets\excel-files\*.xlsx | Measure-Object

# Windows (CMD):
dir Website\assets\excel-files\*.xlsx

# Sollte 24 Dateien anzeigen
```

## Schritt 3: Verzeichnis-Struktur prüfen

Nach dem Kopieren sollte die Struktur so aussehen:

```
Website/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── storage.js
│   ├── calendar.js
│   ├── tracker.js
│   └── app.js
├── assets/
│   ├── images/
│   │   ├── background.png ✅
│   │   └── present.png ✅
│   └── excel-files/
│       ├── Tag01_Mitarbeiterverzeichnis.xlsx ✅
│       ├── Tag02_Passwort_Matrix.xlsx ✅
│       ├── ...
│       └── Tag24_FINALE.xlsx ✅
├── README.md
├── ASSETS_SETUP.md (diese Datei)
└── GITHUB_PAGES_DEPLOYMENT.md
```

## Schritt 4: Lokaler Test

Teste die Website lokal BEVOR du sie hochlädst:

### Option A: Doppelklick
- Öffne `index.html` im Browser
- ⚠️ Downloads funktionieren möglicherweise nicht (file:// Protokoll-Einschränkung)

### Option B: Python HTTP Server (Empfohlen)
```bash
# Im Website-Ordner:
cd Website
python -m http.server 8000

# Öffne im Browser: http://localhost:8000
```

### Option C: VS Code Live Server
1. Installiere "Live Server" Extension in VS Code
2. Rechtsklick auf `index.html`
3. "Open with Live Server"

## Schritt 5: Funktions-Checkliste

Teste folgende Funktionen:

- [ ] Bilder werden angezeigt (Hintergrund + Geschenke)
- [ ] 24 Geschenk-Buttons sind sichtbar
- [ ] Klick auf Button startet Download der Excel-Datei
- [ ] Nach Download wird Status aktualisiert (📥 Badge)
- [ ] Tab-Wechsel funktioniert (Home, Fortschritt, Aufgaben, Info, FAQ)
- [ ] Lösung eintragen funktioniert im "Fortschritt"-Tab
- [ ] Nach Lösung wird Status aktualisiert (✅ Badge + Sterne)
- [ ] Punkte werden korrekt berechnet
- [ ] Fortschrittsbalken funktioniert
- [ ] Export-Button erstellt JSON-Datei
- [ ] Import-Button lädt JSON-Datei
- [ ] "Daily Release"-Toggle funktioniert
- [ ] Achievements werden freigeschaltet

## Troubleshooting

### Problem: Bilder werden nicht angezeigt
**Lösung:**
1. Prüfe ob Dateien in `assets/images/` vorhanden sind
2. Prüfe Dateinamen (genau: `background.png` und `present.png`, kleingeschrieben)
3. Öffne Browser-Konsole (F12) und suche nach Fehlerbildern (404)

### Problem: Excel-Downloads funktionieren nicht
**Lösung:**
1. Nutze einen lokalen Webserver (Python HTTP Server, siehe oben)
2. Prüfe ob Dateien in `assets/excel-files/` vorhanden sind
3. Prüfe Dateinamen-Format (Tag01_*.xlsx, nicht Tag1_*.xlsx)

### Problem: Downloads funktionieren, aber Datei ist beschädigt
**Lösung:**
1. Prüfe ob Original-Excel-Dateien intakt sind
2. Kopiere die Dateien erneut (möglicherweise war Kopiervorgang fehlerhaft)

### Problem: localStorage funktioniert nicht
**Lösung:**
1. Nutze normalen Browser-Modus (nicht Inkognito/Privat)
2. Prüfe Browser-Einstellungen: Cookies/localStorage müssen erlaubt sein
3. Lösche Browser-Cache und lade Seite neu

## Nächster Schritt

Nach erfolgreichem lokalem Test:
→ Siehe `GITHUB_PAGES_DEPLOYMENT.md` für Upload und Hosting auf GitHub Pages
