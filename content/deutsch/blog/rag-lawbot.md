---
title: "RAG-basierter LawBot – Ein Proof of Concept"
date: 2026-03-29T12:00:00+06:00
image: "/images/blog/lexchat/list_view.png"
author: "Michael Ullrich"
description: "Ein Proof of Concept für einen RAG-basierten Chatbot für den juristischen Bereich – basierend auf Anthropic Claude, Voyage AI Embeddings und einem PostgreSQL-Vektorspeicher."
tags: ['ai', 'rag', 'chatbot', 'anthropic', 'poc']
---

## Einleitung

Retrieval-Augmented Generation (RAG) ist eines der vielversprechendsten Muster für den Aufbau domänenspezifischer KI-Assistenten. Anstatt sich ausschliesslich auf das allgemeine Wissen eines Large Language Models (LLM) zu verlassen, reichert RAG jede Anfrage mit relevantem Kontext aus einer kuratierten Wissensbasis an.

Dieser Blogbeitrag beschreibt einen Proof of Concept (PoC), den wir entwickelt haben: einen **LawBot** – ein RAG-basierter Chatbot, der juristische Fragen auf Basis tatsächlicher Rechtstexte beantwortet.

Live ausprobieren unter [https://lexchat.ch/](https://lexchat.ch/)

## Warum RAG?

Large Language Models sind leistungsfähig, stossen aber bei domänenspezifischem, aktuellem oder vertraulichem Wissen an ihre Grenzen:

- **Halluzinationen** – LLMs können plausible, aber falsche Antworten generieren.
- **Veraltetes Wissen** – Die Trainingsdaten haben ein Stichtagsdatum.
- **Kein Zugriff auf private Daten** – Interne Dokumente sind nicht Teil des Trainingssets.

RAG begegnet diesen Herausforderungen, indem zur Abfragezeit relevante Dokumentenabschnitte abgerufen und als Kontext in den LLM-Prompt eingefügt werden.

## Architekturübersicht

Der LawBot-PoC besteht aus folgenden Komponenten:

### Embedding-Pipeline

{{< image src="/images/blog/lexchat/lexchat-architecture-embedding.png" alt="Embedding Pipeline" webp="false" zoomable="true" >}}

1. **Dokumentenaufnahme** – Rechtsdokumente (z. B. Gesetze, Verordnungen, Verträge) werden geparst und in semantisch sinnvolle Abschnitte unterteilt.
2. **Embedding-Generierung** – Jeder Abschnitt wird mit **Voyage AI** Embeddings vektorisiert, die für Retrieval-Aufgaben optimiert sind.
3. **Vektorspeicherung** – Die resultierenden Embeddings werden in einer **PostgreSQL**-Datenbank mit aktivierter `pgvector`-Erweiterung gespeichert.

### Abfrage-Pipeline

{{< image src="/images/blog/lexchat/lexchat-architecture-operations.png" alt="Operations Pipeline" webp="false" zoomable="true" >}}

1. **Benutzeranfrage** – Der Benutzer stellt eine juristische Frage über die Chat-Oberfläche.
2. **Abfrage-Embedding** – Die Frage wird mit demselben Voyage AI-Modell vektorisiert.
3. **Ähnlichkeitssuche** – Die relevantesten Dokumentenabschnitte werden per Vektor-Ähnlichkeitssuche aus PostgreSQL abgerufen.
4. **Prompt-Generierung** – Die abgerufenen Abschnitte werden zu einem strukturierten Prompt zusammengestellt, der die Benutzerfrage mit dem relevanten Kontext kombiniert.
5. **Antwortgenerierung** – Der Prompt wird an **Anthropic Claude** gesendet, das eine fundierte, referenzierte Antwort generiert.

## Technologie-Stack

Der PoC nutzt eine gezielte Auswahl an Technologien, die für ihre Stärken in RAG-Workflows ausgewählt wurden:

<div class="table-scroll-div">

| Komponente         | Technologie                    |
|--------------------|--------------------------------|
| LLM                | Anthropic Claude Opus 4.6      |
| Embeddings         | Voyage AI voyage-3-large       |
| Vektorspeicher     | PostgreSQL + pgvector          |
| Sprache            | Python                         |
</div>

## Wichtigste Erkenntnisse

- **Voyage AI Embeddings** liefern eine hohe Retrieval-Qualität, insbesondere bei domänenspezifischen Texten, und bieten ein gutes Verhältnis zwischen Kosten und Leistung.
- **PostgreSQL mit pgvector** ist eine pragmatische Wahl – es wird keine dedizierte Vektordatenbank benötigt, wenn bereits Postgres im Einsatz ist.
- **Anthropic Claude** überzeugt durch gut strukturierte, differenzierte Antworten und die Fähigkeit, Quellen aus dem bereitgestellten Kontext zu zitieren.
- **Die Chunking-Strategie ist entscheidend** – Die Qualität des Retrievals hängt stark davon ab, wie Dokumente aufgeteilt werden. Semantisches Chunking übertraf in unseren Tests naives Splitting mit fester Grösse.

## Ausblick

Dieser PoC legt den Grundstein für einen produktionsreifen juristischen Assistenten. Mögliche nächste Schritte umfassen:

- **Hybride Suche** – Kombination von Vektor-Ähnlichkeit mit schlüsselwortbasiertem (BM25) Retrieval für besseren Recall.
- **Reranking** – Hinzufügen eines Cross-Encoder-Reranking-Schritts zur Verbesserung der Precision.
- **Feedback-Schleife** – Benutzern ermöglichen, Antworten zu bewerten, um die Retrieval-Qualität kontinuierlich zu verbessern.

Weitere Updates folgen, wenn wir den LawBot vom PoC zur Produktionsreife weiterentwickeln.
