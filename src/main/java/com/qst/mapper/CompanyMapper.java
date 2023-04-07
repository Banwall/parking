package com.qst.mapper;

import com.qst.vo.Company;
import com.qst.vo.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CompanyMapper {

	List<User> getCompanyList();

	List<Company> getCompanyListByAdmin();

    String getAdminNameByCompany(String company);

	List<User> getAdminApproveList();
}