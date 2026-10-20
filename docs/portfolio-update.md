# Portfolio-Überarbeitung

Der ursprüngliche Stand liegt als geprüfte ZIP-Sicherung unter:

`backups/portfolio-before-optimization-20261015-191409/portfolio-source.zip`

Die Datei enthält alle damals von Git erfassten Projektdateien. Der Arbeitsstand war vor der Sicherung unverändert. Der zugehörige Commit ist `a01cd9d12aaf7414e373d7878eed15d48156f376`.

## Lokal ansehen

```sh
npm ci
npm start
```

Danach `http://localhost:4200/` öffnen. Unter Windows PowerShell bei einer gesperrten Skriptausführung `npm.cmd` statt `npm` verwenden.

## Projekte und Texte pflegen

- Projektdaten: `src/app/services/portfolio.service.ts`
- Deutsche und englische Texte: `src/assets/i18n/de.json` und `en.json`
- Projektbilder: `src/assets/img/`
- Farben: `src/assets/styles/variables.scss`

SmartDesk steht als erstes Projekt. Das Titelbild `src/assets/img/smartdesk-support.webp` zeigt das Support-Dashboard der öffentlichen Demo und ist auf 1600 × 1000 Pixel verkleinert. Die Quelldatei stammt aus `SmartDesk/notes/portfolio/smartdesk-support.png` und zeigt fiktive Demodaten. Deutsche und englische Beschreibung, Alt-Text, Technologie-Tags und eine kurze Demo-Anleitung liegen in den Sprachdateien. Das Portfolio verwendet Projektkarten, deshalb wurde keine zusätzliche Detailseite angelegt.

Die Schaltflächen führen zur [Live-Demo](https://smartdesk-okan.duckdns.org) und zum [SmartDesk-Repository](https://github.com/okankpl/SmartDesk). Beide öffnen einen neuen Tab. Auf der Demo-Startseite genügt „Demo starten“; ein Konto und Zugangsdaten werden nicht benötigt. Besucher erhalten einen privaten Arbeitsbereich, können zwischen den drei Rollen wechseln und verlieren ihre Demodaten nach 24 Stunden. Die Demo wird ausschließlich verlinkt. Join und Pollo Loco behalten ihre bisherigen Live-Links.

## GitHub

`origin` zeigt auf `https://github.com/okankpl/portfolio.git`. Der GitHub-`main` (Commit `c72cb23` vom 16.03.2025) hat eine eigene Historie ohne gemeinsamen Vorgänger mit dem alten lokalen `main` (`a01cd9d` vom 25.07.2024). Die Überarbeitung liegt deshalb im Branch `portfolio-update`, der direkt auf dem GitHub-`main` aufbaut und per Pull Request übernommen wird; ein erzwungener Push ist nicht nötig. Die auf GitHub ergänzten Entwickler-Abhängigkeiten (`@types/eslint`, `@types/node`) wurden übernommen. Pokédex ist wie auf der Live-Seite nicht mehr in der Projektliste.

Für die weitere Arbeit `portfolio-update` bzw. nach dem Zusammenführen den GitHub-`main` verwenden, nicht den alten lokalen `main`.

Der aktuelle Arbeitsordner ist `C:\Users\Okan\Desktop\Programmieren\Programmieren\portfolio`. Unter `C:\Users\Okan\Desktop\Programmieren\Programmieren\Developer Akademie\portfolio\portfolio` liegt nur ein alter Stand (Commit `a01cd9d`, ohne SmartDesk). Die weitere Kopie unter `C:\Users\Okan\Desktop\Programmieren\DA\portfolio` enthält einen unvollständigen Merge mit drei Konflikten und zusätzliche verschachtelte Portfolio-Ordner.

Ein GitHub-Push aktualisiert nur den Quellcode im Repository. Die öffentliche Website wird separat per FTP aktualisiert (siehe unten).

## Prüfen

```sh
npm.cmd run build
npm.cmd test -- --watch=false --browsers=ChromeHeadless
```

Bei nicht erkanntem Chrome die Umgebungsvariable `CHROME_BIN` auf dessen ausführbare Datei setzen. Die Kontaktformular-Tests verwenden gemockte HTTP-Anfragen und versenden keine E-Mails.

Geprüft am 20.10.2026: Produktionsbuild erfolgreich, alle 29 Portfolio-Tests erfolgreich. Die öffentliche SmartDesk-Seite antwortete mit HTTP 200; ihr Readiness-Endpunkt meldete Anwendung, Datenbank und Login-Schutz als bereit. Im Headless-Browser wurden Deutsch und Englisch auf Handy- und Tablet-Formaten (hoch und quer) sowie auf dem Desktop geprüft; die Checkliste unten ersetzt nicht den Test auf echten Geräten.

## Per FTP bei ALL-INKL veröffentlichen

1. **Bestehende Website sichern:** Im FTP-Programm den Ordner der aktuell veröffentlichten Portfolio-Seite vollständig in einen separaten lokalen Sicherungsordner herunterladen. Dazu gehören auch `sendMail.php` und versteckte Dateien wie `.htaccess`. Der richtige Zielordner ist der im ALL-INKL-KAS der Portfolio-Domain zugeordnete Webroot. Den bestehenden Ordner und seine Einstellungen beibehalten.
2. **Aktuellen Stand bauen:** Im lokalen Portfolio-Ordner in PowerShell `npm.cmd run build` ausführen und auf den erfolgreichen Abschluss warten. Der fertige Produktionsbuild liegt anschließend unter `dist/portfolio/browser/`.
3. **Build kontrollieren:** In diesem Ordner müssen unter anderem `index.html`, die erzeugten JavaScript-/CSS-Dateien, die Assets, `sendMail.php` und die versteckte Datei `.htaccess` liegen. Nur dessen **Inhalt** wird hochgeladen, sodass `index.html` direkt im bestehenden Webroot landet. Nicht die Ordner `dist`, `portfolio` oder `browser` als zusätzliche Unterordner hochladen; `src` und `node_modules` gehören ebenfalls nicht auf den Webspace.
4. **Dateien übertragen:** Mit den vorhandenen FTP-Zugangsdaten im FTP-Programm verbinden und den Inhalt von `dist/portfolio/browser/` in den zugeordneten Webroot übertragen. Gleichnamige Dateien ersetzen. Eine bereits vorhandene `.htaccess` auf dem Server vorher mit der neuen vergleichen und eigene Regeln übernehmen (siehe unten). Keine Zugangsdaten in Projektdateien oder GitHub speichern.
5. **Öffentliche Seite prüfen:** Nach dem Upload die Portfolio-Domain neu laden, bei Bedarf mit `Strg` + `F5`, und die Checkliste unten durchgehen. Bei Problemen können die zuvor heruntergeladenen Website-Dateien wieder in denselben Webroot zurückkopiert werden.

Der Build kopiert `sendMail.php` in den Ausgabeordner. Für das Kontaktformular benötigt der ALL-INKL-Webspace PHP und einen eingerichteten Mailtransport für `noreply@okan-kaplan.de`. Der Angular-Entwicklungsserver führt PHP nicht aus. Die Oberfläche zeigt Versandfehler an und behält dabei den Entwurf; die direkte E-Mail-Adresse bleibt erreichbar.

Der Build enthält eine `.htaccess` (Quelle: `src/.htaccess`). Sie leitet `http://` auf `https://` um, liefert vorhandene Dateien einschließlich `sendMail.php` direkt aus und gibt alle übrigen Pfade wie `/imprint` und `/privacypolicy` an `index.html` weiter. Am 20.10.2026 lieferte die Live-Seite für `/imprint` und `/privacypolicy` beim direkten Aufruf noch „404 Not Found“ und war ohne Umleitung per `http://` erreichbar; beides behebt diese Datei. Nach dem Upload `/imprint` und `/privacypolicy` direkt öffnen und neu laden sowie `http://okan-kaplan.de` aufrufen: Die Adresse muss auf `https://` wechseln. Falls die Seite danach nicht lädt (z. B. Weiterleitungsschleife), die gesicherte alte `.htaccess` zurückkopieren. Die PHP-Datei liefert JSON und akzeptiert ausschließlich POST-Anfragen mit JSON und bestätigter Datenschutzzustimmung. Ein bestätigtes `mail()`-Ergebnis bedeutet Annahme durch den Mailtransport, keine bestätigte Zustellung beim Empfänger.

Es wurde nichts auf den öffentlichen Webspace übertragen.

Die Datenschutzerklärung stammt aus dem eRecht24-Generator (Oktober 2026) und steht direkt in `src/app/legals/privacypolicy/privacypolicy.component.html`; die deutsche Fassung ist verbindlich, die englische eine Übersetzung. Gegenüber dem Generator-Text wurden Name und E-Mail korrigiert, Google Fonts entfernt (die Schriften liegen lokal unter `src/assets/fonts`), der Cookie-Abschnitt durch die tatsächliche Speicherung der Sprachwahl ersetzt und der Baustein „Server-Log-Dateien“ ergänzt. Der Abschnitt „Auftragsverarbeitung“ setzt einen mit ALL-INKL abgeschlossenen AV-Vertrag voraus. Bei neuen Diensten (z. B. Analyse-Tools, eingebettete Inhalte) muss die Erklärung angepasst werden.

## Checkliste auf Desktop und Handy

- [ ] SmartDesk erscheint als erstes Projekt; das Support-Bild ist scharf, passend zugeschnitten und ohne verzerrte Darstellung.
- [ ] Beschreibung, Technologie-Tags, Bildbeschreibung und Demo-Anleitung passen in die Karte. Auf dem Handy sind Texte und Schaltflächen lesbar und es entsteht kein horizontaler Seiten-Scrollbalken.
- [ ] Beim Wechsel zwischen Deutsch und Englisch werden auch die SmartDesk-Texte und Link-Beschriftungen übersetzt.
- [ ] „Live-Demo“ und „Code auf GitHub“ öffnen jeweils einen neuen Tab mit dem richtigen Ziel.
- [ ] In der Live-Demo funktioniert „Demo starten“ ohne Konto. Über „Ansicht als“ lässt sich zwischen Mitarbeitenden, Support und Administration wechseln. Einen bestehenden Demo-Arbeitsbereich für weitere Prüfungen verwenden; pro IP sind zehn Demo-Starts pro Stunde erlaubt.
- [ ] Optional den Ticket-Ablauf ausprobieren: als Mitarbeitende erstellen, als Support übernehmen und lösen, als Administration schließen.
- [ ] Die bisherigen Projekte und die Navigation funktionieren weiterhin. `/imprint` und `/privacypolicy` lassen sich auf der veröffentlichten Website direkt aufrufen und neu laden.
- [ ] `http://okan-kaplan.de` leitet automatisch auf `https://okan-kaplan.de` um.
- [ ] Nach dem FTP-Upload eine eigene Testnachricht über das Kontaktformular senden, die Rückmeldung prüfen und den tatsächlichen Eingang im Postfach kontrollieren.

## Alten Stand wiederherstellen

Die Sicherung zunächst in einen separaten Ordner entpacken. Daraus können einzelne Dateien oder der gesamte gesicherte Quellcode zurückkopiert werden. Die Sicherung enthält keine Abhängigkeiten, Build-Ausgaben oder Git-Historie. Für eine vollständige Rückkehr müssen die bei der Überarbeitung hinzugefügten Dateien ebenfalls berücksichtigt werden, insbesondere das frühere `smartdesk.png`, das aktuelle `smartdesk-support.webp`, diese Anleitung und der neue Sprachservice-Test. Das Backup-Verzeichnis selbst bleibt erhalten. Diese Quellcode-Sicherung ersetzt nicht die separate Sicherung der derzeit veröffentlichten Website vor einem FTP-Upload.

Die ursprünglichen Projektdateien sind außerdem über den oben genannten Git-Commit verfügbar. Eine Wiederherstellung sollte gezielt erfolgen, damit spätere eigene Änderungen erhalten bleiben.
