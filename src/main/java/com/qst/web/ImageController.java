package com.qst.web;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
public class ImageController {

	@GetMapping(value="/image/view", produces= MediaType.IMAGE_PNG_VALUE)
	public @ResponseBody byte[] getImage(@RequestParam(value = "filePath", required = false) String filePath)  throws IOException {
		FileInputStream fis = null;
		ByteArrayOutputStream baos = new ByteArrayOutputStream();

		System.out.println("디버깅 :: " + filePath);

		// 윈도우 테스트 파일 경로
		//String fileDir = "C:\\Users\\qst\\.node-red\\image\\" + fileName;
		//String fileDir = "C:\\" + filePath;

		// 실제 리눅스(인천 모비우스2) 파일 경로
		//String fileDir = "/home/qstech/iot/smb/parking_image/" + fileName;

		// 사내 AI 서버 파일 경로
		//String fileDir = "/home/qstai/parking_image/input/인천/관리자/1번_주차장/101/2023-03-07/S_101_20230112170315512.jpg";
		String fileDir = "/home/qstai/parking_image/input/" + filePath;

		try{
			fis = new FileInputStream(fileDir);
		} catch(FileNotFoundException e){
			e.printStackTrace();
		}

		int readCount = 0;
		byte[] buffer = new byte[1024];
		byte[] fileArray = null;

		try{
			while((readCount = fis.read(buffer)) != -1) {
				baos.write(buffer, 0, readCount);
			}
			fileArray = baos.toByteArray();
			fis.close();
			baos.close();
		} catch(IOException e) {
			throw new RuntimeException("File Error");
		}

		return fileArray;
	}

	@GetMapping(value="/image/cropView", produces= MediaType.IMAGE_PNG_VALUE)
	public @ResponseBody byte[] getImage(@RequestParam(value = "cropFileName", required = false) String cropFileName,
										 @RequestParam(value = "value", required = false) String value)  throws IOException {
		FileInputStream cropFis = null;
		ByteArrayOutputStream cropBaos = new ByteArrayOutputStream();

		// 실제 리눅스(인천 모비우스2) 파일 경로
		//String cropFileDir = "/home/qstech/iot/smb/crop/crop_" + cropFileName;

		// 사내 AI 서버 파일 경로
		String cropFileDir = "/home/qstai/parking_image/output/" + cropFileName;

		try {
			cropFis = new FileInputStream(cropFileDir);
		} catch(FileNotFoundException e){
			e.printStackTrace();
		}

		int readCount = 0;
		byte[] buffer = new byte[1024];
		byte[] fileArray = null;

		try {
			while((readCount = cropFis.read(buffer)) != -1) {
				cropBaos.write(buffer, 0, readCount);
			}
			fileArray = cropBaos.toByteArray();
			cropFis.close();
			cropBaos.close();
		} catch(IOException e) {
			throw new RuntimeException("File Error");
		}

		return fileArray;
	}
}