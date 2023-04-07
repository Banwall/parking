package com.qst.interceptor;

import com.qst.vo.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Slf4j
public class LoggerInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();

        // 요청 URL
        String url = request.getRequestURI();

        // 아래 URL이 아니라면 로그인 체크
        if(! (url.equals("/") || url.equals("/user/login") || url.equals("/user/duplicateIdCheck") || url.equals("/user/registerUser")) ) {
            // UserDto는 User에 대한 Dto인데 로직 흐름을 참고만 하셔도 됩니다.
            User user = (User) session.getAttribute("user");

            // 로그인 정보가 없으면
            if(user == null) {
                // 튕겨내기
                response.sendRedirect("/");
                return false;
            }
        }
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }
}