#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import "Mixpanel.h"


@interface MixpanelPlugin : CDVPlugin
{
// empty
}



// MIXPANEL API


//@see https://mixpanel.com/site_media/doctyl/uploads/iPhone-spec/Classes/Mixpanel/index.html
-(void)alias:(CDVInvokedUrlCommand*)command;
-(void)distinctId:(CDVInvokedUrlCommand*)command;
-(void)flush:(CDVInvokedUrlCommand*)command;
-(void)getSuperProperties:(CDVInvokedUrlCommand*)command;
-(void)identify:(CDVInvokedUrlCommand*)command;
-(void)init:(CDVInvokedUrlCommand*)command;
-(void)registerSuperProperties:(CDVInvokedUrlCommand*)command;
-(void)registerSuperPropertiesOnce:(CDVInvokedUrlCommand*)command;
-(void)reset:(CDVInvokedUrlCommand*)command;
-(void)track:(CDVInvokedUrlCommand*)command;
-(void)timeEvent:(CDVInvokedUrlCommand*)command;
-(void)unregisterSuperProperty:(CDVInvokedUrlCommand*)command;


// PEOPLE API


-(void)people_append:(CDVInvokedUrlCommand*)command;
-(void)people_deleteUser:(CDVInvokedUrlCommand*)command;
-(void)people_increment:(CDVInvokedUrlCommand*)command;
-(void)people_setPushId:(CDVInvokedUrlCommand*)command;
-(void)people_set:(CDVInvokedUrlCommand*)command;
-(void)people_set_once:(CDVInvokedUrlCommand*)command;
-(void)people_track_charge:(CDVInvokedUrlCommand*)command;
-(void)people_union:(CDVInvokedUrlCommand*)command;
-(void)people_unset:(CDVInvokedUrlCommand*)command;

@end
