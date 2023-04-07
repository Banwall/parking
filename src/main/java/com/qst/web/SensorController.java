package com.qst.web;

import com.qst.service.CompanyService;
import com.qst.service.DashBoardService;
import com.qst.service.SensorService;
import com.qst.vo.ParkingLotList;
import com.qst.vo.SensorList;
import com.qst.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/sensor")
public class SensorController {

	@Autowired
	DashBoardService dashBoardService;

	@Autowired
	SensorService sensorService;

	@Autowired
	CompanyService companyService;

	@RequestMapping("sensorManager")
	public ModelAndView main(ModelAndView mv, HttpServletRequest request) {

		HttpSession session = request.getSession();

		/*if(user == null) {
			mv.setViewName("login/login");
			return mv;
		}*/

		User user = (User) session.getAttribute("user");
		// 관리자밖에 못들어감.
		List<ParkingLotList> parkingLotList = dashBoardService.getParkingLotListByCompany(user.getUserCompany());

		mv.addObject("parkingLotList", parkingLotList);
		mv.setViewName("sensor/sensorManager");
		
		return mv;
	}

	@RequestMapping("getSensorList")
	@ResponseBody
	public Map<String, Object> getSensorList(@RequestParam(value = "parkingLotId") String parkingLotId) {
		Map<String, Object> map = new HashMap<>();

		List<SensorList> sensorList = sensorService.getSensorList(parkingLotId);

		map.put("sensorList", sensorList);

		return map;
	}

	@RequestMapping("getParkingLotListByCompany")
	@ResponseBody
	public Map<String, Object> getParkingLotListByCompany(@RequestParam(value = "company") String company) {
		Map<String, Object> map = new HashMap<>();

		List<ParkingLotList> parkingLotList = dashBoardService.getParkingLotListByCompany(company);

		map.put("parkingLotList", parkingLotList);

		return map;
	}

	@RequestMapping("getParkingLotInfo")
	@ResponseBody
	public ParkingLotList getParkingLotInfo(@RequestParam(value = "parkingLotId") String parkingLotId) {

		return dashBoardService.getParkingLotInfo(parkingLotId);
	}

	@RequestMapping("saveParkingLotInfo")
	@ResponseBody
	public Map<String, Object> saveParkingLotInfo(@RequestBody ParkingLotList parkingLotList) {
		Map<String, Object> map = new HashMap<>();

		try {
			sensorService.saveParkingLotInfo(parkingLotList);
			map.put("result", "success");
		} catch (Exception e) {
			map.put("result", "error");
			e.printStackTrace();
		}

		return map;
	}

	@RequestMapping("saveSensorList")
	@ResponseBody
	public Map<String, Object> saveSensorList(@RequestBody List<SensorList> sensorList) {
		Map<String, Object> map = new HashMap<>();

		try {
			sensorService.saveSensorList(sensorList);
			
			map.put("result", "success");
		} catch (Exception e) {
			map.put("result", "error");
			e.printStackTrace();
		}

		return map;
	}
}