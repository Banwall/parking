$(function() {
    $("#headerCompanyDashboard").addClass("active");
    $(".companyAdmin").hide();

    $("#selectCompany").on("change", function() {

        if($(this).val() === "notChoose") {
            clearParkingLotList();
            $(".parkingLotSensorInfoCard").hide();
            return false;
        }

        selectCompany();
    })

    $(document.body).delegate('#companyUl li', 'click', function() {
        $("#companyUl li").attr("class", "");
        $(this).addClass("on");

        getParkingLotSensorInfo( $(this).text(), $(this).data('parkingLotId'), $(this).data('userName') );
    })
})

function selectCompany() {
    let _company = $("#selectCompany option:selected").val();
    $(".companyAdmin").show();
    $("#companyUl li").remove();

    $.ajax({
        url: "/company/getParkingLotListByCompany?company=" + _company,
        contentType: 'application/json',
        type:"GET",
    })
    .done(function(data) {
        let _target = $("#companyUl");
        let parkingLotList = data.parkingLotList
        let _adminName = data.adminName
        
        $(".companyAdmin span").text("슈퍼 관리자 : " + _adminName + "님");

        $(".parkingLotSensorInfoCard").hide();

        for(let i = 0; i < parkingLotList.length; i++) {
            let _parkingLotId = parkingLotList[i].parkingLotId;
            let _parkingLotName = parkingLotList[i].parkingLotId.split("_")[1].replace("-", " ");
            let _userName = parkingLotList[i].userName;

            let _li = `
                <li data-user-name="${_userName}" data-parking-lot-id="${_parkingLotId}">${_parkingLotName}</li>
            `

            _target.append(_li);
        }
    });
}

function clearParkingLotList() {
    $(".companyAdmin").hide();
    $("#companyUl li").remove();
}