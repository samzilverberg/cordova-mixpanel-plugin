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


-(void)getSuperProperties:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        NSDictionary* superProps = mixpanelInstance.currentSuperProperties;
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:superProps];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)identify:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSArray* arguments = command.arguments;
    NSString* distinctId = [arguments objectAtIndex:0];
    BOOL usePeople = [[arguments objectAtIndex:1] boolValue];

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
        [mixpanelInstance identify:distinctId usePeople:usePeople];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)init:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    NSArray* arguments = command.arguments;
    NSString* token = [arguments objectAtIndex:0];

    Mixpanel* mixpanelInstance = [Mixpanel sharedInstanceWithToken:token];
    [mixpanelInstance setFlushInterval:60];

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


-(void)registerSuperPropertiesOnce:(CDVInvokedUrlCommand*)command;
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
        [mixpanelInstance registerSuperPropertiesOnce:superProperties];
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


-(void)timeEvent:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSString* eventName = [command argumentAtIndex:0];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance timeEvent:eventName];
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


-(void)unregisterSuperProperty:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSString* superProperty = [command.arguments objectAtIndex:0];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance unregisterSuperProperty:superProperty];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


// PEOPLE API


// Helper function to convert NSString to NSData
-(NSData*) convertToData:(NSString *)devToken;
{
    const char * chars = [devToken UTF8String];
    int i = 0;
    int len = (int)devToken.length;

    NSMutableData *data = [NSMutableData dataWithCapacity:len / 2];
    char byteChars[3] = {'\0','\0','\0'};
    unsigned long wholeByte;

    while (i < len) {
        byteChars[0] = chars[i++];
        byteChars[1] = chars[i++];
        wholeByte = strtoul(byteChars, NULL, 16);
        [data appendBytes:&wholeByte length:1];
    }

    return data;
}


-(void)people_append:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSDictionary* appendObject = [command.arguments objectAtIndex:0];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance.people append:appendObject];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)people_deleteUser:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance.people deleteUser];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)people_increment:(CDVInvokedUrlCommand*)command;
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
        [mixpanelInstance.people increment:peopleProperties];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)people_setPushId:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSData* pushId = [self convertToData:[command.arguments objectAtIndex:0]];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance.people addPushDeviceToken:pushId];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)people_set:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
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


-(void)people_set_once:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSDictionary* peopleProperties = [command.arguments objectAtIndex:0];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance.people setOnce:peopleProperties];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)people_track_charge:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSNumber* amount = [command argumentAtIndex:0];
    NSDictionary* chargeProperties = [command argumentAtIndex:1 withDefault:@{}];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance.people trackCharge:amount withProperties:chargeProperties];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)people_union:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSDictionary* unionObject = [command.arguments objectAtIndex:0];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance.people union:unionObject];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


-(void)people_unset:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSArray* propertiesToUnset = [command.arguments objectAtIndex:0];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance.people unset:propertiesToUnset];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


# pragma mark Private functions
-(BOOL)checkMixpanelInstance:(CDVInvokedUrlCommand*)command
{
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];

    if (mixpanelInstance == nil)
    {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];

        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

        return false;
    }

    return true;
}

@end
