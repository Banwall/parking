package com.qst.vo;

import lombok.Data;

@Data
public class SensorList {

	/* 테이블 컬럼 */

    private int sensorIdx;
    private String sensorId;
    private String parkingLotId;
    private String sensorType;
    private String ip;
    private String parkingZoneArea;
    private String lastFileName;
    private String lastFileTime;
    private String pingValue;
    private String useYn;
    private String negativeReason;
    private String cdt;
    private String mdt;

    /* 추가 */

    private String lpr;
    private String vehicle;
    private String lprnumber;
    private String distance;
}