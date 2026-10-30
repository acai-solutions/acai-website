---
title: "Want to scale efficiently and securely in AWS? Not without an appropriate Landing Zone"
date: 2020-06-02T12:00:00+06:00
image: "/images/blog/aws-landing-zone/AWS_Situations.jpg"
author: "By Michael Ullrich – ACAI GmbH & Rolf Wagner – FortIT AG"
summary : "Are you at the beginning of the cloud journey or close to a cloud-native city already? Not sure how to answer upcoming questions from key stakeholders? This post provides some inspiration."
tags: ['aws', 'landingzone']
draft: false
---

## Situation

Are you at the beginning of the cloud journey or close to cloud native city already? Not sure how to answer upcoming questions from key stakeholders?

**Business:** It is great how cloud services have already improved our time to market – but:

* How can we increase cost efficiency?
* Can we maintain this pace of scalability and agility in the future?
* Do we have maximum safeguards in place for our data?

**Security & Compliance:** AWS provides great security services – but:

* Is our AWS cloud security well-architected?
* How will we perform on the next security audit?
* How can we get an aggregated view on security findings?

**Cloud Operations:** We provide a great service to our business stakeholders – but:

* How can we further automate and harmonize the AWS account life cycle?
* How can we structure and harmonize existing AWS accounts?
* How can we keep up with the rapid development of CI/CD tools?

Your AWS environment may even consist of a so-called “monolith” or “zoo” structure. Both have disadvantages for your team members.

{{< image src="/images/blog/aws-landing-zone/AWS_Situations.jpg" class="img-fluid" alt="AWS Situations" zoomable="false" >}}

In large part, the answer to all of these challenges is a solid, scalable multi-account strategy. In practice, a multi-account strategy should be a day-one topic, as it makes sense to enact a robust policy when you have 10+ accounts, particularly if you envision 100 or even 1000 accounts on the horizon…

## Solution

AWS Landing Zone is a concept that helps customers set up a secure multi-account AWS environment quickly and consistently, based on best practices.

**Advantages**

* Enables scale effects over all accounts
* Reduces operational cloud cost
* Standardized factory for account creation, security guardrails and compliance controls
* Clusters resources to reduce complexity and damage impact potential
* Centralizes security controls and compliance reports (security & compliance will be your friend…)

**Principles**

*  Automate and aggregate whenever possible
* Establish managed cloud services like Landing Zone Operations, Cloud Security Operations Center, DevOps Pipeline, AMI Baking

### Overview

A typical AWS Landing Zone consists of the following account domains:

{{< image src="/images/blog/aws-landing-zone/AWS_LandingZone.jpg" class="img-fluid" alt="AWS Landing Zone" zoomable="false" >}}

**Master Account:** Your Master Account is the top-level entity for all that you do (incl. billing consolidation). There is just one Master Account which can instantiate AWS Organizations (OUs, SCPs) to manage all accounts, roles and other entities.

**Core Domain:** The core domain contains all the management and shared services you need for scalable and secure operations. E.g. One account each for auditing & security, networking, etc.

**Business Domain:** This is where your (business) services run. Best practices are showing, more and more, that for each project and each service a separate account (automated via the Account Factory) be used. This reduces the complexity and risks of operating. For the most part, the business domain will be subdivided into Production and Development, because different policies apply in each.

**Sandbox Domain:** This is where your development teams can test new services and ideas in a loosely managed environment with the lowest levels of security and governance applied.

And remember – it is your Landing Zone. It can and should be tailored to your needs and grow iteratively with your requirements. So, you don’t have to do everything in the beginning – think big, start small!

### Account Baseline

One key advantage of the AWS Landing Zone is that each account comes with a provisioned baseline (structure, policies, integrated base services, etc.). This ensures standardized security- and technical-controls across the whole landscape of accounts.

Samples for Baseline Features:

* Security Controls (access control, compliance to security frameworks like CIS AWS Foundations, AWS Foundational Security Best Practices)
* Integration of networking (automated assignment of available IP address ranges) and other shared services

We are ACAI Consulting – specialized in AWS Multi Account Security and Governance.
If you have any questions, feel free to get in touch with us: [blog@acai.gmbh](mailto:blog@acai.gmbh)

{{< image src="/images/blog/aws-landing-zone/AWS_LandingZone_BigPicture.jpg" class="img-fluid" alt="AWS Landing Zone Big Picture" zoomable="false" >}}
