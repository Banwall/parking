package com.qst.service;

import com.qst.mapper.ParkingLotMapper;
import com.qst.mapper.UserMapper;
import com.qst.vo.ParkingLot;
import com.qst.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

	@Autowired
	UserMapper userMapper;

	@Transactional
	public void joinUser(UserVo userVo){
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		userVo.setUserPwd(passwordEncoder.encode(userVo.getPassword()));
		userVo.setUserAuth("USER");
		userMapper.saveUser(userVo);
	}

	@Override
	public UserVo loadUserByUsername(String userId) throws UsernameNotFoundException {
		//여기서 받은 유저 패스워드와 비교하여 로그인 인증
		UserVo userVo = userMapper.getUserAccount(userId);
		if (userVo == null){
			throw new UsernameNotFoundException("User not authorized.");
		}
		return userVo;
	}
}