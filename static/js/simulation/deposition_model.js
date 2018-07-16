$(function() {
	if($("#id_matching").is(":checked")){
			$('#div_test_well').show();
	} else {
		$('#div_test_well').hide();
	}
});

$('#id_matching').change(function() {
	if($("#id_matching").is(":checked")){
		$('#div_test_well').show();
	} else {
		$('#div_test_well').hide();
	}
});


//Muestra pop de carga cuando se envía formulario
$('#button_cargar').click(function() {
		type = $(this).attr('data-type');

		$('#notification').fadeIn(function() {

			window.setTimeout(function(){
				$('.window-container.'+type).addClass('window-container-visible');
			}, 100);

		});
});
