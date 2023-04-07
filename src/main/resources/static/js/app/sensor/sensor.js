let saveFlag = "update";
let normalCheck = true;
let electronicCheck = true;
let disabledCheck = true;

$(function() {
    $("#headerSensorManager").addClass("active");

    $(".parkingLotListCard li").on("click", function() {
        $(".parkingLotListCard li").attr("class", "");
        $(this).addClass("on");

        getSensorList( $(this).data('parkingLotId'), $(this).data('userName') );
    })

    $("#saveParkingLot").on("click", function() {
        openParkingLotPop();
    })

    $("#saveSelectParkingLotName").on("change", function() {
        let _selectParkingLotName = $("#saveSelectParkingLotName option:selected").val()

        if( _selectParkingLotName === "notChoose" || _selectParkingLotName === "self" ) {
            if(_selectParkingLotName === "self") {
                $("#saveSelfParkingLotName").show();
            } else {
                $("#saveSelfParkingLotName").val("");
                $("#saveSelfParkingLotName").hide();
            }
            clearParkingLotPop();

            return false;
        } else {
            $("#saveSelfParkingLotName").hide();
            $("#saveSelfParkingLotName").val("");
        }

        selectParkingLotName( _selectParkingLotName );
    })

    $(".addBtnImage").on("click", function() {
        let _addBtnImageId = $(this).attr("id");

        addSensorList(_addBtnImageId);
    })

    $(".subBtnImage").on("click", function() {
        let _subBtnImageId = $(this).attr("id");

        subSensorList(_subBtnImageId);
    })

    $("#saveParkingLotInfo").on("click", function() {
        saveParkingLotInfo( $("#saveSelfParkingLotName").val() );
    })

    $("#saveSensorList").on("click", function() {
        saveSensorList();
    })

    $("input[type='checkbox']").on("click", function() {
        if( $("#saveSelectParkingLotName option:selected").val() === "notChoose" ) {
            alert("주차장을 먼저 선택해주세요.");
            $(this).prop("checked", false);
            return false;
        }
        clickParkingLotCheckBox( $(this).attr("id") );
    })

    $("#saveNormalZoneCount").focusout(function() {
        let _totalNormalCount = $(this).val();
        let _usedNormalCount = $("#hiddenNormalSensorCount").val();
        let _newNormalCount = $(".addNormalSensor").length;
        normalCheck = true;

        if( +_usedNormalCount + +_newNormalCount > +_totalNormalCount ) {
            alert("일반차 면적 수를 초과했습니다.");
            normalCheck = false;
        }
    })

    $("#saveElectronicZoneCount").focusout(function() {
        let _totalElectronicCount = $(this).val();
        let _usedElectronicCount = $("#hiddenElectronicSensorCount").val();
        let _newElectronicCount = $(".addElectronicSensor").length;
        electronicCheck = true;

        if( +_usedElectronicCount + +_newElectronicCount > +_totalElectronicCount ) {
            alert("전기차 면적 수를 초과했습니다.");
            electronicCheck = false;
        }
    })

    $("#saveDisabledZoneCount").focusout(function() {
        let _totalDisabledCount = $(this).val();
        let _usedDisabledCount = $("#hiddenDisabledSensorCount").val();
        let _newDisabledCount = $(".addDisabledSensor").length;
        disabledCheck = true;

        if( +_usedDisabledCount + +_newDisabledCount > +_totalDisabledCount ) {
            alert("장애인차 면적 수를 초과했습니다.");
            disabledCheck = false;
        }
    })

    $(document.body).delegate('.addNormalSensor', 'click', function() {
        if($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
        } else {
            $(this).addClass("clicked");
        }
    })

    $(document.body).delegate('.addElectronicSensor', 'click', function() {
        if($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
        } else {
            $(this).addClass("clicked");
        }
    })

    $(document.body).delegate('.addDisabledSensor', 'click', function() {
        if($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
        } else {
            $(this).addClass("clicked");
        }
    })

    $(document.body).delegate('#saveSensorIp', 'click', function(e) {
        e.stopPropagation();
    })

    $(document.body).delegate('#saveSensorType', 'click', function(e) {
        e.stopPropagation();
    })
})

function getSensorList(parkingLotId, userName) {
    $(".sensorListCard").show();

    $.ajax({
        type:"GET",
        url: "/sensor/getSensorList?parkingLotId=" + parkingLotId,
        contentType : "application/json; charset=utf-8",
    })
    .done(function(data) {
        let sensorList = data.sensorList;
        let _target = $(".sensorListTable tbody");
        $(_target).find("tr.sensorList").remove();

        if(sensorList.length > 0) {

            for(let sensor of sensorList) {
                let _sensorIdx = sensor.sensorIdx;
                let _sensorId = sensor.sensorId;
                let _sensorIp = sensor.ip;
                let _sensorType = sensor.sensorType;
                let _sensorParkingZoneArea = sensor.parkingZoneArea;
                let _sensorLastFileName = sensor.lastFileName;
                let _sensorLastFileTime = sensor.lastFileTime
                let _sensorPingValue = sensor.pingValue;
                let _sensorUseYn = sensor.useYn;
                let _sensorNegativeReason = sensor.negativeReason;

                let _tr = `
                    <tr class='sensorList'>
                        <td>
                            <span>${_sensorId}
                            <input type="hidden" id="sensorIdx" value=${_sensorIdx} />
                        </td>
                        <td>
                            <input id="sensorIp" value="${_sensorIp}">
                        </td>
                        <td>
                            <select id="sensorType">
                                <option value="qmc5883" ${_sensorType === 'qmc5883' ? 'selected' : ''}>qmc5883</option>
                                <option value="image" ${_sensorType === 'image' ? 'selected' : ''}>image</option>
                            </select>
                        </td>
                        <td>
                            <input id="paringZoneArea" value="${_sensorParkingZoneArea}" maxlength="1">
                        </td>
                        <td>
                            <span>${_sensorLastFileName == null ? '' : _sensorLastFileName}</span>
                        </td>
                        <td>
                            <span>${_sensorLastFileTime}</span>
                        </td>
                        <td>
                            <span>${_sensorPingValue === 'Y' ? '정상' : '비정상'}</span>
                        </td>
                        <td>
                            <button id="useYnBtn" class="${_sensorUseYn === 'Y' ? 'yBtn' : 'rBtn'}" onclick="listUseYnBtnClick(this);">${_sensorUseYn === 'Y' ? '사용' : '미사용'}</button>
                            <input type="hidden" id="useYn" value=${_sensorUseYn}>
                        </td>
                        <td>
                            <input type="text" id="negativeReason" value="${_sensorNegativeReason === null ? '' : _sensorNegativeReason}" ${_sensorUseYn === 'Y' ? 'readonly' : ''}>
                        </td>
                    </tr>
                `;

                $(_target).append(_tr);
            }
        }
    })
}

function listUseYnBtnClick(el) {
    if( $(el).hasClass("yBtn") === true) {
        // 미사용으로 변경
        $(el).removeClass("yBtn");
        $(el).addClass("rBtn");
        $(el).text("미사용");
        $(el).parent().find("#useYn").val("N");
        $(el).parent().parent().find("#negativeReason").removeAttr("readonly");
    } else if( $(el).hasClass("rBtn") === true ) {
        // 사용으로 변경
        $(el).removeClass("rBtn");
        $(el).addClass("yBtn");
        $(el).text("사용");
        $(el).parent().find("#useYn").val("Y");
        $(el).parent().parent().find("#negativeReason").val("");
        $(el).parent().parent().find("#negativeReason").attr("readonly", "readonly");
    }
}

function clearParkingLotPop() {
    // 팝업 초기화

    $("#hiddenNormalSensorCount").val(0);
    $("#hiddenElectronicSensorCount").val(0);
    $("#hiddenDisabledSensorCount").val(0);

    $("#saveNormalCheckBox").prop("checked", false);
    $("#saveElectronicCheckBox").prop("checked", false);
    $("#saveDisabledCheckBox").prop("checked", false);

    $("#saveNormalZoneCount").val(0);
    $("#saveElectronicZoneCount").val(0);
    $("#saveDisabledZoneCount").val(0);

    $("#addNormalSensor").hide();
    $("#addElectronicSensor").hide();
    $("#addDisabledSensor").hide();

    $("#subNormalSensor").hide();
    $("#subElectronicSensor").hide();
    $("#subDisabledSensor").hide();

    $("#saveParkingLotUserId").val("");

    $(".saveSensorListTable tbody tr").remove();
}

function openParkingLotPop() {
    clearParkingLotPop();

    $("#parkingLotPopDiv").show();
    $("#saveSelfParkingLotName").hide();
    let _userCompany = $("#hiddenSessionUserCompany").val();

    $("#addNormalSensor").hide();
    $("#addElectronicSensor").hide();
    $("#addDisabledSensor").hide();

    $("#saveSelectParkingLotName option").remove();

    $.ajax({
        type:"GET",
        url: "/sensor/getParkingLotListByCompany?company=" + _userCompany,
        contentType : "application/json; charset=utf-8",
    })
    .done(function(data) {
        let _parkingLotList = data.parkingLotList
        let _target = $("#saveSelectParkingLotName");

        _target.append( '<option value="notChoose">-- 선택 --</option>' );
        for(let i = 0; i < _parkingLotList.length; i++) {
            let _parkingLotName = _parkingLotList[i].parkingLotId.split("_");
            _target.append( '<option value=' + _parkingLotList[i].parkingLotId + '>' + _parkingLotName[1].replace('-', ' ') + '</option>' );
        }
        _target.append( '<option value="self">직접입력</option>' );
    })
}

function selectParkingLotName(parkingLotId) {

    $("#saveNormalCheckBox").prop("checked", false);
    $("#saveElectronicCheckBox").prop("checked", false);
    $("#saveDisabledCheckBox").prop("checked", false);

    $(".saveSensorListTable tbody tr").remove();

    $.ajax({
        type:"GET",
        url: "/sensor/getParkingLotInfo?parkingLotId=" + parkingLotId,
        contentType : "application/json; charset=utf-8",
    })
    .done(function(data) {
        let _parkingZoneType = data.parkingZoneType.split(",");
        let _parkingNormalZoneCount = data.normalZoneCount;
        let _parkingElectronicZoneCount = data.electronicZoneCount;
        let _parkingDisabledZoneCount = data.disabledZoneCount;
        let _normalSensorCount = data.normalSensorCount;
        let _electronicSensorCount = data.electronicSensorCount;
        let _disabledSensorCount = data.disabledSensorCount;
        let _userId = data.userId;

        $("#hiddenNormalSensorCount").val(_normalSensorCount);
        $("#hiddenElectronicSensorCount").val(_electronicSensorCount);
        $("#hiddenDisabledSensorCount").val(_disabledSensorCount);

        if( _parkingZoneType.includes("N") ) {
            $("#saveNormalCheckBox").prop("checked", true);
        }

        if( _parkingZoneType.includes("E") ) {
            $("#saveElectronicCheckBox").prop("checked", true);
        }

        if( _parkingZoneType.includes("D") ) {
            $("#saveDisabledCheckBox").prop("checked", true);
        }

        $("#saveNormalZoneCount").val(_parkingNormalZoneCount);
        $("#saveElectronicZoneCount").val(_parkingElectronicZoneCount);
        $("#saveDisabledZoneCount").val(_parkingDisabledZoneCount);
        
        if( $("#saveNormalCheckBox").is(":checked") ) {
            $("#addNormalSensor").show();
        } else {
            $("#addNormalSensor").hide();
        }

        if( $("#saveElectronicCheckBox").is(":checked") ) {
            $("#addElectronicSensor").show();
        } else {
            $("#addElectronicSensor").hide();
        }

        if( $("#saveDisabledCheckBox").is(":checked") ) {
            $("#addDisabledSensor").show();
        } else {
            $("#addDisabledSensor").hide();
        }

        $("#saveParkingLotUserId").val(_userId);
    })
}

function addSensorList(el) {

    let _totalNormalCount = $("#saveNormalZoneCount").val();
    let _totalElectronicCount = $("#saveElectronicZoneCount").val();
    let _totalDisabledCount = $("#saveDisabledZoneCount").val();
    let _usedNormalCount = $("#hiddenNormalSensorCount").val();
    let _usedElectronicCount = $("#hiddenElectronicSensorCount").val();
    let _usedDisabledCount = $("#hiddenDisabledSensorCount").val();
    let _newNormalCount = $(".addNormalSensor").length;
    let _newElectronicCount = $(".addElectronicSensor").length;
    let _newDisabledCount = $(".addDisabledSensor").length;

    switch (el) {
        case "addNormalSensor":
            if( +_usedNormalCount + +_newNormalCount >= +_totalNormalCount ) {
                alert("일반차 면적 수를 초과했습니다.");
                return false;
            }
            break;
        case "addElectronicSensor":
            if( +_usedElectronicCount + +_newElectronicCount >= +_totalElectronicCount ) {
                alert("전기차 면적 수를 초과했습니다.");
                return false;
            }
            break;
        case "addDisabledSensor":
            if( +_usedDisabledCount + +_newDisabledCount >= +_totalDisabledCount ) {
                alert("장애인차 면적 수를 초과했습니다.");
                return false;
            }
            break;
    }

    let _tr = `
        <tr class=${el}>
            <td>
                <input type="text" id="saveSensorIp" style="width: 100px;">
            </td>
            <td>
                <select id="saveSensorType">
                    <option>qmc5883</option>
                    <option>image</option>
                </select>
            </td>
        </tr>
    `;

    if( el === "addNormalSensor" ) {
        $("#saveNormalSensorListTable tbody").append(_tr);
    } else if( el === "addElectronicSensor" ) {
        $("#saveElectronicSensorListTable tbody").append(_tr);
    } else {
        $("#saveDisabledSensorListTable tbody").append(_tr);
    }

    if($("#saveNormalSensorListTable tbody tr").length > 0) {
        $("#subNormalSensor").show();
    }

    if($("#saveElectronicSensorListTable tbody tr").length > 0) {
        $("#subElectronicSensor").show();
    }

    if($("#saveDisabledSensorListTable tbody tr").length > 0) {
        $("#subDisabledSensor").show();
    }
}

function subSensorList(el) {
    switch (el) {
        case "subNormalSensor":
            $(".addNormalSensor").each(function() {
                if($(this).hasClass("clicked")) {
                    $(this).remove();
                }
            })
            if($("#saveNormalSensorListTable tbody tr").length === 0) {
                $("#subNormalSensor").hide();
            }
            break;
        case "subElectronicSensor":
            $(".addElectronicSensor").each(function() {
                if($(this).hasClass("clicked")) {
                    $(this).remove();
                }
            })
            if($("#saveElectronicSensorListTable tbody tr").length === 0) {
                $("#subElectronicSensor").hide();
            }
            break;
        case "subDisabledSensor":
            $(".addDisabledSensor").each(function() {
                if($(this).hasClass("clicked")) {
                    $(this).remove();
                }
            })
            if($("#saveDisabledSensorListTable tbody tr").length === 0) {
                $("#subDisabledSensor").hide();
            }
            break;
    }
}

function saveParkingLotInfo(el) {

    if(!parkingLotInfoValidation()) {
        // 유효성 검사가 완료되지 않을 경우
        return false;
    }

    let data;
    let _parkingCheckArr = [];
    let _parkingLotId = "";
    let _parkingZoneType = "";
    let _parkingNormalCheck = $("#saveNormalCheckBox:checked").val();
    let _parkingElectronicCheck = $("#saveElectronicCheckBox:checked").val();
    let _parkingDisabledCheck = $("#saveDisabledCheckBox:checked").val();
    let _parkingNormalZoneCount = $("#saveNormalZoneCount").val();
    let _parkingElectronicZoneCount = $("#saveElectronicZoneCount").val();
    let _parkingDisabledZoneCount = $("#saveDisabledZoneCount").val();
    let _parkingLotUserId = $("#saveParkingLotUserId").val();

    _parkingCheckArr.push(_parkingNormalCheck);
    _parkingCheckArr.push(_parkingElectronicCheck);
    _parkingCheckArr.push(_parkingDisabledCheck);

    for(let i = 0; i < _parkingCheckArr.length; i++) {
        if(typeof _parkingCheckArr[i] != "undefined") {
            if(_parkingZoneType === "") {
                _parkingZoneType += _parkingCheckArr[i];
            } else {
                _parkingZoneType += "," + _parkingCheckArr[i];
            }
        }
    }

    // el은 직접입력한 주차장 이름

    if( el === "" ) {
        _parkingLotId = $("#saveSelectParkingLotName option:selected").val().replace(' ', '-');
        saveFlag = "update";
    } else {
        _parkingLotId = $("#hiddenSessionUserCompany").val() + "_" + el.replace(' ', '-');
        saveFlag = "insert";
    }

    data = {
        'parkingLotId' : _parkingLotId,
        'parkingZoneType' : _parkingZoneType,
        'normalZoneCount' : _parkingNormalZoneCount,
        'electronicZoneCount' : _parkingElectronicZoneCount,
        'disabledZoneCount' : _parkingDisabledZoneCount,
        'userId' : _parkingLotUserId,
        'saveFlag' : saveFlag,
        'normalSensorList' : getAddSensorList("addNormalSensor"),
        'electronicSensorList' : getAddSensorList("addElectronicSensor"),
        'disabledSensorList' : getAddSensorList("addDisabledSensor")
    }

    $.ajax({
        type:"POST",
        url: "/sensor/saveParkingLotInfo",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType : "application/json; charset=utf-8",
    })
    .done(function(data) {
        if(data.result === "error") {
            alert("등록되지 않은 관리자 아이디거나 중복되는 IP가 있습니다.");
        } else {
            alert("저장이 완료되었습니다.");
            location.reload();
        }
    })
}

function getAddSensorList(type) {
    let sensorList = [];

    $("." + type).each(function() {
        sensorList.push({
            'ip' : $(this).find("#saveSensorIp").val(),
            'sensorType' : $(this).find("#saveSensorType option:selected").val()
        })
    })
    return sensorList;
}

function getTableSensorList() {
    let tableSensorList = [];

    $(".sensorList").each(function() {
        tableSensorList.push({
            'sensorIdx' : $(this).find("#sensorIdx").val(),
            'ip' : $(this).find("#sensorIp").val(),
            'sensorType' : $(this).find("#sensorType option:selected").val(),
            'parkingZoneArea' : $(this).find("#paringZoneArea").val(),
            'useYn' : $(this).find("#useYn").val(),
            'negativeReason' : $(this).find("#negativeReason").val()
        })
    })
    return tableSensorList;
}

function saveSensorList() {

    if(!confirm("저장하시겠습니까?")) {
        return false;
    }

    $.ajax({
        type:"POST",
        url: "/sensor/saveSensorList",
        data: JSON.stringify(getTableSensorList()),
        dataType: 'json',
        contentType : "application/json; charset=utf-8",
    })
    .done(function(data) {
        if(data.result === "success") {
            alert("저장이 완료되었씁니다..");
            location.reload();
        } else {
            alert("저장 실패 관리자에게 문의해주세요.");
        }
    })
}

function clickParkingLotCheckBox(el)  {
    if( $("#" + el).is(":checked") ) {
        switch (el) {
            case 'saveNormalCheckBox':
                $("#addNormalSensor").show();
                break;
            case 'saveElectronicCheckBox':
                $("#addElectronicSensor").show();
                break;
            case 'saveDisabledCheckBox':
                $("#addDisabledSensor").show();
                break;
        }
    } else {
        if(el === "saveNormalCheckBox") {
            $("#addNormalSensor").hide();
            $("#subNormalSensor").hide();
            $("#saveNormalSensorListTable tbody tr").remove();
        } else if(el === "saveElectronicCheckBox") {
            $("#addElectronicSensor").hide();
            $("#subElectronicSensor").hide();
            $("#saveElectronicSensorListTable tbody tr").remove();
        } else {
            $("#addDisabledSensor").hide();
            $("#subDisabledSensor").hide();
            $("#saveDisabledSensorListTable tbody tr").remove();
        }
    }
}

function parkingLotInfoValidation() {
    let result = true;

    if($("#saveSelectParkingLotName option:selected").val() === "notChoose") {
        alert("주차장을 선택해주세요.");
        result = false;
    }

    if($("#saveSelectParkingLotName option:selected").val() === "self" && $("#saveSelfParkingLotName").val() === "") {
        alert("주차장 이름을 입력해주세요.");
        result = false;
    }

    if(!normalCheck) {
        alert("일반차 면적 수를 확인해주세요.");
        result = false;
    } else if(!electronicCheck) {
        alert("전기차 면적 수를 확인해주세요.");
        result = false;
    } else if(!disabledCheck) {
        alert("장애인차 면적 수를 확인해주세요.");
        result = false;
    }

    return result;
}