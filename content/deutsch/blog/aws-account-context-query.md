---
title: "Querying the ACF AWS Account Context Cache"
date: 2024-06-16T12:00:00+06:00
image: "/images/blog/aws-account-context-query/list_view.png"
author: "Michael Ullrich"
summary : "This post will introduce a LLM-Based Chatbot to create query expressions to work with the ACF Account Context Cache."
tags: ['aws', 'landingzone', 'security', 'acf']
draft: false
page_with_chatbot: true
---

**Sorry, currently no German translation is available for this blog post**

## Intro

The ****ACF Account Cache** is made for caching AWS account details of large AWS Organizations.

For one AWS account, the details have the following structure:

```json
{
  "accountId": "905418151471",
  "accountName": "acai_aws-lab1_wl2",
  "accountStatus": "ACTIVE",
  "accountTags": {
    "owner": "Finance",
    "environment": "Non-Prod",
    "application": "SAP",
    "type": "Workload",
    "confidentiality_level": "Restricted"
  },
  "ouId": "ou-er26-hsal28aq",
  "ouIdWithPath": "o-3iuv4h36uk/r-er26/ou-er26-08tbwblz/ou-er26-sgxk358u/ou-er26-hsal28aq",
  "ouName": "NonProd",
  "ouNameWithPath": "Root/Lab_WorkloadAccounts/BusinessUnit_1/NonProd",
  "ouTags": {
    "module_provider": "ACAI GmbH",
    "environment": "Production",
    "module_source": "github.com/acai-consulting/terraform-aws-acf-org-ou-mgmt",
    "application": "AWS MA Core",
    "cicd_ado_organization": "acai-consulting",
    "cicd_branch_name": "initial_version",
    "cicd_pipeline_name": "Org-Mgmt",
    "module_name": "terraform-aws-acf-org-ou-mgmt",
    "module_version": "1.1.1",
    "cicd_ado_project_name": "aws-lab-2024"
  }
}
```

## Querying the ACF AWS Account Context Cache

Large organizations may face scenarios where they want to select a subset of AWS Accounts based on specific criteria:

- Select all AWS Accounts where the account-tag "environment" is not "Non-Prod" *(In the ChatBot type: /Sample1)*  
- Select all AWS Accounts where "accountName" contains "core-" *(In the ChatBot type: /Sample2)*
- Select all AWS Accounts where the account-tag "environment" is "Prod" and that have "/Department_1/" in their OU-path *(In the ChatBot type: /Sample3)*
  
To accomplish this, we have introduced a query language in alignment with <a href="https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html#eb-create-pattern" target="_blank">Amazon EventBridge > Create event patterns</a>:

```text
For all accounts in the cache:
query_json = "*" 

For selected accounts in the cache:
query_json = {
    "exclude": "*" | Pattern JSON-Object | [
        Pattern JSON-Object
    ],
    "forceInclude": Pattern JSON-Object | [
        Pattern JSON-Object
    ]
}
```

**Try it out by clicking on the chat-icon on the right side of this site.**

### Architecture

We have created an <a href=" https://aws.amazon.com/de/bedrock/" target="_blank">Amazon Bedrock</a> based LLM backend that will transform user-prompts like the sample statements into ACF Account Cache Queries.

Step 1: The LLM Lambda will produce the JSON based query and provide it to the chat-bot.

Step 2: The user can then decide to query the Account Contect Cache with the query and get the account IDs that match the query.

Step 3: With the '/detail:account_id' command the user can get the account details.

{{< image src="/images/blog/aws-account-context-query/aws-account-context-query.svg" class="img-fluid" alt="CICD Pipeline Overview" zoomable="false" webp="false" >}}

### ACAI Lab AWS Organization

The full Account Context Cache of the **ACAI AWS Lab** is shown here as JSON: <a href="https://github.com/acai-consulting/acai.public/blob/main/chat-bots/acf-context-query/full_account_cache.json" target="_blank">link</a>

{{< image src="/images/blog/aws-account-context-query/account_overview.png" class="img-fluid" alt="CICD Pipeline Overview" zoomable="false" webp="false" >}}

