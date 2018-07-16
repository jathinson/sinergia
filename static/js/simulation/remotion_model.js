$(document).ready(
  function() {
    $('select[name=Treatment]').change(
      function() {
      	if (newText == 1 ) {
         $('#tipeLabel').text('[7,5% - 15%]');
        } else if (newText == 2){
             $('#tipeLabel').text('[>0.1 M]');
        } else if (newText == 3){
             $('#tipeLabel').text('[14,5% - 18%]');
        } else if (newText == 4){
             $('#tipeLabel').text('[0.1 M - 0.5 M]');
        } else if (newText == 5){
             $('#tipeLabel').text('[0.1 M - 0.5 M]');
        };
        

      }
    );
  }
);

$('#treatment').change(
  function() {
    var newText = $('option:selected', this).val();
    
    if (newText == 1 ) {
         $('#tipeLabel').text('[7,5% - 15%]');
    } else if (newText == 2){
         $('#tipeLabel').text('[>0.1 M]');
    } else if (newText == 3){
         $('#tipeLabel').text('[14,5% - 18%]');
    } else if (newText == 4){
         $('#tipeLabel').text('[0.1 M - 0.5 M]');
    } else if (newText == 5){
         $('#tipeLabel').text('[0.1 M - 0.5 M]');
    };        

  }
);


//Muestra pop de carga cuando se envía formulario
$('#animacion').click(function() {
    console.log('Funciona');
    $('#imagen').show();  
});

$('#id_prefluid_vol').change(function() {
   value = Math.sqrt((($('#id_prefluid_vol').val()*5.615)/(h*q*Math.PI))+(rw*rw));
   $('#id_prefluid_rad').val(value)
});

$('#id_posfluid_vol').change(function() {
   value = Math.sqrt((($('#id_posfluid_vol').val()*5.615)/(h*q*Math.PI))+(rw*rw));
   $('#id_posfluid_rad').val(value)
});

$('#id_treatment_vol').change(function() {
   value = Math.sqrt((($('#id_treatment_vol').val()*5.615)/(h*q*Math.PI))+(rw*rw));
   $('#id_treatment_radius').val(value)
});

$('#id_prefluid_rad').change(function() {
   value = Math.PI*(Math.pow($('#id_prefluid_rad').val(),2)+Math.pow(rw,2))*h*q*(1/5.615);
   $('#id_prefluid_vol').val(value)
});

$('#id_posfluid_rad').change(function() {
   value = Math.PI*(Math.pow($('#id_posfluid_rad').val(),2)+Math.pow(rw,2))*h*q*(1/5.615);
   $('#id_posfluid_vol').val(value)
});

$('#id_treatment_radius').change(function() {
   value = Math.PI*(Math.pow($('#id_treatment_radius').val(),2)+Math.pow(rw,2))*h*q*(1/5.615);
   $('#id_treatment_vol').val(value)
});


$('#prefluid-check').change(function() {
  if($("#prefluid-check").is(":checked")){
    $('#prefluid-div').show();
  } else {
    $('#prefluid-div').hide();
  }
});

$('#postfluid-check').change(function() {
  if($("#postfluid-check").is(":checked")){
    $('#posfluid-div').show();
  } else {
    $('#posfluid-div').hide();
  }
});