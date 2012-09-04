<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.telenav.com/tnbrowser/taglib.tld"
	prefix="tml"%>
<%@ taglib uri="/WEB-INF/tld/cserver-taglib.tld" prefix="cserver"%>
<%@ include file="../Header.jsp"%>
<%@page import="java.util.List"%>
<%@page import="com.telenav.cserver.util.FeatureConstant"%>

<%
    String pageURL = getPage + "RecentPlaces";
    String pageURLCallBack = getPageCallBack + "RecentPlaces";
%>
<tml:TML outputMode="TxNode">
	<%@ include file="../poi/controller/RatePoiController.jsp"%>
	<%@ include file="../poi/controller/ShowDetailController.jsp"%>
	<%@ include file="controller/ShareAddressController.jsp"%>
	<%@ include file="/WEB-INF/jsp/controller/DriveToController.jsp"%>
	<%@ include file="model/AddressCaptureModel.jsp"%>
	<%@ include file="../poi/controller/SearchPoiController.jsp"%>
	<%@ include file="../misc/controller/SendUpdateController.jsp"%>
	<%@ include file="/WEB-INF/jsp/ac/controller/CreateFavoritesController.jsp"%>
	<jsp:include page="/WEB-INF/jsp/local_service/controller/MapWrapController.jsp" />
	<%@ include file="../StopUtil.jsp"%>
	<tml:script language="fscript" version="1">
		<![CDATA[
		     func onShow()
		         int status
				 status = AddressCapture_M_getRecentPlacesStatus()
		         if 1 == status
		            System.doAction("returnToRecentPlace")
		         else
		            System.doAction("recentClick")
		         endif
		         return FAIL
		     endfunc
		     
		     func onClickRecent()
	            TxNode nextAction
				nextAction = ParameterSet.getParam("nextAction")
				if NULL == nextAction
				   AddressCapture_M_deleteRecentPlacesStatus()
				   System.back()
				else
				   String nextActionStr = TxNode.msgAt(nextAction,0)
				   if nextActionStr == NULL
				   	 nextActionStr = ""
				   endif
				   if "Drive To" == nextActionStr
					  TxNode poiNode = TxNode.childAt(nextAction,0)
					  if NULL != poiNode
					      int childSize = TxNode.getChildSize(poiNode)
					      JSONObject jo
					      #Stop
					      if 0 == childSize
					         jo = convertStopToJSON(poiNode)
					         JSONObject.put(jo,"poiOrStop","stop")
					      else
					         jo = convertTxNodeToPoiJSON(poiNode)
					         JSONObject.put(jo,"poiOrStop","poi")
					      endif
					      String joStr = JSONObject.toString(jo)
					      TxNode node
					      TxNode.addMsg(node,joStr)
					  	  DriveTo_C_saveStopType(<%=Constant.STOP_RECENT%>)
					  	  DriveTo_C_doNav(node,"","RECENTPLACES")
					  endif
				   elsif "Map It" == nextActionStr
					  TxNode poiNode = TxNode.childAt(nextAction,0)
					  if NULL != poiNode
					      int childSize = TxNode.getChildSize(poiNode)
					      JSONObject jo
					      #Stop
					      if 0 == childSize
					         jo = convertStopToJSON(poiNode)
					      else
					         TxNode locationNode = TxNode.childAt(poiNode,0)
					         TxNode stopNode = TxNode.childAt(locationNode,0)
			    			 jo = convertStopToJSON(stopNode)
					      endif
					      MapWrap_C_showSingleAddress(jo)	
					  endif  
				   elsif "Create New Favorite" == nextActionStr  
					  TxNode addressNode = TxNode.childAt(nextAction,0)
				      if NULL != addressNode
						JSONObject jo
						JSONObject.put(jo,"from",AddressCapture_M_getFrom())
						JSONObject.put(jo,"callbackpageurl","<%=pageURLCallBack%>" + "#" + AddressCapture_M_getFrom())
						
						int childSize = TxNode.getChildSize(addressNode)
						JSONObject locationJo
						if 0 == childSize
							locationJo = convertStopToJSON(addressNode)
							CreateFavorites_C_onShow(locationJo,jo,NULL)
						else
						    JSONObject poiJo = convertTxNodeToPoiJSON(addressNode)
						    locationJo = JSONObject.get(poiJo,"stop")
						    CreateFavorites_C_onShow(locationJo,jo,poiJo)
						endif
				      endif
				   elsif "" == nextActionStr
				      AddressCapture_M_deleteRecentPlacesStatus()
				      System.back()
				   elsif "Rate This"  == nextActionStr
				      AddressCapture_M_saveRecentPlacesStatus(1)
				      
				      TxNode poiNode = TxNode.childAt(nextAction,0)
				      
				      JSONObject poiJo = convertTxNodeToPoiJSON(poiNode)
				      RatePoi_C_savePoiToDo(poiJo)
				      
				      RatePoi_C_saveBackUrl("<%=pageURLCallBack%>" + "#" + AddressCapture_M_getFrom())
				      RatePoi_C_showRatePoi()
				   elsif "View Resviews" == nextActionStr
				      AddressCapture_M_saveRecentPlacesStatus(1)
				   
				      TxNode poiNode = TxNode.childAt(nextAction,0)
				      JSONObject poiJo = convertTxNodeToPoiJSON(poiNode)
				      
				      TxNode node
				      TxNode.addMsg(node,JSONObject.toString(poiJo))
				      
				      TxRequest req
					  String url="<%=host + "/reviewPoi.do"%>"
					  String scriptName="getReviewsCallBack"
					  TxRequest.open(req,url)
					  TxRequest.setRequestData(req,node)
					  TxRequest.onStateChange(req,scriptName)
					  TxRequest.setProgressTitle(req,"Geting reviews......")
					  TxRequest.send(req)
				      
		<%if (featureMgr.isEnabled(FeatureConstant.SHARE_ADDRESS)) {%>
				   elsif "Share Address" == nextActionStr
				      AddressCapture_M_saveRecentPlacesStatus(1)
				      JSONObject jo
			          JSONObject.put(jo,"callbackfunction","CallBack_ShareAddress")
					  JSONObject.put(jo,"callbackpageurl","<%=pageURLCallBack%>" + "#" + AddressCapture_M_getFrom())
					  #TODO send TxNode to share address
					  TxNode poiNode = TxNode.childAt(nextAction,0)
					  int childeSize = TxNode.getChildSize(poiNode)
					  JSONObject addressJO
					  JSONObject poiJO
					  if 0 < childeSize
					     poiJO = convertTxNodeToPoiJSON(poiNode)
					     String name = JSONObject.getString(poiJO,"name")
						 if name == NULL || name ==""
						    JSONObject.put(poiJO,"name","Favorite")
						 endif 
						 JSONObject.put(jo,"poi",poiJO)
						 poiNode = TxNode.childAt(poiNode,0)
						 poiNode = TxNode.childAt(poiNode,0)
					  endif
					  
					  addressJO = convertStopToJSON(poiNode)
					  String label = JSONObject.getString(addressJO,"label")
					  if label == NULL || label ==""
						 JSONObject.put(addressJO,"label","Favorite")
					  endif 
					  JSONObject.put(jo,"address",addressJO)
					  ShareAddress_C_show(jo)
		<%}%>
				   elsif "Address Back" == nextActionStr
				      TxNode poiNode = TxNode.childAt(nextAction,0)
				      TxNode stopNode
                      if 0 != TxNode.getChildSize(poiNode)	
                         stopNode = TxNode.childAt(poiNode,0)
                         stopNode = TxNode.childAt(stopNode,0)
                      else
                         stopNode = poiNode
                      endif
                      
					  JSONObject jo
					  if NULL != poiNode
					     jo = convertStopToJSON(stopNode)
					  endif
					  DriveTo_C_saveStopType(<%=Constant.STOP_RECENT%>)
				      AddressCapture_M_returnAddressToInvokerPageWithoutSaveToRecentPlace(jo)
				   endif
				endif
				return FAIL
	        endfunc
	        
	        func getReviewsCallBack(TxNode node,int status)
	            if status == 0
	                System.showErrorMsg("Cannot connect to server,\n please try again later.")
	                PoiList_M_backToPageWhenNoFound()
				elseif status == 1
			        String poiStr = TxNode.msgAt(node,0)
			        JSONObject poiJo = JSONObject.fromString(poiStr)
			        JSONArray sponsorPoiJsonArray
			        JSONArray poiJsonArray
			        JSONArray.put(poiJsonArray,poiJo)
			        ShowDetail_C_saveShowTabIndex(1)
			        ShowDetail_C_saveForDetail(poiJsonArray,0,sponsorPoiJsonArray,-1)
			        ShowDetail_C_showDetail()
				endif
				return FAIL
	        endfunc
	        
	        func CallBack_ShareAddress()
	            System.doAction("recentClick")
	            return FAIL
	        endfunc
	        
	        func convertTxNodeToPoiJSON(TxNode poiNode)
	            int avgRating = TxNode.valueAt(poiNode,1)
			    int poiId = TxNode.valueAt(poiNode,4)
			    TxNode locationNode = TxNode.childAt(poiNode,0)
			    int distance = TxNode.valueAt(locationNode,2)
			    String distanceStr = distance + ""   
			    
			    String brand = TxNode.msgAt(locationNode,1)
			    String phoneNumber = TxNode.msgAt(locationNode,2)
			    String parentCatName = TxNode.msgAt(locationNode,4)
			      
			    TxNode stopNode = TxNode.childAt(locationNode,0)
			    JSONObject stopJo = convertStopToJSON(stopNode)

			    JSONObject poiJo
			    JSONObject.put(poiJo,"distance",distanceStr)
			    JSONObject.put(poiJo,"rating",avgRating)
			    JSONObject.put(poiJo,"phoneNumber",phoneNumber)
			    JSONObject.put(poiJo,"name",brand)
			    JSONObject.put(poiJo,"poiId",poiId)
			    JSONObject.put(poiJo,"category",parentCatName)
			    JSONObject.put(poiJo,"stop",stopJo)
			    
			    if 1 < TxNode.getChildSize(poiNode)
			       TxNode extendNode = TxNode.childAt(poiNode,1)
			       TxNode extendChildNode = TxNode.childAt(extendNode,0)
			       if NULL != extendChildNode && 1 < TxNode.getValueSize(extendChildNode)
			          int lastRateIndex = TxNode.valueAt(extendChildNode, 1)
			          JSONObject.put(poiJo,"userPreviousRating",lastRateIndex)
			       endif
			    endif
			    
			    return poiJo
	        endfunc

        func onResume()
        	System.doAction("returnToRecentPlace")
        	return FAIL
        endfunc 
		]]>
	</tml:script>

	<tml:menuItem name="EditFavorite"
		pageURL="" />

	<tml:menuItem name="driveToFav" pageURL="<%=getPage + "DriveToWrap"%>">
		<tml:bean name="callFunction" valueType="string"
			value="CallBack_SelectAddress" />
	</tml:menuItem>

	<tml:page id="RecentPlaces" url="<%=pageURL%>" type="<%=pageType%>" groupId="<%=GROUP_ID_AC%>"> 
		<tml:actionItem name="showRecent" action="recentPlace">
			<tml:output name="nextAction" />
		</tml:actionItem>
		<tml:menuItem name="recentClick" actionRef="showRecent"
			onClick="onClickRecent" />

		<tml:actionItem name="recentPlaces" action="RestoreRecentPlaces">
			<tml:output name="nextAction" />
		</tml:actionItem>
		<tml:menuItem name="returnToRecentPlace" actionRef="recentPlaces"
			onClick="onClickRecent" />
	</tml:page>
</tml:TML>