function getMapInfo(x, y) {
	
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(x, y), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

	var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
	
	// 마커가 표시될 위치입니다
	var markerPosition  = new kakao.maps.LatLng(x, y);
	
	// 마커를 생성합니다
	var marker = new kakao.maps.Marker({
	    position: markerPosition
	});
	
	marker.setMap(map);
	
	let content = $("#parkingLotNm").text();
	
	var iwContent = '<div style="padding:5px;">'+content+' <br>'
					+'<a href="https://map.kakao.com/link/to/'+content+','+x+','+y+'" style="color:blue" target="_blank">길찾기</a></div>',
    iwPosition = new kakao.maps.LatLng(x, y), //인포윈도우 표시 위치입니다
    iwRemoveable = false; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

	// 인포윈도우를 생성하고 지도에 표시합니다
	var infowindow = new kakao.maps.InfoWindow({
	    map: map, // 인포윈도우가 표시될 지도
	    position : iwPosition, 
	    content : iwContent,
	    removable : iwRemoveable
	});
	
	infowindow.open(map, marker);
}