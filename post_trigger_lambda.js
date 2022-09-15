exports.handler = (event, context, callback) => {

    // Send post authentication data to Cloudwatch logs
    console.log ("Authentication successful");
    console.log ("Trigger function =", event.triggerSource);
    console.log ("User pool = ", event.userPoolId);
    // console.log ("App client ID = ", event.callerContext.clientId);

    if (event.request.userAttributes.hasOwnProperty("name")) {
        console.log ("User Name = ", event.request.userAttributes.name);
    }
    if (event.request.userAttributes.hasOwnProperty("email")) {
        console.log ("Mail ID = ", event.request.userAttributes.email);
    }
    if (event.request.userAttributes.hasOwnProperty("phone_number")) {
        console.log ("Phone Number = ", event.request.userAttributes.phone_number);
    }
    // Return to Amazon Cognito
    callback(null, event);
};