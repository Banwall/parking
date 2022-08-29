package com.qst.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qst.service.ParkingLotService;
import com.qst.vo.ParkingLot;

@Controller
@RequestMapping("/parking")
public class ParkingController {

	@Autowired
	ParkingLotService plService;
	
	@RequestMapping("getParkingLot")
	@ResponseBody
	public ParkingLot getParkingLot(@RequestParam("plId") String plId) {

		ParkingLot plInfo = plService.getParkingLotInfo(plId);
		
		plInfo.setParkingLotX(plInfo.getParkingLotX().substring(2,plInfo.getParkingLotX().indexOf(",")));
		plInfo.setParkingLotY(plInfo.getParkingLotY().substring(plInfo.getParkingLotY().indexOf("Y:")+2));
		
		return plInfo;
	}
}