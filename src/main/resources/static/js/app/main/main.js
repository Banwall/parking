$(function() {
    $("#headerDashboard").addClass("active");

    $(".parkingLotListCard li").on("click", function() {
        $(".parkingLotListCard li").attr("class", "");
        $(this).addClass("on");

        getParkingLotSensorInfo( $(this).text(), $(this).data('parkingLotId'), $(this).data('userName') );
    })
})

function getParkingLotSensorInfo(parkingLotName, parkingLotId, userName) {
    $(".parkingLotSensorInfoCard").show();

    $("#parkingLotName").text( parkingLotName );
    $("#parkingLotManagerName").text( "담당자 : " + userName );

    $.ajax({
        type:"GET",
        url: "/getParkingLotSensorInfo?parkingLotId=" + parkingLotId,
        dataType: 'json',
        contentType : "application/json; charset=utf-8",
    })
    .done(function(data) {

        let parkingLotSensorInfo = data.parkingLotSensorInfo;

        $(".parkingLotImageDiv").empty();

        if(parkingLotSensorInfo.length > 0) {

            for(let i = 0; i < parkingLotSensorInfo.length; i++) {
                let _userCompany = $("#hiddenSessionUserCompany").val()
                let _fileName = parkingLotSensorInfo[i].lastFileName;
                let _lpr = parkingLotSensorInfo[i].lpr;
                let _vehicle = parkingLotSensorInfo[i].vehicle;
                let _lprNumber = parkingLotSensorInfo[i].lprnumber;
                let _distance = parkingLotSensorInfo[i].distance;

                // 윈도우 파일 경로
                /*let _filePath = _userCompany + "\\" + parkingLotName + "\\" + parkingLotSensorInfo[i].parkingZoneArea + "\\" + parkingLotSensorInfo[i].sensorId + "\\" + _fileName;
                let _encodeFilePath = encodeURI(_filePath);
                let _cropFilePath = _userCompany + "\\" + parkingLotName + "\\" + parkingLotSensorInfo[i].parkingZoneArea + "\\" + parkingLotSensorInfo[i].sensorId + "\\" + _fileName;*/

                // 리눅스 파일 경로
                let _filePath = _userCompany + "/" + parkingLotName.replace(' ', '-') + "/" + parkingLotSensorInfo[i].parkingZoneArea + "/" + parkingLotSensorInfo[i].sensorId + "/" + _fileName;
                let _encodeFilePath = encodeURI(_filePath);
                let _cropFilePath = _userCompany + "/" + parkingLotName.replace(' ', '-') + "/" + parkingLotSensorInfo[i].parkingZoneArea + "/" + parkingLotSensorInfo[i].sensorId + "/crop_" + _fileName;

                let _div = `
                    <div class="parkingLotImage">
                        <img src="/image/view?filePath=${_encodeFilePath}" style="table-layout: fixed; width: 100%; height: 550px;">
        
                        <table class="sensorImgTable">
                            <colgroup>
                                <col style="width: 80px">
                                <col style="width: 180px">
                                <col style="width: 90px">
                                <col style="width: 150px">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>입차시간</th>
                                    <td id="parkingStartTime">2023-03-15 14:35:00</td>
                                    <th>주차시간</th>
                                    <td id="parkingIngTime">45분째 주차중</td>
                                </tr>
                                <tr>
                                    <th>거리</th>
                                    <td id="parkingDistance">${_distance}cm</td>
                                    <th>종류</th>
                                    <td>${_vehicle === '0000' ? '전기차' : _vehicle === '0001' ? '일반차' : ''}</td>
                                </tr>
                                <tr style="height: 70px;">
                                    <th>번호판</th>
                                    <td colspan="3">
                                        <div class="lprNumberDiv">
                                            <span style="vertical-align: middle">${_lprNumber !== '9999' ? _lprNumber : '차량없음'}</span>
                                            <img class="cropLprNumberImage" src="" style="width: 200px; height: 55px;" alt=""/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `;

                $(".parkingLotImageDiv").append(_div);
            }

            if($("#hiddenSessionUserRole").val() === '일반 관리자') {
                $(".cropLprNumberImage").hide();
            }
        }
    })
    .fail(function(response) { });
}