---
title: "ACAI Lab - IaC Provisioning"
date: 2021-01-10T11:22:16+06:00
image: "/images/blog/aws-iac-cicd/iac_provisioning.svg"
author: Michael Ullrich
description : "Dieser Beitrag befasst sich mit der Bereitstellung von AWS-Landing-Zones auf native Weise. Der Schwerpunkt liegt auf der Bereitstellung von AWS-Konten des ACAI AWS Foundation Lab unter Verwendung von Terraform."
tags: ['aws', 'landingzone', 'terraform', 'provisio']
draft: false
---

Eine frühe Version von [ACAI Provisio]({{< ref "/solutions/provisio.md" >}}).

Der folgende Blog-Beitrag befasst sich mit der AWS Landing Zone-Bereitstellung - auf AWS native Weise.

Der Schwerpunkt des Beitrags liegt auf der Bereitstellung von AWS-Konten des ACAI AWS Foundation Lab unter Verwendung von Terraform, dem De-facto-Standard für Infrastructure as Code (IaC).

Wir haben die IaC CI/CD-Pipelines so konzipiert, dass sie aus einem AWS CodeCommit Repository und einer AWS CodePipeline bestehen. Die CodePipeline führt Terraform Plan und Terraform Apply in zwei AWS CodeBuild-Schritten durch. Optional kann ein manueller Genehmigungsschritt zwischen Plan und Apply hinzugefügt werden.

{{< image src="/images/blog/aws-iac-cicd/pipeline.svg" class="img-fluid" alt="IaC Provisioning" loading="eager" zoomable="false" webp="false" >}}

Es hat sich bewährt, dedizierte AWS-Konten für jede in der Cloud betriebene Lösung zu haben.

In unserem **ACAI AWS Foundation Lab** hat jedes AWS-Konto zwei IaC CI/CD-Pipelines - eine für die Foundation Baseline (gemeinsam genutzte AWS-Konten insgesamt) und eine für die Workload Ressourcen.

Im Lab-Setup werden die IaC CI/CD-Pipelines im Core IaC Provisioning-Konto gehostet (Link zu Core Provisioning). Der Core IaC Provisioning-Konto selbst wird ebenfalls über Terraform verwaltet.

## Vorteile dieser Architektur

- keine Anmeldedaten für den Zugriff auf Ziel-Konten - keine Schlüsselrotation erforderlich.
- Trennung der CI/CD-Pipelines für Foundation Baseline- und Workload Ressourcen.
- vollständig AWS-native IaC-CI/CD-Pipelines - keine teuren Lizenzkosten

{{< image src="/images/blog/aws-iac-cicd/iac_provisioning.svg" class="img-fluid" alt="IaC Provisioning" zoomable="false" webp="false" >}}

Wir sind ACAI Consulting - spezialisiert auf AWS Multi-Account Security und Governance.
Wenn Sie Fragen haben, können Sie sich gerne mit uns in Verbindung setzen: [blog@acai.gmbh](mailto:blog@acai.gmbh)

## Referenzen

[1] [ACAI AWS Foundation Lab](https://acai.gmbh/blog/aws-foundation-lab/)

[2] [https://www.terraform.io/](https://www.terraform.io/)

[3] [AWS CodeCommit](https://aws.amazon.com/de/codecommit/)

[4] [AWS CodePipeline](https://aws.amazon.com/de/codepipeline/)

[5] [AWS CodeBuild](https://aws.amazon.com/de/codebuild/)

[6] [Swiss Post Case Study](https://aws.amazon.com/de/solutions/case-studies/swiss-post-case-study/)
