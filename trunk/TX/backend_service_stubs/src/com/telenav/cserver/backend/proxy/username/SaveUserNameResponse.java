/**
 * (c) Copyright 2010 TeleNav.
 *  All Rights Reserved.
 */
package com.telenav.cserver.backend.proxy.username;

/**
 * AddUserNameResponse.java
 *
 * jhjin@telenav.cn
 * @version 1.0 Mar 9, 2011
 *
 */
public class SaveUserNameResponse
{
    private String statusCode;
    
    private String statusMessage;

    public String getStatusCode()
    {
        return statusCode;
    }

    public void setStatusCode(String statusCode)
    {
        this.statusCode = statusCode;
    }

    public String getStatusMessage()
    {
        return statusMessage;
    }

    public void setStatusMessage(String statusMessage)
    {
        this.statusMessage = statusMessage;
    }

    @Override
    public String toString()
    {
        StringBuffer sb = new StringBuffer();
        sb.append("statusCode=").append(statusCode)
          .append(",statusMessage=").append("statusMessage");
        return sb.toString();
        
    }
    
    

}
