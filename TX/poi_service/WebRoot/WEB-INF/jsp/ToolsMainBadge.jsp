<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.telenav.com/tnbrowser/taglib.tld"
	prefix="tml"%>
<%@ taglib uri="/WEB-INF/tld/cserver-taglib.tld" prefix="cserver"%>
<%@ include file="Header.jsp"%>
<%@page import="com.telenav.cserver.util.TnUtil"%>
<%@page import="com.telenav.cserver.poi.struts.Constant"%>
<%@page import="com.telenav.cserver.util.FeatureConstant"%>
<%@page import="com.telenav.cserver.poi.struts.util.PoiUtil"%>
<%@page import="com.telenav.cserver.util.FeatureUtil"%>
<%
	String pageURL = getPage + "ToolsMain";
	boolean isSupportWeather  = FeatureUtil.isSupportWeather(handlerGloble);
	String cAlertURL          = "{commuteAlert.http}/goToJsp.do?pageRegion=" + region + "&amp;jsp=Startup";
	String movieURL           = "{movie.http}/goToJsp.do?pageRegion=" + region + "&amp;jsp=StartUp";
	String localserver        = "{localappfwk.http}";
	String restaurantURL      = localserver + "/goToJsp.do?pageRegion="  + region + "&amp;appId=RESTAURANT&amp;jsp=StartUp";
	String zagatURL      = localserver + "/goToJspGlobal.do?pageRegion=" + region + "&amp;jsp=Zagat_Startup";
	String carrierName = handlerGloble.getClientInfo(DataHandler.KEY_CARRIER);
	String MyMileageURL     = localserver + "/goToJspGlobal.do?pageRegion="  + region + "&amp;jsp=MyMileageAboutPhase2";
	String MyMileageHomeURL     = localserver + "/goToJspGlobal.do?pageRegion="  + region + "&amp;jsp=MyMileageHome";
%>
<tml:TML outputMode="TxNode">
<%@ include file="/WEB-INF/jsp/weather/controller/WeatherController.jsp"%>

	<tml:script language="fscript" version="1">
		<![CDATA[
		    <%@ include file="GetServerDriven.jsp"%>
		    func preLoad()
		       if ServerDriven_CanCommuteAlert()
		          Page.setComponentAttribute("item2","visible","1")
		       else
		          Page.setComponentAttribute("item2","visible","0")
		       endif
		       
		       if ServerDriven_CanWeather()
		          Page.setComponentAttribute("item1","visible","1")
		       else
		          Page.setComponentAttribute("item1","visible","0")
		       endif
		           
		       if ServerDriven_CanLocalAppRestaurant()
		          Page.setComponentAttribute("item4","visible","1")
		       else
		          Page.setComponentAttribute("item4","visible","0")
		       endif
		       
		       if ServerDriven_CanLocalAppZagat()
		          Page.setComponentAttribute("zagatListItem","visible","1")
		       else
		          Page.setComponentAttribute("zagatListItem","visible","0")
		       endif
		         
		       if ServerDriven_CanMyMileage()
		          Page.setComponentAttribute("myMileageItem","visible","1")
		       else
		          Page.setComponentAttribute("myMileageItem","visible","0")
		       endif
		    endfunc
		    
		    func onClickWeather()
		        Weather_C_showCurrent()
		        return FAIL
		    endfunc
		
		func setBadgeCounter(int value)

    			TxNode node
    			TxNode.addValue(node, value)
    			String saveKey = "<%=Constant.StorageKey.SHOW_NEW_BADGE%>"
    			Cache.saveCookie(saveKey, node)

			endfunc

			func getBadgeCounter()

			    int value
    			value = 0

    			String saveKey = "<%=Constant.StorageKey.SHOW_NEW_BADGE%>"
    			TxNode node = Cache.getCookie(saveKey)
    			if NULL != node
        			value = TxNode.valueAt(node,0);
    			endif
	        
    			return value 

			endfunc

			func incrementBadgeCounter()

    			int value
    			value = getBadgeCounter()
    			value = value + 1

    			setBadgeCounter(value)
    
    			return value

			endfunc

			func onClickRestaurant()
				setBadgeCounter(5)
				System.doAction("restaurantURLMenu")
			endfunc
			
		    func onMyMileageClick()
			if !checkMileageEnable()
					System.doAction("MyMileageMenuURL")
					return
				endif
				println("Enabled")
				if !isPremium()
					System.doAction("MyMileageMenuURL")
					return
				endif
				if !checkTermsConditionAccept()
					System.doAction("MyMileageMenuURL")
					return					
				endif
				System.doAction("MyMileageHomeMenuURL")
		    endfunc
		    
		   func checkTermsConditionAccept()
			TxNode node = Cache.getCookie("ACCEPTED_MYMILEAGE_TERMS")
		   	string flag
	        	if NULL != node
	          	 	flag = TxNode.msgAt(node,0)
	          	 	if flag != NULL
	          	 		if flag == "YES"
	          	 			return TRUE
	          	 		endif
	          	 	endif
	        	endif
	        	return FALSE
		    endfunc

		    func checkMileageEnable()
		    	TxNode node = Cache.getCookie("MyMileageEnable")
		       string flag
	        	if NULL != node
	          	 	flag = TxNode.msgAt(node,0)
	          	 	if flag != NULL
	          	 		if flag == "Mileage Enabled"
	          	 			return TRUE
	          	 		endif
	          	 	endif
	        	endif
	        	return FALSE
		    endfunc
		    func AccountTypeForSprint_GetServiceLevel()
			    TxNode serviceLevelNode = UserInfo.getAccountInfo()
			    println("get user info from...........")
			    println(serviceLevelNode)
		        int value = 0
		        if NULL != serviceLevelNode && TxNode.getValueSize(serviceLevelNode) > 1
		           value = TxNode.valueAt(serviceLevelNode, 1)
		        endif
		       
		        println("service level................"+value)
		        return value
		    endfunc
			func isPremium()
				int serviceLevel =  AccountTypeForSprint_GetServiceLevel()
				if serviceLevel >= <%=Constant.SERVICE_LEVEL_PREMIUM_FREE%>
					return TRUE
				endif
				return FALSE
			endfunc
		]]>
	</tml:script>
	<%
		String helpMsg="";
		if (TnUtil.isRogersCarrier(carrierName))
			helpMsg="$//$apps";
		 else
			helpMsg="$//$apps";
	%>
	<tml:page id="localApps" url="<%=pageURL%>" type="<%=pageType%>"
			showLeftArrow="true" showRightArrow="true"  helpMsg="<%=helpMsg %>" groupId="<%=GROUP_ID_MISC%>">
	
		<tml:title id="title" align="center|middle"
			fontWeight="bold|system_large" fontColor="white">
			<%=msg.get("apps.title")%>
		</tml:title>

		<tml:listBox id="menuListBox" name="pageListBox:settingsList"
			isFocusable="true" hotKeyEnable="false">
			<tml:block feature="<%=FeatureConstant.MOVIE%>">
				<tml:menuItem name="movieMenu" pageURL="<%=movieURL%>" />
				<tml:listItem id="item0" fontWeight="bold|system_large"
					focusIconImage="<%=imageUrl
										+ "sub_movie.png"%>"
					blurIconImage="<%=imageUrl
										+ "sub_movie.png"%>"
					align="left|middle" showArrow="true">

					<%=msg.get("apps.Movies")%>
					<tml:menuRef name="movieMenu" />
				</tml:listItem>
			</tml:block>

			<tml:menuItem name="weatherMenu" onClick="onClickWeather" trigger="TRACKBALL_CLICK" />
			<tml:listItem id="item1" fontWeight="bold|system_large"
				focusIconImage="<%=imageUrl + "sub_weather.png"%>"
				blurIconImage="<%=imageUrl + "sub_weather.png"%>"
				align="left|middle" showArrow="true">
				<%=msg.get("apps.Weather")%>
				<tml:menuRef name="weatherMenu" />
			</tml:listItem>

			<tml:block feature="<%=FeatureConstant.COMMUTE_ALERTS%>">
				<tml:menuItem name="commuteAlert" pageURL="<%=cAlertURL%>"></tml:menuItem>
				<tml:listItem id="item2" fontWeight="bold|system_large"
					focusIconImage="<%=imageUrl + "sub_commute_alert.png"%>"
					blurIconImage="<%=imageUrl + "sub_commute_alert.png"%>"
					showArrow="true">
					<%=msg.get("apps.CommuteAlerts")%>
					<tml:menuRef name="commuteAlert"></tml:menuRef>
				</tml:listItem>
			</tml:block>

			<tml:block feature="<%=FeatureConstant.RESTAURANT_LOCALAPPS%>">
				<tml:menuItem name="restaurantURLMenu" pageURL="<%=restaurantURL%>" />
				<tml:menuItem name="restaurantMenu" onClick="onClickRestaurant" trigger="TRACKBALL_CLICK" />
				<tml:listItem id="item4" fontWeight="bold|system_large"
					blurBgImage="<%=imageUrl+ "list_bg_40px_restaurant.png"%>"
					focusBgImage="<%=imageUrl+ "list_bg_highlight_40px_restaurant.png"%>"
					focusIconImage="<%=imageUrl + "restaurant_reservation.png"%>"
					blurIconImage="<%=imageUrl + "restaurant_reservation.png"%>"
					showArrow="true">
					<%=msg.get("apps.Restaurant")%>
					<tml:menuRef name="restaurantMenu" />
				</tml:listItem>
			</tml:block>

			<tml:menuItem name="zagatMenuItem" pageURL="<%=zagatURL%>" />
			<tml:listItem id="zagatListItem" fontWeight="bold|system_large"
				focusIconImage="<%=imageUrl + "sub_zagat_big.png"%>"
				blurIconImage="<%=imageUrl + "sub_zagat_big.png"%>"
				showArrow="true">
				<%=msg.get("apps.Zagat")%>
				<tml:menuRef name="zagatMenuItem" />
			</tml:listItem>
			
			<tml:menuItem name="MyMileageMenu" onClick="onMyMileageClick" />
			<tml:menuItem name="MyMileageMenuURL" pageURL="<%=MyMileageURL%>" />
			<tml:menuItem name="MyMileageHomeMenuURL" pageURL="<%=MyMileageHomeURL%>" />
			
			<tml:listItem id="myMileageItem" fontWeight="system_large"
				focusIconImage="<%=imageUrl + "my-mileage-icon.png"%>"
				blurIconImage="<%=imageUrl + "my-mileage-icon.png"%>"
				showArrow="true">
				<%=msg.get("apps.MyMileage")%>
				<tml:menuRef name="MyMileageMenu" />
			</tml:listItem>

			
		</tml:listBox>
	</tml:page>
	<cserver:outputLayout />
</tml:TML>
