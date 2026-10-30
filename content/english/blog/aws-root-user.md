---
title: "AWS Root User Considerations"
date: 2020-05-04T12:00:00+06:00
image: "/images/blog/aws-root-user/RootUserMetamodel.jpg"
author: "Michael Ullrich"
summary : "Every AWS account comes with a root user – it is the most powerful user of your AWS account and cannot be disabled. So it is worth spending some time thinking about it."
tags: ['aws', 'security']
draft: false
---

Every AWS account comes with a root user – it is the most powerful user of your AWS account and cannot be disabled. So it is worth spending some time thinking about it.

Note: AWS Organisations (via SCPs assigned to OUs) allows you to restrict root user privileges of its organization AWS member accounts [[1](https://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html)].

## Metamodel

{{< image src="/images/blog/aws-root-user/RootUserMetamodel.jpg" class="img-fluid" alt="Root User Metamodel" loading="eager" zoomable="false" >}}

## Multi-Factor Authentication

After creation of an AWS account we recommend as the first mandatory step: the registering of an MFA device as a secondary authentication factor for the root user. Two types are supported by AWS – virtual MFA devices and hardware MFA devices.

To be compliant with the following security controls a hardware MFA is required (we recommend an U2F MFA e.g. the Yubikey 4 or 5 from Yubico [[2](https://yubikey.ch/de/webshop)]):

* CIS AWS Foundations – security control CIS.1.14 [[3](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.14)]
* AWS Foundational Security Best Practices – security control IAM.6 [[4](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-fsbp-controls.html#fsbp-iam-6)]

The required steps to register a MFA can be found here: [link to AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_u2f.html#enable-u2f-mfa-for-root)

The following browsers currently support the use of an U2F MFA:

* Google Chrome, version 38 and later
* Microsoft Edge, version 83 and later
* Opera, version 40 and later
* Mozilla Firefox, version 57 and later

## Further Recommendations

Please also follow these further recommendations:

* AWS strongly recommends that you do not use the root user for your everyday tasks, even the administrative ones
* For administrative tasks create IAM users linked to an IAM group with the AdministratorAccess policy assigned [[5](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html#getting-started_create-admin-group-console)]
* Never create access keys for the root user. If you have already created access keys for your root user, delete them [[6](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#lock-away-credentials)]

## Four Eyes Principle

In particular, for AWS Landing Zone environments with a large number of accounts, it is highly recommended that a four eye principle is applied to the root user for the following AWS accounts:

* AWS Organizations master-account
* AWS accounts of the Core Domain

To protect your AWS account from unrestricted root user access and to ensure root user access in required cases, the following roles must be mapped to your team(s).

{{< image src="/images/blog/aws-root-user/RootUserRoles.jpg" class="img-fluid" alt="Root User Roles" zoomable="false" >}}

## AWS tasks that require the AWS Root User

The following tasks require you to sign in to your AWS account with the root user [[7](https://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html)]:

* Closing an AWS account
* Change AWS account settings like account name, root user password, contact details and account email address [[8](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/manage-account-payment.html#manage-account-payment-edit-user-name)]
* Enable MFA for root user
* Change your AWS support plan
* Restore IAM user permissions
* Register as a seller in the Reserved Instance Marketplace
* Creation of a CloudFront key pair
* Configure an Amazon S3 bucket to enable MFA Delete
* Edit or delete an Amazon S3 bucket policy that includes an invalid VPC ID or VPC endpoint ID
* Sign up for the GovCloud (US)

We are ACAI Consulting – specialized in AWS Multi Account Security and Governance.
If you have any questions, feel free to get in touch with us: [blog@acai.gmbh](mailto:blog@acai.gmbh)

## References

[1] [root-vs-iam.html](https://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html)

[2] [https://yubikey.ch/de/webshop](https://yubikey.ch/de/webshop)

[3] [securityhub-cis-controls-1.14](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.14)

[4] [securityhub-standards-fsbp-controls.html#fsbp-iam-6](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-fsbp-controls.html#fsbp-iam-6)

[5] [create-admin-group-console](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html#getting-started_create-admin-group-console)

[6] [lock-away-credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#lock-away-credentials)

[7] [tasks-that-require-root.html](https://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html)

[8] [manage-account-payment-edit-user-name](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/manage-account-payment.html#manage-account-payment-edit-user-name)
