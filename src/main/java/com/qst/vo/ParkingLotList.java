package com.qst.vo;

import lombok.Data;

import java.util.List;

@Data
public class ParkingLotList {

	/* 테이블 컬럼 */

	private String parkingLotId;
	private String folderStructure;
	private String userId;
	private String parkingZoneType;
	private int normalZoneCount;
	private int electronicZoneCount;
	private int disabledZoneCount;
	private String cdt;
	private String mdt;
	
	/* 추가 */

	private String userName;
	private String saveFlag;
	private String adminName;
	private int normalSensorCount;
	private int electronicSensorCount;
	private int disabledSensorCount;

	private List<SensorList> normalSensorList;
	private List<SensorList> electronicSensorList;
	private List<SensorList> disabledSensorList;
}