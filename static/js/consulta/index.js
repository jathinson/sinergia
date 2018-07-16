$('#tq').change(function() {
    value = $("#tq option:selected").val();
      if(value == 0){
        $('#tqc2').hide();
        $('#tqc1').hide();

        $('#tqc0').show();
    }

    if(value == 1){
        $('#tqc2').hide();
        $('#tqc0').hide();

        $('#tqc1').show();
    }

    if(value == 2){
        $('#tqc1').hide();
        $('#tqc0').hide();

        $('#tqc2').show();

    }

});

 $(function() {
    value = $("#tq option:selected").val();
   
    if(value == 0){
        $('#tqc2').hide();
        $('#tqc1').hide();

        $('#tqc0').show();
    }

    if(value == 1){
        $('#tqc2').hide();
        $('#tqc0').hide();

        $('#tqc1').show();
    }

    if(value == 2){
        $('#tqc1').hide();
        $('#tqc0').hide();

        $('#tqc2').show();

    }

 });