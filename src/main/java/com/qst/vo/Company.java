package com.qst.vo;

import lombok.Data;

import java.util.List;

@Data
public class Company {

	/* 테이블 컬럼 */
	private String companyName;
	private String adminId;
	private String adminName;
	private String adminPhone;
	private String cdt;
	private int managerUserCount;
	private int normalSensorTotalCount;
	private int electronicSensorTotalCount;
	private int disabledSensorTotalCount;

	/* 추가 */
}