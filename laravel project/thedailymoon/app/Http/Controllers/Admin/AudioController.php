<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Language;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;
use Brian2694\Toastr\Facades\Toastr;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Str;
use Yajra\DataTables\Facades\DataTables;

class AudioController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    public function index(){
        $categories = Category::where('parent_id', NULL)->get();
        return view('admin.audio.index', compact('categories'));
    }

    public function datatables(Request $request){
        $input = $request->all();
        $user = Auth::guard('admin')->user();
        
        // Start query for audio posts only
        $query = Post::where('post_type', 'audio')
                     ->where('status', 'true')
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
                return '<span class="badge badge-secondary">audio</span>';
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

    public function create(){
        $datas = Category::where('parent_id','=',NULL)->get();
        $languages = Language::orderBy('id','desc')->get();
        return view('admin.audio.create',compact('datas','languages'));
    }

    //fetch categories under the language (keep for create/edit forms)
    public function language($id){
        $datas    = Language::find($id)->categories()->where('parent_id','=',NULL)->get();
        $output = '<option value="">Please Select a Category *</option>';
        foreach($datas as $data){
            $output .= '<option value="'.$data->id.'">'.e($data->title).'</option>';
        }
        return $output;
    }

    //fetch subcategories under category
    public function subcategory($id){
        $datas = Category::find($id)->child;
        $output = '<option value="">Please Select a SubCategory (if any)</option>';
        foreach($datas as $data){
            $output .= '<option value="'.$data->id.'">'.e($data->title).'</option>';
        }
        return $output;
    }

    public function subcategoryUpdate($id,$y){
        $datas = Category::find($id)->child;
        $post = Post::find($y);
        $output = '<option value="">Please Select a SubCategory (if any)</option>';
        foreach($datas as $data){
            if($data->id == $post->subcategories_id){
                $msg = 'selected';
            }else{
                $msg = '';
            }
            $output .= '<option value="'.$data->id.'" '.$msg.'>'.e($data->title).'</option>';
        }
        return $output;
    }

    //slug create
    public function slugCreate(Request $request){
        $val = $request->title;
        $output = slug_create($val);
        return $output;
    }

    public function store(Request $request){
        $rules = [
            'title' => 'required',
            'slug' => 'required|unique:posts',
            'image_big' => 'image|mimes:jpeg,png,jpg,gif,svg',
            'audio' => 'required|mimes:application/octet-stream,audio/mpeg,mpga,mp3,wav',
            'description' => 'required',
            'category_id' => 'required',
        ];

        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            return response()->json(array('errors' => $validator->getMessageBag()->toArray()));
        }

        $data  = new Post();
        $input = $request->all();

        if($file = $request->file('image_big')){
            $img = Image::make($file->getRealPath())->resize(780,438);
            $thumbnail = time().Str::random(8).'.jpg';
            if (!file_exists(public_path('assets/images/post'))) {
                mkdir(public_path('assets/images/post'), 0755, true);
            }
            $img->save(public_path('assets/images/post/'.$thumbnail));
            $input['image_big'] = $thumbnail;
        }

        if($audio = $request->file('audio')){
            $audioName = time().$audio->getClientOriginalName();
            if (!file_exists(public_path('assets/audios'))) {
                mkdir(public_path('assets/audios'), 0755, true);
            }
            $audio->move(public_path('assets/audios'), $audioName);
            $input['audio'] = $audioName;
        }

        $input['admin_id']   = auth()->guard('admin')->id();
        $input['is_pending'] = 0;

        if($request->draft == 1){
            $input['status'] = 'draft';
        }else{
            $input['status'] = 'true';
        }

        if($date = $request->schedule_post_date){
            $input['schedule_post_date'] = $date;
        }
        
        $input['post_type'] = 'audio';
        $data->fill($input)->save();
        
        Toastr::success('Audio Added Successfully');
        $msg = 'Audio Added Successfully';
        return response()->json($msg);
    }

    public function languageOnUpdate( $x, $y){
        $datas = Language::find($x)->categories()->where('parent_id','=',NULL)->get();
        $post = Post::find($y);
        $output = '<option value="">Please Select a Category *</option>';
        foreach($datas as $data){
            if($data->id == $post->category_id){
                $msg = 'selected';
            }else{
                $msg = '';
            }
            $output .= '<option value="'.$data->id.'" '.$msg.'>'.e($data->title).'</option>';
        }
        return $output;
    }

    public function update(Request $request,$id){
        $rules = [
            'title' => 'required',
            'slug' => 'required|unique:posts,slug,'.$id,
            'image_big' => 'image|mimes:jpeg,png,jpg,gif,svg',
            'audio' => 'nullable|mimes:application/octet-stream,audio/mpeg,mpga,mp3,wav',
            'description' => 'required',
            'category_id' => 'required',
        ];

        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            return response()->json(array('errors' => $validator->getMessageBag()->toArray()));
        }

        $data  = Post::findOrFail($id);
        $input = $request->all();

        if($file = $request->file('image_big')){
            $img = Image::make($file->getRealPath())->resize(780,438);
            $thumbnail = time().Str::random(8).'.jpg';
            $img->save(public_path('assets/images/post/'.$thumbnail));
            if($data->image_big && file_exists(public_path('assets/images/post/'.$data->image_big))){
                @unlink(public_path('assets/images/post/'.$data->image_big));
            }
            $input['image_big'] = $thumbnail;
        }

        if($request->hasFile('audio')){
            $audio = $request->file('audio');
            $audioName = time().$audio->getClientOriginalName();
            $audio->move(public_path('assets/audios'), $audioName);
            if($data->audio && file_exists(public_path('assets/audios/'.$data->audio))){
                @unlink(public_path('assets/audios/'.$data->audio));
            }
            $input['audio'] = $audioName;
        }

        if($request->draft == 1){
            $input['status'] = 'draft';
        }else{
            $input['status'] = 'true';
        }

        if($date = $request->schedule_post_date){
            $input['schedule_post_date'] = Carbon::createFromFormat('Y-m-d H:i:s', $date);
        }

        $input['post_type'] = 'audio';
        $data->update($input);
        
        Toastr::success('Audio Updated Successfully');
        $msg = 'Audio Updated Successfully';
        return response()->json($msg);
    }
}