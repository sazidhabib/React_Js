@extends('layouts.admin')

@section('content')
<input type="hidden" id="headerdata" value="{{ __('CATEGORY') }}">
<input type="hidden" id="attribute_data" value="{{ __('ADD NEW ATTRIBUTE') }}">
<div class="content-area">
    <div class="mr-breadcrumb">
        <div class="row">
            <div class="col-lg-12">
                <h4 class="heading">{{ __('All Posts') }}</h4>
                <ul class="links">
                    <li>
                        <a href="{{ route('admin.dashboard') }}">{{ __('Dashboard') }} </a>
                    </li>
                    <li>
                        <a href="{{ route('slider.index') }}">{{ __('Posts') }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="product-area">
        <div class="row m-2 p-2 selectPost" style="display:none;">
            <div class="col-lg-12">
                <button class="btn btn-sm btn-danger delete m-1" data-toggle="modal" data-target="#confirm-delete-option" style="display: inline-block;">{{__('Delete')}}</button>
                <button id="add-to-slider" class="btn btn-sm btn-secondary m-1" style="display: inline-block;"><i class="fa fa-plus option-icon"></i> {{__('Add to Slider')}}</button>
                <button id="add-to-breaking" class="btn btn-sm btn-secondary m-1" style="display: inline-block;"><i class="fa fa-plus option-icon"></i> {{__('Add to Breaking')}}</button>
                <button id="add-to-feature" class="btn btn-sm btn-secondary m-1" style="display: inline-block;"><i class="fa fa-plus option-icon"></i> {{__('Add to Feature')}}</button>
                <button id="add-to-slider-right" class="btn btn-sm btn-secondary m-1" style="display: inline-block;"><i class="fa fa-plus option-icon"></i> {{__('Add to Slider Right')}}</button>
                <button id="remove-to-slider" class="btn btn-sm btn-secondary m-1" style="display: inline-block;"><i class="fa fa-minus option-icon"></i> {{__('Remove to Slider')}}</button>
                <button id="remove-to-breaking" class="btn btn-sm btn-secondary m-1" style="display: inline-block;"><i class="fa fa-minus option-icon"></i> {{__('Remove to Breaking')}}</button>
                <button id="remove-to-feature" class="btn btn-sm btn-secondary m-1" style="display: inline-block;"><i class="fa fa-minus option-icon"></i> {{__('Remove to Feature')}}</button>
                <button id="remove-to-slider-right" class="btn btn-sm btn-secondary m-1" style="display: inline-block;"><i class="fa fa-minus option-icon"></i> {{__('Remove to Slider Right')}}</button>
            </div>
        </div>
        
        {{-- CATEGORY FILTER WITH CLEAR BUTTON --}}
        <div class="row">
            <div class="col-lg-12 text-right pr-4 pt-2 pb-0">
                <div class="d-inline-block">
                    <label for="category_id" class="mr-2"><b>{{__('Filter by Category:')}}</b></label>
                    <select id="category_id" class="form-control d-inline-block" style="width: auto; display: inline-block;">
                        <option value="">{{ __('All Categories') }}</option>
                        @foreach ($categories as $category)
                            <option data-href="{{ route('post.datatables') }}?category={{ $category->id }}" value="{{ $category->id }}">{{ $category->title }}</option>
                        @endforeach
                    </select>
                </div>
                
                {{-- Clear Filter Button --}}
                <button id="clearFilter" class="btn btn-sm btn-warning ml-2" style="display: none;">
                    <i class="fa fa-times"></i> {{__('Clear Filter')}}
                </button>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="mr-table allproduct pt-0">
                    @include('includes.admin.form-success')
                    @include('includes.admin.flash-message')
                    <div class="table-responsiv">
                        <table id="geniustable" class="table table-hover dt-responsive" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th width="5%">
                                        <input type="checkbox" class="form-check-input m-0 p-0" id="headercheck">
                                    </th>
                                    <th>{{ __('Image') }}</th>
                                    <th>{{ __('Title') }}</th>
                                    <th>{{ __('Category') }}</th>
                                    {{-- <th>{{ __('Language') }}</th> --}}
                                    <th>{{ __('Post Type') }}</th>
                                    <th>{{ __('Author') }}</th>
                                    <th>{{ __('Post Status') }}</th>
                                    <th>{{ __('Created At') }}</th>
                                    <th>{{ __('Actions') }}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- MODALS --}}
<div class="modal fade-scale" id="modal1" tabindex="-1" role="dialog" aria-labelledby="modal1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="submit-loader">
                <img src="" alt="">
            </div>
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('Close') }}</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade-scale" id="confirm-delete-option" tabindex="-1" role="dialog" aria-labelledby="modal1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header d-block text-center">
                <h4 class="modal-title d-inline-block">{{ __('Confirm Delete') }}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="text-center">{{ __('You are trying to delete post.') }}</p>
                <p class="text-center">{{ __('Do you want to proceed?') }}</p>
            </div>
            <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-default" data-dismiss="modal">{{ __('Cancel') }}</button>
                <a class="btn btn-danger bulk-delete">{{ __('Delete') }}</a>
            </div>
        </div>
    </div>
</div>

<div class="modal fade-scale" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="modal1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header d-block text-center">
                <h4 class="modal-title d-inline-block">{{ __('Confirm Delete') }}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="text-center">{{ __('You are trying to delete post.') }}</p>
                <p class="text-center">{{ __('Do you want to proceed?') }}</p>
            </div>
            <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-default" data-dismiss="modal">{{ __('Cancel') }}</button>
                <a class="btn btn-danger btn-ok">{{ __('Delete') }}</a>
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script type="text/javascript">
"use strict";

var table;

$(document).ready(function() {
    table = $('#geniustable').DataTable({
        ordering: false,
        processing: true,
        serverSide: true,
        ajax: {
            url: '{{ route("post.datatables") }}',
            type: 'GET',
            data: function(d) {
                // You can add any default parameters here if needed
                return d;
            },
            error: function(xhr, error, code) {
                console.log('Ajax Error:', error);
                console.log('Response Text:', xhr.responseText);
            }
        },
        columns: [
            {data: 'checkbox', name: 'checkbox', orderable: false},
            {data: 'image_big', name: 'image_big'},
            {data: 'title', name: 'title'},
            {data: 'category_id', name: 'category_id'},
            // {data: 'language_id', name: 'language_id'},
            {data: 'post_type', name: 'post_type'},
            {data: 'admin_id', name: 'admin_id'},
            {data: 'is_approve', name: 'is_approve'},
            {data: 'created_at', name: 'created_at'},
            {data: 'action', searchable: false, orderable: false}
        ],
        language: {
            processing: '<img src="{{ asset('assets/images/'.$gs->admin_loader) }}">'
        },
        drawCallback: function(settings) {
            $('.select').niceSelect();
        }
    });
    
    // Show/Hide Clear Filter button based on category selection
    function toggleClearButton() {
        var selectedValue = $('#category_id').val();
        if (selectedValue && selectedValue !== '') {
            $('#clearFilter').show();
        } else {
            $('#clearFilter').hide();
        }
    }
    
    // Check initial state
    toggleClearButton();
    
    // Handle category change
    $(document).on("change", "#category_id", function() {
        var selectedOption = $(this).find(':selected');
        var url = selectedOption.data('href');
        
        if (url && selectedOption.val() !== '') {
            // Load with category filter
            table.ajax.url(url).load();
        } else {
            // Load without any filter - use the base URL
            table.ajax.url('{{ route("post.datatables") }}').load();
        }
        toggleClearButton();
    });
    
    // Handle clear filter button click
    $('#clearFilter').on('click', function(e) {
        e.preventDefault();
        // Reset the select dropdown to "All Categories"
        $('#category_id').val('');
        // Reload table without any category filter
        table.ajax.url('{{ route("post.datatables") }}').load();
        // Hide the clear button
        $('#clearFilter').hide();
    });
});

</script>
<script src="{{ asset('assets/admin/js/post.js') }}"></script>
<script src="{{ asset('assets/admin/js/bulk.js') }}"></script>
@endsection