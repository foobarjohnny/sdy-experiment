/**
 * (c) Copyright 2009 TeleNav.
 *  All Rights Reserved.
 */
package com.telenav.cserver.backend.addresssharing;

/**
 * The response aid to get trigger action for share address.
 * @author pzhang
 * 2010-08-03
 */
public class AddressSharingResponse
{
    private String statusCode;
    private String statusMessage;

    public String toString()
    {
        StringBuilder sb = new StringBuilder();
        sb.append("ResendPinResponse=[");
        sb.append(", statusCode=").append(this.statusCode);
        sb.append(", statusMessage=").append(this.statusMessage);
        sb.append("]");
        return sb.toString();
    }

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}

	public String getStatusMessage() {
		return statusMessage;
	}

	public void setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
	}


}
