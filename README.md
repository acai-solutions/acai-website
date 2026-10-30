[![Deploy](https://github.com/acai-solutions/acai-website/actions/workflows/hugo.yml/badge.svg)](https://github.com/acai-solutions/acai-website/actions/workflows/hugo.yml)

# ACAI Website (Hugo)

Technische Dokumentation zur Website unter acai.gmbh.

## Live und Hosting

- Produktionsdomain: [https://acai.gmbh](https://acai.gmbh)
- Weitere Domains: [https://acai-consulting.ch](https://acai-consulting.ch), [https://acai-consulting.com](https://acai-consulting.com)
- Hosting: GitHub Pages ([Settings](https://github.com/acai-solutions/acai-website/settings/pages))
- Domains (Registrar): ionos.de

## Tech Stack

- Static Site Generator: Hugo
- Theme-Basis: vex-hugo (mit projektspezifischen Anpassungen)
- Build-Ausgabe: public
- Deployment: GitHub Pages via GitHub Actions

## Projektstruktur

- content/english und content/deutsch: Inhalte pro Sprache
- layouts/: projektspezifische Templates und Partials
- themes/vex-hugo/: Theme-Dateien
- assets/: verarbeitete Assets (SCSS, JS, Pipeline)
- static/: statische Dateien, die 1:1 nach public kopiert werden
- public/: generierter Output (nicht versionieren)
- resources/_gen/: Hugo Cache/Generierung (nicht versionieren)

## Lokale Entwicklung

Voraussetzungen:

- Hugo Extended installiert (Version siehe `.github/workflows/hugo.yml`)

Lokalen Dev-Server starten:

```powershell
hugo server
```

Mit Entwuerfen:

```powershell
hugo server -D
```

Produktionsnaher Build:

```powershell
hugo --minify --gc
```

## Content Pflege

Neue Seite erstellen (Beispiel Englisch):

```powershell
hugo new content/english/blog/mein-artikel.md
```

Neue Seite erstellen (Beispiel Deutsch):

```powershell
hugo new content/deutsch/blog/mein-artikel.md
```

Wichtige Hinweise:

- Frontmatter sauber halten (title, description, draft)
- Interne Links sprachspezifisch pruefen
- Bilder in static/images oder per Asset Pipeline einbinden

## Bilder und Shortcodes

Assets vs. Static:

- assets/: fuer Dateien, die Hugo verarbeiten soll
- static/: fuer Dateien, die unveraendert ausgeliefert werden

Image-Shortcode in Blogposts:

```text
{{< image src="/images/blog/your_folder/your_image.png" class="img-fluid" alt="Alternative image text" >}}
```

Optionale Parameter:

- loading="eager" fuer Above-the-fold Bilder
- webp="false" fuer Formate wie SVG
- zoomable="true" fuer Zoom-In Verhalten

## Konfiguration

- Hauptkonfiguration: config.toml
- Build & Deployment: .github/workflows/hugo.yml
- Custom Domain: static/CNAME

Wichtige Config-Punkte:

- baseurl und Mehrsprachigkeit
- Menues fuer EN/DE in config.toml
- Privacy- und Analytics-Settings

## Deployment

Jeder Push auf `main` baut die Seite mit GitHub Actions (`hugo --minify --gc`) und deployed `public/` auf GitHub Pages.
Ein manueller Deploy ist über "Run workflow" im Actions-Tab möglich.

Kontaktformulare laufen über Formspree (`formAction` in config.toml).

## Monitoring und Performance

- [Google Search Console](https://search.google.com/search-console?resource_id=sc-domain%3Aacai.gmbh&hl=de)
- [Google Analytics](https://analytics.google.com/analytics/web/#/p390204256/reports/intelligenthome)
- [PageSpeed](https://pagespeed.web.dev/analysis/https-acai-gmbh/dbcnguvm72?form_factor=mobile)

## Typische Fehler

- Falscher Hugo Parameter: fuer Drafts -D verwenden (nicht -d)
- Veraltete Links in Menues nach Seitenumbenennungen
- Images ohne Alt-Text oder mit falschem Pfad

## Kontakt und Referenzen

- Website Team: contact@acai.gmbh
- LinkedIn Text Formatter: https://typegrow.com/tools/linkedin-text-formatter