package com.qst.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.qst.service.ParkingLotService;
import com.qst.vo.ParkingLot;

@Controller
@RequestMapping("/")
public class MainController {

	@Autowired
	ParkingLotService plService;
	
	@RequestMapping("")
	public ModelAndView main(ModelAndView mv) {

		List<ParkingLot> plList = plService.getParkingLotList(null);
		mv.addObject("plList", plList);
		mv.setViewName("main/main");
		
		return mv;
	}
}