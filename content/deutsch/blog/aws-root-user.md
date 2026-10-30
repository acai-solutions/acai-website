---
title: "AWS Root User Considerations"
date: 2020-05-04T12:00:00+06:00
image: "/images/blog/aws-root-user/RootUserMetamodel.jpg"
author: "Michael Ullrich"
description : "Jedes AWS-Konto verfügt über einen Root-Benutzer - er ist der mächtigste Benutzer Ihres AWS-Kontos und kann nicht deaktiviert werden. Es lohnt sich also, einige Zeit darüber nachzudenken."
tags: ['aws', 'security']
draft: false
---

Jedes AWS-Konto verfügt über einen Root-Benutzer - er ist der mächtigste Benutzer Ihres AWS-Kontos und kann nicht deaktiviert werden. Es lohnt sich also, einige Zeit darüber nachzudenken.

Hinweis: Verwenden Sie AWS-Organisationen können Sie über SCPs, die Root-Benutzerrechte der AWS-Mitgliedskonten ihrer Organisation einzuschränken [[1](https://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html)]. Dies ist nicht möglich für das Verwaltungskonto der AWS-Organisation.

## Metamodell

{{< image src="/images/blog/aws-root-user/RootUserMetamodel.jpg" class="img-fluid" alt="Root User Metamodel" loading="eager" zoomable="false" >}}

## Mehr-Faktor-Authentifizierung

Nach der Erstellung eines AWS-Kontos empfehlen wir als ersten obligatorischen Schritt die Registrierung eines MFA-Geräts als sekundären Authentifizierungsfaktor für den Root-Benutzer. Zwei Typen werden von AWS unterstützt - virtuelle MFA-Geräte und Hardware-MFA-Geräte.

Um mit den folgenden Sicherheitskontrollen konform zu sein, ist eine Hardware-MFA erforderlich (wir empfehlen eine U2F-MFA, z. B. das Yubikey 4 oder 5 von Yubico [[2](https://yubikey.ch/de/webshop)]):

* CIS AWS Foundations - Sicherheitskontrolle CIS.1.14 [[3](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.14)]
* AWS Foundational Security Best Practices - Sicherheitskontrolle IAM.6 [[4](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-fsbp-controls.html#fsbp-iam-6)]

Die erforderlichen Schritte zur Registrierung eines MFA Geräts finden Sie hier: [Link zu AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_u2f.html#enable-u2f-mfa-for-root)

Die folgenden Browser unterstützen derzeit die Verwendung von U2F-MFA:

* Google Chrome, Version 38 und höher
* Microsoft Edge, Version 83 und höher
* Opera, Version 40 und höher
* Mozilla Firefox, Version 57 und später

## Weitere Empfehlungen

Bitte beachten Sie auch diese weiteren Empfehlungen:

* AWS empfiehlt dringend, den Root-Benutzer nicht für alltägliche Aufgaben zu verwenden, auch nicht für administrative Aufgaben.
* Erstellen Sie für administrative Aufgaben IAM-Benutzer, die mit einer IAM-Gruppe verknüpft sind, der die Richtlinie AdministratorAccess zugewiesen ist [[5](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html#getting-started_create-admin-group-console)]
* Erstellen Sie niemals Zugriffsschlüssel für den Root-Benutzer. Wenn Sie bereits Zugriffsschlüssel für Ihren Root-Benutzer erstellt haben, löschen Sie diese [[6](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#lock-away-credentials)]

## Vier-Augen-Prinzip

Insbesondere für AWS Landing Zone-Umgebungen mit einer großen Anzahl von Konten wird dringend empfohlen, das Vier-Augen-Prinzip auf den Root-Benutzer für die folgenden AWS-Konten anzuwenden:

* AWS Organizations Verwaltungskonto
* AWS-Konten der Kerndomäne

Um Ihr AWS-Konto vor uneingeschränktem Root-Benutzer-Zugriff zu schützen und den Root-Benutzer-Zugriff in erforderlichen Fällen zu gewährleisten, müssen die folgenden Rollen Ihren Teams zugewiesen werden.

{{< image src="/images/blog/aws-root-user/RootUserRoles.jpg" class="img-fluid" alt="Root User Roles" zoomable="false" >}}

## AWS-Aufgaben, die den AWS-Root-Benutzer erfordern

Für die folgenden Aufgaben müssen Sie sich bei Ihrem AWS-Konto mit dem Root-Benutzer [[7](https://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html)] anmelden:

* Schließen eines AWS-Kontos
* Ändern von AWS-Kontoeinstellungen wie Kontoname, Root-Benutzerkennwort, Kontaktangaben und Konto-E-Mail-Adresse [[8](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/manage-account-payment.html#manage-account-payment-edit-user-name)]
* Aktivieren von MFA für den Root-Benutzer
* Ändern Sie Ihren AWS-Supportplan.
* IAM-Benutzerberechtigungen wiederherstellen
* Registrierung als Verkäufer auf dem Reserved Instance Marketplace
* Erstellung eines CloudFront-Schlüsselpaars
* Konfigurieren eines Amazon S3-Buckets zur Aktivierung von MFA Löschen
* Bearbeiten oder Löschen einer Amazon S3-Bucket-Richtlinie, die eine ungültige VPC-ID oder VPC-Endpunkt-ID enthält
* Anmeldung für die GovCloud (US)

Wir sind ACAI Consulting - spezialisiert auf AWS Multi-Account Security und Governance.
Wenn Sie Fragen haben, können Sie sich gerne mit uns in Verbindung setzen: [blog@acai.gmbh](mailto:blog@acai.gmbh)

## Referenzen

[1] [root-vs-iam.html](https://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html)

[2] [https://yubikey.ch/de/webshop](https://yubikey.ch/de/webshop)

[3] [securityhub-cis-controls-1.14](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.14)

[4] [securityhub-standards-fsbp-controls.html#fsbp-iam-6](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-fsbp-controls.html#fsbp-iam-6)

[5] [create-admin-group-console](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html#getting-started_create-admin-group-console)

[6] [lock-away-credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#lock-away-credentials)

[7] [tasks-that-require-root.html](https://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html)

[8] [manage-account-payment-edit-user-name](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/manage-account-payment.html#manage-account-payment-edit-user-name)
