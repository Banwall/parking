package com.qst.mapper;

import com.qst.vo.ParkingLotList;
import com.qst.vo.SensorList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SensorMapper {

	List<SensorList> getSensorList(String parkingLotId);

    void updateParkingLotInfo(ParkingLotList parkingLotListDto);

    void insertParkingLotInfo(ParkingLotList parkingLotListDto);

    int getLastCodeByCompany(String value);

    void insertNormalSensorList(List<SensorList> normalSensorList);

    void saveSensorList(List<SensorList> sensorList);
}