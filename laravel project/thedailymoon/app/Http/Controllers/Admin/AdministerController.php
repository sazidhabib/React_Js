<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Role;
use Datatables;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;

class AdministerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    public function datatables(){
        $datas = Admin::orderBy('id','desc')->get();
        
        return Datatables::of($datas)
            ->addColumn('action', function(Admin $data) {
                if($data->id != 1){
                    $delete = '<a href="javascript:;" data-href="'.route('admin.administator.delete', $data->id).'" data-toggle="modal" data-target="#confirm-delete" class="delete"><i class="fas fa-trash-alt"></i></a>';
                }else{
                    $delete = '';
                }
                return '<div class="action-list"><a data-href="'.route('admin.administator.edit', $data->id) .'" class="edit" data-toggle="modal" data-target="#modal1"> <i class="fas fa-edit"></i>Edit</a>'.$delete.'</div>';
            })
            ->editColumn('designation', function(Admin $data) {
                return $data->designation ?: 'N/A';
            })
            ->editColumn('role_id', function(Admin $data){
                return $data->role_id ? $data->role->name : 'No Role';
            })
            ->rawColumns(['action', 'role_id'])
            ->toJson();
    }
    
    public function index(){
        return view('admin.administrator.index');
    }

    public function edit($id){
        $data = Admin::find($id);
        $roles = Role::orderBy('id','desc')->get();
        return view('admin.administrator.edit', compact('data', 'roles'));
    }
    
public function update(Request $request, $id){
    $rules = [
        'name' => 'required',
        'email' => 'required|email|unique:admins,email,'.$id,
        'phone' => 'required',
        'designation' => 'required',
        'role_id' => 'required',
        'photo' => 'image|mimes:jpeg,png,jpg,gif,svg',
    ];
    
    $validator = Validator::make($request->all(), $rules);
    if($validator->fails()){
        return response()->json(['errors'=>$validator->getMessageBag()->toArray()], 422);
    }
    
    $data = Admin::find($id);
    $input = $request->except(['_token', '_method', 'photo']);
    
    if($request->hasFile('photo')){
        $file = $request->file('photo');
        $name = time().$file->getClientOriginalName();
        $file->move('assets/images/admin/', $name);
        if($data->photo) {
            @unlink('assets/images/admin/'.$data->photo);
        }
        $input['photo'] = $name;
    }
    
    $data->update($input);
    
    return response()->json('Data Updated Successfully');
}
    
    public function delete($id){
        $data = Admin::find($id);
        if($data->photo && file_exists('assets/images/admin/'.$data->photo)) {
            @unlink('assets/images/admin/'.$data->photo);
        }
        $data->delete();
        return response()->json('Data Deleted Successfully');
    }
}