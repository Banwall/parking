package com.qst.web;

import com.qst.service.CompanyService;
import com.qst.service.DashBoardService;
import com.qst.vo.Company;
import com.qst.vo.ParkingLotList;
import com.qst.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/company")
public class CompanyController {

	@Autowired
	CompanyService companyService;

	@Autowired
	DashBoardService dashBoardService;

	@RequestMapping("main")
	public ModelAndView main(ModelAndView mv) {

		List<User> companyList = companyService.getCompanyList();

		mv.addObject("companyList", companyList);
		mv.setViewName("qst/main");
		return mv;
	}

	@RequestMapping("getParkingLotListByCompany")
	@ResponseBody
	public Map<String, Object> getParkingLotListByCompany(@RequestParam(value="company") String company) {
		Map<String, Object> map = new HashMap<>();

		List<ParkingLotList> parkingLotList = dashBoardService.getParkingLotListByCompany(company);
		String adminName = companyService.getAdminNameByCompany(company);

		map.put("parkingLotList", parkingLotList);
		map.put("adminName", adminName);

		return map;
	}

	@RequestMapping("companyManager")
	public ModelAndView companyManager(ModelAndView mv) {

		mv.setViewName("qst/companyManager");
		return mv;
	}

	@RequestMapping("getCompanyListByAdmin")
	@ResponseBody
	public Map<String, Object> getCompanyListByAdmin() {
		Map<String, Object> map = new HashMap<>();

		List<Company> companyList = companyService.getCompanyListByAdmin();

		map.put("companyList", companyList);

		return map;
	}

	@RequestMapping("getAdminApproveList")
	@ResponseBody
	public Map<String, Object> getAdminApproveList() {
		Map<String, Object> map = new HashMap<>();

		List<User> adminApproveList = companyService.getAdminApproveList();

		map.put("adminApproveList", adminApproveList);

		return map;
	}
}