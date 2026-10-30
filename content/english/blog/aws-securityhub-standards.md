---
title: "Security Standards recommended for your AWS Landing Zone – Featuring AWS Security Hub"
date: 2020-06-06T12:00:00+06:00
image: "/images/blog/aws-securityhub-standards/SecurityHubModel.svg"
author: "Michael Ullrich"
tags: ['aws', 'security', 'securityhub']
summary : "Keeping grip on the current level of security can be a challenge. AWS provides a great tool to get a consolidated overview, particularly in AWS Landing Zone architectures: AWS Security Hub"
draft: false
---

## Situation

The nature of cloud landscapes is that they are highly dynamic and grow steadily. Keeping grip on the current level of security can be a challenge. AWS provides a great tool to get a consolidated overview, particularly in [AWS Landing Zone](https://acai.gmbh/blog/aws-landing-zone/) architectures: [AWS Security Hub](https://aws.amazon.com/security-hub/?aws-security-hub-blogs.sort-by=item.additionalFields.createdDate&aws-security-hub-blogs.sort-order=desc)

## AWS Security Hub

In the following post we will introduce AWS Security Hub and two security standards we recommend you consider for your AWS accounts.

The security standards are shipped with AWS Security Hub and can be enabled with a simple click.

Note: Please be aware that both security standards deploy managed AWS Config rules that will generate costs.

The following diagram shows the concept behind AWS Security Hub:

{{< image src="/images/blog/aws-securityhub-standards/decision_tree.svg" class="img-fluid" alt="Security Hub COntrol Tailoring" loading="eager" zoomable="false" webp="false" >}}

AWS Security Hub is made for multi-account setups. You can specify a master account (usually the Core Auditing Account) and invite member accounts to the master.

## Recommended Standards

We recommend enabling the following standards. Per enabled security standard you will get an aggregated security score across all security controls, enabled for the security standard.

{{< image src="/images/blog/aws-securityhub-standards/SecurityStandards.jpg" class="img-fluid" alt="Security Standards" zoomable="false" >}}

### CIS AWS Foundations Benchmark

The Center for Internet Security ([1](https://www.cisecurity.org/)) provides a great set of benchmarks for different technologies. For AWS they provide the **CIS Amazon Web Services Foundations Benchmark** and the **CIS Benchmark for Amazon Web Services Three-tier Web Architecture**.

As mentioned AWS Security Hub comes with the CIS AWS Foundations Benchmark [[2](https://d1.awsstatic.com/whitepapers/compliance/AWS_CIS_Foundations_Benchmark.pdf)][[3](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-cis.html)] which consists of 49 security controls from the four following domains:

{{< image src="/images/blog/aws-securityhub-standards/CIS_Table.jpg" class="img-fluid" alt="CIS Table" zoomable="true" >}}

### AWS Foundational Security Best Practices

Since Q2-2020 the AWS Foundational Security Best Practices [[4](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-fsbp.html)] security standard has been available at AWS Security Hub. It consists of 31 security controls that belong to one of the following categories, which are based on the functions described in the NIST Cybersecurity Framework.

{{< image src="/images/blog/aws-securityhub-standards/FSBP_Table.jpg" class="img-fluid" alt="FSBP Table" zoomable="true" >}}

We are ACAI Consulting – specialized in AWS Multi Account Security and Governance.
If you have any questions, feel free to get in touch with us: [blog@acai.gmbh](mailto:blog@acai.gmbh)

## References

[1] [https://www.cisecurity.org/](https://www.cisecurity.org/)

[2] [AWS_CIS_Foundations_Benchmark.pdf](https://d1.awsstatic.com/whitepapers/compliance/AWS_CIS_Foundations_Benchmark.pdf)

[3] [securityhub-standards-cis.html](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-cis.html)

[4] [securityhub-standards-fsbp.html](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-fsbp.html)
