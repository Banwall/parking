$(function() {
	
	$("#parkingLotInfo").hide();
	
	$("li").on('click', function() {
		$("#parkingLotInfo").show();
		
		const plId = $(this).find("input").val();
		
		$.ajax({
			url: "/parking/getParkingLot?plId=" + plId,
			contentType: 'application/json',
			type:"GET",
		})
		.done(function(fragment) {
			
			const parkingSpotD = fragment.parkingSpotD < 10 ? '0'+fragment.parkingSpotD : fragment.parkingSpotD; 
			const parkingSpotE = fragment.parkingSpotE < 10 ? '0'+fragment.parkingSpotE : fragment.parkingSpotE; 
			const parkingSpotUseD = fragment.parkingSpotUseD < 10 ? '0'+fragment.parkingSpotUseD : fragment.parkingSpotUseD; 
			const parkingSpotUseE = fragment.parkingSpotUseE < 10 ? '0'+fragment.parkingSpotUseE : fragment.parkingSpotUseE; 
			
			$("#parkingLotNm").text(fragment.parkingLotNm);
			$("#parkingSpotAll").text(fragment.parkingSpotAll + " 대");
			$("#parkingSpotD").text(parkingSpotD + " 대");
			$("#parkingSpotE").text(parkingSpotE + " 대");
			$("#parkingSpotUseD").text(parkingSpotUseD + " 대");
			$("#parkingSpotUseE").text(parkingSpotUseE + " 대");
			
			getMapInfo(fragment.parkingLotX, fragment.parkingLotY);
		});
	});
	
	$("#hideDiv").show();
})