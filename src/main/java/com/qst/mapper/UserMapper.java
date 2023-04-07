package com.qst.mapper;

import com.qst.vo.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

	User duplicateIdCheck(String userId);

	int registerUser(User user);

	User getUserInfo(String userId);

	List<User> getUserList(String company);

	void deleteUser(List<String> userIdList);

	void useUser(List<String> userIdList);

	List<User> getApproveList(String company);

	void approveUser(List<String> userIdList);

	int duplicateCompanyAndRole(User user);
}