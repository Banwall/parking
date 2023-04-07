$(function() {
    $("#headerCompanyManager").addClass("active");

    getCompanyList();

    $(document.body).delegate('.companyList', 'click', function() {
        $(".companyList").removeClass("clicked");
        $(this).addClass("clicked");

        getUserList( $(this).find("#companyName").text() );
    })

    $("#adminApproveList").on("click", function() {
        getAdminApproveList();
    })

    $("#adminApproveBtn").on("click", function() {
        adminApprove();
    })
})

function getCompanyList() {

    $.ajax({
        type:"GET",
        url: "/company/getCompanyListByAdmin",
        contentType : "application/json; charset=utf-8",
    })
    .done(function(data) {
        let companyList = data.companyList;
        let _target = $(".companyListTable tbody");
        $(_target).find("tr.companyList").remove();

        if(companyList.length > 0) {

            for(let i = 0; i < companyList.length; i++) {
                let _companyName = companyList[i].companyName;
                let _adminId = companyList[i].adminId;
                let _adminName = companyList[i].adminName;
                let _adminPhone = companyList[i].adminPhone;
                let _managerUserCount = companyList[i].managerUserCount;
                let _normalSensorTotalCount = companyList[i].normalSensorTotalCount;
                let _electronicSensorTotalCount = companyList[i].electronicSensorTotalCount;
                let _disabledSensorTotalCount = companyList[i].disabledSensorTotalCount;
                let _cdt = companyList[i].cdt

                let _tr = `
                    <tr class='companyList'>
                        <td>
                            <span id="companyName">${_companyName}</span>
                        </td>
                        <td>
                            <span>${_adminId}</span>
                        </td>
                        <td>
                            <span>${_adminName}</span>
                        </td>
                        <td>
                            <span>${_adminPhone}</span>
                        </td>
                        <td>
                            <span>${_managerUserCount} 명</span>
                        </td>
                        <td>
                            <span>${_normalSensorTotalCount} 개</span>
                        </td>
                        <td>
                            <span>${_electronicSensorTotalCount} 개</span>
                        </td>
                        <td>
                            <span>${_disabledSensorTotalCount} 개</span>
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
                <tr class='companyList'>
                    <td colspan="10">
                        <span>가입되어 있는 회원사가 없습니다.</span>
                    </td>
                </tr>
            `;

            $(_target).append(_tr);
        }
    })
}

function getAdminApproveList() {

    $.ajax({
        type:"GET",
        url: "/company/getAdminApproveList",
        contentType : "application/json; charset=utf-8",
    })
    .done(function(data) {
        let adminApproveList = data.adminApproveList;
        let _target = $(".adminApproveListTable tbody");
        $(_target).find("tr.adminApproveList").remove();

        if(adminApproveList.length > 0) {

            for(let i = 0; i < adminApproveList.length; i++) {
                let _companyName = adminApproveList[i].userCompany;
                let _adminId = adminApproveList[i].userId;
                let _adminName = adminApproveList[i].userName;
                let _adminPhone = adminApproveList[i].userPhone;
                let _approveYn = adminApproveList[i].approveYn;
                let _cdt = adminApproveList[i].cdt;

                let _tr = `
                    <tr class='adminApproveList'>
                        <td>
                            <input type="checkbox" class="adminCheckBox">
                        </td>
                        <td>
                            <span id="companyName">${_companyName}</span>
                        </td>
                        <td>
                            <span id="adminId">${_adminId}</span>
                        </td>
                        <td>
                            <span>${_adminName}</span>
                        </td>
                        <td>
                            <span>${_adminPhone}</span>
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
            <tr class='companyList'>
                <td colspan="7">
                    <span>승인 요청중인 슈퍼 관리자가 없습니다.</span>
                </td>
            </tr>
        `;

            $(_target).append(_tr);
        }
    })
}

function adminApprove() {
    let count = $(".adminCheckBox:checked").length;
    let adminIdList = [];

    if(count === 0) {
        alert("사용자를 선택해주세요.");
        return false;
    }

    $(".adminCheckBox:checked").each(function() {
        adminIdList.push( $(this).parent().parent().find("#adminId").text() );
    })

    $.ajax({
        type:"POST",
        url: "/user/approveUser",
        data: JSON.stringify(adminIdList),
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