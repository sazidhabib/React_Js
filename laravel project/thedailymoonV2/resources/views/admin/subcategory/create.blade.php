@extends('layouts.load')

@section('content')

<div class="add-product-content p-0 shadow-none">
    <div class="row">
        <div class="col-lg-12">
            <div class="product-description">
                <div class="body-area shadow-none">
                    @include('includes.admin.form-error')
                    <div class="gocover" style="background: url({{asset('assets/images/'.$gs->admin_loader)}}) no-repeat scroll center center rgba(45, 45, 45, 0.5);"></div>
                    <form id="geniusformdata" action="{{ route('subcategories.store')}}" method="POST" enctype="multipart/form-data">
                        {{csrf_field()}}

                        {{-- LANGUAGE FIELD - HIDDEN INPUT --}}
                        @php
                            $default_language = $languages->where('is_default', 1)->first();
                        @endphp
                        <input type="hidden" name="language_id" value="{{ $default_language->id }}">

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="left-area">
                                    <h4 class="heading">{{ __('Parent Category') }} *</h4>
                                    <p class="sub-heading">{{ __('In English') }}</p>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <select name="parent_id" id="article_parent_id">
                                    <option value="">{{__('Please select a category')}}</option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="left-area">
                                    <h4 class="heading">{{ __('Title') }} *</h4>
                                    <p class="sub-heading">{{ __('(In Any Language)') }}</p>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <input type="text" class="input-field" name="title"
                                    placeholder="{{ __('Title') }}">
                            </div>
                        </div>

                        <input type="hidden" class="input-field" name="slug" placeholder="{{ __('Slug') }}">

                        <div class="row">
                            <div class="col-lg-4">
                                <div class="left-area">
                                    <h4 class="heading">{{ __('Show At Menu') }} *</h4>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <div class="custom-control custom-radio d-inline-block mr-4">
                                    <input type="radio" class="custom-control-input" id="yes" name="show_on_menu" value="1">
                                    <label class="custom-control-label" for="yes">{{__('Yes')}}</label>
                                </div>
                                <div class="custom-control custom-radio d-inline-block">
                                    <input type="radio" class="custom-control-input" id="no" name="show_on_menu" value="0" checked> 
                                    <label class="custom-control-label" for="no">{{__('No')}}</label>
                                </div>
                            </div>
                        </div>
                        
                        <br>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="left-area">

                                </div>
                            </div>
                            <div class="col-lg-7">
                                <button class="addProductSubmit-btn"
                                    type="submit">{{ __('Create Sub Category') }}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script>
(function($) {
    "use strict";

    // Load categories on page load with default language
    $(document).ready(function() {
        // Get the default language ID from the hidden input
        var defaultLangId = $('input[name="language_id"]').val();
        if (defaultLangId) {
            var url = mainurl + 'admin/add-article/language/' + defaultLangId;
            $.ajax({
                type: 'GET',
                url: url,
                contentType: false,
                processData: false,
                data: {},
                success: function(data) {
                    $("#article_parent_id").html(data);
                }
            });
        }
    });

    //get the category which belongs to a specific language
    $(document).on('change', "#article_language_id", function() {
        $('.categoryDiv').css('display', 'block');
        var x = $(this).val();
        var url = mainurl + 'admin/add-article/language/' + x;
        $.ajax({
            type: 'GET',
            url: url,
            contentType: false,
            processData: false,
            data: {},
            success: function(data) {
                $("#article_parent_id").html(data);
            }
        });
    })

    //get the subcategory which belongs to a specific category
    $(document).on('change', "#article_parent_id", function() {
        var x = $(this).val();
        var url = mainurl + 'admin/add-article/subcategory/' + x;
        $.ajax({
            type: 'GET',
            url: url,
            contentType: false,
            processData: false,
            data: {},
            success: function(data) {
                $("#subcategory_id").html(data);
            }
        })
    })

    //Datepicker initiate 
    var dateToday = new Date();
    var dates = $("#from").datetimepicker({
        format: 'Y-m-d H:i:s',
        minDate: dateToday,
    });

    $(document).on('click', '.remove-img', function() {
        var id = $(this).find('input[type=hidden]').val();
        $('#galval' + id).remove();
        $(this).parent().parent().remove();
    });

    $(document).on('click', '#article_gallery', function() {
        $('#articleuploadgallery').click();
    });

    $("#articleuploadgallery").change(function(event) {
        var total_file = document.getElementById("articleuploadgallery").files.length;
        for (var i = 0; i < total_file; i++) {
            $('.selected-image .row').append('<div class="col-sm-6">' +
                '<div class="img gallery-img">' +
                '<span class="remove-img"><i class="fas fa-times"></i>' +
                '<input type="hidden" value="' + i + '">' +
                '</span>' +
                '<a href="' + URL.createObjectURL(event.target.files[i]) + '" target="_blank">' +
                '<img src="' + URL.createObjectURL(event.target.files[i]) + '" alt="gallery image">' +
                '</a>' +
                '</div>' +
                '</div> '
            );
            $('#geniusformdata2').append('<input type="hidden" name="gallery[]" id="galval' + i +
                '" class="removegal" value="' + i + '">')
        }
    });

    $(document).on('submit', '#geniusformdata2', function(e) {
        e.preventDefault();

        var form = $(this);
        var url = form.attr('action');
        var method = form.attr('method');

        $('.gocover').show();

        $.ajax({
            url: url,
            type: method,
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                $('.gocover').hide();
                if (data.errors) {
                    $.each(data.errors, function(key, value) {
                        toastr.error(value);
                    });
                } else {
                    toastr.success(data);
                    setTimeout(function() {
                        window.location.href = "{{ route('post.index') }}";
                    }, 2000);
                }
            },
            error: function(xhr) {
                $('.gocover').hide();
                var errors = xhr.responseJSON;
                if (errors && errors.errors) {
                    $.each(errors.errors, function(key, value) {
                        toastr.error(value);
                    });
                } else {
                    toastr.error('An error occurred. Please check the console.');
                    console.log(xhr.responseText);
                }
            }
        });
    });

})(jQuery);
</script>
@endsection