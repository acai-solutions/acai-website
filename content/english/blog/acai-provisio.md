---
title: "ACAI PROVISIO - AWS Account Baselining & Hardening"
date: 2024-09-08T12:00:00+06:00
image: "/images/blog/acai-provisio/list_view.png"
author: "Michael Ullrich"
summary: "ACAI PROVISIO offers a Terraform-native solution for precise AWS account hardening and baselining at scale, enhancing cloud security and governance."
tags: ['aws', 'landingzone', 'security', 'provisio']
draft: false
---

## Intro

Hashicorp Terraform and OpenTofu are well-established tools for the descriptive provisioning of cloud resources.

These tools offer modularity, effective drift detection and remediation, robust testing features, and straightforward import of existing resources.

However, when implementing AWS account baselining and hardening, managing individual providers for each AWS account-region combination presents certain challenges.

This blog post outlines how [ACAI PROVISIO]({{< ref "/solutions/provisio" >}}) can help you overcome these challenges to fully leverage Terraform.

## Requirements

The requirements for the solution included:

- **Composability**: It shall be possible to specify individual **Packages** using Terraform's native HCL.
- **Precise Deployment**: It shall be possible to define **AWS Account Clusters** and specify which **Packages** should be deployed to each cluster, ensuring targeted and efficient security enhancements.

## Solution Architecture

The **Deployment Manifest** combines **Packages** with **AWS Account Clusters** to specify the individual baseline for each AWS Account, as illustrated below:

{{< image src="/images/blog/acai-provisio/acai_provisio_model.svg" class="img-fluid" alt="ACAI PROVISIO Model" zoomable="true" webp="false" >}}

Further details on this deployment architecture are visualized here:

{{< image src="/images/blog/acai-provisio/acai_provisio.svg" class="img-fluid" alt="ACAI PROVISIO Overview" zoomable="true" webp="false" >}}

## Rendering the Packages

The following code will render the ACAI PROVISIO packages (Step 2 in the diagram).

For example, the package **terraform-aws-acai-acf-account-hardening** will be applied with two different settings: once with default EBS encryption enabled and once with it disabled, for baselining the Core Image Factory account.

```hcl
module "account_hardening_default" {
  source = "git::https://github.com/acai-consulting/terraform-aws-acai-acf-account-hardening.git?ref=main"

  provisio_settings = {
    provisio_regions = local.platform_settings.governance.org_mgmt
  }
  account_hardening_settings = local.platform_settings.security.account_hardening
}

module "account_hardening_without_ebs" {
  source = "git::https://github.com/acai-consulting/terraform-aws-acai-acf-account-hardening.git?ref=main"

  provisio_settings = {
    provisio_package_name = "account-hardening-without-ebs"
    provisio_regions = local.platform_settings.governance.org_mgmt
  }
  account_hardening_settings = merge(
    local.platform_settings.security.account_hardening,
    {
      ebs_encryption = false
    }
  )
}

module "acf_configservice" {
  source = "git::https://github.com/acai-solutions/terraform-aws-acf-configservice.git//member/acai-provisio?ref=main"

  provisio_settings = {
    provisio_regions = local.platform_settings.governance.org_mgmt
    import_resources = true
  }
  member_settings = local.platform_settings.security.semper.member
}

module "acai_semper" {
  source = "git::https://github.com/acai-consulting/terraform-aws-acai-semper.git//member/acai-provisio?ref=fmain"

  provisio_settings = {
    provisio_regions = local.platform_settings.governance.org_mgmt
    import_resources = true
  }
  member_settings = local.platform_settings.security.semper.member
}

...
```

## Specifying the Deployment Targets

The following code specifies various AWS Account Clusters based on the [ACF Account Cache](https://github.com/acai-solutions/terraform-aws-acf-account-cache) convention (Step 3 in the diagram):

**AWS Account Clusters:**

- non_image_factory: All AWS Accounts except the Core Image Factory Account
- image_factory: The Core Image Factory Account
- backup_targets: All AWS Accounts except the Core Backup Account
- workload_prod: All AWS Accounts with account-tags "type" = "Workload" and "environment" = 'Prod'

```hcl
locals {
  non_image_factory = jsonencode(
  {
    "exclude" = {
      "accountId" = [
        "183295430209" # ACAI Lab Core Image Factory Account ID
      ]
    }
  })
  image_factory = jsonencode(
  {
    "exclude" = "*",
    "forceInclude" = {
      "accountId" = [
        "183295430209" # ACAI Lab Core Image Factory Account ID
      ]
    }
  })
  backup_targets = jsonencode(
  {
    "exclude" = "*",
    "forceInclude" = {
      "accountId" = [
        {
          "contains-not" = "211125437884" # ACAI Lab Core Backup Account ID
        }        
      ]
      "accountTags" = {
        "environment" = "Prod"
      }
    }
  })
  workload_prod = jsonencode(
  {
    "exclude" = "*",
    "forceInclude" = {
      "accountTags" = {
        "type" = "Workload"
        "environment" = "Prod"
      }
    }
  })
}
```

The overview of the [ACF Account Cache](https://github.com/acai-solutions/terraform-aws-acf-account-cache) of the **ACAI AWS Lab** is shown here as JSON: <a href="https://github.com/acai-consulting/acai.public/blob/main/chat-bots/acf-context-query/full_account_cache.json" target="_blank">link</a>

## Specifying the Deployment of the Packages

The following code details the package deployment strategy (Step 4 in the diagram).

It will lead to the following account baselining:

- account-baselining-default: will provision the specified provisio_packages to all AWS Accounts in your AWS Organization
- account-hardening-non-image-factory: will provision the **account-hardening** provisio_package to the **non_image_factory** AWS Account Cluster
- account-hardening-image-factory: will provision the **account-hardening-without-ebs** provisio_package to the **image_factory** AWS Account Cluster
- aws-backup: will provision the **acf-backup** provisio_package to the **backup_targets** AWS Account Cluster
- workload-prod: will provision the **acf-auto-remediation** provisio_package to the **workload_prod** AWS Account Cluster

```hcl
locals {
  package_deployment = [
    {
      deployment_name = "account-baselining-default"
      provisio_packages = [
        "acf-configservice",
        "acai-semper",
        "acf-image-factory"
      ]
    },
    {
      deployment_name = "account-hardening-non-image-factory"
      account_scope   = local.non_image_factory
      provisio_packages = [
        "account-hardening"
      ]
    },    
    {
      deployment_name = "account-hardening-image-factory"
      account_scope   = local.image_factory
      provisio_packages = [
        "account-hardening-without-ebs"
      ]
    },    
    {
      deployment_name = "aws-backup"
      account_scope   = local.backup_targets
      provisio_packages = [
        "acf-backup"
      ]
    },    
    {
      deployment_name = "workload-prod"
      account_scope   = local.workload_prod
      provisio_packages = [
        "acf-auto-remediation"
      ]
    }
  ]
}
```

## Deploy ACAI PROVISIO

Deploying the [ACF Account Cache](https://github.com/acai-solutions/terraform-aws-acf-account-cache) and [ACAI PROVISIO]({{< ref "/solutions/provisio" >}}) is the final step in maintaining the baseline and hardening of the AWS accounts across your AWS Organization:

```hcl
# ---------------------------------------------------------------------------------------------------------------------
# ¦ ACF ACCOUNT CACHE
# ---------------------------------------------------------------------------------------------------------------------
module "context_cache" {
  source = "git::https://github.com/acai-solutions/terraform-aws-acf-account-cache.git?ref=1.3.0"

  settings = {
    org_reader_role_arn = local.org_reader_role_arn
  }
  providers = {
    aws = aws.Act_891376920850_Baselining
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# ¦ ACAI PROVISIO
# ---------------------------------------------------------------------------------------------------------------------
module "account_baseline" {
  source = "git::https://github.com/acai-consulting/terraform-aws-acai-provisio.git?ref=1.0.0"

  provisio_settings = {
    org_reader_role_arn = local.org_reader_role_arn
    core_provisio = {
      account_cache = {
        existing_ddb_name              = module.context_cache.ddb_name
        existing_permission_policy_arn = module.context_cache.cache_lambda_permission_policy_arn
      }
    }
  }
  provisio_baselining_specification = {
    terraform_version     = "1.5.7"
    provider_aws_version  = "5.40"
    provisio_regions      = local.platform_settings.governance.org_mgmt
    package_specification = [
      module.account_hardening_default,
      module.account_hardening_without_ebs,
      module.acf_configservice,
      module.acf_imagefactory,      
      module.acf_backup,      
      module.acai_semper,
    ]
    package_deployment = local.package_deployment
  }
  providers = {
    aws = aws.Act_891376920850_Baselining
  }
}
```

## Conclusion

With [ACAI PROVISIO]({{< ref "/solutions/provisio" >}}) and the strategies outlined above, you can efficiently maintain the security and governance of your entire AWS Organization.

ACAI Consulting specializes in AWS Multi-Account Security and Governance. If you have any questions, feel free to get in touch with us at: [blog@acai.gmbh](mailto:blog@acai.gmbh)
