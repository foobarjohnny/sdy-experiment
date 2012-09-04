/**
 * (c) Copyright 2010 TeleNav.
 *  All Rights Reserved.
 */
package com.telenav.cserver.ac.protocol.v20;

import com.telenav.cserver.ac.executor.v20.ShareAddressResponse;
import com.telenav.cserver.framework.executor.ExecutorException;
import com.telenav.cserver.framework.executor.ExecutorResponse;
import com.telenav.cserver.framework.executor.protocol.ProtocolResponseFormatter;
import com.telenav.j2me.datatypes.DataConstants;
import com.telenav.j2me.datatypes.TxNode;

/**
 * ShareAddressResponseFormatter
 * @author kwwang
 * copy and update by xfliu at 2011/12/6
 *
 */
public class ShareAddressResponseFormatter_CS implements ProtocolResponseFormatter
{

    @Override
    public void format(Object formatTarget, ExecutorResponse[] responses) throws ExecutorException
    {
        ShareAddressResponse resp = (ShareAddressResponse) responses[0];
        TxNode root = (TxNode) formatTarget;
        root.addValue(DataConstants.TYPE_SERVER_RESPONSE);
        root.addValue(resp.getStatus());
        root.addMsg(resp.getExecutorType());
        root.addMsg(resp.getErrorMessage());
    }

}
