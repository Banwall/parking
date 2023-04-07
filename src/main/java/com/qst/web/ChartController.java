package com.qst.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/chart")
public class ChartController {

	@RequestMapping("")
	public ModelAndView main(ModelAndView mv) {

		mv.setViewName("main/chart");
		
		return mv;
	}
}