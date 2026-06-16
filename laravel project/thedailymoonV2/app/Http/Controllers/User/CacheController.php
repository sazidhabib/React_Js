<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CacheController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function clear() {
        Artisan::call('cache:clear');
        Artisan::call('config:clear');
        Artisan::call('route:clear');
        Artisan::call('view:clear');
        Toastr::success('Cache, route, view, config cleared successfully!');
        return back();
      }
}
