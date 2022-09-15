# Salesforce Integration with AWS Cognito for SSO


## Steps to Create User Pools

* Go to the Amazon Cognito console. If prompted, enter your AWS credentials.

* Choose Manage User Pools.

* Choose Create a user pool.

* Enter a name for your user pool and choose Review defaults.

    * Add required standard attributes (`email`, `given name`, `middle name`, `phone number`)

    * MFA and Verification

        * enable Multi-Factor Authentication

        * second factors --> `SMS text message`

        * recover accound -- > `email only`

        * attributes to be verified -- > `email or phone number`

        * aws iam role name --> create on fly

* On the Review page, choose Create pool.

* Create app client with default configuration

* Open app client setting and configure

    * callback url for salesforce

    * Allowed OAuth Flows --> `Authorization code grant`

    * Allowed OAuth Scopes --> `phone`, `email`, `openid`, `profile`


## Setting up Salesforce to use aws cognito

* Open Setup --> Auth. Providers

* Keep the following information from aws cognito

    * `Authorize Endpoint URL`

    * `Token Endpoint URL`

    * `User Info Endpoint URL`

    * `Token Issuer`
    
    * All of these above urls will get from,

        * https://cognito-idp.`AWS_REGION`.amazonaws.com/`COGNITO_USERPOOL_ID`/.well-known/openid-configuration

        * [User pool authentication and authorization endpoints](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-userpools-server-contract-reference.html)

* Add all of these above value and give any meaningful name to it

* Add `openid` as `Default Scopes`

* Registration Handler

    * Create it by clicking the option below to this section (This will create a sample one we can modify it later)

    * Copy / modify the [template](./SocialRegHandler.apxc) to the handler created above

        * you will find it under `Apex Class` --> search it in `Quick Find`

* Execute Registration As any `Admin user`

* Once the configuration is completed, try to test it with `Test-Only Initialization URL` (you will find it in the configuration at the bottom)

* If everything working fine, then configure it to available in the main UI for sigin in and sign up

    * Search for `my domain` in `Quick Find`

    * Open `Authentication Configuration`
    
    * Add your above authetication service name for AWS cognito SSO




## Reference

[OIDC identity providers to a user pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-oidc-idp.html)

*AWS Cognito Endpoints for openID configuration*

* https://cognito-idp.`AWS_REGION`.amazonaws.com/`COGNITO_USERPOOL_ID`/.well-known/openid-configuration

[User pool endpoint ref](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-userpools-server-contract-reference.html)

[Open ID Testing URL Ref](https://openidconnect.net/)

[Open ID Testing Video Ref](https://www.youtube.com/watch?v=Ox7FuGpQrV8)

[Salesforce Authentication Provider configuration ref](https://help.salesforce.com/s/articleView?id=sf.sso_provider_openid_connect.htm&type=5)

[Salesforce Apex class Auth UserData](https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_class_Auth_UserData.htm)

[User pool attributes](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html)

[Authentiq SocialRegHandler Ref](https://github.com/AuthentiqID/authentiq-salesforce-registration-handler)

[Social Signon Reghandler Ref](https://github.com/salesforceidentity/social-signon-reghandler/blob/master/SocialRegHandler.cls)

[SocialRegHandler Ref](https://backstage.forgerock.com/knowledge/kb/article/a55994125)

[Apex class Template for AWS Cognito SocialRegHandler](./SocialRegHandler.apxc)

[Customizing user pool workflows with Lambda triggers](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html)