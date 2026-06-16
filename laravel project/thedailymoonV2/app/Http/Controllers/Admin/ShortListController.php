<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Language;
use App\Models\Post;
use App\Models\ShortList;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;
use Brian2694\Toastr\Facades\Toastr;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Str;

class ShortListController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    public function create(){
        $datas = Category::where('parent_id','=',NULL)->get();
        $languages = Language::orderBy('id','desc')->get();
        return view('admin.shortlist.create',compact('datas','languages'));
    }

    public function store(Request $request){
        $rules = [
            'language_id' => 'required',
            'title' => 'required',
            'slug' => 'required|unique:posts',
            'image_big' => 'image|mimes:jpeg,png,jpg,gif,svg',
            'description' => 'required',
            'category_id' => 'required',
            'item_title.*' => 'required',
            'item_photo.*' => 'image|mimes:jpeg,png,jpg,gif,svg',
        ];
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            return response()->json(array('errors' => $validator->getMessageBag()->toArray()));
        }

        $data  = new Post();
        $input = $request->all();
        
        // Fix: Use public_path() for main image
        if($file = $request->file('image_big')){
            $img = Image::make($file->getRealPath())->resize(780,438);
            $thumbnail = time().Str::random(8).'.jpg';
            // Ensure directory exists
            if (!file_exists(public_path('assets/images/post'))) {
                mkdir(public_path('assets/images/post'), 0755, true);
            }
            $img->save(public_path('assets/images/post/'.$thumbnail));
            $input['image_big'] = $thumbnail;
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
        
        $input['post_type'] = 'Sorted List';
        $data->fill($input)->save();

        $post_id = $data->id; //take last post Id

        $item_title = $request->item_title;
        $item_photo = $request->item_photo;
        $item_description = $request->item_description;

        // Ensure sort directory exists
        if (!file_exists(public_path('assets/images/sort'))) {
            mkdir(public_path('assets/images/sort'), 0755, true);
        }

        foreach($item_title as $key=>$value){
            $st = new ShortList();
            $st->post_id = $post_id;
            $st->item_title = $value;
            
            if(isset($item_photo[$key]) && $item_photo[$key]){
                $item_photoo = $item_photo[$key];
                if($file = $item_photoo){
                    $img = Image::make($file->getRealPath())->resize(750, 500);
                    $thumbnail = time().Str::random(8).'.jpg';
                    $img->save(public_path('assets/images/sort/'.$thumbnail));
                    $st->item_photo = $thumbnail;
                }
            }
            
            $description = isset($item_description[$key]) ? $item_description[$key] : '';
            $st->item_description = $description;
            $st->save();
        }

        Toastr::success('Data Added Successfully');
        $msg = 'Data Added Successfully';
        return response()->json($msg);
    }

    public function update(Request $request, $id){
        $rules = [
            'language_id' => 'required',
            'title' => 'required',
            'slug' => 'required|unique:posts,slug,'.$id,
            'image_big' => 'image|mimes:jpeg,png,jpg,gif,svg',
            'description' => 'required',
            'category_id' => 'required',
            'item_title.*' => 'required',
            'item_photo.*' => 'image|mimes:jpeg,png,jpg,gif,svg',
        ];
        $validator = Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()->json(array('errors' => $validator->getMessageBag()->toArray()));
        }

        $data  = Post::find($id);
        $input = $request->all();
        
        // Fix: Use public_path() for main image update
        if($file = $request->file('image_big')){
            $img = Image::make($file->getRealPath())->resize(780,438);
            $thumbnail = time().Str::random(8).'.jpg';
            $img->save(public_path('assets/images/post/'.$thumbnail));
            // Delete old image
            if($data->image_big && file_exists(public_path('assets/images/post/'.$data->image_big))){
                @unlink(public_path('assets/images/post/'.$data->image_big));
            }
            $input['image_big'] = $thumbnail;
        }

        if($request->draft == 1){
            $input['status'] = 'draft';
        }else{
            $input['status'] = 'true';
        }

        if($date = $request->schedule_post_date){
            $input['schedule_post_date'] = $date;
        }
        
        $input['post_type'] = 'Sorted List';
        $data->update($input);

        $post_id = $data->id; //take last post Id

        $sort_id    = $request->sort_id;
        $item_title = $request->item_title;
        $item_photo = $request->item_photo;
        $item_description = $request->item_description;

        foreach($item_title as $key=>$value){
            $sortId = isset($sort_id[$key]) ? $sort_id[$key] : null;
            
            if($sortId){
                $st = ShortList::find($sortId);
                if($st){
                    $st->post_id = $post_id;
                    $st->item_title = $value;

                    if(isset($item_photo[$key]) && $item_photo[$key]){
                        $item_photoo = $item_photo[$key];
                        if($file = $item_photoo){
                            $img = Image::make($file->getRealPath())->resize(750, 500);
                            $thumbnail = time().Str::random(8).'.jpg';
                            $img->save(public_path('assets/images/sort/'.$thumbnail));
                            // Delete old photo
                            if($st->item_photo && file_exists(public_path('assets/images/sort/'.$st->item_photo))){
                                @unlink(public_path('assets/images/sort/'.$st->item_photo));
                            }
                            $st->item_photo = $thumbnail;
                        }
                    }
                    
                    $description = isset($item_description[$key]) ? $item_description[$key] : '';
                    $st->item_description = $description;
                    $st->update();
                }
            } else {
                // Create new item if no ID exists
                $st = new ShortList();
                $st->post_id = $post_id;
                $st->item_title = $value;
                
                if(isset($item_photo[$key]) && $item_photo[$key]){
                    $item_photoo = $item_photo[$key];
                    if($file = $item_photoo){
                        $img = Image::make($file->getRealPath())->resize(750, 500);
                        $thumbnail = time().Str::random(8).'.jpg';
                        $img->save(public_path('assets/images/sort/'.$thumbnail));
                        $st->item_photo = $thumbnail;
                    }
                }
                
                $description = isset($item_description[$key]) ? $item_description[$key] : '';
                $st->item_description = $description;
                $st->save();
            }
        }

        Toastr::success('Data Updated Successfully');
        $msg = 'Data Updated Successfully';
        return response()->json($msg);
    }

    public function remove($id){
        $data = ShortList::find($id);
        if($data){
            // Fix: Use public_path() for deletion
            if($data->item_photo && file_exists(public_path('assets/images/sort/'.$data->item_photo))){
                @unlink(public_path('assets/images/sort/'.$data->item_photo));
            }
            $data->delete();
        }
        return response()->json(['success' => 'Item removed successfully']);
    }
}