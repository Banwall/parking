package com.qst.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qst.mapper.AnalysisMapper;
import com.qst.vo.Analysis;

@Service
public class AnalysisService {

	@Autowired
	private AnalysisMapper analysisMapper;

	public List<Analysis> getImgAnalysis() {

		List<Analysis> lastFileNameList = analysisMapper.getLastFileNames();
		List<String> stringList = new ArrayList<>();

		for (Analysis analysis : lastFileNameList) {
			stringList.add(analysis.getLastFileNames());
		}

		return analysisMapper.getImgAnalysis(stringList);
	}

    public Analysis get101ImgParkingFromTo() {

		return analysisMapper.get101ImgParkingFromTo();
    }

	public Analysis get102ImgParkingFromTo() {

		return analysisMapper.get102ImgParkingFromTo();
	}

	public Analysis get103ImgParkingFromTo() {

		return analysisMapper.get103ImgParkingFromTo();
	}

	public List<Analysis> get101ImgParkingFromToApi() {

		return analysisMapper.get101ImgParkingFromToApi();
	}

	public List<Analysis> get102ImgParkingFromToApi() {

		return analysisMapper.get102ImgParkingFromToApi();
	}

	public List<Analysis> get103ImgParkingFromToApi() {

		return analysisMapper.get103ImgParkingFromToApi();
	}

	public List<Analysis> get101ChartData() {

		return analysisMapper.get101ChartData();
	}

	public List<Analysis> get102ChartData() {

		return analysisMapper.get102ChartData();
	}

	public List<Analysis> get103ChartData() {

		return analysisMapper.get103ChartData();
	}
}