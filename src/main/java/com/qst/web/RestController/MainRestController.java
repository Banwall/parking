package com.qst.web.RestController;

import com.qst.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/")
public class MainRestController {
	@Autowired
	AnalysisService analysisService;

	@RequestMapping("getParkingData")
	public Map<String, Object> main() {

		Map<String, Object> map = new HashMap<>();

		map.put("parkingDataList", analysisService.getImgAnalysis());
		map.put("camera1", analysisService.get101ImgParkingFromToApi());
		map.put("camera2", analysisService.get102ImgParkingFromToApi());
		map.put("camera3", analysisService.get103ImgParkingFromToApi());

		return map;
	}

	@RequestMapping("getChartData")
	public Map<String, Object> getChartData() {

		Map<String, Object> map = new HashMap<>();

		map.put("firstResult", analysisService.get101ChartData());
		map.put("twoResult", analysisService.get102ChartData());
		map.put("thirdResult", analysisService.get103ChartData());

		return map;
	}

	@RequestMapping("getHotelTestChartData")
	public Map<String, Object> getHotelTestChartData() {

		Map<String, Object> map = new HashMap<>();

		//map.put("firstResult", analysisService.get101ChartData());
		//map.put("twoResult", analysisService.get102ChartData());
		map.put("thirdResult", analysisService.get103ChartData());

		return map;
	}

	@RequestMapping("dirTest")
	public void dirTest() {
		try {
			//File file = new File("/home/qstai/parking_image/input/큐센텍/");
			//Files.createDirectories(file.toPath()); 디렉토리 이미 존재해도 에러 X, 상위 디렉토리 없으면 자동 생성
			Path directoryPath = Paths.get("/home/qstai/parking_image/input/큐센텍");
			Files.createDirectory(directoryPath);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}