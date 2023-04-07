package com.qst.mapper;

import com.qst.vo.Analysis;
import com.qst.vo.ParkingLotList;
import com.qst.vo.SensorList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DashBoardMapper {

	List<ParkingLotList> getParkingLotListByCompany(String userCompany);

	List<ParkingLotList> getParkingLotListByManager(String userId);

	List<SensorList> getParkingLotSensorInfo(String parkingLotId);

    ParkingLotList getParkingLotInfo(String parkingLotId);
}