<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.telenav.com/tnbrowser/taglib.tld"
	prefix="tml"%>
<%@page import="com.telenav.cserver.poi.struts.Constant"%>	
<tml:script language="fscript" version="1">
	<![CDATA[
	    func SelectAddress_M_saveParameter(JSONObject jo)
	    	string from = JSONObject.getString(jo,"from")
	    	
	    	JSONObject joTemp
	    	JSONObject joTemp1 = Cache.getJSONObjectFromTempCache("<%=Constant.StorageKey.SELECT_ADDRESS_PARAMETER%>")
			if joTemp1 != NULL
				joTemp = joTemp1
			endif

	    	JSONObject.put(joTemp,from,jo)
	        Cache.saveToTempCache("<%=Constant.StorageKey.SELECT_ADDRESS_PARAMETER%>",joTemp)
	    endfunc
	    
	    func SelectAddress_M_getParameter()
	        JSONObject joTemp = Cache.getJSONObjectFromTempCache("<%=Constant.StorageKey.SELECT_ADDRESS_PARAMETER%>")
	        JSONObject jo = JSONObject.get(joTemp,SelectAddress_M_getFrom())
	    	return jo
	    endfunc

	    func SelectAddress_M_getFrom()
	        string from = Page.getControlProperty("page","url_flag")
			if from == NULL
				from = ""
			endif
	    	return from
	    endfunc

	    func SelectAddress_M_getMask()
	        JSONObject jo = SelectAddress_M_getParameter()
	    	string mask = JSONObject.getString(jo,"mask")
	    	if mask == NULL
	    		mask = ""
	    	endif
	    	if String.getLength(mask) != 11
        		mask = "11111111111"
        	endif
        	return mask
	    endfunc

	    func SelectAddress_M_getTitle()
	        JSONObject jo = SelectAddress_M_getParameter()
	    	return JSONObject.getString(jo,"title")
	    endfunc
	    	    	    	    
	    func SelectAddress_M_saveMaskForFavorite(JSONObject jo)
	    	string from = JSONObject.getString(jo,"from")
	    	
	    	JSONObject joTemp
	    	JSONObject joTemp1 = Cache.getJSONObjectFromTempCache("<%=Constant.StorageKey.SELECT_ADDRESS_PARAMETER%>")
			if joTemp1 != NULL
				joTemp = joTemp1
			endif

	    	JSONObject.put(joTemp,from,jo)
	        Cache.saveToTempCache("<%=Constant.StorageKey.MASK_FOR_FAVORITE%>",joTemp)       
	    endfunc
	    
	    func SelectAddress_M_getMaskForFavorite()
			JSONObject joTemp = Cache.getJSONObjectFromTempCache("<%=Constant.StorageKey.MASK_FOR_FAVORITE%>")
	        JSONObject jo = JSONObject.get(joTemp,SelectAddress_M_getFrom())
	    	return jo
	    endfunc

	    func SelectAddress_M_getCallbackfunction()
	        JSONObject jo = SelectAddress_M_getParameter()
	    	return JSONObject.getString(jo,"callbackfunction")
	    endfunc

	    func SelectAddress_M_getCallbackpageurl()
	        JSONObject jo = SelectAddress_M_getParameter()
	    	return JSONObject.getString(jo,"callbackpageurl")
	    endfunc
	    
		func SelectAddress_M_getResumeAddress()
	        TxNode node = ShareData.Get("<%=Constant.StorageKey.SELECT_ADDRESS_RESUMETRIP%>")
	        if node != NULL
	        	return convertStopToJSON(node)
	        else
	        	return NULL
	        endif	
	    endfunc

		func SelectAddress_M_clearResumeAddress()
	        ShareData.Delete("<%=Constant.StorageKey.SELECT_ADDRESS_RESUMETRIP%>")
	    endfunc

	    func SelectAddress_M_needGetGPS()
	        JSONObject jo = SelectAddress_M_getParameter()
	        int need = JSONObject.getInt(jo,"getGPS")
	        if need==NULL
	        	need = 0
	        endif
	    	return need
	    endfunc
	    
	    func SelectAddress_M_SetNoCoverage(int flag)
        	TempCache.saveInt("<%=Constant.StorageKey.DRIVE_NO_COVERAGE_FLAG%>",flag)
        endfunc
        
        func SelectAddress_M_getNoCoverage()
        	return TempCache.getInt("<%=Constant.StorageKey.DRIVE_NO_COVERAGE_FLAG%>",0)
        endfunc
        
        func SelectAddress_M_deleteNoCoverage()
        	TempCache.deleteInt("<%=Constant.StorageKey.DRIVE_NO_COVERAGE_FLAG%>")
        endfunc
	]]>
</tml:script>
	