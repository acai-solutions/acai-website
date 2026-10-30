---
title: "Manage AWS Security Hub Standards and Controls"
date: 2024-08-25T18:00:00+06:00
image: "/images/blog/aws-semper-securityhub-management/list_view.png"
author: "Michael Ullrich"
tags: ['aws', 'security', 'securityhub', 'semper']
summary : "To maintain your individual AWS Security Hub baseline, it is recommended to tailor your Security Hub Controls and to individually process the generated findings."
draft: false
---

## Situation

[AWS Security Hub](https://aws.amazon.com/security-hub/?aws-security-hub-blogs.sort-by=item.additionalFields.createdDate&aws-security-hub-blogs.sort-order=desc) is a great tool to constantly measure and monitor the compliance of your AWS landscape. Further details in this blog post: [Link]({{< ref "/blog/aws-securityhub-standards.md" >}})

Per enabled [Security Hub Standard](https://docs.aws.amazon.com/securityhub/latest/userguide/standards-reference.html), per organization member account, per AWS region the [Security Hub Controls](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-controls-reference.html) do their job and constantly evaluate your AWS resources.

Especially in large scale environments depending on the number of enabled standards and the linked number of Security Hub controls and evaluation findings can quickly reach a five to six digit number.

To reflect your company individual security baseline, ignoring numerous Security Hub Controls in selected AWS Accounts might be very recommended.

The [central configuration capabilities of AWS Security Hub](Introducing new central configuration capabilities in AWS Security Hub) go in a good direction.

If you are looking for a more flexibe way of adressing you member accounts and regions leveraging the [ACF Account Query language](https://github.com/acai-solutions/terraform-aws-acf-account-cache), you can manage Security Hub with [ACAI SEMPER]({{< ref "/solutions/semper.md" >}}).

## AWS Security Hub Control Tailoring

From a Security Hub Standard choose a Control with a high grade of failed compliance checks.
Evaluate if sufficient compensating controls are in place:

- If yes: Evaluate if the compensation applies to all your AWS Regions and -Accounts.
  - If yes: Create an **ACAI SEMPER Configuration Policy**, to disable the Security Hub Control in all your AWS Regions in all your AWS Accounts.
  - If no: Create an **ACAI SEMPER Configuration Policy**, with a policyScope-section, to disable the Security Hub Control in the relevant AWS Regions of the AWS Accounts.
- If no: Evaluate the risk of non-compliance versus the effort/cost of compliance for the selected Security Hub Control.
  - Check if non-compliance is acceptable for all your AWS Regions in all your AWS Accounts?
    - If yes: Create an **ACAI SEMPER Configuration Policy**, with a policyScope-section, to disable the Security Hub Control in the relevant AWS Regions of the AWS Accounts.
    - If no: Is non-compliance acceptable for a cluster of your AWS Regions / AWS Accounts?
      - If yes: Create an **ACAI SEMPER Configuration Policy**, with a policyScope-section, to disable the Security Hub Control in the relevant AWS Regions of the AWS Accounts.
      - If no: If non-compliance for the selected Security Hub Control is not acceptable for all your AWS Regions and AWS Accounts, put resolutions/controls in place to reach compliance.

{{< image src="/images/blog/aws-semper-securityhub-management/decision_tree.svg" class="img-fluid" alt="Security Hub COntrol Tailoring" loading="eager" zoomable="false" webp="false" >}}

With the following SEMPER policy you will enable Security Hub Standards per AWS Region in all your AWS Accounts.

```json
{
  "metaData": {
    "version": "1.0.0",
    "domain": "configure",
    "type": "securityhub_standards"
  },
  "configure": {
    "securityHubStandards": [
      {
        "standardName": "AWS Foundational Security Best Practices",
        "standardIdentifier": "aws-foundational-security-best-practices/v/1.0.0",
        "standardArn": "arn:aws:securityhub:${region}::standards/aws-foundational-security-best-practices/v/1.0.0",
        "targetState": "ENABLED",
        "policyScope": {}
      },
      {
        "standardName": "CIS AWS Foundations Benchmark v1.4.0",
        "standardIdentifier": "cis-aws-foundations-benchmark/v/1.4.0",
        "standardArn": "arn:aws:securityhub:${region}::standards/cis-aws-foundations-benchmark/v/1.4.0",
        "targetState": "ENABLED",
        "policyScope": {}
      },
      {
        "standardName": "NIST 800-53 Controls",
        "standardIdentifier": "nist-800-53/v/5.0.0",
        "standardArn": "arn:aws:securityhub:${region}::standards/nist-800-53/v/5.0.0",
        "targetState": "ENABLED",
        "policyScope": {}
      }
    ]
  }
}
```

With the following SEMPER policy you will disable a group of Security Hub Controls in all your AWS Regions and AWS Accounts.

```json
{
  "metaData": {
    "version": "1.0.0",
    "domain": "configure",
    "type": "securityhub_usecase_controls",
    "title": "CIS AWS 1.4 Monitoring Controls",
  },
  "configure": {
    "disableReason": "Root-User actions are blocked via SCP.",
    "disabledControls": [
      {
        "standardIdentifier": "cis-aws-foundations-benchmark/v/1.4.0",
        "controlId": [
          "4.*"
        ]
      }
    ]
  }
}
```

With the following SEMPER policy you precisely precisely select a cluster of AWS Accounts, to disable Security Hub Controls in multiple Standards.

```json
{
  "metaData": {
    "version": "1.0.0",
    "domain": "configure",
    "type": "securityhub_usecase_controls",
    "title": "MFA for Account Root User",
    "description": [
      "For Non Core-Accounts ignore SH.Controls requesting for a MFA for the Account Root User",
      "Will disable the generic SH.Controls IAM.6, IAM.9"
    ]
  },
  "configure": {
    "policyScope": {
      "accountScope": {
        "exclude": [
          {
            "accountTags": {
              "accountType": "Core"
            }
          }
        ]
      }
    },
    "disableReason": "Root-User actions are blocked via SCP.",
    "disabledControls": [
      {
        "standardIdentifier": "aws-foundational-security-best-practices/v/1.0.0",
        "controlId": [
          "IAM.6"
        ]
      },
      {
        "standardIdentifier": "cis-aws-foundations-benchmark/v/1.4.0",
        "controlId": [
          "1.5",
          "1.6"
        ]
      },
      {
        "standardIdentifier": "nist-800-53/v/5.0.0",
        "controlId": [
          "IAM.6",
          "IAM.9"
        ]
      }
    ]
  }
}
```

## AWS Security Hub Finding Management

For Security Hub Controls that will stay enabled, you might have the demand, to accept failed tests for specific resources.
As an example it might be possible, that specific S3 buckets in an account shall allow public access.
In this case the Security Hub Control **[S3.8] S3 general purpose buckets should block public access** shall be ignored for specific buckets.

With the following SEMPER policy you precisely select S3.8 findings for the S3 bucket that should allow public access and suppress them.

```json
{
  "metaData": {
    "version": "1.0.0",
    "type": "filter_securityhub_finding",
    "title": "Suppress S3.8 findings for workload_1 account explicit public bucket.",
  },
  "filtering": {
    "policyScope": {
      "accountScope": {
        "exclude": "*",
        "forceInclude": {
          "accountId": [
            "123456789012"
          ]
        }
      }
    },
    "findingPattern": {
      "detail": {
        "Compliance": {
          "Status": "FAILED",
          "SecurityControlId": "S3.8"
        },
        "Resources": {
          "Details": {
            "AwsS3Bucket": {
              "Name": "this-bucket-must-be-public-123456789012"
            }
          }
        }
      }
    }
  }
}
```

You can also trigger actions like alarming or auto-remediation for specific Control Findings from specific resources .

```json
{
  "metaData": {
    "version": "1.0.0",
    "type": "extension",
    "title": "For a specific bucket in the account 123456789012 change the criticality of control S3.8 from 'High' to 'Critical', auto-remediate the public access and notify the account owner.",
  },
  "filtering": {
    "policyScope": {
      "accountScope": {
        "exclude": "*",
        "forceInclude": {
          "accountId": [
            "234567890123"
          ]
        }
      }
    },
    "findingPattern": {
      "detail": {
        "Compliance": {
          "Status": "FAILED",
          "SecurityControlId": "S3.8"
        },
        "Resources": {
          "Details": {
            "AwsS3Bucket": {
              "Name": "this-bucket-must-be-private-234567890123"
            }
          }
        }
      }
    },
    "extensionBlock": {
      "sqsFanOut": [
        {
          "sqsUrl": "https://sqs.eu-central-1.amazonaws.com/984603079943/alarm-public-s3-bucket"
        },
        {
          "sqsUrl": "https://sqs.eu-central-1.amazonaws.com/984603079943/ar-close-public-s3-bucket"
        }
      ]
    }
  }
}
```

## Conclusion

To ensure that your AWS environment remains secure and compliant, leveraging the flexibility of [ACAI SEMPER]({{< ref "/solutions/semper.md" >}}) alongside AWS Security Hub is crucial.

By tailoring Security Hub controls to meet the unique needs of your organization, you can effectively manage compliance at scale, reduce noise and unnecessary findings, and focus on what truly matters.

For more insights on optimizing your cloud security strategy, explore our solutions at ACAI.

If you have any questions or need further details, feel free to get in touch with us at [blog@acai.gmbh](mailto:blog@acai.gmbh)
