package com.qst.mapper;

import com.qst.vo.ParkingLot;
import com.qst.vo.UserVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

	UserVo getUserAccount(String userId);
	void saveUser(UserVo userVo);
	
}