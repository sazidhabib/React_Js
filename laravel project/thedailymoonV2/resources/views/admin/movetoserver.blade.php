@extends('layouts.admin')

@section('content')
<div class="content-area">
    <div class="mr-breadcrumb">
        <div class="row">
            <div class="col-lg-12">
                <h4 class="heading">{{ __('Move to Server / Backup') }}</h4>
                <ul class="links">
                    <li>
                        <a href="{{ route('admin.dashboard') }}">{{ __('Dashboard') }} </a>
                    </li>
                    <li>
                        <a href="javascript:void(0);">{{ __('Backup / Move to Server') }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="product-area">
        <div class="row">
            <div class="col-lg-12">
                <div class="mr-table allproduct">
                    @include('includes.admin.form-success')
                    
                    <div class="table-responsiv">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="card-header">
                                        <h4>{{ __('Database Backup & Move to Server') }}</h4>
                                    </div>
                                    <div class="card-body">
                                        @if($chk != "")
                                            <div class="alert alert-info">
                                                <strong>{{ __('Backup File Found!') }}</strong><br>
                                                {{ __('A backup file has already been generated.') }}
                                            </div>
                                            
                                            @if($bkuplink)
                                                <div class="form-group">
                                                    <label>{{ __('Download Backup') }}</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" value="{{ $bkuplink }}" id="backupLink" readonly>
                                                        <div class="input-group-append">
                                                            <button class="btn btn-primary" onclick="copyToClipboard()">
                                                                <i class="fas fa-copy"></i> {{ __('Copy Link') }}
                                                            </button>
                                                            <a href="{{ $bkuplink }}" class="btn btn-success" download>
                                                                <i class="fas fa-download"></i> {{ __('Download') }}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            @endif
                                            
                                            <hr>
                                            
                                            <div class="text-center">
                                                <a href="{{ route('admin-clear-backup') }}" class="btn btn-danger" onclick="return confirm('Are you sure? This will delete the backup file.')">
                                                    <i class="fas fa-trash-alt"></i> {{ __('Clear Backup') }}
                                                </a>
                                            </div>
                                        @else
                                            <div class="alert alert-warning">
                                                <strong>{{ __('No Backup Found!') }}</strong><br>
                                                {{ __('Click the button below to generate a new backup.') }}
                                            </div>
                                            
                                            <div class="text-center">
                                                <button type="button" class="btn btn-primary" onclick="generateBackup()">
                                                    <i class="fas fa-database"></i> {{ __('Generate Backup & Move to Server') }}
                                                </button>
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function copyToClipboard() {
    var copyText = document.getElementById("backupLink");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Link copied to clipboard: " + copyText.value);
}

function generateBackup() {
    if(confirm('This will generate a backup and move to server. Continue?')) {
        window.location.href = "{{ route('admin-move-script') }}";
    }
}
</script>

<style>
.card {
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.card-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #ddd;
    padding: 15px;
}
.card-body {
    padding: 20px;
}
.form-group {
    margin-bottom: 15px;
}
.input-group {
    display: flex;
    gap: 10px;
}
</style>
@endsection