<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Language;
use App\Models\Post;
use Yajra\DataTables\Facades\DataTables;  // <-- CHANGE THIS
use Auth;

class FeaturedController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }
    
    public function datatables(Request $request){
        $input = $request->all();
        $user = Auth::guard('admin')->user();
        
        // Start query for feature posts only
        $query = Post::where('is_feature', '=', 1)
                    ->where('is_pending', '=', 0)
                    ->where('status', '=', 'true')
                    ->orderBy('id', 'desc');
        
        // Apply category filter only if provided
        if(isset($input['category']) && !empty($input['category'])){
            $query->where('category_id', $input['category']);
        }
        
        // For non-admin users, filter by their posts only
        if($user->role->name != 'admin' && $user->role->name != 'moderator'){
            $query->where('admin_id', $user->id);
        }
        
        $datas = $query->get();
        
        return DataTables::of($datas)
            ->addColumn('action', function(Post $data) {
                $slider = $data->is_slider == 0 ? '<a href="'.route('post.sliderChange',$data->id).'"><i class="fa fa-plus"></i> Add Into Slider</a>' : '<a href="'.route('post.sliderChange',$data->id).'"><i class="fa fa-minus"></i> Remove From Slider</a>';
                $is_trending = $data->is_trending == 0 ? '<a href="'.route('post.trendingChange',$data->id).'"><i class="fa fa-plus"></i> Add Into Breaking</a>' : '<a href="'.route('post.trendingChange',$data->id).'"><i class="fa fa-minus"></i> Remove Breaking</a>';
                $is_approve = $data->is_pending == 0 ? '<a href="'.route('post.pendingChange',$data->id).'"><i class="fa fa-file"></i> Make Post Pending</a>' : '<a href="'.route('post.pendingChange',$data->id).'"><i class="fa fa-file"></i> Make Post Approve</a>';
                $is_slider_lefts = $data->is_feature == 0 ? '<a href="'.route('post.feature',$data->id).'"><i class="fa fa-plus"></i> Add into Feature</a>' : '<a href="'.route('post.feature',$data->id).'"><i class="fa fa-minus"></i> Remove Feature</a>';
                $is_slider_rights = $data->slider_right == 0 ? '<a href="'.route('post.sliderright',$data->id).'"><i class="fa fa-plus"></i> Add into sliderRight</a>' : '<a href="'.route('post.sliderright',$data->id).'"><i class="fa fa-minus"></i> Remove sliderRight</a>';
                
                $edit = '<a href="'.route('post.edit',$data->id).'"> <i class="fas fa-edit"></i> Edit</a>';
                $slug = $data->category ? $data->category->slug : 'no-category';
                $details = '<a href="'.route('frontend.postBySubcategory.details',[$slug, $data->slug]).'" target="_blank"> <i class="fa fa-info-circle" aria-hidden="true"></i> View on Frontend</a>';
                
                return '<div class="godropdown"><button class="go-dropdown-toggle"> Actions<i class="fas fa-chevron-down"></i></button><div class="action-list">'.$details.''.$edit.''.$slider.''.$is_trending.''.$is_slider_lefts.''.$is_slider_rights.''. $is_approve.'<a href="javascript:;" data-href="'.route('post.delete',$data->id).'" data-toggle="modal" data-target="#confirm-delete" class="delete"><i class="fas fa-trash-alt"></i> Delete</a></div></div>';
            })
            ->addColumn('checkbox', function(Post $data) {
                return '<input type="checkbox" class="form-check-input m-0 p-0 postCheck" value="'.$data->id.'">';
            })
            ->editColumn('category_id', function(Post $data) {
                if($data->category_id && $data->category){
                    return '<span class="badge badge-primary">'.e($data->category->title).'</span>';
                }
                return '<span class="badge badge-secondary">No Category</span>';
            })
            ->editColumn('language_id', function(Post $data) {
                if($data->language_id && $data->language){
                    return '<span class="badge badge-info">'.e($data->language->language).'</span>';
                }
                return '<span class="badge badge-secondary">No Language</span>';
            })
            ->editColumn('post_type', function(Post $data) {
                return '<span class="badge badge-secondary">'.e($data->post_type).'</span>';
            })
            ->editColumn('image_big', function(Post $data) {
                if($data->image_big){
                    $image_big = url('assets/images/post/'.$data->image_big);
                } else {
                    $image_big = url('assets/images/nopic.png');
                }
                return '<img src="'.$image_big.'" alt="Image" width="50" height="50" style="object-fit: cover;">';
            })
            ->editColumn('admin_id', function(Post $data) {
                if($data->admin_id != 0 && $data->admin){
                    return e($data->admin->name);
                } elseif($data->user_id != 0 && $data->user){
                    return e($data->user->name);
                }
                return 'User Deleted';
            })
            ->editColumn('title', function(Post $data) {
                return '<a href="'.route('post.edit',$data->id).'">'.e($data->title).'</a>';
            })
            ->rawColumns(['checkbox', 'image_big', 'category_id', 'language_id', 'post_type', 'admin_id', 'title', 'action'])
            ->make(true);
    }
    
    public function index(){
        $categories = Category::where('parent_id', NULL)->get();
        return view('admin.feature.index', compact('categories'));
    }
}