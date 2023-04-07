package com.qst.web;

import com.qst.service.UserService;
import com.qst.vo.SensorList;
import com.qst.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userService;

	@RequestMapping("duplicateIdCheck")
	@ResponseBody
	public Map<Object, String> duplicateIdCheck(@RequestBody String userId) {

		Map<Object, String> map = new HashMap<>();

		try {
			User user = userService.duplicateIdCheck(userId);
			
			if(user == null) {
				map.put("result", "success");
			} else {
				map.put("result", "error");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return map;
	}

	@RequestMapping("registerUser")
	@ResponseBody
	public Map<Object, String> registerUser(@RequestBody User user) {

		Map<Object, String> map = new HashMap<>();

		try {
			if(user.getUserRole().equals("Admin")) {
				if(userService.duplicateCompanyAndRole(user) > 0) {
					map.put("result", "duplicateError");
					return map;
				}
			}

			int result = userService.registerUser(user);

			if(result > 0) {
				map.put("result", "success");
			} else {
				map.put("result", "error");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return map;
	}

	@RequestMapping("login")
	@ResponseBody
	public Map<Object, String> login(@RequestBody User user, HttpServletRequest request, RedirectAttributes rttr) {
		HttpSession session = request.getSession();
		Map<Object, String> map = new HashMap<>();
		String failMessage = "아이디 혹은 비밀번호가 잘못 되었습니다.";

		User userInfo = userService.login(user);

		if (userInfo == null) {
			rttr.addFlashAttribute("loginFail", failMessage);
			map.put("result", "error");
		}
		if(userInfo != null && userInfo.getApproveYn().equals("Y") && userInfo.getUseYn().equals("Y")) {
			session.setAttribute("user", userInfo);
			map.put("result", "success");
			map.put("userCompany", userInfo.getUserCompany());
		} else if(userInfo != null && userInfo.getApproveYn().equals("N")) {
			map.put("result", "notApprove");
		} else if(userInfo != null && userInfo.getUseYn().equals("N")) {
			map.put("result", "notUsed");
		}
		return map;
	}

	@RequestMapping("userManager")
	public ModelAndView userManager(ModelAndView mv) {

		mv.setViewName("user/userManager");

		return mv;
	}

	@RequestMapping("getUserList")
	@ResponseBody
	public Map<String, Object> getUserList(@RequestParam(value = "company") String company) {
		Map<String, Object> map = new HashMap<>();

		List<User> userList = userService.getUserList(company);

		map.put("userList", userList);

		return map;
	}

	@RequestMapping("saveUser")
	@ResponseBody
	public Map<String, Object> saveUser(@RequestBody User userList) {
		Map<String, Object> map = new HashMap<>();

		try {
			
			if(userList.getFlag().equals("delete")) {
				// 미사용 버튼
				userService.deleteUser(userList.getUserIdList());
				map.put("result", "미사용 처리되었습니다.");
			} else {
				// 사용 버튼
				userService.useUser(userList.getUserIdList());
				map.put("result", "사용 처리되었습니다.");
			}

		} catch (Exception e) {
			map.put("result", "error");
			e.printStackTrace();
		}

		return map;
	}

	@RequestMapping("getApproveList")
	@ResponseBody
	public Map<String, Object> getApproveList(@RequestParam(value = "company") String company) {
		Map<String, Object> map = new HashMap<>();

		List<User> approveList = userService.getApproveList(company);

		map.put("approveList", approveList);

		return map;
	}

	@RequestMapping("approveUser")
	@ResponseBody
	public Map<String, Object> approveUser(@RequestBody List<String> userIdList) {
		Map<String, Object> map = new HashMap<>();

		try {

			userService.approveUser(userIdList);
			map.put("result", "승인 처리되었습니다.");
		} catch (Exception e) {
			map.put("result", "error");
			e.printStackTrace();
		}

		return map;
	}
}