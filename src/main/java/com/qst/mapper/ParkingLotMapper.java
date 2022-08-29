package com.qst.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.qst.vo.ParkingLot;

@Mapper
public interface ParkingLotMapper {

	public ParkingLot getParkingLotInfo(String plId);

	public List<ParkingLot> getParkingLotList(String grpId);
	
}