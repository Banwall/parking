package com.qst.web;

import com.qst.service.DashBoardService;
import com.qst.vo.ParkingLotList;
import com.qst.vo.SensorList;
import com.qst.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/")
public class MainController {

	@Autowired
	DashBoardService dashBoardService;

	@RequestMapping("")
	public String login(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.invalidate();

		return "login/login";
	}

	@RequestMapping("main")
	public ModelAndView main(ModelAndView mv, HttpServletRequest request) {

		HttpSession session = request.getSession();
		List<ParkingLotList> parkingLotList = null;

		User user = (User) session.getAttribute("user");

		if(user.getUserRole().equals("슈퍼 관리자")) {
			parkingLotList = dashBoardService.getParkingLotListByCompany(user.getUserCompany());
		} else {
			parkingLotList = dashBoardService.getParkingLotListByManager(user.getUserId());
		}

		mv.addObject("parkingLotList", parkingLotList);
		mv.setViewName("main/main");

		return mv;
	}

	@RequestMapping("getParkingLotSensorInfo")
	@ResponseBody
	public Map<String, Object> getParkingLotSensorInfo(@RequestParam(value = "parkingLotId") String parkingLotId) {

		Map<String, Object> map = new HashMap<>();

		List<SensorList> parkingLotSensorInfo = dashBoardService.getParkingLotSensorInfo(parkingLotId);

		map.put("parkingLotSensorInfo", parkingLotSensorInfo);

		return map;
	}
}