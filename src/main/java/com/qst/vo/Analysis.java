package com.qst.vo;

import lombok.Data;

@Data
public class Analysis {

	/* 테이블 컬럼 */
	private String fileName;
	private String eventDt;
	private String event_dt;
	private String input;
	private String angle;
	private String crack;
	private String lpr;
	private String vehicle;
	private String lprnumber;
	private String output;
	private String cdt;
	private String mdt;
	
	/* 추가 */

	private String distance;
	private String sumByDay;
	private String chartDay;
	private String mdtNow;
	private String lastFileNames;
}