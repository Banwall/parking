package com.qst.service;

import com.qst.mapper.CompanyMapper;
import com.qst.vo.Company;
import com.qst.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

	@Autowired
	private CompanyMapper companyMapper;

	public List<User> getCompanyList() {

		return companyMapper.getCompanyList();
	}

	public List<Company> getCompanyListByAdmin() {

		return companyMapper.getCompanyListByAdmin();
	}

    public String getAdminNameByCompany(String company) {

		return companyMapper.getAdminNameByCompany(company);
    }

	public List<User> getAdminApproveList() {

		return companyMapper.getAdminApproveList();
	}
}