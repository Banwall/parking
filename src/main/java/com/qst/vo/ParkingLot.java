package com.qst.vo;

import lombok.Data;

@Data
public class ParkingLot {

	/* 테이블 컬럼 */
	private String parkingLotId;
	private String parkingLotNm;
	private String grpId;
	private String parkingLotX;
	private String parkingLotY;
	
	private int parkingSpotAll;
	private int parkingSpotD;
	private int parkingSpotE;
	private int parkingSpotN;
	private int parkingSpotUseAll;
	private int parkingSpotUseD;
	private int parkingSpotUseE;
	private int parkingSpotUseN;
	
	/* 추가 */
}