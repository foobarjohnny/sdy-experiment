/**
 * (c) Copyright 2012 TeleNav.
 * All Rights Reserved.
 */
package com.telenav.cserver.html.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;
import org.apache.struts.action.ActionMessages;

import com.telenav.cserver.framework.executor.ExecutorContext;
import com.telenav.cserver.framework.executor.ExecutorDispatcher;
import com.telenav.cserver.framework.executor.ExecutorRequest;
import com.telenav.cserver.framework.executor.ExecutorResponse;
import com.telenav.cserver.poi.executor.GenericFeedbackRetrievalResponse;

/**
 * feedback screen action class
 * @author  zhhyan@telenav.cn
 * @version 1.0 2011-3-3
 */
public class HtmlFeedbackRetrievalAction extends HtmlPoiBaseAction{
	
	private static Logger logger = Logger.getLogger(HtmlFeedbackRetrievalAction.class);
	
	@Override
	/**
	 * 1) parse paramter from httprequest
	 * 2) run logic in execute
	 * 3) format httprequest to front end
	 */
	protected ActionForward doAction(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		try {
            ExecutorRequest[] executorRequests = requestParser.parse(request);
            GenericFeedbackRetrievalResponse executorResponse = new GenericFeedbackRetrievalResponse();
            
            if (executorRequests != null && executorRequests.length > 0) {
                ExecutorDispatcher ac = ExecutorDispatcher.getInstance();
                ac.execute(executorRequests[0], executorResponse,
                        new ExecutorContext());
            }

            if (executorResponse.getStatus() == ExecutorResponse.STATUS_FAIL) {
                request.setAttribute("errorCode", new Long(-1));
                request.setAttribute("errorMsg", executorResponse.getErrorMessage());
                return mapping.findForward("failure");
            }

            responseFormatter.format(request,new ExecutorResponse[] { executorResponse });
            return mapping.findForward("success");
        } catch (Exception e) {
        	logger.error("HtmlFeedbackRetrievalAction#doAction",e);
            ActionMessages msgs = new ActionMessages();
            msgs.add("loginfailed", new ActionMessage("errors.poi.failed"));
            addErrors(request, msgs);
            return mapping.findForward("failure");
        }
	}

}
