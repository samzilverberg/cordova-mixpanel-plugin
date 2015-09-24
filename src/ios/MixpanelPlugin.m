#import "MixpanelPlugin.h"

@implementation MixpanelPlugin


// MIXPANEL API


-(void)alias:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSArray* arguments = command.arguments;
    NSString* aliasId = [arguments objectAtIndex:0];
    NSString* originalId = [arguments objectAtIndex:1];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance createAlias:aliasId forDistinctID:originalId];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)distinctId:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        NSString* distinctId = mixpanelInstance.distinctId;
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:distinctId];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)flush:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance flush];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)identify:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSArray* arguments = command.arguments;
    NSString* distinctId = [arguments objectAtIndex:0];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        if(distinctId == nil || 0 == [distinctId length])
        {
            distinctId = mixpanelInstance.distinctId;
        }
        [mixpanelInstance identify:distinctId];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)init:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    NSArray* arguments = command.arguments;
    NSString* token = [arguments objectAtIndex:0];

    [Mixpanel sharedInstanceWithToken:token];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)registerSuperProperties:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSDictionary* superProperties = [command.arguments objectAtIndex:0];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance registerSuperProperties:superProperties];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)reset:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance reset];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)track:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSString* eventName = [command argumentAtIndex:0];
    NSDictionary* eventProperties = [command argumentAtIndex:1 withDefault:@{}];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance track:eventName properties:eventProperties];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


// PEOPLE API


-(void)people_identify:(CDVInvokedUrlCommand*)command;
{
    // ios sdk doesnt have separate people identify method
    // just call the normal identify call
    [self identify:command];
}


-(void)people_registerPushToken:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSData* deviceToken = [[command.arguments objectAtIndex:0] dataUsingEncoding:NSUTF8StringEncoding];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance.people addPushDeviceToken:deviceToken];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)people_set:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSArray* arguments = command.arguments;
    NSDictionary* peopleProperties = [command.arguments objectAtIndex:0];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance.people set:peopleProperties];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
