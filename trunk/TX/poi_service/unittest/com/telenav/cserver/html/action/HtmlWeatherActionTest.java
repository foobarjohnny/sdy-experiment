package com.telenav.cserver.html.action;

import junit.framework.Assert;

import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.telenav.cserver.util.MockHttpServletRequest;
import com.telenav.cserver.util.MockHttpServletResponse;
import com.telenav.cserver.util.helper.log2txnode.Log2TxNode;
import com.telenav.cserver.weather.protocol.I18NWeatherRequestParser;
import com.telenav.cserver.weather.protocol.I18NWeatherResponseFormatter;
import com.telenav.j2me.datatypes.TxNode;

public class HtmlWeatherActionTest {
	
		private int	ajaxChildValue = 110;
		private String actionName = "Weather.do";
		private String failString = "couldn't find the TxNode in file when testing Weather action";
	
		private HtmlWeatherAction htmlWeatherAction = new HtmlWeatherAction();
		private I18NWeatherRequestParser parser = new I18NWeatherRequestParser();
		private I18NWeatherResponseFormatter formatter = new I18NWeatherResponseFormatter();		
		private ActionMapping mapping = new ActionMapping();			
		private MockHttpServletRequest request = null;
		private MockHttpServletResponse response = null;
		
		
		@Before
		public void setUp() throws Exception {
			
			/*
			 * 	action : Weather.do
			 * 	executor : I18NWeatherExecutor
			 * 	parser:	I18NWeatherRequestParser
			 * 	formatter: I18NWeatherResponseFormatter 
			 * 	
			 */

			htmlWeatherAction.setRequestParser(parser);
			htmlWeatherAction.setResponseFormatter(formatter);
			
			mapping.addForwardConfig(new ActionForward("success","/jsp/AjaxResponse.jsp", false));
			mapping.addForwardConfig(new ActionForward("failure","/jsp/AjaxErrResponse.jsp", false));
			
			request = (MockHttpServletRequest)Log2TxNode.getInstance().log2TxNode2HttpServletRequest(request, actionName, ajaxChildValue);	
		}

		@After
		public void tearDown() throws Exception {  // clear the data
		}
		
		@Test
		public void testdoAction(){
			
			try 
			{
				if(request == null)
				{
					Assert.fail(failString);
				}
				
				htmlWeatherAction.doAction(mapping, request, response);
				TxNode node = (TxNode)request.getAttribute("node");
				Assert.assertNotNull(node);
				
			} catch (Exception e) 
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
}
