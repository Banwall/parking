package com.qst.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.qst.vo.Analysis;

@Mapper
public interface AnalysisMapper {

	public List<Analysis> getImgAnalysis(List<String> stringList);

	public List<Analysis> getLastFileNames();

	public Analysis get101ImgParkingFromTo();

	public Analysis get102ImgParkingFromTo();

	public Analysis get103ImgParkingFromTo();

	public List<Analysis> get101ImgParkingFromToApi();

	public List<Analysis> get102ImgParkingFromToApi();

	public List<Analysis> get103ImgParkingFromToApi();

	List<Analysis> get101ChartData();

	List<Analysis> get102ChartData();

	List<Analysis> get103ChartData();
}