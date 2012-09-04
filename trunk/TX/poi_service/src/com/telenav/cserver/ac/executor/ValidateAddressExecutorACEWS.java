/**
 * (c) Copyright 2009 TeleNav.
 *  All Rights Reserved.
 */
package com.telenav.cserver.ac.executor;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.telenav.cserver.framework.UserProfile;
import com.telenav.cserver.framework.executor.AbstractExecutor;
import com.telenav.cserver.framework.executor.ExecutorContext;
import com.telenav.cserver.framework.executor.ExecutorException;
import com.telenav.cserver.framework.executor.ExecutorRequest;
import com.telenav.cserver.framework.executor.ExecutorResponse;
import com.telenav.cserver.framework.reporting.ReportType;
import com.telenav.cserver.framework.reporting.ReportingRequest;
import com.telenav.cserver.framework.reporting.ReportingUtil;
import com.telenav.cserver.framework.reporting.impl.ServerMISReportor;
import com.telenav.cserver.util.TnUtil;
import com.telenav.kernel.util.datatypes.TnContext;

/**
 * ValidateAddressExecutorACEWS.java
 * 
 * @author bhu@telenav.cn
 * @version 1.0 2009-7-7
 */
public class ValidateAddressExecutorACEWS extends AbstractExecutor
{
    protected static Logger logger = Logger.getLogger(ValidateAddressExecutorACEWS.class);

    public void doExecute(ExecutorRequest req, ExecutorResponse resp, ExecutorContext context) throws ExecutorException
    {
        TnContext tc = context.getTnContext();
        UserProfile userProfile = req.getUserProfile();
        ReportingRequest misLog = new ReportingRequest(ReportType.SERVER_MIS_LOG_REPORT, userProfile, tc);

        misLog.addServerMisLogField(ServerMISReportor.SERVLET_NAME, ServerMISReportor.POI_SERVLET_NAME);
        misLog.addServerMisLogField(ServerMISReportor.ACTION_ID, this.getClass().getSimpleName());
        misLog.addServerMisLogField(ServerMISReportor.LOGTYPE_ID, ServerMISReportor.VALIDATE_ADDRESS_LOGTYPE);
        misLog.addServerMisLogField(ServerMISReportor.CUSTOM16, tc.getProperty(TnContext.PROP_MAP_DATASET));

        ValidateAddressRequestACEWS request = (ValidateAddressRequestACEWS) req;
        ValidateAddressResponseACEWS response = (ValidateAddressResponseACEWS) resp;

        String street1 = request.getStreet1();
        String street2 = request.getStreet2();
        String firstLine = request.getFirstLine();
        String lastLine = request.getLastLine();
        String country = request.getCountry();
        response.setLabel(request.getLabel());
        response.setMaitai(request.isMaitai());
        if ("".equals(country))
        {
            country = TnUtil.getDefaultCountry(tc, userProfile);
        }

        misLog.addServerMisLogField(ServerMISReportor.CUSTOM00, request.getCity());
        misLog.addServerMisLogField(ServerMISReportor.CUSTOM01, request.getState());
        misLog.addServerMisLogField(ServerMISReportor.CUSTOM02, country);
        misLog.addServerMisLogField(ServerMISReportor.CUSTOM10, userProfile.getUserId());
        misLog.addServerMisLogField(ServerMISReportor.CUSTOM04, StringUtils.isEmpty(street1) ? firstLine : street1);
        misLog.addServerMisLogField(ServerMISReportor.CUSTOM05, street2);
        misLog.addServerMisLogField(ServerMISReportor.CUSTOM06, lastLine);
        misLog.addServerMisLogField(ServerMISReportor.CUSTOM07, request.getZip());
        misLog.addServerMisLogField(ServerMISReportor.CUSTOM08, request.getAddressSearchId());

        if (logger.isDebugEnabled())
        {
            logger.debug("param: street1=" + street1 + ", street2=" + street2 + ", firstLine=" + firstLine + ", lastLine=" + lastLine
                    + ", country=" + country);
        }

        response.setStatus(ExecutorResponse.STATUS_OK);
        try
        {
            String statusCode = ValidateAddressHandlerFactory.getValidateAddressHandlerBy(userProfile.getProgramCode()).doValidateAddress(
                request, response, context);

            misLog.addServerMisLogField(ServerMISReportor.CUSTOM03, statusCode);
            misLog.addServerMisLogField(ServerMISReportor.COMPLETED_FLAG, ServerMISReportor.COMPLETE_SUCCEED);
        }
        catch (Exception e)
        {
            misLog.addServerMisLogField(ServerMISReportor.COMPLETED_FLAG, ServerMISReportor.COMPLETE_FAIL);
        }
        finally
        {
            ReportingUtil.report(misLog);
        }
    }

}
