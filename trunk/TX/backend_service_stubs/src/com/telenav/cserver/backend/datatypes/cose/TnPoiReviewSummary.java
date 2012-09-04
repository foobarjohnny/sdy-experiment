/**
 * (c) Copyright 2009 TeleNav.
 *  All Rights Reserved.
 */
package com.telenav.cserver.backend.datatypes.cose;

/**
 * TnPoiReviewSummary.java
 *
 * @author bhu@telenav.cn
 * @version 1.0 2009-7-13
 */
public class TnPoiReviewSummary
{
	private long poiId;
	private double popularity;
	private double averageRating;
	private int ratingNumber;
	private int reviewNumber;
	private String reviewCategoryPath;
	private String reviewAveragePrice;
	private int reviewType;
	private String reviewText;
	private int userPreviousRating;
	private long basePoiId;
	/**
	 * @param poiId the poiId to set
	 */
	public void setPoiId(long poiId)
	{
		this.poiId = poiId;
	}
	/**
	 * @return the poiId
	 */
	public long getPoiId()
	{
		return poiId;
	}
	/**
	 * @param popularity the popularity to set
	 */
	public void setPopularity(double popularity)
	{
		this.popularity = popularity;
	}
	/**
	 * @return the popularity
	 */
	public double getPopularity()
	{
		return popularity;
	}
	/**
	 * @param averageRating the averageRating to set
	 */
	public void setAverageRating(double averageRating)
	{
		this.averageRating = averageRating;
	}
	/**
	 * @return the averageRating
	 */
	public double getAverageRating()
	{
		return averageRating;
	}
	/**
	 * @param ratingNumber the ratingNumber to set
	 */
	public void setRatingNumber(int ratingNumber)
	{
		this.ratingNumber = ratingNumber;
	}
	/**
	 * @return the ratingNumber
	 */
	public int getRatingNumber()
	{
		return ratingNumber;
	}
	/**
	 * @param reviewNumber the reviewNumber to set
	 */
	public void setReviewNumber(int reviewNumber)
	{
		this.reviewNumber = reviewNumber;
	}
	/**
	 * @return the reviewNumber
	 */
	public int getReviewNumber()
	{
		return reviewNumber;
	}
	/**
	 * @param reviewCategoryPath the reviewCategoryPath to set
	 */
	public void setReviewCategoryPath(String reviewCategoryPath)
	{
		this.reviewCategoryPath = reviewCategoryPath;
	}
	/**
	 * @return the reviewCategoryPath
	 */
	public String getReviewCategoryPath()
	{
		return reviewCategoryPath;
	}
	/**
	 * @param reviewAveragePrice the reviewAveragePrice to set
	 */
	public void setReviewAveragePrice(String reviewAveragePrice)
	{
		this.reviewAveragePrice = reviewAveragePrice;
	}
	/**
	 * @return the reviewAveragePrice
	 */
	public String getReviewAveragePrice()
	{
		return reviewAveragePrice;
	}
	/**
	 * @param reviewType the reviewType to set
	 */
	public void setReviewType(int reviewType)
	{
		this.reviewType = reviewType;
	}
	/**
	 * @return the reviewType
	 */
	public int getReviewType()
	{
		return reviewType;
	}
	/**
	 * @param reviewText the reviewText to set
	 */
	public void setReviewText(String reviewText)
	{
		this.reviewText = reviewText;
	}
	/**
	 * @return the reviewText
	 */
	public String getReviewText()
	{
		return reviewText;
	}
	/**
	 * @param userPreviousRating the userPreviousRating to set
	 */
	public void setUserPreviousRating(int userPreviousRating)
	{
		this.userPreviousRating = userPreviousRating;
	}
	/**
	 * @return the userPreviousRating
	 */
	public int getUserPreviousRating()
	{
		return userPreviousRating;
	}
	/**
	 * @param basePoiId the basePoiId to set
	 */
	public void setBasePoiId(long basePoiId)
	{
		this.basePoiId = basePoiId;
	}
	/**
	 * @return the basePoiId
	 */
	public long getBasePoiId()
	{
		return basePoiId;
	}
	
	public String toString()
	{
		StringBuffer sb = new StringBuffer();
		sb.append("<TnPoiReviewSummary[");
		sb.append("poiId=");
		sb.append(this.poiId);
		sb.append(", popularity=");
		sb.append(this.popularity);
		sb.append(", averageRating=");
		sb.append(this.averageRating);
		sb.append(", ratingNumber=");
		sb.append(this.ratingNumber);
		sb.append(", reviewNumber=");
		sb.append(this.reviewNumber);
		sb.append(", reviewText=");
		sb.append(this.reviewText);
		sb.append("]>");
		return sb.toString();
	}
}
