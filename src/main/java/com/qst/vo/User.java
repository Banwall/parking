package com.qst.vo;

import lombok.Data;

import java.util.List;

@Data
public class User {

	/* 테이블 컬럼 */
	private String userId;
	private String userPwd;
	private String userCompany;
	private String userName;
	private String userPhone;
	private String userRole;
	private String useYn;
	private String approveYn;
	private String approveTime;
	private String cdt;
	private String mdt;
	
	/* 추가 */

	private List<String> userIdList;

	private String parkingLotId;
	private String flag;
	private int managerParkingLotCount;
}