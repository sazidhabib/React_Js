(function($) {
    "use strict";

    $(document).ready(function(){
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

    // Category filter only - no language filter
    $(document).on("change","#category_id",function(){
        var url = $(this).find(':selected').data('href');
        if(url){
            table.ajax.url(url).load();
        } else {
            // If "All Categories" selected, load without category filter
            table.ajax.url('{{ route("post.datatables") }}').load();
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