if(typeof DeviceInfo!="object")DeviceInfo={};var PhoneGap={queue:{ready:true,commands:[],timer:null}};PhoneGap.Channel=function(a){this.type=a;this.handlers={};this.guid=0;this.fired=false;this.enabled=true};PhoneGap.Channel.prototype.subscribe=function(a,b,c){if(a!=null){var d=a;if(typeof b=="object"&&a instanceof Function)d=PhoneGap.close(b,a);c=c||d.observer_guid||a.observer_guid||this.guid++;d.observer_guid=c;a.observer_guid=c;this.handlers[c]=d;return c}};
PhoneGap.Channel.prototype.subscribeOnce=function(a,b){var c=null,d=this,e=function(){a.apply(b||null,arguments);d.unsubscribe(c)};if(this.fired){if(typeof b=="object"&&a instanceof Function)a=PhoneGap.close(b,a);a.apply(this,this.fireArgs)}else c=this.subscribe(e);return c};PhoneGap.Channel.prototype.unsubscribe=function(a){if(a instanceof Function)a=a.observer_guid;this.handlers[a]=null;delete this.handlers[a]};
PhoneGap.Channel.prototype.fire=function(){if(this.enabled){var a=false,b;for(b in this.handlers){var c=this.handlers[b];if(c instanceof Function){c=c.apply(this,arguments)==false;a=a||c}}this.fired=true;this.fireArgs=arguments;return!a}return true};PhoneGap.Channel.join=function(a,b){for(var c=b.length,d=function(){--c||a()},e=0;e<c;e++)!b[e].fired?b[e].subscribeOnce(d):c--;c||a()};PhoneGap.available=DeviceInfo.uuid!=undefined;
PhoneGap.addConstructor=function(a){PhoneGap.onPhoneGapInit.subscribeOnce(function(){try{a()}catch(b){typeof debug.log=="function"?debug.log("Failed to run constructor: "+debug.processMessage(b)):alert("Failed to run constructor: "+b.message)}})};PhoneGap.addPlugin=function(a,b){if(!window.plugins)window.plugins={};window.plugins[a]||(window.plugins[a]=b)};PhoneGap.onDOMContentLoaded=new PhoneGap.Channel("onDOMContentLoaded");PhoneGap.onNativeReady=new PhoneGap.Channel("onNativeReady");
PhoneGap.onPhoneGapInit=new PhoneGap.Channel("onPhoneGapInit");PhoneGap.onPhoneGapReady=new PhoneGap.Channel("onPhoneGapReady");PhoneGap.onPhoneGapInfoReady=new PhoneGap.Channel("onPhoneGapInfoReady");PhoneGap.onResume=new PhoneGap.Channel("onResume");PhoneGap.onPause=new PhoneGap.Channel("onPause");typeof _nativeReady!=="undefined"&&PhoneGap.onNativeReady.fire();PhoneGap.onDeviceReady=new PhoneGap.Channel("onDeviceReady");
PhoneGap.Channel.join(function(){setTimeout(function(){CallbackServer.usePolling()?PhoneGap.JSCallbackPolling():PhoneGap.JSCallback()},1);PhoneGap.onPhoneGapInit.fire();PhoneGap.onPhoneGapReady.fire()},[PhoneGap.onDOMContentLoaded,PhoneGap.onNativeReady]);PhoneGap.Channel.join(function(){navigator.notification.activityStop();PhoneGap.onDeviceReady.fire();PhoneGap.onResume.fire()},[PhoneGap.onPhoneGapReady,PhoneGap.onPhoneGapInfoReady]);
document.addEventListener("DOMContentLoaded",function(){PhoneGap.onDOMContentLoaded.fire()},false);PhoneGap.m_document_addEventListener=document.addEventListener;document.addEventListener=function(a,b){var c=a.toLowerCase();if(c=="deviceready")PhoneGap.onDeviceReady.subscribeOnce(b);else if(c=="resume")PhoneGap.onResume.subscribe(b);else c=="pause"?PhoneGap.onPause.subscribe(b):PhoneGap.m_document_addEventListener.call(document,a,b)};
PhoneGap.stringify=function(a){if(typeof JSON=="undefined"){for(var b="[",c=0;c<a.length;c++){if(c>0)b+=",";var d=typeof a[c];if(d=="number"||d=="boolean")b+=a[c];else if(a[c]instanceof Array)b=b+"["+a[c]+"]";else if(a[c]instanceof Object){d=true;b+="{";for(var e in a[c]){d||(b+=",");b=b+'"'+e+'":';d=typeof a[c][e];if(d=="number"||d=="boolean")b+=a[c][e];else b=b+'"'+a[c][e]+'"';d=false}b+="}"}else{d=a[c].replace(/\\/g,"\\\\");d=d.replace(/"/g,'\\"');b=b+'"'+d+'"'}}b+="]";return b}else return JSON.stringify(a)};
PhoneGap.clone=function(a){if(!a)return a;if(a instanceof Array){for(var b=[],c=0;c<a.length;++c)b.push(PhoneGap.clone(a[c]));return b}if(a instanceof Function)return a;if(!(a instanceof Object))return a;b={};for(c in a)if(!(c in b)||b[c]!=a[c])b[c]=PhoneGap.clone(a[c]);return b};PhoneGap.callbackId=0;PhoneGap.callbacks={};
PhoneGap.callbackStatus={NO_RESULT:0,OK:1,CLASS_NOT_FOUND_EXCEPTION:2,ILLEGAL_ACCESS_EXCEPTION:3,INSTANTIATION_EXCEPTION:4,MALFORMED_URL_EXCEPTION:5,IO_EXCEPTION:6,INVALID_ACTION:7,JSON_EXCEPTION:8,ERROR:9};
PhoneGap.exec=function(a,b,c,d,e){try{var f=c+PhoneGap.callbackId++;if(a||b)PhoneGap.callbacks[f]={success:a,fail:b};var g=""+PluginManager.exec(c,d,f,this.stringify(e),true);if(g.length>0){eval("var v="+g+";");if(v.status==PhoneGap.callbackStatus.OK){if(a){try{a(v.message)}catch(h){console.log("Error in success callback: "+f+" = "+h)}v.keepCallback||delete PhoneGap.callbacks[f]}return v.message}else if(v.status==PhoneGap.callbackStatus.NO_RESULT)v.keepCallback||delete PhoneGap.callbacks[f];else{console.log("Error: Status="+
g.status+" Message="+v.message);if(b){try{b(v.message)}catch(i){console.log("Error in error callback: "+f+" = "+i)}v.keepCallback||delete PhoneGap.callbacks[f]}return null}}}catch(j){console.log("Error: "+j)}};PhoneGap.callbackSuccess=function(a,b){if(PhoneGap.callbacks[a]){if(b.status==PhoneGap.callbackStatus.OK)try{PhoneGap.callbacks[a].success&&PhoneGap.callbacks[a].success(b.message)}catch(c){console.log("Error in success callback: "+a+" = "+c)}b.keepCallback||delete PhoneGap.callbacks[a]}};
PhoneGap.callbackError=function(a,b){if(PhoneGap.callbacks[a]){try{PhoneGap.callbacks[a].fail&&PhoneGap.callbacks[a].fail(b.message)}catch(c){console.log("Error in error callback: "+a+" = "+c)}b.keepCallback||delete PhoneGap.callbacks[a]}};
PhoneGap.run_command=function(){if(PhoneGap.available&&PhoneGap.queue.ready){PhoneGap.queue.ready=false;var a=PhoneGap.queue.commands.shift();if(PhoneGap.queue.commands.length==0){clearInterval(PhoneGap.queue.timer);PhoneGap.queue.timer=null}for(var b=[],c=null,d=1;d<a.length;d++){var e=a[d];if(e==undefined||e==null)e="";if(typeof e=="object")c=e;else b.push(encodeURIComponent(e))}a="gap://"+a[0]+"/"+b.join("/");if(c!=null){b=[];for(var f in c)typeof f=="string"&&b.push(encodeURIComponent(f)+"="+
encodeURIComponent(c[f]));if(b.length>0)a+="?"+b.join("&")}document.location=a}};
PhoneGap.JSCallback=function(){var a=new XMLHttpRequest;PhoneGap.JSCallbackPort=CallbackServer.getPort();PhoneGap.JSCallbackToken=CallbackServer.getToken();a.onreadystatechange=function(){if(a.readyState==4)if(a.status==200){var b=a.responseText;setTimeout(function(){try{eval(b)}catch(c){console.log("Message from Server: "+b);console.log("JSCallback Error: "+c)}},1);setTimeout(PhoneGap.JSCallback,1)}else if(a.status==404)setTimeout(PhoneGap.JSCallback,10);else{console.log("The status is: "+a.status);
console.log("JSCallback Error: Request failed.");CallbackServer.restartServer();setTimeout(PhoneGap.JSCallback,100)}};a.open("GET","http://127.0.0.1:"+PhoneGap.JSCallbackPort+"/"+PhoneGap.JSCallbackToken,true);a.send()};PhoneGap.JSCallbackPollingPeriod=50;
PhoneGap.JSCallbackPolling=function(){var a=CallbackServer.getJavascript();if(a){setTimeout(function(){try{eval(""+a)}catch(b){console.log("JSCallbackPolling Error: "+b)}},1);setTimeout(PhoneGap.JSCallbackPolling,1)}else setTimeout(PhoneGap.JSCallbackPolling,PhoneGap.JSCallbackPollingPeriod)};PhoneGap.createUUID=function(){return PhoneGap.UUIDcreatePart(4)+"-"+PhoneGap.UUIDcreatePart(2)+"-"+PhoneGap.UUIDcreatePart(2)+"-"+PhoneGap.UUIDcreatePart(2)+"-"+PhoneGap.UUIDcreatePart(6)};
PhoneGap.UUIDcreatePart=function(a){for(var b="",c=0;c<a;c++){var d=parseInt(Math.random()*256).toString(16);if(d.length==1)d="0"+d;b+=d}return b};PhoneGap.close=function(a,b,c){return typeof c==="undefined"?function(){return b.apply(a,arguments)}:function(){return b.apply(a,c)}};function Acceleration(a,b,c){this.x=a;this.y=b;this.z=c;this.timestamp=(new Date).getTime()}function Accelerometer(){this.lastAcceleration=null;this.timers={}}Accelerometer.ERROR_MSG=["Not running","Starting","","Failed to start"];
Accelerometer.prototype.getCurrentAcceleration=function(a,b){if(typeof a!="function")console.log("Accelerometer Error: successCallback is not a function");else b&&typeof b!="function"?console.log("Accelerometer Error: errorCallback is not a function"):PhoneGap.exec(a,b,"Accelerometer","getAcceleration",[])};
Accelerometer.prototype.watchAcceleration=function(a,b,c){var d=c!=undefined?c.frequency:1E4;if(typeof a!="function")console.log("Accelerometer Error: successCallback is not a function");else if(b&&typeof b!="function")console.log("Accelerometer Error: errorCallback is not a function");else{PhoneGap.exec(function(e){e<d+1E4&&PhoneGap.exec(null,null,"Accelerometer","setTimeout",[d+1E4])},function(){},"Accelerometer","getTimeout",[]);c=PhoneGap.createUUID();navigator.accelerometer.timers[c]=setInterval(function(){PhoneGap.exec(a,
b,"Accelerometer","getAcceleration",[])},d?d:1);return c}};Accelerometer.prototype.clearWatch=function(a){if(a&&navigator.accelerometer.timers[a]!=undefined){clearInterval(navigator.accelerometer.timers[a]);delete navigator.accelerometer.timers[a]}};PhoneGap.addConstructor(function(){if(typeof navigator.accelerometer=="undefined")navigator.accelerometer=new Accelerometer});Camera=function(){this.options=this.errorCallback=this.successCallback=null};Camera.DestinationType={DATA_URL:0,FILE_URI:1};
Camera.prototype.DestinationType=Camera.DestinationType;Camera.PictureSourceType={PHOTOLIBRARY:0,CAMERA:1,SAVEDPHOTOALBUM:2};Camera.prototype.PictureSourceType=Camera.PictureSourceType;
Camera.prototype.getPicture=function(a,b,c){if(typeof a!="function")console.log("Camera Error: successCallback is not a function");else if(b&&typeof b!="function")console.log("Camera Error: errorCallback is not a function");else{this.options=c;var d=80;if(c.quality)d=this.options.quality;c=Camera.DestinationType.DATA_URL;if(this.options.destinationType)c=this.options.destinationType;var e=Camera.PictureSourceType.CAMERA;if(typeof this.options.sourceType=="number")e=this.options.sourceType;PhoneGap.exec(a,
b,"Camera","takePicture",[d,c,e])}};PhoneGap.addConstructor(function(){if(typeof navigator.camera=="undefined")navigator.camera=new Camera});function Compass(){this.lastHeading=null;this.timers={}}Compass.ERROR_MSG=["Not running","Starting","","Failed to start"];
Compass.prototype.getCurrentHeading=function(a,b){if(typeof a!="function")console.log("Compass Error: successCallback is not a function");else b&&typeof b!="function"?console.log("Compass Error: errorCallback is not a function"):PhoneGap.exec(a,b,"Compass","getHeading",[])};
Compass.prototype.watchHeading=function(a,b,c){var d=c!=undefined?c.frequency:100;if(typeof a!="function")console.log("Compass Error: successCallback is not a function");else if(b&&typeof b!="function")console.log("Compass Error: errorCallback is not a function");else{PhoneGap.exec(function(e){e<d+1E4&&PhoneGap.exec(null,null,"Compass","setTimeout",[d+1E4])},function(){},"Compass","getTimeout",[]);c=PhoneGap.createUUID();navigator.compass.timers[c]=setInterval(function(){PhoneGap.exec(a,b,"Compass",
"getHeading",[])},d?d:1);return c}};Compass.prototype.clearWatch=function(a){if(a&&navigator.compass.timers[a]){clearInterval(navigator.compass.timers[a]);delete navigator.compass.timers[a]}};PhoneGap.addConstructor(function(){if(typeof navigator.compass=="undefined")navigator.compass=new Compass});
var Contact=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){this.id=a||null;this.rawId=null;this.displayName=b||null;this.name=c||null;this.nickname=d||null;this.phoneNumbers=e||null;this.emails=f||null;this.addresses=g||null;this.ims=h||null;this.organizations=i||null;this.birthday=j||null;this.note=k||null;this.photos=l||null;this.categories=m||null;this.urls=n||null},ContactError=function(){this.code=null};ContactError.UNKNOWN_ERROR=0;ContactError.INVALID_ARGUMENT_ERROR=1;ContactError.TIMEOUT_ERROR=2;
ContactError.PENDING_OPERATION_ERROR=3;ContactError.IO_ERROR=4;ContactError.NOT_SUPPORTED_ERROR=5;ContactError.PERMISSION_DENIED_ERROR=20;Contact.prototype.remove=function(a,b){if(this.id===null){var c=new ContactError;c.code=ContactError.UNKNOWN_ERROR;b(c)}else PhoneGap.exec(a,b,"Contacts","remove",[this.id])};
Contact.prototype.clone=function(){var a=PhoneGap.clone(this),b;a.id=null;a.rawId=null;if(a.phoneNumbers)for(b=0;b<a.phoneNumbers.length;b++)a.phoneNumbers[b].id=null;if(a.emails)for(b=0;b<a.emails.length;b++)a.emails[b].id=null;if(a.addresses)for(b=0;b<a.addresses.length;b++)a.addresses[b].id=null;if(a.ims)for(b=0;b<a.ims.length;b++)a.ims[b].id=null;if(a.organizations)for(b=0;b<a.organizations.length;b++)a.organizations[b].id=null;if(a.tags)for(b=0;b<a.tags.length;b++)a.tags[b].id=null;if(a.photos)for(b=
0;b<a.photos.length;b++)a.photos[b].id=null;if(a.urls)for(b=0;b<a.urls.length;b++)a.urls[b].id=null;return a};Contact.prototype.save=function(a,b){PhoneGap.exec(a,b,"Contacts","save",[this])};
var ContactName=function(a,b,c,d,e,f){this.formatted=a||null;this.familyName=b||null;this.givenName=c||null;this.middleName=d||null;this.honorificPrefix=e||null;this.honorificSuffix=f||null},ContactField=function(a,b,c){this.id=null;this.type=a||null;this.value=b||null;this.pref=c||null},ContactAddress=function(a,b,c,d,e,f,g,h){this.id=null;this.pref=a||null;this.type=b||null;this.formatted=c||null;this.streetAddress=d||null;this.locality=e||null;this.region=f||null;this.postalCode=g||null;this.country=
h||null},ContactOrganization=function(a,b,c,d,e){this.id=null;this.pref=a||null;this.type=b||null;this.name=c||null;this.department=d||null;this.title=e||null},Contacts=function(){this.inProgress=false;this.records=[]};
Contacts.prototype.find=function(a,b,c,d){if(b===null)throw new TypeError("You must specify a success callback for the find command.");if(a===null||a==="undefined"||a.length==="undefined"||a.length<=0)typeof c==="function"&&c({code:ContactError.INVALID_ARGUMENT_ERROR});else PhoneGap.exec(b,c,"Contacts","search",[a,d])};Contacts.prototype.create=function(a){var b,c=new Contact;for(b in a)if(c[b]!=="undefined")c[b]=a[b];return c};
Contacts.prototype.cast=function(a){var b=[],c;for(c=0;c<a.message.length;c++)b.push(navigator.contacts.create(a.message[c]));a.message=b;return a};var ContactFindOptions=function(a,b){this.filter=a||"";this.multiple=b||false};PhoneGap.addConstructor(function(){if(typeof navigator.contacts==="undefined")navigator.contacts=new Contacts});
function Device(){this.available=PhoneGap.available;this.phonegap=this.uuid=this.name=this.version=this.platform=null;var a=this;this.getInfo(function(b){a.available=true;a.platform=b.platform;a.version=b.version;a.uuid=b.uuid;a.phonegap=b.phonegap;PhoneGap.onPhoneGapInfoReady.fire()},function(b){a.available=false;console.log("Error initializing PhoneGap: "+b);alert("Error initializing PhoneGap: "+b)})}
Device.prototype.getInfo=function(a,b){if(typeof a!="function")console.log("Device Error: successCallback is not a function");else b&&typeof b!="function"?console.log("Device Error: errorCallback is not a function"):PhoneGap.exec(a,b,"Device","getDeviceInfo",[])};Device.prototype.overrideBackButton=function(){BackButton.override()};Device.prototype.resetBackButton=function(){BackButton.reset()};Device.prototype.exitApp=function(){BackButton.exitApp()};
PhoneGap.addConstructor(function(){navigator.device=window.device=new Device});var FileProperties=function(a){this.filePath=a;this.size=0;this.lastModifiedDate=null},File=function(a,b,c,d,e){this.name=a||null;this.fullPath=b||null;this.type=c||null;this.lastModifiedDate=d||null;this.size=e||0},FileError=function(){this.code=null};FileError.NOT_FOUND_ERR=1;FileError.SECURITY_ERR=2;FileError.ABORT_ERR=3;FileError.NOT_READABLE_ERR=4;FileError.ENCODING_ERR=5;FileError.NO_MODIFICATION_ALLOWED_ERR=6;
FileError.INVALID_STATE_ERR=7;FileError.SYNTAX_ERR=8;FileError.INVALID_MODIFICATION_ERR=9;FileError.QUOTA_EXCEEDED_ERR=10;FileError.TYPE_MISMATCH_ERR=11;FileError.PATH_EXISTS_ERR=12;var FileReader=function(){this.fileName="";this.readyState=0;this.onabort=this.onloadend=this.onerror=this.onload=this.onprogress=this.onloadstart=this.error=this.result=null};FileReader.EMPTY=0;FileReader.LOADING=1;FileReader.DONE=2;
FileReader.prototype.abort=function(){this.readyState=FileReader.DONE;this.result=null;var a=new FileError;a.code=a.ABORT_ERR;this.error=a;if(typeof this.onerror==="function")this.onerror({type:"error",target:this});if(typeof this.onabort==="function")this.onabort({type:"abort",target:this});if(typeof this.onloadend==="function")this.onloadend({type:"loadend",target:this})};
FileReader.prototype.readAsText=function(a,b){this.fileName="";this.fileName=typeof a.fullPath==="undefined"?a:a.fullPath;this.readyState=FileReader.LOADING;if(typeof this.onloadstart==="function")this.onloadstart({type:"loadstart",target:this});var c=this;PhoneGap.exec(function(d){if(c.readyState!==FileReader.DONE){c.result=d;if(typeof c.onload==="function")c.onload({type:"load",target:c});c.readyState=FileReader.DONE;if(typeof c.onloadend==="function")c.onloadend({type:"loadend",target:c})}},function(d){if(c.readyState!==
FileReader.DONE){c.error=d;if(typeof c.onerror==="function")c.onerror({type:"error",target:c});c.readyState=FileReader.DONE;if(typeof c.onloadend==="function")c.onloadend({type:"loadend",target:c})}},"File","readAsText",[this.fileName,b?b:"UTF-8"])};
FileReader.prototype.readAsDataURL=function(a){this.fileName="";this.fileName=typeof a.fullPath==="undefined"?a:a.fullPath;this.readyState=FileReader.LOADING;if(typeof this.onloadstart==="function")this.onloadstart({type:"loadstart",target:this});var b=this;PhoneGap.exec(function(c){if(b.readyState!==FileReader.DONE){b.result=c;if(typeof b.onload==="function")b.onload({type:"load",target:b});b.readyState=FileReader.DONE;if(typeof b.onloadend==="function")b.onloadend({type:"loadend",target:b})}},function(c){if(b.readyState!==
FileReader.DONE){b.error=c;if(typeof b.onerror==="function")b.onerror({type:"error",target:b});b.readyState=FileReader.DONE;if(typeof b.onloadend==="function")b.onloadend({type:"loadend",target:b})}},"File","readAsDataURL",[this.fileName])};FileReader.prototype.readAsBinaryString=function(a){this.fileName=a};FileReader.prototype.readAsArrayBuffer=function(a){this.fileName=a};
var FileWriter=function(a){this.fileName="";this.length=0;if(a){this.fileName=a.fullPath||a;this.length=a.size||0}this.readyState=this.position=0;this.onerror=this.onabort=this.onwriteend=this.onwrite=this.onprogress=this.onwritestart=this.error=this.result=null};FileWriter.INIT=0;FileWriter.WRITING=1;FileWriter.DONE=2;
FileWriter.prototype.abort=function(){if(this.readyState===FileWriter.DONE||this.readyState===FileWriter.INIT)throw FileError.INVALID_STATE_ERR;var a=new FileError;a.code=a.ABORT_ERR;this.error=a;if(typeof this.onerror==="function")this.onerror({type:"error",target:this});if(typeof this.onabort==="function")this.onabort({type:"abort",target:this});this.readyState=FileWriter.DONE;if(typeof this.onwriteend==="function")this.onwriteend({type:"writeend",target:this})};
FileWriter.prototype.write=function(a){if(this.readyState===FileWriter.WRITING)throw FileError.INVALID_STATE_ERR;this.readyState=FileWriter.WRITING;var b=this;if(typeof b.onwritestart==="function")b.onwritestart({type:"writestart",target:b});PhoneGap.exec(function(c){if(b.readyState!==FileWriter.DONE){b.position+=c;b.length=b.position;if(typeof b.onwrite==="function")b.onwrite({type:"write",target:b});b.readyState=FileWriter.DONE;if(typeof b.onwriteend==="function")b.onwriteend({type:"writeend",target:b})}},
function(c){if(b.readyState!==FileWriter.DONE){b.error=c;if(typeof b.onerror==="function")b.onerror({type:"error",target:b});b.readyState=FileWriter.DONE;if(typeof b.onwriteend==="function")b.onwriteend({type:"writeend",target:b})}},"File","write",[this.fileName,a,this.position])};FileWriter.prototype.seek=function(a){if(this.readyState===FileWriter.WRITING)throw FileError.INVALID_STATE_ERR;if(a)this.position=a<0?Math.max(a+this.length,0):a>this.length?this.length:a};
FileWriter.prototype.truncate=function(a){if(this.readyState===FileWriter.WRITING)throw FileError.INVALID_STATE_ERR;this.readyState=FileWriter.WRITING;var b=this;if(typeof b.onwritestart==="function")b.onwritestart({type:"writestart",target:this});PhoneGap.exec(function(c){if(b.readyState!==FileWriter.DONE){b.length=c;b.position=Math.min(b.position,c);if(typeof b.onwrite==="function")b.onwrite({type:"write",target:b});b.readyState=FileWriter.DONE;if(typeof b.onwriteend==="function")b.onwriteend({type:"writeend",
target:b})}},function(c){if(b.readyState!==FileWriter.DONE){b.error=c;if(typeof b.onerror==="function")b.onerror({type:"error",target:b});b.readyState=FileWriter.DONE;if(typeof b.onwriteend==="function")b.onwriteend({type:"writeend",target:b})}},"File","truncate",[this.fileName,a])};var Metadata=function(){this.modificationTime=null},Flags=function(a,b){this.create=a||false;this.exclusive=b||false},FileSystem=function(){this.root=this.name=null},DirectoryReader=function(a){this.fullPath=a||null};
DirectoryReader.prototype.readEntries=function(a,b){PhoneGap.exec(a,b,"File","readEntries",[this.fullPath])};var DirectoryEntry=function(){this.isFile=false;this.isDirectory=true;this.filesystem=this.fullPath=this.name=null};DirectoryEntry.prototype.copyTo=function(a,b,c,d){PhoneGap.exec(c,d,"File","copyTo",[this.fullPath,a,b])};DirectoryEntry.prototype.getMetadata=function(a,b){PhoneGap.exec(a,b,"File","getMetadata",[this.fullPath])};
DirectoryEntry.prototype.getParent=function(a,b){PhoneGap.exec(a,b,"File","getParent",[this.fullPath])};DirectoryEntry.prototype.moveTo=function(a,b,c,d){PhoneGap.exec(c,d,"File","moveTo",[this.fullPath,a,b])};DirectoryEntry.prototype.remove=function(a,b){PhoneGap.exec(a,b,"File","remove",[this.fullPath])};DirectoryEntry.prototype.toURI=function(){return"file://"+this.fullPath};DirectoryEntry.prototype.createReader=function(){return new DirectoryReader(this.fullPath)};
DirectoryEntry.prototype.getDirectory=function(a,b,c,d){PhoneGap.exec(c,d,"File","getDirectory",[this.fullPath,a,b])};DirectoryEntry.prototype.getFile=function(a,b,c,d){PhoneGap.exec(c,d,"File","getFile",[this.fullPath,a,b])};DirectoryEntry.prototype.removeRecursively=function(a,b){PhoneGap.exec(a,b,"File","removeRecursively",[this.fullPath])};var FileEntry=function(){this.isFile=true;this.isDirectory=false;this.filesystem=this.fullPath=this.name=null};
FileEntry.prototype.copyTo=function(a,b,c,d){PhoneGap.exec(c,d,"File","copyTo",[this.fullPath,a,b])};FileEntry.prototype.getMetadata=function(a,b){PhoneGap.exec(a,b,"File","getMetadata",[this.fullPath])};FileEntry.prototype.getParent=function(a,b){PhoneGap.exec(a,b,"File","getParent",[this.fullPath])};FileEntry.prototype.moveTo=function(a,b,c,d){PhoneGap.exec(c,d,"File","moveTo",[this.fullPath,a,b])};FileEntry.prototype.remove=function(a,b){PhoneGap.exec(a,b,"File","remove",[this.fullPath])};
FileEntry.prototype.toURI=function(){return"file://"+this.fullPath};FileEntry.prototype.createWriter=function(a,b){this.file(function(c){c=new FileWriter(c);if(c.fileName===null||c.fileName==="")typeof b==="function"&&b({code:FileError.INVALID_STATE_ERR});typeof a==="function"&&a(c)},b)};FileEntry.prototype.file=function(a,b){PhoneGap.exec(a,b,"File","getFileMetadata",[this.fullPath])};var LocalFileSystem=function(){};LocalFileSystem.TEMPORARY=0;LocalFileSystem.PERSISTENT=1;
LocalFileSystem.RESOURCE=2;LocalFileSystem.APPLICATION=3;LocalFileSystem.prototype.requestFileSystem=function(a,b,c,d){if(a<0||a>3)typeof d==="function"&&d({code:FileError.SYNTAX_ERR});else PhoneGap.exec(c,d,"File","requestFileSystem",[a,b])};LocalFileSystem.prototype.resolveLocalFileSystemURI=function(a,b,c){PhoneGap.exec(b,c,"File","resolveLocalFileSystemURI",[a])};
LocalFileSystem.prototype._castFS=function(a){var b=null;b=new DirectoryEntry;b.isDirectory=a.message.root.isDirectory;b.isFile=a.message.root.isFile;b.name=a.message.root.name;b.fullPath=a.message.root.fullPath;a.message.root=b;return a};
LocalFileSystem.prototype._castEntry=function(a){var b=null;if(a.message.isDirectory){console.log("This is a dir");b=new DirectoryEntry}else if(a.message.isFile){console.log("This is a file");b=new FileEntry}b.isDirectory=a.message.isDirectory;b.isFile=a.message.isFile;b.name=a.message.name;b.fullPath=a.message.fullPath;a.message=b;return a};
LocalFileSystem.prototype._castEntries=function(a){for(var b=a.message,c=[],d=0;d<b.length;d++)c.push(window.localFileSystem._createEntry(b[d]));a.message=c;return a};LocalFileSystem.prototype._createEntry=function(a){var b=null;if(a.isDirectory){console.log("This is a dir");b=new DirectoryEntry}else if(a.isFile){console.log("This is a file");b=new FileEntry}b.isDirectory=a.isDirectory;b.isFile=a.isFile;b.name=a.name;b.fullPath=a.fullPath;return b};
LocalFileSystem.prototype._castDate=function(a){if(a.message.modificationTime)a.message.modificationTime=new Date(a.message.modificationTime);else if(a.message.lastModifiedDate){var b=new File;b.size=a.message.size;b.type=a.message.type;b.name=a.message.name;b.fullPath=a.message.fullPath;b.lastModifiedDate=new Date(a.message.lastModifiedDate);a.message=b}return a};
PhoneGap.addConstructor(function(){var a=new LocalFileSystem;if(typeof window.localFileSystem==="undefined")window.localFileSystem=a;if(typeof window.requestFileSystem==="undefined")window.requestFileSystem=a.requestFileSystem;if(typeof window.resolveLocalFileSystemURI==="undefined")window.resolveLocalFileSystemURI=a.resolveLocalFileSystemURI});var FileTransfer=function(){},FileUploadResult=function(){this.bytesSent=0;this.response=this.responseCode=null},FileTransferError=function(){this.code=null};
FileTransferError.FILE_NOT_FOUND_ERR=1;FileTransferError.INVALID_URL_ERR=2;FileTransferError.CONNECTION_ERR=3;FileTransfer.prototype.upload=function(a,b,c,d,e,f){var g=null,h=null,i=null,j=null,k=true;if(e){g=e.fileKey;h=e.fileName;i=e.mimeType;if(e.chunkedMode!==null||typeof e.chunkedMode!=="undefined")k=e.chunkedMode;j=e.params?e.params:{}}PhoneGap.exec(c,d,"FileTransfer","upload",[a,b,g,h,i,j,f,k])};
FileTransfer.prototype.download=function(a,b,c,d){PhoneGap.exec(c,d,"FileTransfer","download",[a,b])};var FileUploadOptions=function(a,b,c,d){this.fileKey=a||null;this.fileName=b||null;this.mimeType=c||null;this.params=d||null};function KeyEvent(){}KeyEvent.prototype.backTrigger=function(){var a=document.createEvent("Events");a.initEvent("backKeyDown");document.dispatchEvent(a)};if(document.keyEvent==null||typeof document.keyEvent=="undefined")window.keyEvent=document.keyEvent=new KeyEvent;
PhoneGap.mediaObjects={};PhoneGap.Media=function(){};PhoneGap.Media.getMediaObject=function(a){return PhoneGap.mediaObjects[a]};PhoneGap.Media.onStatus=function(a,b,c){a=PhoneGap.mediaObjects[a];if(b==Media.MEDIA_STATE){c==Media.MEDIA_STOPPED&&a.successCallback&&a.successCallback();a.statusCallback&&a.statusCallback(c)}else if(b==Media.MEDIA_DURATION)a._duration=c;else b==Media.MEDIA_ERROR&&a.errorCallback&&a.errorCallback(c)};
Media=function(a,b,c,d,e){if(b&&typeof b!="function")console.log("Media Error: successCallback is not a function");else if(c&&typeof c!="function")console.log("Media Error: errorCallback is not a function");else if(d&&typeof d!="function")console.log("Media Error: statusCallback is not a function");else if(e&&typeof e!="function")console.log("Media Error: positionCallback is not a function");else{this.id=PhoneGap.createUUID();PhoneGap.mediaObjects[this.id]=this;this.src=a;this.successCallback=b;this.errorCallback=
c;this.statusCallback=d;this.positionCallback=e;this._position=this._duration=-1}};Media.MEDIA_STATE=1;Media.MEDIA_DURATION=2;Media.MEDIA_ERROR=9;Media.MEDIA_NONE=0;Media.MEDIA_STARTING=1;Media.MEDIA_RUNNING=2;Media.MEDIA_PAUSED=3;Media.MEDIA_STOPPED=4;Media.MEDIA_MSG=["None","Starting","Running","Paused","Stopped"];function MediaError(){this.code=null;this.message=""}MediaError.MEDIA_ERR_ABORTED=1;MediaError.MEDIA_ERR_NETWORK=2;MediaError.MEDIA_ERR_DECODE=3;MediaError.MEDIA_ERR_NONE_SUPPORTED=4;
Media.prototype.play=function(){PhoneGap.exec(null,null,"Media","startPlayingAudio",[this.id,this.src])};Media.prototype.stop=function(){return PhoneGap.exec(null,null,"Media","stopPlayingAudio",[this.id])};Media.prototype.pause=function(){PhoneGap.exec(null,null,"Media","pausePlayingAudio",[this.id])};Media.prototype.getDuration=function(){return this._duration};Media.prototype.getCurrentPosition=function(a,b){PhoneGap.exec(a,b,"Media","getCurrentPositionAudio",[this.id])};
Media.prototype.startRecord=function(){PhoneGap.exec(null,null,"Media","startRecordingAudio",[this.id,this.src])};Media.prototype.stopRecord=function(){PhoneGap.exec(null,null,"Media","stopRecordingAudio",[this.id])};function NetworkStatus(){}NetworkStatus.NOT_REACHABLE=0;NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK=1;NetworkStatus.REACHABLE_VIA_WIFI_NETWORK=2;function Network(){this.lastReachability=null}Network.prototype.updateReachability=function(a){this.lastReachability=a};
Network.prototype.isReachable=function(a,b,c){var d=false;if(c&&c.isIpAddress)d=c.isIpAddress;PhoneGap.exec(b,null,"Network Status","isReachable",[a,d])};PhoneGap.addConstructor(function(){if(typeof navigator.network=="undefined")navigator.network=new Network});function Notification(){}Notification.prototype.alert=function(a,b,c,d){PhoneGap.exec(b,null,"Notification","alert",[a,c||"Alert",d||"OK"])};
Notification.prototype.confirm=function(a,b,c,d){PhoneGap.exec(b,null,"Notification","confirm",[a,c||"Confirm",d||"OK,Cancel"])};Notification.prototype.activityStart=function(){PhoneGap.exec(null,null,"Notification","activityStart",["Busy","Please wait..."])};Notification.prototype.activityStop=function(){PhoneGap.exec(null,null,"Notification","activityStop",[])};
Notification.prototype.loadingStart=function(a){var b="",c="";if(typeof a!="undefined"){if(typeof a.title!="undefined")b=a.title;if(typeof a.message!="undefined")c=a.message}PhoneGap.exec(null,null,"Notification","progressStart",[b,c])};Notification.prototype.progressValue=function(a){PhoneGap.exec(null,null,"Notification","progressValue",[a])};Notification.prototype.loadingStop=function(){PhoneGap.exec(null,null,"Notification","progressStop",[])};Notification.prototype.blink=function(){};
Notification.prototype.vibrate=function(a){PhoneGap.exec(null,null,"Notification","vibrate",[a])};Notification.prototype.beep=function(a){PhoneGap.exec(null,null,"Notification","beep",[a])};PhoneGap.addConstructor(function(){if(typeof navigator.notification=="undefined")navigator.notification=new Notification});function TNWebViewUtil(){}TNWebViewUtil.prototype.clearCache=function(a){PhoneGap.exec(null,null,"TNWebViewUtil","clearCache",[a])};
TNWebViewUtil.prototype.goBack=function(){PhoneGap.exec(null,null,"TNWebViewUtil","goBack",[])};TNWebViewUtil.prototype.goForward=function(){PhoneGap.exec(null,null,"TNWebViewUtil","goForward",[])};TNWebViewUtil.prototype.goBackOrForward=function(a){PhoneGap.exec(null,null,"TNWebViewUtil","goBackOrForward",[a])};PhoneGap.addConstructor(function(){if(typeof navigator.tnWebViewUtil=="undefined")navigator.tnWebViewUtil=new TNWebViewUtil});
