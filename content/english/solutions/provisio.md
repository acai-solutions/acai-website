---
title: "ACAI PROVISIO | AWS Account Baselining & Hardening"
description : "ACAI PROVISIO: A Terraform-Native solution for precise AWS account hardening and baselining at scale."

images:
  - "/images/solutions/provisio/acai_provisio_logo.png"
  # - "images/showcase/showcase-6.png"
  # - "images/showcase/showcase-2.png"
  # - "images/showcase/showcase-1.png"

draft: false

# Intro Section
intro_section:
  enable : true
  title: "ACAI PROVISIO"
  content: |
   ACAI PROVISIO helps organizations implement strong security baselines and hardening measures across their AWS accounts using Terraform, addressing the native limitations in multi-region and multi-account scenarios.
  image: "/images/solutions/provisio/acai_provisio_logo.png"

# Features Section
key_features_section:
  enable : true
  title : "Key features"
  image : "images/solutions/provisio/provisio-overview.svg"

  content_left:
  - title : "Multi-Region Management"
    icon : "fa-globe"
    content : "Apply your AWS resources across multiple AWS regions from a single Terraform configuration. Ensure consistent resources regardless of geographical distribution."

  - title : "Multi-Account Provisioning"
    icon : "fa-cloud"
    content : "Apply security policies across numerous AWS accounts from a single configuration. Maintain unified security standards across your AWS organization."

  - title : "Terraform-Native Integration"
    icon : "fa-code"
    content : "Use Terraform while overcoming its multi-region and multi-account limitations. Integrates directly with existing infrastructure-as-code practices."

  content_right:
  - title : "Precise Resource Allocation"
    icon : "fa-filter"
    content : "Define complex, rule-based account clusters for targeted provisioning. Use account metadata (tags, IDs, OU-info) to determine resource deployment scope."

  - title : "Automated Resource Deployment"
    icon : "fa-cogs"
    content : "Quickly establish and update resources across throughout your entire AWS infrastructure. Ensure immediate compliance and standardization for newly created accounts"

  - title : "Customizable Provisioning Templates"
    icon : "fa-pencil-alt"
    content : "Tailor resource configurations to your organization's specific requirements. Easily adapt to evolving organizational infrastructure needs and best practices."

# Info Section
info_section:
  enable: true
  list:
    - title: "References"
      content: "You can find more details in our references"
      links:
        - url: "https://docs.acai.gmbh/solution-provisio/10_overview/"
          link_name: "ACAI PROVISIO Documentation"
        - url: "https://github.com/acai-consulting/terraform-aws-acai-provisio-security-baseline/tree/main"
          link_name: "Sample product specification for a AWS account security baseline"

    # - title: "Media"
    #   content: "Additional media"
    #   links:
    #     - url: "#"
    #       link_name: "SEMPER product presentation"

    - title: "Blog"
      content: "Read more about PROVISIO in these blog posts"
      filter_by_tag: provisio
---
