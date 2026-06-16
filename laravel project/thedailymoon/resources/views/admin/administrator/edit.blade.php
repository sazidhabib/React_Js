@extends('layouts.load')
@section('content')

<div class="add-product-content p-0 shadow-none">
    @include('includes.admin.form-both')
    <div class="row">
        <div class="col-lg-12">
            <div class="product-description">
                <div class="body-area shadow-none">
                    <div class="gocover" style="background: url({{asset('assets/images/'.$gs->admin_loader)}}) no-repeat scroll center center rgba(45, 45, 45, 0.5); display: none;"></div>
                    <form id="geniusformdata" action="{{ route('admin.administator.update', $data->id) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <!-- REMOVED: {{ method_field('PUT') }} -->

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="left-area">
                                    <h4 class="heading">{{ __('Admin Profile Image') }}</h4>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="img-upload">
                                    <div id="image-preview" class="img-preview" style="background: url({{ $data->photo ? asset('assets/images/admin/'.$data->photo) : asset('assets/images/noimage.png') }});">
                                        <label for="image-upload" class="img-label" id="image-label"><i class="icofont-upload-alt"></i>{{ __('Upload Image') }}</label>
                                        <input type="file" name="photo" class="img-upload" id="image-upload">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="left-area">
                                    <h4 class="heading">{{ __('Name') }} *</h4>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <input type="text" class="input-field" name="name" placeholder="{{ __('Admin Name') }}" required value="{{ $data->name }}">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="left-area">
                                    <h4 class="heading">{{ __("Email") }} *</h4>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <input type="email" class="input-field" name="email" placeholder="{{ __('Email Address') }}" required value="{{ $data->email }}">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="left-area">
                                    <h4 class="heading">{{ __("Phone") }} *</h4>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <input type="text" class="input-field" name="phone" placeholder="{{ __('Phone Number') }}" required value="{{ $data->phone }}">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="left-area">
                                    <h4 class="heading">{{ __('Designation') }} *</h4>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <input type="text" class="input-field" name="designation" placeholder="{{ __('Type Designation') }}" required value="{{ $data->designation }}">
                            </div>
                        </div>

                        <!-- Role Display (Read Only) -->
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="left-area">
                                    <h4 class="heading">{{ __("Role") }} * (Read Only)</h4>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <input type="text" class="input-field" value="{{ $data->role->name ?? 'No Role' }}" disabled readonly>
                                <input type="hidden" name="role_id" value="{{ $data->role_id }}">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <button class="addProductSubmit-btn" type="submit">{{ __("Update Admin") }}</button>
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
$(document).ready(function() {
    $('#geniusformdata').on('submit', function(e) {
        e.preventDefault();
        
        // Show loading
        $('.gocover').show();
        
        // Create FormData object for file upload
        var formData = new FormData(this);
        
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                $('.gocover').hide();
                $('.form-both').html('<div class="alert alert-success">' + response + '</div>');
                
                setTimeout(function() {
                    $('#modal1').modal('hide');
                    location.reload();
                }, 2000);
            },
            error: function(xhr) {
                $('.gocover').hide();
                
                if (xhr.status === 422 && xhr.responseJSON && xhr.responseJSON.errors) {
                    var errors = xhr.responseJSON.errors;
                    var errorHtml = '<div class="alert alert-danger"><ul>';
                    $.each(errors, function(key, value) {
                        errorHtml += '<li>' + value + '</li>';
                    });
                    errorHtml += '</ul></div>';
                    $('.form-both').html(errorHtml);
                } else {
                    $('.form-both').html('<div class="alert alert-danger">An error occurred. Please try again.</div>');
                }
                
                console.log('Error:', xhr.responseText);
            }
        });
    });
    
    // Image preview
    $("#image-upload").change(function() {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#image-preview').css('background', 'url(' + e.target.result + ') no-repeat center center');
                $('#image-preview').css('background-size', 'cover');
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
});
</script>
@endsection