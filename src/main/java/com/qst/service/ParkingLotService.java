package com.qst.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qst.mapper.ParkingLotMapper;
import com.qst.vo.ParkingLot;

@Service
public class ParkingLotService {

	@Autowired
	private ParkingLotMapper parkingLotMapper;

	public ParkingLot getParkingLotInfo(String plId) {
		
		return parkingLotMapper.getParkingLotInfo(plId);
	}

	public List<ParkingLot> getParkingLotList(String grpId) {
		
		return parkingLotMapper.getParkingLotList(null);
	}

}