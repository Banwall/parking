let idResult = false;
let pwdResult = false;
let registerResult = false;

$(function() {
	
	$("#loginBtn").on("click", function() {
		loginUser();
	})

	$("#registerPopBtn").on("click", function() {
		openRegisterPop();
	})
	
	$("#duplicateId").on("click", function() {
		duplicateIdCheck();
	})

	$("#registerBtn").on("click", function() {
		registerUser();
	})

	$("#registerPwdCheck").focusout(function() {
		userPwdCheck();
	})

	$("#userPwd").keydown(function (event) {
		if (event.keyCode === 13) {
			loginUser();
		}
	});
})

function openRegisterPop() {
	$("#registerPopDiv").show();
}

function duplicateIdCheck() {
	let userId = $("#registerId").val();

	if(userId === "") {
		alert("아이디를 입력해주세요.");
		return false;
	}

	$.ajax({
		type:"POST",
		url: "/user/duplicateIdCheck",
		data: userId,
		dataType: 'json',
		contentType : "application/json; charset=utf-8",
	})
	.done(function(data) {
		if(data.result === "success") {
			$("#idCheckText").text("사용 가능한 아이디입니다.");
			idResult = true;
		} else {
			$("#idCheckText").text("이미 가입되어있는 아이디입니다.");
			idResult = false;
		}

		$("#idCheckText").show();
	})
	.fail(function(response) { console.log(response); });
}

function userPwdCheck() {
	let userPwd = $("#registerPwd").val();
	let userPwdCheck = $("#registerPwdCheck").val();

	if(userPwd === userPwdCheck) {
		$("#pwdCheckText").hide();
		pwdResult = true;
	} else {
		$("#pwdCheckText").text("비밀번호가 일치하지 않습니다.");
		$("#pwdCheckText").show();
		pwdResult = false;
	}
}

function registerUser() {

	registerValidation();

	if(!registerResult) {
		return false;
	}

	let data = {
		'userId' : $("#registerId").val(),
		'userPwd' : $("#registerPwd").val(),
		'userCompany' : $("#registerCompany").val(),
		'userRole' : $("#registerRole option:selected").val(),
		'userName' : $("#registerName").val(),
		'userPhone' : $("#registerPhone").val()
	}

	$.ajax({
		type:"POST",
		url: "/user/registerUser",
		data: JSON.stringify(data),
		dataType: 'json',
		contentType : "application/json; charset=utf-8",
	})
	.done(function(data) {

		if(data.result === "duplicateError") {
			alert("해당 회원사의 슈퍼관리자는 이미 등록되어있습니다.");
			return false;
		}

		if(data.result === "success") {
			alert("회원가입에 성공했습니다.");
			location.reload();
		} else {
			alert("회원가입에 실패했습니다.");
		}
		
	})
	.fail(function(response) { console.log(response); });
}

function loginUser() {

	let data = {
		'userId' : $("#userId").val(),
		'userPwd' : $("#userPwd").val()
	}

	$.ajax({
		type:"POST",
		url: "/user/login",
		data: JSON.stringify(data),
		dataType: 'json',
		contentType : "application/json; charset=utf-8",
	})
	.done(function(data) {

		switch (data.result) {
			case 'success':
				if(data.userCompany === "큐센텍") {
					location.href = "/company/main";
				} else {
					location.href = "/main";
				}
				break;
			case 'error':
				alert("아이디 또는 비밀번호를 확인해주세요.");
				break;
			case 'notApprove':
				alert("승인되지 않은 계정입니다.\n슈퍼 관리자에게 문의해주세요.")
				break;
			case 'notUsed' :
				alert("미사용 계정입니다.\n슈퍼 관리자에게 문의해주세요.")
		}
	})
	.fail(function(response) { });
}

function registerValidation() {

	registerResult = true;

	let _registerCompany = $("#registerCompany").val();
	let _registerName = $("#registerName").val();
	let _registerPhone = $("#registerPhone").val();

	if(!idResult) {
		alert("아이디 중복확인을 해주세요.");
		registerResult = false;
		return false;
	}

	if(!pwdResult) {
		alert("비밀번호를 확인해주세요.");
		registerResult = false;
		return false;
	}

	if( _registerCompany === "" ) {
		alert("회원사를 입력해주세요.");
		registerResult = false;
		return false;
	}

	if(_registerName === "") {
		alert("관리자 이름을 입력해주세요.");
		registerResult = false;
		return false;
	}

	if(_registerPhone === "") {
		alert("핸드폰 번호를 입력해주세요.");
		registerResult = false;
		return false;
	}
}