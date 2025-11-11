# GitHub Pages Deployment - Anleitung

Eine komplette Schritt-für-Schritt-Anleitung, um deine Excel-Adventskalender-Website auf GitHub Pages zu veröffentlichen (kostenlos!).

## Voraussetzungen

Bevor du startest, benötigst du:

- [ ] GitHub-Account (kostenlos unter https://github.com/signup)
- [ ] Git installiert auf deinem Computer
- [ ] Alle Assets vorbereitet (siehe `ASSETS_SETUP.md`)
- [ ] Website lokal getestet

### Git installieren (falls noch nicht vorhanden)

**Windows:**
1. Download: https://git-scm.com/download/win
2. Installieren mit Standard-Einstellungen
3. Git Bash öffnen zum Testen: `git --version`

**Prüfen ob Git installiert ist:**
```bash
git --version
# Sollte ausgeben: git version 2.x.x
```

## Schritt 1: GitHub Repository erstellen

### 1.1 Auf GitHub einloggen
- Gehe zu https://github.com
- Logge dich ein (oder erstelle einen Account)

### 1.2 Neues Repository erstellen
1. Klicke auf **"+"** (oben rechts) → **"New repository"**
2. Repository-Name: `excel-adventskalender` (oder beliebig)
3. Description: `🎄 Interaktiver Excel-Adventskalender mit 24 Aufgaben`
4. Wähle: **Public** (für kostenloses GitHub Pages)
   - Private geht auch, aber dann brauchst du GitHub Pro
5. ❌ **NICHT** ankreuzen:
   - "Add a README file"
   - "Add .gitignore"
   - "Choose a license"
6. Klicke auf **"Create repository"**

### 1.3 Repository-URL kopieren
Nach dem Erstellen siehst du eine URL wie:
```
https://github.com/DEIN-USERNAME/excel-adventskalender.git
```
**Kopiere diese URL!** Du brauchst sie gleich.

## Schritt 2: Website-Ordner vorbereiten

### 2.1 Terminal/PowerShell öffnen
```bash
# Navigiere zum Website-Ordner
cd C:\Users\dietr\Desktop\Escel-Adventskalender\Website

# Windows: PowerShell oder Git Bash verwenden
# Mac/Linux: Terminal
```

### 2.2 Git initialisieren
```bash
# Git-Repository initialisieren
git init

# Prüfen ob erfolgreich:
git status
# Sollte viele "Untracked files" anzeigen
```

### 2.3 Alle Dateien hinzufügen
```bash
# Alle Dateien für Commit vorbereiten
git add .

# Prüfen was hinzugefügt wurde:
git status
# Sollte viele grüne "Changes to be committed" anzeigen
```

### 2.4 Ersten Commit erstellen
```bash
# Commit mit Nachricht erstellen
git commit -m "Initial commit: Excel Adventskalender Website"

# Sollte ausgeben: "X files changed, Y insertions(+)"
```

### 2.5 Standard-Branch umbenennen
```bash
# Von 'master' zu 'main' (GitHub Standard)
git branch -M main
```

## Schritt 3: Zu GitHub hochladen

### 3.1 Remote-Repository verbinden
```bash
# Ersetze DEIN-USERNAME und DEIN-REPO mit deinen Werten!
git remote add origin https://github.com/DEIN-USERNAME/excel-adventskalender.git

# Beispiel:
# git remote add origin https://github.com/dietr/excel-adventskalender.git

# Prüfen ob erfolgreich:
git remote -v
# Sollte zwei Zeilen mit deiner URL anzeigen
```

### 3.2 Hochladen zu GitHub
```bash
# Dateien hochladen (Push)
git push -u origin main

# Du wirst nach GitHub-Login gefragt:
# Username: dein-github-username
# Password: dein-github-token (NICHT dein Passwort!)
```

**⚠️ Wichtig: GitHub Token erstellen**

Falls du einen "Support for password authentication was removed" Fehler bekommst:

1. Gehe zu https://github.com/settings/tokens
2. Klicke **"Generate new token"** → **"Generate new token (classic)"**
3. Note: `Excel Adventskalender Deploy`
4. Expiration: `90 days` (oder länger)
5. Scopes ankreuzen: ✅ **repo** (alle repo-Unterpunkte)
6. **"Generate token"** klicken
7. **Token kopieren** (wird nur einmal angezeigt!)
8. Verwende diesen Token als "Password" beim `git push`

### 3.3 Upload überprüfen
- Gehe zu `https://github.com/DEIN-USERNAME/excel-adventskalender`
- Du solltest alle deine Dateien sehen (index.html, css/, js/, assets/, etc.)

## Schritt 4: GitHub Pages aktivieren

### 4.1 Repository-Settings öffnen
1. In deinem Repository auf GitHub
2. Klicke auf **"Settings"** (oben rechts)
3. Scrolle in der linken Sidebar zu **"Pages"**

### 4.2 Source konfigurieren
1. **Source:** `Deploy from a branch`
2. **Branch:**
   - Dropdown 1: `main` wählen
   - Dropdown 2: `/ (root)` wählen
3. Klicke **"Save"**

### 4.3 Warten auf Deployment
- Nach dem Speichern dauert es **1-2 Minuten**
- Die Seite zeigt oben: "Your site is live at ..."
- URL wird sein: `https://DEIN-USERNAME.github.io/excel-adventskalender/`

### 4.4 Website öffnen
- Klicke auf **"Visit site"** oder
- Öffne manuell: `https://DEIN-USERNAME.github.io/excel-adventskalender/`

**🎉 Fertig! Deine Website ist jetzt online!**

## Schritt 5: Testen

### Vollständiger Funktionstest:

- [ ] Website lädt ohne Fehler
- [ ] Hintergrund-Bild wird angezeigt
- [ ] 24 Geschenk-Buttons sind sichtbar
- [ ] Klick auf Button startet Download
- [ ] Alle Tabs funktionieren (Home, Fortschritt, Aufgaben, Info, FAQ)
- [ ] Lösung eintragen funktioniert
- [ ] Punkte-Berechnung funktioniert
- [ ] localStorage speichert Fortschritt (Seite neu laden → Fortschritt bleibt)
- [ ] Export/Import funktioniert
- [ ] Mobile Ansicht funktioniert (Responsive)

### Browser-Konsole prüfen:
1. Drücke **F12**
2. Tab **"Console"**
3. Sollte **keine roten Fehler** anzeigen
4. Falls Fehler: Siehe Troubleshooting unten

## Änderungen hochladen (später)

Wenn du später etwas änderst:

```bash
# Im Website-Ordner:

# 1. Geänderte Dateien hinzufügen
git add .

# 2. Commit mit Beschreibung
git commit -m "Update: Beschreibung deiner Änderung"

# 3. Zu GitHub hochladen
git push

# Nach 1-2 Minuten sind Änderungen live!
```

## Troubleshooting

### Problem: "git: command not found"
**Lösung:** Git ist nicht installiert oder nicht im PATH
1. Git installieren: https://git-scm.com/download/win
2. Terminal/PowerShell neu starten
3. Erneut versuchen

### Problem: "Permission denied" beim Push
**Lösung:** GitHub-Token verwenden statt Passwort
- Siehe Schritt 3.2 → GitHub Token erstellen
- Verwende Token als Passwort

### Problem: "Repository not found"
**Lösung:**
1. Prüfe ob Repository-URL korrekt ist: `git remote -v`
2. Falls falsch, entfernen und neu hinzufügen:
   ```bash
   git remote remove origin
   git remote add origin https://github.com/RICHTIGER-USERNAME/RICHTIGER-REPO.git
   ```

### Problem: Seite zeigt 404 nach Deployment
**Lösung:**
1. Warte 2-5 Minuten (Deployment dauert)
2. Prüfe Branch-Einstellung in Settings → Pages (muss `main` und `/ (root)` sein)
3. Prüfe ob `index.html` im Root-Ordner liegt (nicht in Unterordner)
4. Hard-Refresh im Browser: Strg+Shift+R (Windows) oder Cmd+Shift+R (Mac)

### Problem: Bilder werden nicht angezeigt (404)
**Lösung:**
1. Prüfe ob Bilder in `assets/images/` sind
2. Prüfe Groß-/Kleinschreibung (GitHub Pages ist case-sensitive!)
   - `Background.png` ≠ `background.png`
3. Prüfe relative Pfade in HTML/CSS:
   ```html
   <!-- Korrekt: -->
   <img src="assets/images/present.png">
   <!-- Falsch: -->
   <img src="/assets/images/present.png">
   <img src="C:/Users/.../assets/images/present.png">
   ```

### Problem: Excel-Downloads funktionieren nicht
**Lösung:**
1. Prüfe ob Excel-Dateien in `assets/excel-files/` sind
2. Prüfe Dateinamen-Format: `Tag01_*.xlsx` (mit führender Null)
3. Browser-Konsole (F12) öffnen → Prüfe auf 404-Fehler
4. Falls 404: Dateinamen in `calendar.js` → `getFilename()` prüfen

### Problem: localStorage funktioniert nicht
**Lösung:**
- GitHub Pages verwendet HTTPS → localStorage sollte funktionieren
- Falls nicht: Browser-Cookies/localStorage-Einstellungen prüfen
- Inkognito-Modus vermeiden

### Problem: "Your site is having problems building"
**Lösung:**
1. Gehe zu Repository → Actions
2. Schau dir den Build-Log an
3. Häufige Ursachen:
   - Ungültige Dateinamen (Sonderzeichen, Leerzeichen)
   - Zu große Dateien (> 100 MB)
   - Repository zu groß (> 1 GB)

## Custom Domain (Optional)

Falls du eine eigene Domain verwenden möchtest (z.B. `adventskalender.deine-domain.de`):

### Schritt 1: DNS-Eintrag bei Domain-Provider
```
Type: CNAME
Name: adventskalender (oder @)
Value: DEIN-USERNAME.github.io
```

### Schritt 2: GitHub Pages konfigurieren
1. Settings → Pages
2. Custom domain: `adventskalender.deine-domain.de`
3. Save
4. ✅ Enforce HTTPS ankreuzen (nach 24h)

## URL teilen

Deine Website ist jetzt unter dieser URL erreichbar:
```
https://DEIN-USERNAME.github.io/excel-adventskalender/
```

**Teile diese URL mit:**
- Kollegen
- Freunden
- Excel-Community
- Social Media

**Tipp:** Erstelle einen QR-Code für einfaches Teilen:
- Kostenlos auf: https://www.qr-code-generator.com/
- URL eingeben → QR-Code erstellen → Als Bild speichern

## Statistiken (Optional)

### GitHub Insights
- Repository → Insights → Traffic
- Zeigt Besucher-Zahlen (nach 14 Tagen Daten)

### Google Analytics (falls gewünscht)
In `index.html` vor `</head>` einfügen:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Backup

**Wichtig:** Deine Daten sind jetzt auf GitHub gesichert!

**Lokales Backup erstellen:**
```bash
# Gesamtes Projekt als ZIP speichern
# Windows: Rechtsklick auf Ordner → "Senden an" → "ZIP-komprimierter Ordner"

# Oder mit PowerShell:
Compress-Archive -Path Website -DestinationPath backup-website-$(Get-Date -Format 'yyyy-MM-dd').zip
```

## Weitere Ressourcen

- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Git Grundlagen:** https://git-scm.com/book/de/v2
- **GitHub Desktop** (GUI-Alternative): https://desktop.github.com/

---

**🎄 Viel Erfolg mit deinem Excel-Adventskalender! 🎄**

Bei Fragen: GitHub Issues oder Pull Requests sind willkommen!
