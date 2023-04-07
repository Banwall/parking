package com.qst.service;

import com.qst.mapper.UserMapper;
import com.qst.util.UtilService;
import com.qst.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private UtilService utilService;

	public User duplicateIdCheck(String userId) {

		return userMapper.duplicateIdCheck(userId);
	}

	public int registerUser(User user) {

		user.setUserPwd(utilService.encrypt(user.getUserPwd(), "qsentech!1233", "3321!hcetnesq"));

		if(user.getUserRole().equals("Admin")) {
			user.setUserRole("슈퍼 관리자");
		} else {
			user.setUserRole("일반 관리자");
		}

		return userMapper.registerUser(user);
	}

	public User login(User user) {

		String userId = user.getUserId();
		String userPwd = user.getUserPwd();

		try {
			User userInfo = userMapper.getUserInfo(userId);
			String decryptedString = utilService.decrypt(userInfo.getUserPwd(), "qsentech!1233", "3321!hcetnesq");

			if(userPwd.equals(decryptedString)) {
				return userInfo;
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

    public List<User> getUserList(String company) {

		return userMapper.getUserList(company);
    }

	public void deleteUser(List<String> userIdList) {

		userMapper.deleteUser(userIdList);
	}

	public void useUser(List<String> userIdList) {

		userMapper.useUser(userIdList);
	}

	public List<User> getApproveList(String company) {

		return userMapper.getApproveList(company);
	}

	public void approveUser(List<String> userIdList) {

		userMapper.approveUser(userIdList);
	}

	public int duplicateCompanyAndRole(User user) {

		return userMapper.duplicateCompanyAndRole(user);
	}
}