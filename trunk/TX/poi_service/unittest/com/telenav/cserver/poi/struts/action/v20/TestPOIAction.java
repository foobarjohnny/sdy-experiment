package com.telenav.cserver.poi.struts.action.v20;

import java.util.Vector;

import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.telenav.cserver.browser.framework.BrowserFrameworkConstants;
import com.telenav.cserver.poi.protocol.v20.PoiBrowserProtocolRequestParser;
import com.telenav.cserver.poi.protocol.v20.PoiBrowserProtocolResponseFormatter;
import com.telenav.cserver.util.MockHttpServletRequest;
import com.telenav.j2me.datatypes.TxNode;
import com.telenav.tnbrowser.util.DataHandler;

import junit.framework.Assert;
import junit.framework.TestCase;

public class TestPOIAction extends TestCase{
	private ActionMapping mapping;
	private MockHttpServletRequest request;

	@Override
	protected void setUp() throws Exception {
		TxNode node = new TxNode();
		node.addMsg("{\"inputString\":\"\",\"isMostPopular\":\"0\",\"transactionId\":\"1322117770986\",\"searchFromType\":\"1\",\"sponsorListingNumber\":0,\"searchTypeStr\":\"5\",\"categoryId\":\"595\",\"sortType\":\"3\",\"from\":\"type\",\"currentPage\":\"0\",\"distanceUnit\":0,\"addressString\":\"{\\\"zip\\\":\\\"\\\",\\\"lon\\\":-7937999,\\\"state\\\":\\\"\\\",\\\"firstLine\\\":\\\"\\\",\\\"label\\\":\\\"\\\",\\\"type\\\":6,\\\"lat\\\":4367160,\\\"country\\\":\\\"\\\",\\\"city\\\":\\\"\\\"}\",\"maxResults\":9}");
		TxNode ajaxNode = new TxNode();
		ajaxNode.addChild(node);
		request = new MockHttpServletRequest(TxNode.toByteArray(ajaxNode));
		Vector<String> header = new Vector<String>();
		request.setHeaderNames(header.elements());

		request.addParameter("deviceid", "test123");
		request.addParameter("guidetone", "test123");
		request.addParameter("locale", "en_IN");
		request.addParameter("region", "IN");
		request.addParameter("audioformat", "test123");
		request.addParameter("carrier", "MMI");
		request.addParameter("platform", "RIM");
		request.addParameter("devicemodel", "sdk");
		request.addParameter("buildnumber", "6.4.01");
		request.addParameter("width", "480-360");
		request.addParameter("height", "360-480");
		request.addParameter("browserversion", "6.4.01");
		request.addParameter("useraccount", "TEST_1234567890");
		request.addParameter("userpin", "1234");
		request.addParameter("userid", "12345678");
		request.addParameter("producttype", "TN");
		request.addParameter("version", "6_4_01");
		request.addParameter("client_support_screen_width", "480-360");
		request.addParameter("client_support_screen_height", "360-480");

		DataHandler handler = new DataHandler(request, true);
		request.setAttribute(BrowserFrameworkConstants.CLIENT_INFO, handler);
		addGlobeMapping();
	}

	public void addGlobeMapping() {
		mapping = new ActionMapping();
		mapping.addForwardConfig(new ActionForward("success",
				"/jsp/ajaxResponse.jsp", false));
		mapping.addForwardConfig(new ActionForward("Globe_Exception",
				"/jsp/ErrorPage.jsp", false));
	}

	public void testPOIAction() throws Exception {
		POIAction action = new POIAction();
		action.setRequestParser(new PoiBrowserProtocolRequestParser());
		action.setResponseFormatter(new PoiBrowserProtocolResponseFormatter());
		action.execute(mapping, null, request, null);
		System.out.println(request.getAttribute("node"));
		
		// test result rely on mock server, release this until mock server is stable
		//Assert.assertNotNull(request.getAttribute("node"));
		
	}
}
