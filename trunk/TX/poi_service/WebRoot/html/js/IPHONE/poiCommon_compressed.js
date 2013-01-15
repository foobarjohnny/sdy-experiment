function PoiCommon(){}
PoiCommon.prototype={saveFavToClient:function(){var a=getPoiDetailObj();this.hasValidPoiAddress(a)&&SDKAPI.invokePrivateService("SaveToFavoriteDirectly",a,this.saveFavToClientCallBack)},saveFavToClientCallBack:function(){$("#favIndicator").attr("class","favorites_add_button_unfocused");$("#favHref").attr("onClick","");saveFavFlag();var a=document.getElementById("bgDiv");a.style.display="block";window.setTimeout(function(){a.style.display="none"},1250)},onClickDrive:function(a){function b(){a.disabled=false}
function c(){CommonUtil.debug("Failed to start navigation!");a.disabled=false}a.disabled=true;var d=getPoiDetailObj();if(this.hasValidPoiAddress(d)){recordMisLog_DriveTo();navigator.tnservice.navTo("",d,"",b,c)}},showMapOfClient:function(){function a(){}function b(){CommonUtil.debug(I18NHelper["Failed in mapping this place!"])}var c=getPoiDetailObj();if(this.hasValidPoiAddress(c)){recordMisLog_ViewMap();navigator.tnservice.displayMap(c,"",a,b)}},formatPhoneToDisplay:function(a){a=CommonUtil.getValidString(a);
a=$.trim(a);if(""==a)return a;var b=a.length;if(b==11)a=a.substring(1);if(b==10){b=a.substring(0,3);var c=a.substring(3,6);a=a.substring(6);a="("+b+") "+c+"-"+a}return a},onClickPhoneNo:function(){var a=this.getPhoneNo();if(a){recordMisLog_CallTo();location.href="tel:"+a}},hasValidPoiAddress:function(a){return a&&this.isPoiAddressValid(a.stop)},isPoiAddressValid:function(a){return a.lat&&a.lon},changePoiDetailCss:function(){resizeMenuImage()},setPoiAddressDisplay:function(a){var b="";if(this.isPoiAddressValid(a)){if(a.firstLine)b+=
'<div style="width:100%;" class="clsAddressFS clsAddressLineSpan">'+a.firstLine.toUpperCase()+"</div>";b+="<div class='clsCityFS'>";if(a.city)b+=a.city.toUpperCase();if(a.province)b+=", "+a.province.toUpperCase();b+=" "+a.zip+"</div>";$("#mainButtonsBar").css("display","block")}else{if(CommonUtil.isIphone()){b=I18NHelper["common.address.Unavailable"];$("#navImg").hide()}else b=I18NHelper["common.Unavailable"];this.disableButton("navButton")}$("#address").html(b)},disableButton:function(a){$("#"+a).attr("onClick",
"");$("#"+a).attr("ontouchstart","");$("#"+a).attr("ontouchend","");$("#"+a).attr("ontouchmove","");$("#"+a).css("opacity","0.6")},setPhoneNo:function(){CommonUtil.isScoutStyle()&&$("#phoneDivLandscape").html('<div class="td" style="width:20%;"></div><div class="td clsPhonePicContainerLandscape" style="width:60%;vertical-align:middle;" align="center">\t<img id="phonePicCallForScout" class="call_icon_unfocused" /></div><div class="td" style="width:20%;" align="right">\t<img id="phonePicLandscape" class="poi_details_call_icon_unfocused"/></div>');
var a=this.getPhoneNo();if(a){a=PoiCommonHelper.formatPhoneToDisplay(a);$("#phone").html(a);CommonUtil.isIpad()&&ProgramConstants.ATTNAVPROG==ClientInfo.programCode&&$("#phoneDivLandscape").html("<span class='td align_center fs_small fw_bold'>"+a+"</span>")}else{if(CommonUtil.isScoutStyle()){$("#phone").html(I18NHelper["common.phone.Unavailable"]);$("#phonePic").hide();$("#phonePicLandscape").hide()}else $("#phone").html(I18NHelper["common.Unavailable"]);this.disableButton("phoneButton");this.disableButton("phoneButtonLandscape")}},
getPhoneNo:function(){var a=getPoiDetailObj();return a?CommonUtil.getValidString(a.poi.bizPoi.phoneNumber):""},changePhoneNoLayout:function(){if(CommonUtil.isLandscape()){$("#thirdLineDivLandscape").show();$("#thirdLineDiv").hide()}else{$("#thirdLineDiv").show();$("#thirdLineDivLandscape").hide()}},highLightPhone:function(a){var b="#phonePic";if(a.id=="phoneButtonLandscape")b="#phonePicLandscape";var c=$(b).attr("class").replace("poi_details_call_icon_unfocused","poi_details_call_icon_focused");$(b).attr("class",
c);highlightBtnAll(a,"clsPhoneNoColor","clsPhoneNoColorHL");disHighlightBtnAll(a,"clsPhoneBtnBgNormal","clsPhoneBtnBgHL");CommonUtil.isScoutStyle()&&$("#phonePicCallForScout").attr("class","call_icon_focused")},dishighLightPhone:function(a){var b="#phonePic";if(a.id=="phoneButtonLandscape")b="#phonePicLandscape";var c=$(b).attr("class").replace("poi_details_call_icon_focused","poi_details_call_icon_unfocused");$(b).attr("class",c);disHighlightBtnAll(a,"clsPhoneNoColorHL","clsPhoneNoColor");disHighlightBtnAll(a,
"clsPhoneBtnBgHL","clsPhoneBtnBgNormal");CommonUtil.isScoutStyle()&&$("#phonePicCallForScout").attr("class","call_icon_unfocused")},highLightNavButton:function(a){var b=$("#navImg").attr("class").replace("poi_details_driveto_icon_unfocused","poi_details_driveto_icon_focused");$("#navImg").attr("class",b);switchHightlight(a,"clsNavButtonBgNormal","clsNavButtonBgHL");switchHightlight(a,"clsNavFontColor","clsNavFontColorHL")},dishighLightNavButton:function(a){var b=$("#navImg").attr("class").replace("poi_details_driveto_icon_focused",
"poi_details_driveto_icon_unfocused");$("#navImg").attr("class",b);switchHightlight(a,"clsNavButtonBgHL","clsNavButtonBgNormal");switchHightlight(a,"clsNavFontColorHL","clsNavFontColor")},generateTabs:function(a){hasTabNum=a.length;for(var b=0,c=0,d="",f=0;f<a.length;f++){b=this.getTabWidth(a[f][1],hasTabNum);d+=f==0?this.createTab(b,a[f][0],a[f][1],"On",c,hasTabNum):this.createTab(b,a[f][0],a[f][1],"Off",c,hasTabNum);c++}d+="<div class='td'>&nbsp;</div>";$("#tabShow").html(d)},addTab:function(a,
b,c,d){var f=a.length;if(b&&f<4)a[f]=[c,d]},createTab:function(a,b,c,d,f,g){var e="";e+='<div class="td clsTabOutSideTable '+a+'">';e+='<div style="width:100%;" class="table clsTabInSideTable clsFixTable">';e+="<div class=\"tr\" onClick=\"PoiCommonHelper.onChangeTab('poidetailtab','"+f+"','"+g+"','"+c+"')\">";e+='<div id="poidetaillefttab'+f+'" height="100%" align="center" class="'+("td clsButtonLeft"+d)+'"> </div>';e+='<div id="poidetailmiddletab'+f+'" height="100%" align="center" class="'+("td clsButtonMiddle"+
d)+'"><span class="fs_middle4Tab fs_middle">'+b+"</span></div>";e+='<div id="poidetailrighttab'+f+'" height="100%" align="center" class="'+("td clsButtonRignt"+d)+'"></div>';e+="</div>";e+="</div>";e+="</div>";return e},getTabWidth:function(a,b){var c="clsPoiTabNormalSmall";if(b<=4)c="clsPoiTabNormal";if("poireview"==a)c="clsPoiTabReview";else if("poigas"==a)c="clsPoiTabGas";else if("poitheater"==a)c="clsPoiTabTheater";if("poiextra"==a&&b>=4)c="clsPoiTabNormalSmall";return c},onChangeTab:function(a,
b,c,d){PopupUtil.hide();for(a=0;a<c;a++)if(a==b){document.getElementById("poidetaillefttab"+b).className="td clsTabEdge clsTabLeftOnBk";document.getElementById("poidetailmiddletab"+b).className="td clsButtonMiddleOn clsTabMiddleOnBk text_cutoff";document.getElementById("poidetailrighttab"+b).className="td clsTabEdge clsTabRightOnBk"}else if(document.getElementById("poidetaillefttab"+a)){document.getElementById("poidetaillefttab"+a).className="td clsTabEdge clsTabLeftOffBk";document.getElementById("poidetailmiddletab"+
a).className="td clsButtonMiddleOff clsTabMiddleOffBk text_cutoff";document.getElementById("poidetailrighttab"+a).className="td clsTabEdge clsTabRightOffBk"}hideAll();$("#"+d).show();eval("show"+d)()},showpoideals:function(){var a="",b=CommonUtil.getValidString(PoiCacheHelper.getPoiDealCache());if(""!=b){b=JSON.parse(b);if(b.success){b=JSON.parse(b.deals);for(var c=b.length,d=0;d<c;d++)a+=this.getDealDiv(b[d].name,b[d].description,b[d].dealImage);if(c==0)a+=this.getDealDiv("",I18NHelper["poidetail.dataUnavailable"]);
else recordMisLog_ViewCoupon()}}$("#poideals").html(a)},displayPoiMenu:function(){var a="";a=CommonUtil.getValidString(PoiCacheHelper.getPoiMenuCache());if(""!=a){recordMisLog_ViewMenu();a=JSON.parse(a);var b=a.menu;if(""!=b)$("#poimenu").html(b);else{$("#menuImageDiv").width();$("#clsPadding");$("#menuImageDiv").width();$("#clsPadding");$("#poimenu").html("");""!=a.menuImage?$("#poimenu").html('<image id="{0}" src="{1}" />'.format("menuImage","data:image/png;base64,"+a.menuImage)):$("#poimenu").html(I18NHelper["poidetail.menuUnavailable"])}}},
getDealDiv:function(a,b,c){a="<div class='clsDealItemDiv'><div class='clsDealTitleDiv fs_large fw_bold fc_black'>"+a+"</div><div class='clsDealInfoDiv fs_small fc_gray'>"+b+"</div>";if(c)a+="<div class='clsDealInfoDiv'><img id='dealImage' src='"+c+"'/></div>";a+="</div>";return a},getAdSourceImageClass:function(a){var b="";if(""!=a){if(a=="TN"&&$("#programCode").val()=="SCOUTPROG")a="Scout";b=a+"_logo"}return b},formatPoiDesc:function(a){return a=a.replace(/[&]{1}/g,"&amp;")},getAdsId:function(a){var b=
"";if(a.poi){b=CommonUtil.getValidString(a.poi.adsId);a=a.poi.ad;if((""==b||"0"==b)&&a)b=CommonUtil.getValidString(a.adID)}return b},fetchPoiMainFromServer:function(){loadPopup_poidetail();var a=PoiDetailSpecificHelper.getSearchCriteriaForAds();a={loadingStyle:2,url:GLOBAL_hostUrl+"getPoiDetailData.do?operateType=mainnew&jsonStr="+JSON.stringify(a)+"&"+CommonUtil.getClientInfo(),onSuccess:this.ajaxCallBackPoiMainFromServer};CommonUtil.ajax(a)},ajaxCallBackPoiMainFromServer:function(a){PoiDetailSpecificHelper.handlePoiMainFromServer(a)}};
var PoiCommonHelper=new PoiCommon;var PoiCacheKeys={POIDETAIL:"SESSION_STORAGE_POIDETAILDATA",SIMPLEPOI:"SESSION_STORAGE_SIMPLE_POIDETAILDATA",REVIEWDATA:"SESSION_STORAGE_POIREVIEWDATA",REVIEWOPTIONS:"SESSION_STORAGE_POIREVIEWOPTIONS"};function PoiCache(){}
PoiCache.prototype={setLogoImageCache:function(a,b){localStorage.setItem(this.getLogoImageCacheKey(a),b)},getLogoImageCache:function(a){return localStorage.getItem(this.getLogoImageCacheKey(a))},getLogoImageCacheKey:function(a){return"LOCAL_STORAGE_LOGOIMAGE_"+a},setPoiMainCache:function(a){sessionStorage.setItem(this.getPoiMainCacheKey(),a)},getPoiMainCache:function(){return sessionStorage.getItem(this.getPoiMainCacheKey())},removePoiMainCache:function(){return sessionStorage.removeItem(this.getPoiMainCacheKey())},
getPoiMainCacheKey:function(){return"SESSION_STORAGE_POIDATA_MAIN_"+$("#poikey").val()},setPoiMenuCache:function(a){sessionStorage.setItem(this.getPoiMenuCacheKey(),a)},getPoiMenuCache:function(){return sessionStorage.getItem(this.getPoiMenuCacheKey())},removePoiMenuCache:function(){return sessionStorage.removeItem(this.getPoiMenuCacheKey())},getPoiMenuCacheKey:function(){return"SESSION_STORAGE_POIDATA_MENU_"+$("#poikey").val()},setGasByPriceCache:function(a){sessionStorage.setItem(this.getGasByPriceCacheKey(),
a)},getGasByPriceCache:function(){return sessionStorage.getItem(this.getGasByPriceCacheKey())},removeGasByPriceCache:function(){return sessionStorage.removeItem(this.getGasByPriceCacheKey())},getGasByPriceCacheKey:function(){return"SESSION_STORAGE_POIDATA_GASBYPRICE_"+$("#poikey").val()},setPoiDealCache:function(a){sessionStorage.setItem(this.getPoiDealCacheKey(),a)},getPoiDealCache:function(){return sessionStorage.getItem(this.getPoiDealCacheKey())},removePoiDealCache:function(){return sessionStorage.removeItem(this.getPoiDealCacheKey())},
getPoiDealCacheKey:function(){return"SESSION_STORAGE_POIDATA_DEAL_"+$("#poikey").val()},setPoiExtraCache:function(a){sessionStorage.setItem(this.getPoiExtraCacheKey(),a)},getPoiExtraCache:function(){return sessionStorage.getItem(this.getPoiExtraCacheKey())},removePoiExtraCache:function(){return sessionStorage.removeItem(this.getPoiExtraCacheKey())},getPoiExtraCacheKey:function(){return"SESSION_STORAGE_POIDATA_EXTRA_"+$("#poikey").val()},setCurrentReviewer:function(a){sessionStorage.setItem(this.getCurrentReviewerCacheKey(),
a)},removeCurrentReviewerCache:function(){return sessionStorage.removeItem(this.getCurrentReviewerCacheKey())},getCurrentReviewer:function(){return sessionStorage.getItem(this.getCurrentReviewerCacheKey())},getCurrentReviewerCacheKey:function(){return"SESSION_STORAGE_REVIEWE_CURRENTREVIEWER"},setNickName:function(a){sessionStorage.setItem(this.getNickNameCacheKey(),a)},getNickName:function(){return sessionStorage.getItem(this.getNickNameCacheKey())},getNickNameCacheKey:function(){return"SESSIONSTORAGE_STORAGE_NICKNAME"},
getDummyPoiDetail:function(){var a="",b=document.getElementById("dummyTemplate").value;b={data:0,url:GLOBAL_hostUrl+"dummyDataAction.do?poi="+b,isAsynchronous:false};b.onSuccess=function(c){a=c};CommonUtil.ajax(b);return a},getReviewStatusCacheKey:function(){return"SESSIONSTORAGE_STORAGE_REVIEWSTATUS_"+$("#poikey").val()},getReviewStatus:function(){return sessionStorage.getItem(this.getReviewStatusCacheKey())},setReviewStatusAsView:function(){this.setReviewStatus("VIEW")},setReviewStatus:function(a){sessionStorage.setItem(this.getReviewStatusCacheKey(),
a)},setPoiReviewCacheKeyForAddReview:function(){sessionStorage.setItem("SESSIONSTORAGE_STORAGE_POI_REVIEW_CACHEKEY_FOR_ADDREVIEW",appendPoiKey(PoiCacheKeys.REVIEWDATA))},getPoiReviewCacheKeyForAddReview:function(){return sessionStorage.getItem("SESSIONSTORAGE_STORAGE_POI_REVIEW_CACHEKEY_FOR_ADDREVIEW")},setPoiReviewOptionCache:function(a){sessionStorage.setItem(PoiCacheKeys.REVIEWOPTIONS,a)},getPoiReviewOptionCache:function(){return sessionStorage.getItem(PoiCacheKeys.REVIEWOPTIONS)},removePoiReviewCacheKeyForAddReview:function(){sessionStorage.removeItem("SESSIONSTORAGE_STORAGE_POI_REVIEW_CACHEKEY_FOR_ADDREVIEW")},
setPoiReviewCacheForAddReview:function(a){sessionStorage.setItem(this.getPoiReviewCacheKeyForAddReview(),a)},setMapFlag:function(a){sessionStorage.setItem(this.getMapFlagCacheKey(),a)},removeMapFlagCache:function(){return sessionStorage.removeItem(this.getMapFlagCacheKey())},getMapFlag:function(){return sessionStorage.getItem(this.getMapFlagCacheKey())},getMapFlagCacheKey:function(){return"SESSIONSTORAGE_STORAGE_MAPFLAG_"+$("#poikey").val()},setBizHourFlag:function(a){sessionStorage.setItem(this.getBizHourFlagCacheKey(),
a)},removeBizHourFlagCache:function(){return sessionStorage.removeItem(this.getBizHourFlagCacheKey())},getBizHourFlag:function(){return sessionStorage.getItem(this.getBizHourFlagCacheKey())},getBizHourFlagCacheKey:function(){return"SESSIONSTORAGE_STORAGE_BIZHOURFLAG_"+$("#poikey").val()}};var PoiCacheHelper=new PoiCache;function PoiFetchData(){}
PoiFetchData.prototype={fetchLogoImage:function(a){var b=CommonUtil.getValidString(PoiCacheHelper.getLogoImageCache(a.logoName));if(b!="")displayLogoImage(b);else{a={url:GLOBAL_hostUrl+"getLogImage.do?jsonStr="+JSON.stringify(a)+"&"+CommonUtil.getClientInfo(),onSuccess:this.ajaxCallFetchLogoImage};CommonUtil.ajax(a)}},ajaxCallFetchLogoImage:function(a){var b=a.image;if(b!=""&&b!=null){displayLogoImage(b);PoiCacheHelper.setLogoImageCache(a.imageName,b)}},fetchPoiExtra:function(){loadPopup_poidetail();var a=
{loadingStyle:2,url:GLOBAL_hostUrl+"getPoiDetailData.do?operateType=extra&jsonStr="+JSON.stringify(getPoiSearchKey())+"&"+CommonUtil.getClientInfo(),onSuccess:this.ajaxCallBackPoiExtra};CommonUtil.ajax(a)},ajaxCallBackPoiExtra:function(a){if(a.success){PoiCacheHelper.setPoiExtraCache(JSON.stringify(a));displayPoiExtra()}else noRecordFoundForExtra()},fetchMenuData:function(){var a=getPoiSearchKey();a.menuWidth=$("#menuImageDiv").width();a.menuHeight=$("#menuImageDiv").width();loadPopup_poidetail();
a={url:GLOBAL_hostUrl+"getPoiDetailData.do?operateType=menu&jsonStr="+JSON.stringify(a)+"&"+CommonUtil.getClientInfo(),onSuccess:this.ajaxCallBackPoiMenu,loadingStyle:2};CommonUtil.ajax(a)},ajaxCallBackPoiMenu:function(a){if(a.success){PoiCacheHelper.setPoiMenuCache(JSON.stringify(a));PoiCommonHelper.displayPoiMenu()}},fetchReviewData:function(){var a=getPoiDetailObj();a={poiId:a.poi.bizPoi.poiId,categoryId:a.poi.bizPoi.categoryId};loadPopup_poidetail();a={loadingStyle:2,url:GLOBAL_hostUrl+"poireview.do?operateType=view&jsonStr="+
JSON.stringify(a)+"&"+CommonUtil.getClientInfo(),onSuccess:this.ajaxCallBackReview};CommonUtil.ajax(a)},ajaxCallBackReview:function(a){CommonUtil.saveInCache(appendPoiKey(PoiCacheKeys.REVIEWDATA),JSON.stringify(a));displayReview()}};var PoiFetchDataHelper=new PoiFetchData;function PoiDetailSpecific(){}
PoiDetailSpecific.prototype={setMapSize:function(){if(window.devicePixelRatio==2){var a=getMapSize(),b=a.width;a=a.height;$("#mapImageDiv").width(b);$("#mapImageDiv").height(a)}},getSearchCriteria:function(a){var b=getMapSize(),c=getActualSize(b.width);b=getActualSize(b.height);return{imageName:"",width:c,height:b,center:a,markers:"color:scoutA|"+a}},getStaticMapUrl:function(a){var b=getPoiDetailObj().poi.bizPoi.poiId,c=GLOBAL_mapapiUrl;c+="?width="+a.width+"&height="+a.height+"&zoom=1&center=";c+=
a.center+"&markers="+encodeURIComponent(a.markers)+"&apiKey="+encodeURIComponent(GLOBAL_mapapiKey)+"&poiID="+b;if(window.devicePixelRatio==2)c+="&reserved=layers=NA_TA_LARGE";return c},fetchLogoWhenShowMain:function(a){fetchLogo(a)},getTopPartLogoImage:function(){displayEmptyLogo()},initTab:function(){var a=isBackFromViewOrAddReview();a||clearPoiCache();var b=CommonUtil.getValidString(PoiCacheHelper.getPoiMainCache());if(""==b){b=[];PoiCommonHelper.addTab(b,true,I18NHelper["poidetail.tab.main"],"poimain");
PoiCommonHelper.generateTabs(b);setShownTab(false)}else this.generateTabsBaseOnFlag(b);a&&PoiCacheHelper.setReviewStatus("")},loadPoiMain:function(){PoiCommonHelper.fetchPoiMainFromServer()},getSearchCriteriaForAds:function(){var a=getPoiDetailObj(),b=PoiCommonHelper.getAdsId(a);return{poiId:a.poi.bizPoi.poiId,categoryId:a.poi.bizPoi.categoryId,adsId:b,width:0,height:0,menuWidth:0,menuHeight:0}},handlePoiMainFromServer:function(a){if(a.success){var b=a.mainTab;PoiCacheHelper.setPoiMainCache(b);PoiCacheHelper.setPoiMenuCache(a.menuTab);
PoiCacheHelper.setPoiDealCache(a.dealTab);if(b!=""){b=JSON.parse(a.mainTab);PoiDetailSpecificHelper.generateTabsBaseOnFlag(a.mainTab);fetchLogo(b.logoName)}else displayMapImage()}else displayMapImage()},generateTabsBaseOnFlag:function(a){a=JSON.parse(a);var b=a.hasReview,c=a.hasDeal,d=a.hasPoiMenu,f=a.hasPoiExtraAttributes,g=a.hasGasPrice;b||hideTopReviewNo();a=a.hasTheater&&CommonUtil.getBoolean(FeatureHelper.MOVIE);var e=[];PoiCommonHelper.addTab(e,true,I18NHelper["poidetail.tab.main"],"poimain");
PoiCommonHelper.addTab(e,b,I18NHelper["poidetail.tab.reviews"],"poireview");PoiCommonHelper.addTab(e,c,I18NHelper["poidetail.tab.deals"],"poideals");PoiCommonHelper.addTab(e,d,I18NHelper["poidetail.tab.menu"],"poimenu");PoiCommonHelper.addTab(e,a,I18NHelper["poidetail.tab.showtime"],"poitheater");PoiCommonHelper.addTab(e,g,I18NHelper["poidetail.tab.gasprices"],"poigas");PoiCommonHelper.addTab(e,f,I18NHelper["poidetail.tab.extra"],"poiextra");PoiCommonHelper.generateTabs(e);b=isBackFromViewOrAddReview();
c="";if(a)c="poitheater";a?loadResourceAndSetShownTab(c,b):setShownTab(b)},fetchGasByPriceData:function(){var a=getPoiSearchKey();loadPopup_poidetail();a={loadingStyle:2,url:GLOBAL_hostUrl+"getPoiDetailData.do?operateType=gasprice&jsonStr="+JSON.stringify(a)+"&"+CommonUtil.getClientInfo(),onSuccess:this.ajaxCallBackGasByPrice};CommonUtil.ajax(a)},ajaxCallBackGasByPrice:function(a){if(a.success){PoiCacheHelper.setGasByPriceCache(JSON.stringify(a));displayGasByPrice()}},hasReviewTab:function(){var a=
false,b=CommonUtil.getValidString(PoiCacheHelper.getPoiMainCache());if(""!=b)a=JSON.parse(b).hasReview;return a}};var PoiDetailSpecificHelper=new PoiDetailSpecific;