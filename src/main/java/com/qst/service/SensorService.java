package com.qst.service;

import com.qst.mapper.DashBoardMapper;
import com.qst.mapper.SensorMapper;
import com.qst.vo.ParkingLotList;
import com.qst.vo.SensorList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.nio.file.Files;
import java.util.List;

@Service
public class SensorService {

	@Autowired
	private DashBoardMapper dashBoardMapper;

	@Autowired
	private SensorMapper sensorMapper;

	public List<SensorList> getSensorList(String parkingLotId) {

		return sensorMapper.getSensorList(parkingLotId);
	}

	@Transactional
    public void saveParkingLotInfo(ParkingLotList parkingLotList) {

		String[] parkingLotIdSplit = parkingLotList.getParkingLotId().split("_");
		String userCompany = parkingLotIdSplit[0];
		String parkingLotName = parkingLotIdSplit[1].replace(" ", "_");
		String folderStructure = userCompany + "/" + parkingLotName;

		ParkingLotList parkingLotListDto = new ParkingLotList();
		int sensorId = sensorMapper.getLastCodeByCompany( userCompany.concat("%") );

		parkingLotListDto.setParkingLotId(parkingLotList.getParkingLotId());
		parkingLotListDto.setFolderStructure(folderStructure);
		parkingLotListDto.setParkingZoneType( parkingLotList.getParkingZoneType());
		parkingLotListDto.setNormalZoneCount(parkingLotList.getNormalZoneCount());
		parkingLotListDto.setElectronicZoneCount(parkingLotList.getElectronicZoneCount());
		parkingLotListDto.setDisabledZoneCount(parkingLotList.getDisabledZoneCount());
		parkingLotListDto.setUserId(parkingLotList.getUserId());

		if(parkingLotList.getSaveFlag().equals("update")) {
			// 업데이트일 경우
			sensorMapper.updateParkingLotInfo(parkingLotListDto);
		} else {
			// 인서트일 경우
			sensorMapper.insertParkingLotInfo(parkingLotListDto);
		}

		try {
			if(!parkingLotList.getNormalSensorList().isEmpty()) {
				for(int i = 0; i < parkingLotList.getNormalSensorList().size(); i++) {
					File file = new File("/home/qstai/parking_image/input/" + folderStructure + "/n/" + ++sensorId);
					File cropFile = new File("/home/qstai/parking_image/output/" + folderStructure + "/n/" + sensorId);
					Files.createDirectories(file.toPath());
					Files.createDirectories(cropFile.toPath());

					parkingLotList.getNormalSensorList().get(i).setParkingLotId(parkingLotList.getParkingLotId());
					parkingLotList.getNormalSensorList().get(i).setSensorId( String.valueOf(sensorId) );
					parkingLotList.getNormalSensorList().get(i).setParkingZoneArea("n");
				}

				sensorMapper.insertNormalSensorList(parkingLotList.getNormalSensorList());
			}

			sensorId = sensorMapper.getLastCodeByCompany( userCompany.concat("%") );

			if(!parkingLotList.getElectronicSensorList().isEmpty()) {
				for(int i = 0; i < parkingLotList.getElectronicSensorList().size(); i++) {
					File file = new File("/home/qstai/parking_image/input/" + folderStructure + "/e/" + ++sensorId);
					File cropFile = new File("/home/qstai/parking_image/output/" + folderStructure + "/e/" + sensorId);
					Files.createDirectories(file.toPath());
					Files.createDirectories(cropFile.toPath());

					parkingLotList.getElectronicSensorList().get(i).setParkingLotId(parkingLotList.getParkingLotId());
					parkingLotList.getElectronicSensorList().get(i).setSensorId( String.valueOf(sensorId) );
					parkingLotList.getElectronicSensorList().get(i).setParkingZoneArea("e");
				}

				sensorMapper.insertNormalSensorList(parkingLotList.getElectronicSensorList());
			}

			sensorId = sensorMapper.getLastCodeByCompany( userCompany.concat("%") );

			if(!parkingLotList.getDisabledSensorList().isEmpty()) {
				for(int i = 0; i < parkingLotList.getDisabledSensorList().size(); i++) {
					File file = new File("/home/qstai/parking_image/input/" + folderStructure + "/d/" + ++sensorId);
					File cropFile = new File("/home/qstai/parking_image/output/" + folderStructure + "/d/" + sensorId);
					Files.createDirectories(file.toPath());
					Files.createDirectories(cropFile.toPath());

					parkingLotList.getDisabledSensorList().get(i).setParkingLotId(parkingLotList.getParkingLotId());
					parkingLotList.getDisabledSensorList().get(i).setSensorId( String.valueOf(sensorId) );
					parkingLotList.getDisabledSensorList().get(i).setParkingZoneArea("d");
				}

				sensorMapper.insertNormalSensorList(parkingLotList.getDisabledSensorList());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
    }

	public void saveSensorList(List<SensorList> sensorList) {

		sensorMapper.saveSensorList(sensorList);
	}
}