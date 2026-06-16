(function($) {
    "use strict";

    $(document).ready(function(){
        filterLanguage();

        $("#headercheck").click(function(){
            if(this.checked){
                $('.postCheck').each(function(){
                    $(".postCheck").prop('checked', true);
                    var checked = $(".postCheck:checked").length;
                    if(checked > 0){
                        $('.selectPost').css('display','block');
                    }
                })
            }else{
                $('.postCheck').each(function(){
                    $(".postCheck").prop('checked', false);
                    $('.selectPost').css('display','none');
                })
            }
        });
    })

    $(document).on("change","#filter_lang",function(){
        table.ajax.url( $("#filter_lang option:selected").data('href') ).load();
        var x = $(this).val();
        var url = mainurl+'admin/audio/category-filter/language/'+x;
        $.ajax({
            type        : 'GET',
            url         : url,
            contentType : false,
            processData : false,
            data        : {},
            success     : function(data){
                $("#category_id").html(data);
            }
        });
    })

    function filterLanguage(){
        table.ajax.url( $("#filter_lang option:selected").data('href') ).load();
        var x = $("#filter_lang").val();
        var url = mainurl+'admin/audio/category-filter/language/'+x;
        $.ajax({
            type        : 'GET',
            url         : url,
            contentType : false,
            processData : false,
            data        : {},
            success     : function(data){
                $("#category_id").html(data);
            }
        });
    }

    $(document).on("change","#category_id",function(){
        var url = $(this).find(':selected').data('href');
        if(url){
            table.ajax.url(url).load();
        }
    });

    $(document).on('click','.postCheck',function(){
        var checked = $(".postCheck:checked").length;
        if(checked > 0){
            $('.selectPost').css('display','block');
        }else{
            $('.selectPost').css('display','none');
        }
    });

})(jQuery);