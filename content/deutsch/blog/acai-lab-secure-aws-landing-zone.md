---
title: "ACAI Lab – Secure AWS Landing Zone"
date: 2020-11-21T11:22:16+06:00
image: "/images/blog/acai-lab-secure-aws-landing-zone/lab1_overview.svg"
author: "Michael Ullrich"
summary: "The following blog-post introduces the ACAI Lab – Secure AWS Landing Zone. It lets you experience a live AWS Landing Zone deployment."
tags: ['aws', 'landingzone', 'security', 'securityhub', 'guardduty', 'lab']
draft: false
---

**Sorry, currently no German translation is available for this blog post**

The following blog-post introduces the ACAI Lab – Secure AWS Landing Zone.

It lets you experience a live AWS Landing Zone deployment in a publicly accessible sandbox environment from two perspectives: Security Operator, Application DevOps-Team.

{{< image src="/images/blog/acai-lab-secure-aws-landing-zone/lab1_overview.svg" class="img-fluid" alt="Lab Overview" loading="eager" zoomable="false" webp="false" >}}

Here are the direct links to the accounts of the individual roles –It’s recommended to open each account’s URL in a different private browser window in order to avoid single-sign-on related issues:

<div class="table-scroll-div">

| Perspective             | Account          | Account-ID    | Links                                                                                                    |
|-------------------------|------------------|---------------|----------------------------------------------------------------------------------------------------------|
| Security Operator       | Core Monitoring  | 321744974957  | –                                                                                                        |
| Security Operator       | Core Logging     | 735600569007  | [https://secure-lz.aws.acai-labs.ch/core-logging](/sorry)       |
| Security Operator       | Core Auditing    | 263761644432  | [https://secure-lz.aws.acai-labs.ch/core-auditing/securityhub](/sorry)<br>[https://secure-lz.aws.acai-labs.ch/core-auditing/guardduty](/sorry) |
| Application DevOps-Team | Business Prod    | 212262933260  | [https://secure-lz.aws.acai-labs.ch/business1-prod](/sorry)   |
| Application DevOps-Team | Business NonProd | 001683013005  | [https://secure-lz.aws.acai-labs.ch/business1-nonprod](/sorry) |

</div>

### Core Monitoring Account

The provided Kibana dashboard visualizes event logs (AWS CloudTrail, AWS Security Hub and Amazon GuardDuty) of all AWS accounts belonging to your landing zone and collected in real-time.

{{< image src="/images/blog/acai-lab-secure-aws-landing-zone/core-monitoring-1024x515.png" class="img-fluid" alt="Core Monitoring" webp="false" zoomable="true" >}}

### Core Logging Account

Try the Core Logging live demo by clicking here: [https://secure-lz.aws.acai-labs.ch/core-logging](/sorry)

The Core Logging account contains the S3 buckets for the audit logs. The logs are KMS encrypted have versioning enabled and a life-cycle policy configured for limited data retention.

{{< image src="/images/blog/acai-lab-secure-aws-landing-zone/core-logging.png" class="img-fluid" alt="Core Logging" zoomable="false" >}}

### Core Auditing Account

The Core Auditing Account provides the Amazon Security Hub master and the Amazon GuardDuty master aggregating the data from all members. So, from a single navigation point you can get security insights on the whole landscape of your AWS accounts.

### AWS Security Hub

Try the Core Auditing Security Hub live demo by clicking here: [https://secure-lz.aws.acai-labs.ch/core-auditing/securityhub](/sorry)

AWS Security Hub is your single pane of security.

In the lab AWS Security Hub has two standards enabled – for details see our other blog post: Security Standards recommended for your AWS Landing Zone

{{< image src="/images/blog/acai-lab-secure-aws-landing-zone/SecHubDetail.png" class="img-fluid" alt="Sec Hub Detail" zoomable="false" >}}

### Amazon GuardDuty

Try the Core Auditing GuardDuty live demo by clicking here: [https://secure-lz.aws.acai-labs.ch/core-auditing/guardduty](/sorry)

GuardDuty provides you an overview of the security findings which popped up in your account landscape. Per finding you get detailed information as a starting point for your analysis:

{{< image src="/images/blog/acai-lab-secure-aws-landing-zone/Guardduty.png" class="img-fluid" alt="Guardduty" zoomable="false" >}}

### Business Accounts

This is where the landing zone scales out – you can have hundreds of business accounts.

Try out the existing sample business accounts by clicking here: [https://secure-lz.aws.acai-labs.ch/business1-prod](/sorry) or [https://secure-lz.aws.acai-labs.ch/business1-nonprod](/sorry)

Note, that you can also navigate to Amazon Security Hub and Amazon GuardDuty in each of the accounts and will see the data on account-level.

### Detailed Lab-Overview

The following image provides you an overview of the AWS services deployed in the lab and the dataflows.

{{< image src="/images/blog/acai-lab-secure-aws-landing-zone/Lab1_Details.svg" class="img-fluid" alt="Lab Details" webp="false" zoomable="true" >}}

<div style="border:1px solid; padding:10px; margin-top:10px">

| Important information on data privacy |
|-------------------------|
| Please note that for AWS Console Access you will be redirected to AWS. Your IP-address will be logged and show up in various AWS services.|
| To hide your IP-address you can either create an EC2 instance and use it as a jump-host or use a VPN provider.|
</div>

###

We are ACAI Consulting - specialized in AWS Multi Account Security and Governance.
If you have any questions, feel free to get in touch with us: [blog@acai.gmbh](mailto:blog@acai.gmbh)
