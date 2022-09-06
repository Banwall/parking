package com.qst.web;

import com.qst.service.ParkingLotService;
import com.qst.service.UserService;
import com.qst.vo.ParkingLot;
import com.qst.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userService;

	@GetMapping
	public String root() {
		return "redirect:/login";
	}

	/**
	 * 로그인 폼
	 * @return
	 */
	@GetMapping("/login")
	public String login(){
		return "login";
	}

	/**
	 * 로그인 실패 폼
	 * @return
	 */
	@GetMapping("/access_denied")
	public String accessDenied() {
		return "user_denied";
	}

	/**
	 * 회원가입 폼
	 * @return
	 */
	@GetMapping("/register")
	public String signUpForm() {
		return "register";
	}

	/**
	 * 회원가입 진행
	 * @param user
	 * @return
	 */
	@PostMapping("/signUp")
	public String signUp(UserVo userVo) {
		System.out.println("진입???????????????????? : " + userVo);
		userService.joinUser(userVo);
		return "redirect:/user/login"; //로그인 구현 예정
	}

	@GetMapping("/user_access")
	public String userAccess(Model model, Authentication authentication) {
		//Authentication 객체를 통해 유저 정보를 가져올 수 있다.
		UserVo userVo = (UserVo) authentication.getPrincipal();  //userDetail 객체를 가져옴
		model.addAttribute("info", userVo.getUserId() +"의 "+ userVo.getUserName()+ "님");      //유저 아이디
		return "user_access";
	}
}