#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import "Mixpanel.h"


@interface MixpanelPlugin : CDVPlugin
{
// empty
}

//@see https://mixpanel.com/site_media/doctyl/uploads/iPhone-spec/Classes/Mixpanel/index.html
-(void)flush:(CDVInvokedUrlCommand*)command;
-(void)identify:(CDVInvokedUrlCommand*)command;
-(void)init:(CDVInvokedUrlCommand*)command;
-(void)reset:(CDVInvokedUrlCommand*)command;
-(void)track:(CDVInvokedUrlCommand*)command;

@end

