---
title: "ACAI AWS Lab 2024"
date: 2024-10-29T20:22:16+06:00
image: "/images/blog/acai-lab-2024/pipeline_overview.png"
author: "Michael Ullrich"
summary: "The following blog post provides an overview of the ACAI reference architecture for an AWS Landing Zone."
tags: ['aws', 'landingzone', 'lab', 'acf', 'provisio', 'vecto', 'semper']
draft: false
---

**Sorry, currently no German translation is available for this blog post**

## Intro

The following blog post provides an overview of the ACAI reference architecture for an AWS Landing Zone.

Do you want to see an AWS Landing Zone that is enterprise-approved, scaleable and secure?
Do you want to see this live and in action.

Whether you use Amazon Control Tower or maintain your AWS Landing Zone with IaC tools like Terraform, this lab might inspire you.

## ACAI AWS Solutions

You will see the following modular ACAI assets woven together:

- **{{< extlink href="https://acai.gmbh/solutions/vecto/" >}}ACAI VECTO{{< /extlink >}}** - Manage your AWS Core IaC CI/CD pipelines simply and centrally

- **{{< extlink href="https://acai.gmbh/solutions/acf/" >}}ACAI ACF{{< /extlink >}}** - The Pick What You Need {{< extlink href="https://github.com/acai-consulting?q=acf&type=all&language=&sort=" >}}library{{< /extlink >}} of Terraform modules to manage the following AWS Services:
  - AWS Organization {{< extlink href="https://github.com/acai-solutions/terraform-aws-acf-org-ou-mgmt" >}}terraform-aws-acf-org-ou-mgmt{{< /extlink >}}, {{< extlink href="https://github.com/acai-solutions/terraform-aws-acf-org-delegation" >}}terraform-aws-acf-org-delegation{{< /extlink >}}
  - AWS Service Control Policies (SCPs) {{< extlink href="https://github.com/acai-solutions/terraform-aws-acf-scp" >}}terraform-aws-acf-scp{{< /extlink >}}
  - AWS IAM Identity Center {{< extlink href="https://github.com/acai-solutions/terraform-aws-acf-idc" >}}terraform-aws-acf-idc{{< /extlink >}}
  - Organization AWS CloudTrail {{< extlink href="https://github.com/acai-solutions/terraform-aws-acf-org-cloudtrail" >}}terraform-aws-acf-org-cloudtrail{{< /extlink >}}
  - AWS Backup

- **{{< extlink href="https://acai.gmbh/solutions/provisio/" >}}ACAI PROVISIO{{< /extlink >}}** - Perform baselining and hardening of your AWS accounts with Terraform:
  - {{< extlink href="https://github.com/acai-solutions/terraform-aws-acf-security-baseline" >}}terraform-aws-acf-security-baseline{{< /extlink >}}
  - {{< extlink href="https://github.com/acai-solutions/terraform-aws-acf-account-hardening" >}}terraform-aws-acf-account-hardening{{< /extlink >}}
  - Later: {{< extlink href="https://github.com/acai-solutions/terraform-aws-acf-auto-remediation" >}}terraform-aws-acf-auto-remediation{{< /extlink >}}

- **{{< extlink href="https://acai.gmbh/solutions/semper/" >}}ACAI SEMPER{{< /extlink >}}** - The solution to manage your AWS security finding lifecycle via policies.

{{< extlink href="https://github.com/acai-consulting/acai.public/blob/main/marketing/2024-ACAI-Solutions.pdf" >}}Link to ACAI Solutions Presentation{{< /extlink >}}

## ACAI AWS Lab Overview

The IaC CI/CD part of the AWS AWS Lab is hosted in Azure DevOps: {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_wiki/wikis/aws-lab-2024.wiki/6/Lab-Overview" >}}link{{< /extlink >}}

There you will find the pipeline-repos and {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_build" >}}pipelines{{< /extlink >}} and the {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/lab-settings" >}}Lab Settings{{< /extlink >}}.

{{< image src="/images/blog/acai-lab-2024/lab_overview.svg" class="img-fluid" alt="CICD Pipeline Overview" zoomable="true" webp="false" >}}

<div class="table-scroll-div">

| AWS Account | Account Name | Account ID | AWS Service |
|----------|----------|----------|----------|
| Org Mgmt | acai_aws-lab1_org-mgmt | 590183804009 | {{< extlink href="https://d-99677a9479.awsapps.com/start/#/console?account_id=590183804009&role_name=OrgMgmt_Platform_RoleA&destination=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Forganizations%2Fv2%2Fhome%2Faccounts" >}}- Organization{{< /extlink >}} <br> {{< extlink href="https://d-99677a9479.awsapps.com/start/#/console?account_id=590183804009&role_name=OrgMgmt_Platform_RoleA&destination=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Forganizations%2Fv2%2Fhome%2Fpolicies%2Fservice-control-policy" >}}- SCP{{< /extlink >}} <br> {{< extlink href="https://d-99677a9479.awsapps.com/start/#/console?account_id=590183804009&role_name=OrgMgmt_Platform_RoleA&destination=https%3A%2F%2Feu-central-1.console.aws.amazon.com%2Fsinglesignon%2Forganization%2Fhome%3Fregion%3Deu-central-1%23%2Finstances%2F69878053b8ef6231%2Fpermission-sets" >}}- Identity Center{{< /extlink >}} |
| Core SSO | acai_aws-lab1_core-sso | 761018859750 | {{< extlink href="https://d-99677a9479.awsapps.com/start/#/console?account_id=761018859750&role_name=Platform_RoleA&destination=https%3A%2F%2Feu-central-1.console.aws.amazon.com%2Fsinglesignon%2Forganization%2Fhome%3Fregion%3Deu-central-1%23%2Finstances%2F69878053b8ef6231%2Fpermission-sets" >}}- Identity Center{{< /extlink >}} |
| Core Security Tooling | acai_aws-lab1_core-security-tooling | 975050251880 | {{< extlink href="https://d-99677a9479.awsapps.com/start/#/console?account_id=975050251880&role_name=Platform_RoleA&destination=https%3A%2F%2Feu-central-1.console.aws.amazon.com%2Fsecurityhub%2Fhome%3Fregion%3Deu-central-1%23%2Fsummary" >}}- Security Hub{{< /extlink >}} <br> {{< extlink href="https://d-99677a9479.awsapps.com/start/#/console?account_id=975050251880&role_name=Platform_RoleA&destination=https%3A%2F%2Feu-central-1.console.aws.amazon.com%2Fconfig%2Fhome%3Fregion%3Deu-central-1%23%2Faggregators%2Fdetails%3Fname%3Dfoundation-aws-config-aggregator" >}}- AWS Config{{< /extlink >}} <br> {{< extlink href="https://d-99677a9479.awsapps.com/start/#/console?account_id=975050251880&role_name=Platform_RoleA&destination=https%3A%2F%2Feu-central-1.console.aws.amazon.com%2Flambda%2Fhome%3Fregion%3Deu-central-1%23%2Ffunctions%2Facai-account-cache%3Ftab%3Dcode" >}}- ACAI ACF Account Cache{{< /extlink >}} <br> {{< extlink href="https://d-99677a9479.awsapps.com/start/#/console?account_id=975050251880&role_name=Platform_RoleA&destination=https%3A%2F%2Feu-central-1.console.aws.amazon.com%2Fcloudwatch%2Fhome%3Fregion%3Deu-central-1%23logsV2%3Alog-groups%2Flog-group%2Fsemper-processed-security-findings-enriched%2Flog-events" >}}- ACAI SEMPER Enriched{{< /extlink >}} <br> {{< extlink href="https://d-99677a9479.awsapps.com/start/#/console?account_id=975050251880&role_name=Platform_RoleA&destination=https%3A%2F%2Feu-central-1.console.aws.amazon.com%2Fcloudwatch%2Fhome%3Fregion%3Deu-central-1%23dashboards%2Fdashboard%2FSEMPER_Lambda%3Fstart%3DPT168H%26end%3Dnull" >}}- ACAI SEMPER Operations{{< /extlink >}} |
| Core Log Archive | acai_aws-lab1_core-log-archive | 058264189027 | {{< extlink href="https://d-99677a9479.awsapps.com/start/#/console?account_id=058264189027&role_name=Platform_RoleA&destination=https%3A%2F%2Feu-central-1.console.aws.amazon.com%2Fs3%2Fhome%3Fregion%3Deu-central-1%23" >}}- S3 Buckets{{< /extlink >}} |
| Core Baselining | acai_aws-lab1_core-baselining | 891376920850 | {{< extlink href="https://d-99677a9479.awsapps.com/start/#/console?account_id=891376920850&role_name=Platform_RoleA&destination=https%3A%2F%2Feu-central-1.console.aws.amazon.com%2Fstates%2Fhome%3Fregion%3Deu-central-1%23%2Fstatemachines%2Fview%2Farn%253Aaws%253Astates%253Aeu-central-1%253A891376920850%253AstateMachine%253Aacai-provisio-provision-accounts-sf%3Ftype%3Dstandard" >}}- ACAI PROVISIO{{< /extlink >}} |
</div>

{{< extlink href="https://github.com/acai-consulting/acai.public/blob/main/chat-bots/acf-context-query/full_account_cache.json" >}}ACAI Lab AWS Accounts Meta-Data{{< /extlink >}}
<br>
<br>

### Connect to the Lab

Use this link to connect to the AWS SSO portal: https://acai-lab1.awsapps.com/start

<div class="table-small-div">

| Username | Password |
|----------|----------|
| lab_user1@acai.gmbh | ACAI2024 |
| lab_user2@acai.gmbh | ACAI2024 |
</div>

Assigned permissions: {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/lab-settings?path=/identity-center/assignments.tf" >}}assignments.tf{{< /extlink >}}

## ACAI Vecto Resources

The Core IaC CI/CD Resources are managed by {{< extlink href="https://acai.gmbh/solutions/vecto/" >}}ACAI VECTO{{< /extlink >}} - the pipeline repository can be found here:

- {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/core-cicd-manager" >}}Vecto Repo{{< /extlink >}}
- {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/core-cicd-manager?path=/settings.tfvars" >}}Core IaC CI/CD Specification{{< /extlink >}}

### CI/CD Pipelines

The underlying repositories of the following {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_build" >}}pipelines{{< /extlink >}} are listed below.

{{< image src="/images/blog/acai-lab-2024/pipeline_overview.png" class="img-fluid" alt="Layers" loading="eager" zoomable="false" webp="false" >}}

<div class="table-scroll-div">

| ACAI VECTO Pipeline | Pipeline Repo |
|----------|----------|
| {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_build?definitionId=67" >}}Org-Mgmt{{< /extlink >}} | {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/pipeline-org-mgmt" >}}pipeline-org-mgmt{{< /extlink >}} |
| {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/pipeline-core-scp" >}}Org-SCP{{< /extlink >}} | {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/pipeline-core-scp" >}}pipeline-core-scp{{< /extlink >}} |
| {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_build?definitionId=64" >}}Org-Org-CloudTrail{{< /extlink >}} | {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/pipeline-core-org-cloudtrail" >}}pipeline-core-org-cloudtrail{{< /extlink >}} |
| {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_build?definitionId=63" >}}Org-SSO{{< /extlink >}} | {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/pipeline-core-sso" >}}pipeline-core-sso{{< /extlink >}} |
| {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_build?definitionId=67" >}}Core-SecurityTooling{{< /extlink >}} | {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/pipeline-core-securitytooling" >}}pipeline-core-securitytooling{{< /extlink >}} |
| {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_build?definitionId=67" >}}Core-Security-SEMPER{{< /extlink >}} | {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/pipeline-core-security-semper" >}}pipeline-core-security-semper{{< /extlink >}} |
| {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_build?definitionId=67" >}}Core-LogArchive{{< /extlink >}} | {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/pipeline-core-logarchive" >}}pipeline-core-logarchive{{< /extlink >}} |
| {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_build?definitionId=67" >}}Core-Baselining{{< /extlink >}} | {{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/pipeline-core-baselining" >}}pipeline-core-baselining{{< /extlink >}} |

{{< extlink href="https://dev.azure.com/acai-consulting/aws-lab-2024/_git/lab-settings?path=/acf-settings/main.tf" >}}ACF Settings{{< /extlink >}}
</div>

ACAI Consulting is specialized in AWS Multi Account Security and Governance.

If you have any questions, feel free to get in touch with us: {{< extlink href="mailto:blog@acai.gmbh" >}}blog@acai.gmbh{{< /extlink >}}

## References

[1] {{< extlink href="https://aws.amazon.com/de/solutions/implementations/aws-landing-zone/" >}}aws-landing-zone/{{< /extlink >}}
