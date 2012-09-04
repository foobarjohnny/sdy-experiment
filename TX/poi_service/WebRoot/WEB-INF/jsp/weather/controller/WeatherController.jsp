<%@ taglib uri="http://www.telenav.com/tnbrowser/taglib.tld"
	prefix="tml"%>
<%@page import="com.telenav.cserver.poi.struts.Constant"%>	
<%@ include file="../model/WeatherModel.jsp"%>
<%@ include file="/WEB-INF/jsp/StopUtil.jsp"%>
<%@ include file="/WEB-INF/jsp/GetServerDriven.jsp"%>
<%@ include file="/WEB-INF/jsp/local_service/GetGps.jsp"%>
		
<tml:script language="fscript" version="1">
	<![CDATA[
         func WeatherController_C_initForThirdPart(String backAction)
            Weather_M_saveBackAction(backAction)
            Weather_C_showCurrent()
         endfunc

         func Weather_C_showCurrent()
            TxNode node = NULL
         	if(serverDrivenForSNReverse("USE_DEFAULT_LOCATION"))
         		node = Gps.getLastKnownLocation("false")
         	else
         		node = Gps.getLastKnownLocation()
         	endif
            if node == NULL || TxNode.getValueSize(node) ==0 
            	getCurrentLocation(<%=Constant.CurrentLocation.CURRENT_LOCATION%>,60,180,5)
            else
	            JSONObject joParameter
	            JSONObject.put(joParameter,"callbackpageurl","")
	            JSONObject.put(joParameter,"forwardpageurl","<%=getPageCallBack + "WeatherCurrent"%>")
	            
	            JSONObject jo = convertStopToJSON(node)
	            Weather_C_show(jo,joParameter)
         	endif
         endfunc
         
         func Weather_C_show(JSONObject jo,JSONObject joParameter)
			if !Cell.isCoverage()
				System.showErrorMsg("<%=msg.get("common.nocell.error")%>")
	            return FAIL
			endif
            Weather_M_setLocation(jo)
			Weather_M_saveParameter(joParameter)
            System.doAction("weatherStartUpMenu")
            return FAIL
         endfunc
         
   		func CallBack_GPS_Error(int param)
   		
		endfunc
                
        func setCurrentLocation(JSONObject jo)
	        JSONObject joParameter
	        JSONObject.put(joParameter,"callbackpageurl","")
	        JSONObject.put(joParameter,"forwardpageurl","<%=getPageCallBack + "WeatherCurrent"%>")			
			Weather_C_show(jo,joParameter)
			return FAIL
        endfunc
    ]]>
</tml:script>	
<tml:menuItem name="weatherStartUpMenu" pageURL="<%=getPage + "WeatherStartUp"%>" />	