$(function() {
	if($("#id_mezcla").is(":checked")){
			$('#well2').prop('required',true);
			$('#well2').show();
			$('#porcentd').prop('required',true);
			$('#porcentd').show();
	} else {
		$('#well2').prop('required',false);
		$('#well2').hide();
		$('#porcentd').prop('required',false);
		$('#porcentd').hide();
	}
});

$('#id_mezcla').change(function() {
		if($("#id_mezcla").is(":checked")){
			$('#well2').prop('required',true);
			$('#well2').show();
			$('#porcentd').prop('required',true);
			$('#porcentd').show();
	} else {
		$('#well2').prop('required',false);
		$('#well2').hide();
		$('#porcentd').prop('required',false);
		$('#porcentd').hide();
	}
});




// With JQuery
$("#ex6").slider();
$("#ex6").on("slide", function(slideEvt) {
	$("#per1").text(slideEvt.value);
	$("#id_percent").val(slideEvt.value);
	$("#per2").text(100-slideEvt.value);
});

