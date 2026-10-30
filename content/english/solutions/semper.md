---
title: "ACAI SEMPER | Complete control over your AWS Security"
description : "SEMPER enables precise security sensor management, ensures consistency and automates security findings processing."

images:
  - "/images/solutions/semper/acai_semper_logo.webp"
  # - "images/showcase/showcase-6.png"
  # - "images/showcase/showcase-2.png"
  # - "images/showcase/showcase-1.png"

draft: false

# Intro Section
intro_section:
  enable : true
  title: "ACAI SEMPER"
  content: |
   The forthcoming NIS 2 Directive emphasizes the importance of managing incidents with increased diligence and resolving them promptly. Additionally, it mandates that all pertinent and impacted stakeholders receive the necessary information to respond effectively.  [<a href="https://d1.awsstatic.com/whitepapers/compliance/NIS_2_Considerations_for_AWS_Customers.pdf" target="_blank">1</a>]

   For AWS Customers with large Landing Zones ACAI SEMPER will help achieving this goal. It is a policy-based DevOps driven solution to manage the end-to-end lifecycle of your incidents.
  image: "/images/solutions/semper/acai_semper_logo.png"
  # cta:
  #   show: true
  #   text: "Book a demo"
  #   link: "#"

# Features Section
key_features_section:
  enable : true
  title : "Key features"
  image : "images/solutions/semper/semper-flow.svg"

  content_left:
  - title : "Provision security sensors"
    icon : "fa-share-alt"
    content : "Provision sensors (AWS Config- and AWS EventBridge Rules) precisely in the selected regions of your required AWS accounts."

  - title : "Tailor AWS Security Hub Standards"
    icon : "fa-cogs"
    content : "Manage the security standards of AWS Security Hub on AWS account level."

  - title : "More context information"
    icon : "fa-pencil-alt"
    content : "Enrich relevant security findings with account context information for better post processing."

  content_right:
  - title : "Drop Security Findings"
    icon : "fa-filter"
    content : "Define policies for filtering out accepted security findings and automated reflection to AWS Security Hub and Amazon GuardDuty."

  - title : "Policy as Code"
    icon : "fa-code"
    content : "Manage all SEMPER features with a single Policy as Code repository."

  - title : "Serverless and AWS-native"
    icon : "fa-cloud"
    content : "Our serverless solution integrates natively with AWS Config, AWS CloudTrail, AWS Security Hub and Amazon GuardDuty in your AWS Organization. No data leaves your perimeter."


# # Explanations Section
# explanations_section:
#   enable: true
#   title: "In a nutshell..."
#   list:
#     - title: "Policy based Security Sensor Distribution"
#       image: "images/solutions/semper/semper-configure.webp"
#       content: |
#         SEMPER deploys and configures **sensors** in all your AWS Accounts based on predefined policy sets that you can customize and extend. The sensors are built on the cloud native services AWS Security Hub, AWS CloudTrail, AWS Config and Amazon GuardDuty. We continuously extend and optimize the policy sets to meet **security best practices and compliance standards**.

#     - title: "Policy based Security Finding Processing"
#       image: "images/solutions/semper/semper-processing.webp"
#       content: |
#         SEMPER **collects** all the sensor events centrally and **enriches** them with important metadata like source account tags, context from AWS Organizations and policy based infos. Furthermore, SEMPER is capable of **suppressing and filtering** false positives based on your predefined rules.
#         The enriched findings are sent to an SNS Topic and persisted in a CloudWatch Logs stream. From there you can either **pass** them for further analysis to a third party tool of your choice (Splunk, Logstash, AWS QuickSight, etc) or you can go a step further and implement [auto-remediation](/faq#autoremediation 'What is auto-remediation?') for certain findings.

# Info Section
info_section:
  enable: true
  list:
    - title: "References"
      # content: "You can find more details in our documentation"
      links:
        - url: "https://docs.acai.gmbh/solution-semper/10_overview/"
          link_name: "ACAI SEMPER Documentation"
        - url: "https://d1.awsstatic.com/whitepapers/compliance/NIS_2_Considerations_for_AWS_Customers.pdf"
          link_name: "[1] AWS Whitepaper - NIS2 Considerations for AWS Customers"

    # - title: "Media"
    #   content: "Additional media"
    #   links:
    #     - url: "#"
    #       link_name: "SEMPER product presentation"

    - title: "Blog"
      content: "Read more about SEMPER in these blog posts"
      filter_by_tag: semper
---
