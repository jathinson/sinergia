$(function() {
    value = $("#tq option:selected").val();
    console.log(value == 1)
    if(value == 0){
        $('#tqc2').hide();
        $('#tqc1').hide();

        $('#tqc0').show();

        value = $("#tqc0 option:selected").val();
   
        if(value == 0){
            $('#q2').hide();
            $('#q3').hide();
            $('#q2').val('');
            $('#q3').val('');
           $('#q1').show();
        }

         if(value == 1){
            $('#q1').hide();
            $('#q1').val('');
           $('#q2').show();
           $('#q3').show();
        }

    }
    else if(value == 1){
        $('#tqc2').hide();
        $('#tqc0').hide();
        
        $('#tqc1').show();
    }

    else if(value == 2){
        $('#tqc1').hide();
        $('#tqc0').hide();

        $('#tqc2').show();

    }

 });

$('#tqc0').change(function() {
    value = $("#tqc0 option:selected").val();
    if(value == 0){
        $('#q2').hide();
        $('#q3').hide();
        $('#q2').val('');
        $('#q3').val('');
        $('#q1').show();
    }

    if(value == 1){
        $('#q1').val('');
        $('#q1').hide();        

        $('#q2').show();
        $('#q3').show();
    }

});



$('#tq').change(function() {
    value = $("#tq option:selected").val();
    
    if(value == 0){
        $('#tqc2').hide();
        $('#tqc1').hide();

        $('#tqc0').show();

        value = $("#tqc0 option:selected").val();
        if(value == 0){
            $('#q2').hide();
            $('#q3').hide();
            $('#q2').val('');
            $('#q3').val('');
            $('#q1').show();
        }

        if(value == 1){
            $('#q1').val('');
            $('#q1').hide();        

            $('#q2').show();
            $('#q3').show();
        }
    }

    else if(value == 1){
        $('#tqc2').hide();
        $('#tqc0').hide();

        $('#tqc1').show();
        $('#q2').hide();
        $('#q3').hide();
        $('#q2').val('');
        $('#q3').val('');
        $('#q1').show();
    }

    else if(value == 2){
        $('#tqc1').hide();
        $('#tqc0').hide();

        $('#tqc2').show();
        $('#q2').hide();
        $('#q3').hide();
        $('#q2').val('');
        $('#q3').val('');
        $('#q1').show();
    }

});

 


