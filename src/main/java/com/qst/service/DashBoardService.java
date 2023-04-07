package com.qst.service;

import com.qst.mapper.DashBoardMapper;
import com.qst.vo.Analysis;
import com.qst.vo.ParkingLotList;
import com.qst.vo.SensorList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashBoardService {

	@Autowired
	private DashBoardMapper dashBoardMapper;

	public List<ParkingLotList> getParkingLotListByCompany(String userCompany) {

		return dashBoardMapper.getParkingLotListByCompany(userCompany);
	}

	public List<ParkingLotList> getParkingLotListByManager(String userId) {

		return dashBoardMapper.getParkingLotListByManager(userId);
	}

	public List<SensorList> getParkingLotSensorInfo(String parkingLotId) {

		return dashBoardMapper.getParkingLotSensorInfo(parkingLotId);
	}

	public ParkingLotList getParkingLotInfo(String parkingLotId) {

		return dashBoardMapper.getParkingLotInfo(parkingLotId);
	}


}