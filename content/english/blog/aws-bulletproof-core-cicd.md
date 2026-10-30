---
title: "Bulletproof IaC CI/CD for AWS Core Accounts"
date: 2024-04-26T11:00:00+06:00
image: "images/blog/aws-bulletproof-core-cicd/list_view.png"
author: "Michael Ullrich"
description: ""
summary: "This post explores using least privilege principles to manage AWS Core Account resources via Infrastructure as Code (IaC). Least privilege, key to many security frameworks, ensures individuals and processes have only essential permissions. Standards like ISO 27001, NIST 800-53, and PCI DSS promote this to reduce unauthorized access and data breach risks."
tags: ['aws', 'security', 'vecto', 'acf', 'provisio']
---
## Context

This blog post explores the application of least privilege principles in the management of AWS Core Account resources through Infrastructure as Code (IaC). At its core, the principle of least privilege is pivotal to many security frameworks, dictating that individuals and processes should only possess the essential permissions needed for their roles. Standards such as ISO/IEC 27001, NIST SP 800-53, and PCI DSS all champion this principle to curb the risks associated with unauthorized access and data breaches.

The tech industry widely endorses the use of IaC tools, like Terraform, for cloud service management due to several compelling benefits:

- **Speed and Efficiency:** Automation via IaC significantly trims down deployment times.
- **Consistency and Repeatability:** Ensures deployments are uniform and error-free.
- **Agility and Scalability:** Facilitates quick adaptations and enhancements to AWS resource allocations.
- **Security and Compliance:** Embeds security directly into deployment processes, enabling automated compliance checks that preemptively address potential infractions.
- **Collaboration and Governance:** Promotes effective collaboration through meticulous version control and ensures robust oversight of infrastructural modifications.

We will focus on IaC CI/CD pipelines to manage the deployment of Foundation Core features, integrating a variety of AWS Services across multiple Core Accounts. The deployment process covers several principal use cases, including:

- **Use Case 1:** A dedicated Core Pipeline deploys resources within a single Core Account.
- **Use Case 2:** Coordinated efforts of multiple Core Pipelines manage deployments to a singular Core Account.
- **Use Case 3:** A single Core Pipeline administers resource deployment across multiple Core Accounts.

{{< image src="/images/blog/aws-bulletproof-core-cicd/use_cases.svg" class="img-fluid" alt="Use-Cases" zoomable="false" webp="false" >}}

The integration of least privilege principles into IaC CI/CD pipelines especially for the Core Accounts is crucial, underscoring the necessity of stringent access controls to safeguard your infrastructure.

## Solution

Our solution aims to redefine how CI/CD Pipelines for AWS Landing Zone core accounts are managed by leveraging again Infrastructure as Code. The solution uses Azure DevOps as the CI/CD platform of choice (but can also be adopted to other platforms like e.g. Terraform Cloud). This approach focuses on automating the provisioning and management of Azure DevOps and AWS resources, enhancing security, and ensuring operational efficiency.

**Azure DevOps Integration**: The core of our solution, the 'Core-CICD-Manager', is a Terraform-based pipeline hosted on Azure DevOps. This pipeline is meticulously designed to handle multiple use cases across AWS Core Accounts by interpreting a straightforward HCL (HashiCorp Configuration Language) specification file.

**Specification Driven Deployment**: Each pipeline within the 'Core-CICD-Manager' is configured to deploy core CI/CD pipelines based on predefined settings. These settings dictate which AWS principals are provisioned, ensuring that each deployment adheres to the principle of least privilege and is compliant with organizational policies.

**Managed AWS Principals and DevOps Resources**: For every core CI/CD pipeline, corresponding AWS Principals and Azure DevOps resources (repositories and pipelines) are managed and maintained efficiently. This ensures a streamlined workflow from development to production, minimizing the potential for errors and security breaches.

**Visual and Technical Overview**:
{{< image src="/images/blog/aws-bulletproof-core-cicd/use_cases_at_cicd_manager.svg" class="img-fluid" alt="Core CICD-Manager Use Cases" zoomable="true" webp="false" >}}

**Simplified Configuration**:
Here's an example of how easily the Core CI/CD resources can be specified and managed through our solution.

- It will provision ADO resources (repository and pipeline) named 'Org-Mgmt' with three feature-specific AWS principals in the AWS Org Management account (org_mgmt).
- It will provision ADO resources (repository and pipeline) named 'Core-SCP' with a AWS principal to manage the SCPs in the AWS Org Management account (org_mgmt).
- It will provision ADO resources (repository and pipeline) named 'Core-SSO' with a AWS principal to manage the AWS Identity Center in the AWS Org Management account (org_mgmt).
- It will provision ADO resources (repository and pipeline) named 'Core-Org-CloudTrail' with a AWS principal to manage the Organization CloudTrail in the AWS Org Management account (org_mgmt) and a AWS principal to manage the Organization CloudTrail Bucket in the AWS Core Logging account (core_logging).
- It will provision ADO resources (repository and pipeline) named 'Core-Security' with a AWS principal to manage the resources in the AWS Core Security account (core_security).
- It will provision ADO resources (repository and pipeline) named 'Core-Baselining' with a AWS principal to manage the resources in the AWS Core Security account (core_baselining).

```hcl
core_cicd_settings = {
  pipelines = [
    {
      pipeline_name = "Org-Mgmt"
      aws_targets = [
        {
          feature_name     = "OrgMgmt"
          cf_template_name = "org_mgmt.yaml.tftpl"
          accounts = ["org_mgmt"]
        },
        {
          feature_name     = "OrgDelegation"
          cf_template_name = "org_delegation.yaml.tftpl"
          accounts         = ["org_mgmt"]
        },
        {
          feature_name     = "OrgStructure"
          cf_template_name = "org_ou_mgmt.yaml.tftpl"
          accounts         = ["org_mgmt"]
        }            
      ]
    },
    {
      pipeline_name = "Core-SCP"
      aws_targets = [
        {
          feature_name     = "ScpManagement"
          cf_template_name = "scp_management.yaml.tftpl"
          accounts         = ["org_mgmt"]
        }
      ]
    },
    {
      pipeline_name = "Core-SSO"
      aws_targets = [
        {
          feature_name     = "IdentityCenter"
          cf_template_name = "aws_idc_admin.yaml.tftpl"
          accounts         = ["org_mgmt"]
        }
      ]
    },
    {
      pipeline_name = "Core-Org-CloudTrail"
      aws_targets = [
        {
          feature_name     = "CloudTrailAdmin"
          cf_template_name = "org_cloudtrail_admin.yaml.tftpl"
          accounts         = ["org_mgmt"]
        },
        {
          feature_name     = "CloudTrailBucket"
          cf_template_name = "org_cloudtrail_bucket.yaml.tftpl"
          accounts         = ["core_logging"]
        }

      ]
    },
    {
      pipeline_name = "Core-Security"
      aws_targets = [
        {
          feature_name     = "FullAccess"
          cf_template_name = "admin_access.yaml.tftpl"
          accounts         = ["core_security"]
        }
      ]
    },
    {
      pipeline_name = "Core-Baselining"
      aws_targets = [
        {
          feature_name     = "FullAccess"
          cf_template_name = "admin_access.yaml.tftpl"
          accounts         = ["core_baselining"]
        }
      ]
    },
  ]
  aws_settings = {
    org_mgmt_account_id = "org_mgmt"
    resource_prefix     = "foundation-"
  }
  ado_settings = {
    ado_org_service_url = "https://dev.azure.com/acai-consulting/"
    ado_project_name    = "aws-lab1"
    pipeline_default = {
      aws_agent_pool_name = "aws-production-ecs-agent"
      access_to_variable_groups = [
        "REPO_ACCESS_TOKEN"
      ]
    }
  }
  aws_account_id_lookup = {
    org_mgmt        = "471112581705"
    core_baselining = "992382707537"
    core_security   = "891377225812"
    core_logging    = "851725413964"
  }
}
```

The cf_template names refer to the specification of the provisioning AWS principals provided in the '/cicd-principals/acf-cicd-manager' folders of this public ACF modules:

- Terraform Module [acf-org-delegation][acf-org-delegation-url] provides the CI/CD Manager template: [org_delegation.yaml.tftpl](https://github.com/acai-solutions/terraform-aws-acf-org-delegation/blob/main/cicd-principals/acf-cicd-manager/org_delegation.yaml.tftpl)
- Terraform Module [acf-org-ou-mgmt][acf-org-ou-mgmt-url] provides the CI/CD Manager template: [org_ou_mgmt.yaml.tftpl](https://github.com/acai-solutions/terraform-aws-acf-org-ou-mgmt/blob/main/cicd-principals/acf-cicd-manager/org_mgmt.yaml.tftpl)
- Terraform Module [acf-scp][acf-scp-url] provides the CI/CD Manager template: [scp_management.yaml.tftpl](https://github.com/acai-solutions/terraform-aws-acf-scp/blob/main/cicd-principals/acf-cicd-manager/scp_management.yaml.tftpl)
- Terraform Module [acd-idc][acd-idc-url] provides the CI/CD Manager template: [aws_idc_admin.yaml.tftpl](https://github.com/acai-solutions/terraform-aws-acf-idc/blob/main/cicd-principals/acf-cicd-manager/aws_idc_admin.yaml.tftpl)
- Terraform Module [acf-org-cloudtrail][acf-org-cloudtrail-url] provides the CI/CD Manager templates: [org_cloudtrail_admin.yaml.tftpl](https://github.com/acai-solutions/terraform-aws-acf-org-cloudtrail/blob/main/cicd-principals/acf-cicd-manager/org_cloudtrail_admin.yaml.tftpl), [org_cloudtrail_bucket.yaml.tftpl](https://github.com/acai-solutions/terraform-aws-acf-org-cloudtrail/blob/main/cicd-principals/acf-cicd-manager/org_cloudtrail_bucket.yaml.tftpl)

The specification above will lead to this deployment:

{{< image src="/images/blog/aws-bulletproof-core-cicd/account_landscape.svg" class="img-fluid" alt="Core CICD-Manager in action" zoomable="true" webp="false" >}}

With **ACAI AWS CI/CI Manager** in place, this CI/CD setup can be accomplished in less than an hour.

If you have any questions, feel free to get in touch with us: [blog@acai.gmbh](mailto:blog@acai.gmbh)

<!-- MARKDOWN LINKS & IMAGES -->
[acf-org-ou-mgmt-url]: https://github.com/acai-solutions/terraform-aws-acf-org-ou-mgmt
[acf-org-delegation-url]: https://github.com/acai-solutions/terraform-aws-acf-org-delegation
[acf-scp-url]: https://github.com/acai-solutions/terraform-aws-acf-scp
[acf-org-cloudtrail-url]: https://github.com/acai-solutions/terraform-aws-acf-org-cloudtrail
[acd-idc-url]: https://github.com/acai-solutions/terraform-aws-acf-idc
