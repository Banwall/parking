$(function() {
    $("#headerUserManager").addClass("active");

    getUserList( $("#hiddenSessionUserCompany").val() );

    $("#useYUserBtn").on("click", function() {
        saveUser( "사용" );
    })

    $("#useNUserBtn").on("click", function() {
        saveUser( "미사용" );
    })

    $("#approveList").on("click", function() {
        getApproveList( $("#hiddenSessionUserCompany").val() );
    })

    $("#approveBtn").on("click", function() {
        approveUser();
    })
})

function getUserList(company) {

    $.ajax({
        type:"GET",
        url: "/user/getUserList?company=" + company,
        dataType: 'json',
        contentType : "application/json; charset=utf-8",
    })
    .done(function(data) {
        let userList = data.userList;
        let _target = $(".userListTable tbody");
        $(_target).find("tr.userList").remove();

        if(userList.length > 0) {

            for(let i = 0; i < userList.length; i++) {
                let _userId = userList[i].userId;
                let _userName = userList[i].userName;
                let _userPhone = userList[i].userPhone;
                let _managerArea = "";

                if(userList[i].parkingLotId != null) {
                    if(userList[i].managerParkingLotCount > 0) {
                        _managerArea = userList[i].parkingLotId.split("_")[1].replace('-', ' ') + " 외 " + userList[i].managerParkingLotCount + "구역";
                    } else {
                        _managerArea = userList[i].parkingLotId.split("_")[1].replace('-', ' ');
                    }
                }

                let _userRole = userList[i].userRole;
                let _useYn = userList[i].useYn;
                let _approveTime = userList[i].approveTime;
                let _cdt = userList[i].cdt
                let _mdt = userList[i].mdt

                let _tr = `
                    <tr class='userList'>
                        <td>
                            <input type="checkbox" class="userCheckBox">
                        </td>
                        <td>
                            <span id="userId">${_userId}</span>
                        </td>
                        <td>
                            <span>${_userName}</span>
                        </td>
                        <td>
                            <span>${_userPhone}</span>
                        </td>
                        <td>
                            <span>${_managerArea}</span>
                        </td>
                        <td>
                            <span>${_userRole}</span>
                        </td>
                        <td>
                            <span>${_useYn === 'Y' ? "사용" : "미사용"}</span>
                        </td>
                        <td>
                            <span>${_approveTime}</span>
                        </td>
                        <td>
                            <span>${_cdt}</span>
                        </td>
                        <td>
                            <span>${_mdt}</span>
                        </td>
                    </tr>
                `;

                $(_target).append(_tr);
            }
        } else {
            let _tr = `
                <tr class='userList'>
                    <td colspan="10">
                        <span>가입되어 있거나 승인 요청된 사용자가 없습니다.</span>
                    </td>
                </tr>
            `;

            $(_target).append(_tr);
        }
    })
}

function saveUser(el) {
    let count = $(".userCheckBox:checked").length;
    let userIdList = [];
    let flag;

    if(count === 0) {
        alert("사용자를 선택해주세요.");
        return false;
    }

    if(!confirm(el + "처리 하시겠습니까?")) {
        return false;
    }

    if(el === "미사용") {
        flag = "delete";
    } else {
        flag = "use";
    }

    $(".userCheckBox:checked").each(function() {
        userIdList.push( $(this).parent().parent().find("#userId").text() );
    })

    let data = {
        'userIdList' : userIdList,
        'flag' : flag
    }

    $.ajax({
        type:"POST",
        url: "/user/saveUser",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType : "application/json; charset=utf-8",
    })
    .done(function(data) {
        if(data.result === "error") {
            alert("실패하였습니다.");
            location.reload();
        } else {
            alert( data.result )
            location.reload();
        }
    })
    .fail(function(response) { console.log(response); });
}

function getApproveList(company) {

    $.ajax({
        type:"GET",
        url: "/user/getApproveList?company=" + company,
        dataType: 'json',
        contentType : "application/json; charset=utf-8",
    })
    .done(function(data) {
        let approveList = data.approveList;
        let _target = $(".approveListTable tbody");
        $(_target).find("tr.approveList").remove();

        if(approveList.length > 0) {

            for(let i = 0; i < approveList.length; i++) {
                let _userId = approveList[i].userId;
                let _userName = approveList[i].userName;
                let _userPhone = approveList[i].userPhone;
                let _cdt = approveList[i].cdt

                let _tr = `
                    <tr class='approveList'>
                        <td>
                            <input type="checkbox" class="approveCheckBox">
                        </td>
                        <td>
                            <span id="userId">${_userId}</span>
                        </td>
                        <td>
                            <span>${_userName}</span>
                        </td>
                        <td>
                            <span>${_userPhone}</span>
                        </td>
                        <td>
                            <span>대기 중</span>
                        </td>
                        <td>
                            <span>${_cdt}</span>
                        </td>
                    </tr>
                `;

                $(_target).append(_tr);
            }
        } else {
            let _tr = `
                <tr class='approveList'>
                    <td colspan="6">
                        <span>승인 요청중인 사용자가 없습니다.</span>
                    </td>
                </tr>
            `;

            $(_target).append(_tr);
        }
    })
}

function approveUser() {
    let count = $(".approveCheckBox:checked").length;
    let userIdList = [];

    if(count === 0) {
        alert("사용자를 선택해주세요.");
        return false;
    }

    $(".approveCheckBox:checked").each(function() {
        userIdList.push( $(this).parent().parent().find("#userId").text() );
    })

    $.ajax({
        type:"POST",
        url: "/user/approveUser",
        data: JSON.stringify(userIdList),
        dataType: 'json',
        contentType : "application/json; charset=utf-8",
    })
    .done(function(data) {
        if(data.result === "error") {
            alert("승인 실패하였습니다.");
            location.reload();
        } else {
            alert( data.result )
            location.reload();
        }
    })
    .fail(function(response) { console.log(response); });
}