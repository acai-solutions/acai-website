---
title: "CIS AWS Foundations Benchmark is cool, but..."
date: 2023-02-24T11:00:00+06:00
image: "images/blog/aws-cis-monitoring/list_view.png"
author: "Michael Ullrich"
description: "Keeping grip on the current level of security compliance can be a challenge. AWS provides a great tool, that is designed to provide an account overarching overview, valuable especially in AWS Landing Zone architectures: AWS Security Hub"
summary: "This post explains, why we are in favor of using Amazon EventBridge Rules for monitoring the recommended CIS AWS Monitoring controls. "
tags: ['aws', 'security', 'semper']
duration: 10
---

**Sorry, currently no German translation is available for this blog post**

## Context

Keeping grip on the current level of security compliance can be a challenge. AWS provides a great tool, that is designed to provide an account overarching overview, valuable especially in AWS Landing Zone architectures: **AWS Security Hub**

{{< image src="/images/blog/aws-cis-monitoring/security_hub_dashboard.png" class="img-fluid" alt="Security hub dashboard" zoomable="false" webp="false" >}}

AWS Security Hub is a cloud security service that automates best practice checks, aggregates alerts for multi account setups, and supports also automated remediation.
With AWS Security Hub you have access to three predefined security standards that give you automated compliance measurement enabled with a single click (caution - cost for the provisioned config rules will apply):

\- AWS Foundational Security Best Practices [**[FSBP](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-fsbp.html 'AWS Foundational Security Best Practices standard - AWS Security Hub')**]  
\- CIS AWS Foundations Benchmark [**[CIS-AWS](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-cis.html 'CIS AWS Foundations Benchmark standard - AWS Security Hub')**]  
\- NIST SP 800-53 Rev. 5 [**[NIST](https://docs.aws.amazon.com/securityhub/latest/userguide/nist-standard.html 'National Institute of Standards and Technology (NIST) SP 800-53 Rev. 5')**]  
\- Payment Card Industry Data Security Standard [**[PCI-DSS](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-pcidss.html 'Payment Card Industry Data Security Standard (PCI DSS) - AWS Security Hub')**]

A security standard is a summary of security controls that can be turned on or off. The cool thing about Security Hub is the automated evaluation of all the related AWS resources with a compliance statement. All this is aggregated to security scores on measure your resource compliance.
The following image outlines the concept of AWS Security Hub for compliance measurement:

{{< image src="/images/blog/aws-cis-monitoring/security_hub_model.svg" class="img-fluid" alt="Security hub model" zoomable="false" >}}

This blog-post refers especially to the **Monitoring controls**  of the **CIS AWS Foundations Benchmark** [**[CIS-AWS](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-cis.html 'CIS AWS Foundations Benchmark standard - AWS Security Hub')**] which contains the security controls **CIS AWS (v1.2) 3.1 - 3.14** and **CIS AWS (v1.4) 4.1 - 4.14** .

{{<table "table table-striped table-bordered">}}
| Control ID <br> CIS AWS (v1.2) | Control ID <br> CIS AWS (v1.4) | Control Title | CloudWatch Control |
| ----------------------------- | ----------------------------- | ------------- | ------------------ |
| 3.1                           | n/a                           | Ensure a log metric filter and alarm exist for unauthorized API calls |  [[CloudWatch.2]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-2) |
| 3.2                           | n/a                           | Ensure a log metric filter and alarm exist for Management Console sign-in without MFA |  [[CloudWatch.3]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-3) |
| 3.3                           | 4.3                           | Ensure a log metric filter and alarm exist for usage of "root" user | [[CloudWatch.1]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-1) |
| 3.4                           | n/a                           | Ensure a log metric filter and alarm exist for IAM policy changes | [[CloudWatch.4]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-4) |
| 3.5                           | 4.5                           | Ensure a log metric filter and alarm exist for CloudTrail configuration changes | [[CloudWatch.5]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-5) |
| 3.6                           | 4.6                           | Ensure a log metric filter and alarm exist for AWS Management Console authentication failures | [[CloudWatch.6]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-6) |
| 3.7                           | 4.7                           | Ensure a log metric filter and alarm exist for disabling or scheduled deletion of customer created CMKs | [[CloudWatch.7]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-7) |
| 3.8                           | 4.8                           | Ensure a log metric filter and alarm exist for S3 bucket policy changes | [[CloudWatch.8]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-8) |
| 3.9                           | 4.6                           | Ensure a log metric filter and alarm exist for AWS Config configuration changes | [[CloudWatch.9]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-9) |
| 3.10                          | 4.10                           | Ensure a log metric filter and alarm exist for security group changes | [[CloudWatch.10]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-10) |
| 3.11                          | 4.11                           | Ensure a log metric filter and alarm exist for changes to Network Access Control Lists (NACL) | [[CloudWatch.11]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-11) |
| 3.12                          | 4.12                           | Ensure a log metric filter and alarm exist for changes to network gateways | [[CloudWatch.12]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-12) |
| 3.13                          | 4.13                          | Ensure a log metric filter and alarm exist for route table changes | [[CloudWatch.13]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-13) |
| 3.14                          | 4.14                          | Ensure a log metric filter and alarm exist for VPC changes | [[CloudWatch.14]](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-14) |
{{</table>}}

As you notice the CIS AWS Monitoring controls have one thing in common and that is the phrase: “Ensure a log metric filter and alarm exist for …“
We fully agree to the goals of the CIS AWS Monitoring controls but we think that only ensuring a log metric filter and an alarm exists for those controls is **not sufficient**.
It is very important that those controls are carefully monitored and the Security Operations Center (SOC) easily has access to all event data to be able to analyze the finding quickly.

## Clarification

Using a log metric filter together with an alarm just indicates that the event occurred, but does not provide data on the actual root cause.
Especially in a multi-account setup leveraging AWS CloudTrail for AWS Organizations leaves you in a potential permanent alarm situation. In this scenario, digging for the actual source for the alarm is waste of effort and time.

Sample of an CIS AWS 3.10 alarm sent to a Amazon Simple Notification Service (SNS) topic - hardly any valuable information:

```text
You are receiving this email because your Amazon CloudWatch Alarm "CIS.3.10" in the US East (N. Virginia) region has entered
the ALARM state, because "Threshold Crossed: 1 out of the last 1 datapoints [2.0 (15/09/21 18:27:00)] was greater than the
threshold (1.0) (minimum 1 datapoint for OK -> ALARM transition)." at "Wednesday 15 September, 2023 18:32:31 UTC".

View this alarm in the AWS Management Console:
https://us-east-1.console.aws.amazon.com/cloudwatch/deeplink.js?region=us-east-1#alarmsV2:alarm/CIS.3.10

Alarm Details:
- Name:                       CIS.3.10
- Description:
- State Change:               OK -> ALARM
- Reason for State Change:    Threshold Crossed: 1 out of the last 1 datapoints [2.0 (15/09/21 18:27:00)] was greater than the
                              threshold (1.0) (minimum 1 datapoint for OK -> ALARM transition).
- Timestamp:                  Wednesday 15 September, 2023 18:32:31 UTC
- AWS Account:                215125613612
- Alarm Arn:                  arn:aws:cloudwatch:us-east-1:215125613612:alarm:CIS.3.10
Threshold:
- The alarm is in the ALARM state when the metric is GreaterThanThreshold 1.0 for 300 seconds.
Monitored Metric:
- MetricNamespace:                     LogMetrics
- MetricName:                          CIS.3.10
- Dimensions:
- Period:                              300 seconds
- Statistic:                           Sum
- Unit:                                not specified
- TreatMissingData:                    missing
```

In case of an event you want to know more context information like the acting principal and the affected resource with account and region

To find the alarm-triggering event information, you need to search the Amazon CloudWatch logs, which is inconvenient.

## Recommendation

What we recommend is utilizing Amazon EventBridge Rules on the default event-bus for the CIS AWS Monitoring event signatures. You will get an instant event notification with full event information.
Sample of an CIS AWS 3.10 Event:

```json {linenos=table,hl_lines=[],linenostart=50}
{
  "version": "0",
  "id": "3bfd2f21-b57f-5cae-5423-cefcda82691b",
  "detail-type": "AWS API Call via CloudTrail",
  "source": "aws.ec2",
  "account": "215125613612",
  "time": "2023-11-04T15:56:41Z",
  "region": "eu-west-1",
  "resources": [],
  "detail": {
    "eventVersion": "1.08",
    "userIdentity": {
      "type": "AssumedRole",
      "principalId": "AGDLJ51ASFJ15AFGSX15X:noreply@acai.gmbh",
      "arn": "arn:aws:sts::215125613612:assumed-role/AWS_AdministratorAccess_11agga1jh2g5jk1/noreply@acai.gmbh",
      "accountId": "215125613612",
      "accessKeyId": "LJFA22VZY6Q7WVSS2RX",
      "sessionContext": {
        "sessionIssuer": {
          "type": "Role",
          "principalId": "AGDLJ51ASFJ15AFGSX15X",
          "arn": "arn:aws:iam::215125613612:role/aws-reserved/sso.amazonaws.com/eu-central-1/AWS_AdministratorAccess_11agga1jh2g5jk1",
          "accountId": "215125613612",
          "userName": "AWS_AdministratorAccess_11agga1jh2g5jk1"
        },
        "webIdFederationData": {},
        "attributes": {
          "creationDate": "2023-11-04T15:54:33Z",
          "mfaAuthenticated": "false"
        }
      }
    },
    "eventTime": "2023-11-04T15:56:41Z",
    "eventSource": "ec2.amazonaws.com",
    "eventName": "AuthorizeSecurityGroupIngress",
    "awsRegion": "eu-west-1",
    "sourceIPAddress": "72.21.210.29",
    "userAgent": "console.ec2.amazonaws.com",
    "requestParameters": {
      "groupId": "sg-b15kasfs",
      "ipPermissions": {
        "items": [
          {
            "ipProtocol": "tcp",
            "fromPort": 0,
            "toPort": 65535,
            "groups": {},
            "ipRanges": {
              "items": [
                {
                  "cidrIp": "0.0.0.0/0"
                }
              ]
            },
            "ipv6Ranges": {},
            "prefixListIds": {}
          }
        ]
      }
    },
    "responseElements": {
      "requestId": "233ec260-412d-40dc-918b-e3ced0e85977",
      "_return": true,
      "securityGroupRuleSet": {
        "items": [
          {
            "groupOwnerId": "215125613612",
            "groupId": "sg-b15kasfs",
            "securityGroupRuleId": "sgr-0c609eafsa2af10ea",
            "isEgress": false,
            "ipProtocol": "tcp",
            "fromPort": 0,
            "toPort": 65535,
            "cidrIpv4": "0.0.0.0/0"
          }
        ]
      }
    },
    "requestID": "233ec260-412d-40dc-918b-e3ced0e85977",
    "eventID": "ed2b58c7-5b71-49d8-412d-66b695f0e2a7",
    "readOnly": false,
    "eventType": "AwsApiCall",
    "managementEvent": true,
    "recipientAccountId": "215125613612",
    "eventCategory": "Management"
  }
}
```

As you can see, the event payload itself contains extensive information that is valuable for further security processing.

## Conclusion

We recommend to use ***Amazon EventBridge Rules*** to monitor for ***CIS AWS (v1.2) 3.x*** or ***CIS AWS (v1.4) 4.x*** and to add more context like account-tags and the Organization Unit information the event.

Furthermore we will ask the [Center for Internet Security](https://www.cisecurity.org/) to rename their CIS AWS Foundations Benchmark Monitoring controls to "Monitor for..." instead of "Ensure a log metric filter and alarm exist for...".

Additionally, we recommend placing additional sensors beyond the CIS AWS Monitoring recommendations, such as:

\- Monitor for OU-SCP assignment changes  
\- Monitor for SCP policy changes  
\- Monitor for OU structure changes  
\- Monitor for Account-OU assignment changes  

## Our Solution

Your workloads are distributed across multiple AWS accounts and possibly even different regions?

With our cloud-native, serverless solution **[SEMPER](/solutions/semper 'Product page!')**, you can centrally provision Amazon EventBridge and AWS Config Rules and meaningfully filter resulting events as well as AWS Security Hub and Amazon GuardDuty Findings.
In addition, you can enrich relevant findings with valuable additional information and manage the entire solution from a central **Policy as Code** repository.
