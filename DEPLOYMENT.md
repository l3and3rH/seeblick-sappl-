# Seeblick Sappl — Deployment-Anleitung

Hetzner VPS (Ubuntu) + Coolify + Hetzner DNS

---

## Übersicht

```
[nic.at Domain] → [Hetzner DNS] → [Hetzner VPS] → [Coolify] → [Statische Website]
```

Es sind 3 Schritte nötig:
1. Code in ein Git-Repository pushen
2. In Coolify als statische Seite deployen
3. DNS einrichten (Hetzner DNS + nic.at Nameserver ändern)

---

## Schritt 1: Git-Repository erstellen

Coolify deployt am einfachsten aus einem Git-Repository. Du brauchst einen
GitHub- (oder GitLab/Gitea-)Account.

### 1.1 Repository auf GitHub erstellen

1. Gehe zu https://github.com/new
2. Repository-Name: `seeblick-sappl` (oder wie du willst)
3. **Private** auswählen (Bilder/Inhalte müssen nicht öffentlich sein)
4. KEIN README, .gitignore oder Lizenz hinzufügen
5. "Create repository" klicken

### 1.2 Lokales Git-Repository initialisieren und pushen

Öffne ein Terminal (Git Bash) im Projektordner:

```bash
cd /c/Users/leand/Documents/coding/seeblicksappl

# Git initialisieren
git init

# Alle Dateien hinzufügen (außer .claude-Ordner)
echo ".claude/" > .gitignore
git add .
git commit -m "Initial commit: Seeblick Sappl Website"

# Remote hinzufügen (DEIN_USERNAME ersetzen!)
git remote add origin https://github.com/DEIN_USERNAME/seeblick-sappl.git
git branch -M main
git push -u origin main
```

> **Hinweis:** Falls du noch nie Git mit GitHub verwendet hast, wirst du
> nach Anmeldedaten gefragt. Nutze einen Personal Access Token (PAT) statt
> Passwort: https://github.com/settings/tokens

---

## Schritt 2: In Coolify deployen

### 2.1 GitHub mit Coolify verbinden

1. Öffne dein Coolify-Dashboard (https://DEINE_VPS_IP:8000 oder deine Coolify-Domain)
2. Gehe zu **Settings** → **Sources** (oder "Git Sources")
3. Klicke **+ Add** → **GitHub**
4. Folge dem OAuth-Flow, um Coolify Zugriff auf dein Repository zu geben
5. Wähle aus, ob Coolify auf alle Repos oder nur das seeblick-sappl Repo zugreifen darf

### 2.2 Neue Ressource anlegen

1. Im Coolify-Dashboard: Klicke **+ New Resource**
2. Wähle deinen **Server** aus (der Hetzner VPS)
3. Wähle **Public Repository** oder **Private Repository (GitHub)**
4. Repository auswählen: `seeblick-sappl`
5. Branch: `main`

### 2.3 Build-Konfiguration

Da es eine **reine statische Website** ist (kein Node.js, kein Build-Step):

- **Build Pack**: Wähle **Static** (oder "Nginx")
- **Base Directory**: `/` (leer lassen oder `/`)
- **Publish Directory**: `/` (das gesamte Repo ist die Website)
- **Build Command**: LEER lassen (kein Build nötig)
- **Port**: `80` (wird von Coolify automatisch gesetzt)

> Falls "Static" nicht als Option erscheint, wähle **Dockerfile** und
> erstelle ein Dockerfile (siehe Abschnitt 2.4).

### 2.4 Falls nötig: Dockerfile erstellen

Nur wenn Coolify kein "Static" Build Pack anbietet. Erstelle im Projektroot:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

In Coolify dann:
- **Build Pack**: Dockerfile
- **Dockerfile Location**: `/Dockerfile`

### 2.5 Domain in Coolify konfigurieren

1. In den Einstellungen deiner Ressource → **Domains**
2. Trage ein:
   ```
   https://seeblick-sappl.at
   https://www.seeblick-sappl.at
   ```
3. Aktiviere **Auto SSL** (Let's Encrypt) — Coolify kümmert sich um das Zertifikat
4. Klicke **Save**

### 2.6 Deploy starten

1. Klicke **Deploy** in Coolify
2. Warte bis der Build durchgelaufen ist (sollte <1 Minute dauern)
3. Du siehst den Status im Deployment-Log

Ab jetzt wird bei jedem `git push` auf `main` automatisch neu deployt.

---

## Schritt 3: DNS einrichten

### 3.1 Hetzner DNS-Zone erstellen

1. Gehe zum Hetzner DNS: https://dns.hetzner.com
2. Falls noch nicht eingeloggt: Mit deinem Hetzner-Account anmelden
3. Klicke **Add new zone**
4. Domain: `seeblick-sappl.at`
5. Bestätige die Erstellung

### 3.2 DNS-Records anlegen

In der neuen Zone folgende Records erstellen:

| Typ   | Name  | Wert                     | TTL  |
|-------|-------|--------------------------|------|
| A     | @     | DEINE_VPS_IP             | 300  |
| A     | www   | DEINE_VPS_IP             | 300  |
| AAAA  | @     | DEINE_VPS_IPv6 (falls vorhanden) | 300 |
| AAAA  | www   | DEINE_VPS_IPv6 (falls vorhanden) | 300 |

> **DEINE_VPS_IP** findest du in der Hetzner Cloud Console unter deinem Server.
> Beispiel: `78.46.xxx.xxx`

> Den TTL kannst du nach erfolgreichem Test auf `86400` (24h) erhöhen.

### 3.3 Nameserver bei nic.at ändern

Die Hetzner DNS-Nameserver sind:

```
hydrogen.ns.hetzner.com
oxygen.ns.hetzner.com
helium.ns.hetzner.de
```

So änderst du sie:

1. Logge dich bei deinem Domain-Registrar ein (der Anbieter, über den du
   seeblick-sappl.at bei nic.at registriert hast — z. B. World4You,
   domainname.at, Gandi, etc.)
2. Gehe zu den **Nameserver-Einstellungen** deiner Domain
3. Ersetze die aktuellen Nameserver durch die drei Hetzner-Nameserver oben
4. Speichern

> **Achtung:** Nameserver-Änderungen können bis zu 24-48 Stunden dauern,
> bis sie weltweit propagiert sind. Meistens geht es aber in 1-2 Stunden.

### 3.4 DNS-Propagation prüfen

Warte ein paar Minuten, dann prüfe:

```bash
# Im Terminal:
nslookup seeblick-sappl.at
dig seeblick-sappl.at

# Oder online:
# https://www.whatsmydns.net/#A/seeblick-sappl.at
```

Die Antwort sollte deine VPS-IP zeigen.

---

## Schritt 4: Abschluss-Checkliste

Nachdem DNS propagiert ist und Coolify deployt hat:

- [ ] https://seeblick-sappl.at öffnen — Startseite lädt
- [ ] Alle Bilder prüfen (Wohnungen Daria, Leander, Timon)
- [ ] Kontaktformular testen (Anfrage absenden → Formspree)
- [ ] Mobile Ansicht testen (Hamburger-Menü)
- [ ] HTTPS prüfen (Schloss-Symbol im Browser)
- [ ] www-Weiterleitung testen (www.seeblick-sappl.at → seeblick-sappl.at)
- [ ] Google Search Console einrichten: https://search.google.com/search-console
- [ ] Sitemap einreichen: https://seeblick-sappl.at/sitemap.xml

---

## Spätere Updates deployen

Nach der Ersteinrichtung ist das Update-Workflow simpel:

```bash
# Änderungen lokal machen, dann:
cd /c/Users/leand/Documents/coding/seeblicksappl
git add .
git commit -m "Beschreibung der Änderung"
git push
```

Coolify erkennt den Push und deployt automatisch neu.

---

## Troubleshooting

### Bilder laden nicht
- Prüfe in den Browser-DevTools (F12 → Network), ob 404-Fehler erscheinen
- Häufigste Ursache: Groß-/Kleinschreibung (`Bilder` vs `bilder`)
- Der Ordner muss `bilder` heißen (wurde bereits umbenannt)

### SSL-Zertifikat fehlt
- In Coolify: Prüfe ob "Auto SSL" aktiviert ist
- DNS muss bereits auf den VPS zeigen, sonst kann Let's Encrypt nicht verifizieren
- Im Coolify-Log nachschauen ob Fehler beim Zertifikat-Abruf erscheinen

### Formular sendet nicht
- Browser-Konsole öffnen (F12) und auf Fehler prüfen
- Formspree-Dashboard prüfen: https://formspree.io/forms
- CORS-Fehler? Formspree erlaubt Requests von jeder Domain

### Coolify zeigt Build-Fehler
- Bei Static/Nginx Build Pack: Prüfen ob Publish Directory korrekt ist (`/`)
- Bei Dockerfile: Prüfen ob das Dockerfile im Root liegt
- Coolify-Logs lesen (Button "Logs" im Deployment)
