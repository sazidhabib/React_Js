<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Role;
use App\Models\User;
use Datatables;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;

class StaffController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }


    public function datatables(){
        $datas = User::with('role')->orderBy('id','desc');  // ← Added 'with('role')'
        
        return Datatables::of($datas)
            ->addColumn('role_id', function($data) {  // ← ADD THIS COLUMN
                if($data->role) {
                    return $data->role->name;
                }
                return 'No Role';
            })
            ->addColumn('action', function(User $data) {
                $delete = '<a href="javascript:;" data-href="'.route('admin.staff.delete',$data->id).'" data-toggle="modal" data-target="#confirm-delete" class="delete"><i class="fas fa-trash-alt"></i></a>';
                return '<div class="action-list"><a data-href="'.route('admin.staff.edit',$data->id) .'" class="edit" data-toggle="modal" data-target="#modal1"> <i class="fas fa-edit"></i>Edit</a>'.$delete.'</div>';
            })
            ->rawColumns(['action'])  // ← Make sure 'role_id' is NOT in rawColumns
            ->toJson();
    }  
    
    
    
    public function index(){
        return view('admin.staff.index');
    }
    public function create(){
        $roles = Role::orderBy('id','asc')->skip(1)->take(20)->get();
        return view('admin.staff.create',compact('roles'));
    }
    public function store(Request $request){
        $rules = [
            'name' => 'required',
            'email' => 'required|unique:users',
            'phone' => 'required',
            'role_id' => 'required',
            'photo' => 'image|mimes:jpeg,png,jpg,gif,svg',
            'password' => 'required',
        ];
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            return response()->json(['errors'=>$validator->getMessageBag()->toArray()]);
        }
        $data  = new User();

        if($request->hasFile('photo')){
            $file = $request->file('photo');
            $name = time().$file->getClientOriginalName();
            $file->move('assets/images/admin/',$name);
            $data->photo = $name;
        }
        $data->name = $request->name;
        $data->email = $request->email;
		$data->designation = $request->designation;
        $data->phone = $request->phone;
        $data->role_id = $request->role_id;
        $data->password = bcrypt($request->password);
        $data->verified   = 1;
        $data->email_verified   = 'Yes';
        $data->save();

        $msg = 'Data Added Sucessfully';
        return response()->json($msg);
    }
    public function edit($id){
        $data = User::find($id);
        $roles = Role::orderBy('id','asc')->skip(1)->take(20)->get();
        return view('admin.staff.edit',compact('data','roles'));
    }
    public function update(Request $request,$id){
        $rules = [
            'name' => 'required',
            'email' => 'required|unique:users,email,'.$id,
            'phone' => 'required',
            'role_id' => 'required',
            'photo' => 'image|mimes:jpeg,png,jpg,gif,svg',
        ];
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            return response()->json(['errors'=>$validator->getMessageBag()->toArray()]);
        }
        $data  = User::find($id);
        $input = $request->all();
        if($request->hasFile('photo')){
            $file = $request->file('photo');
            $name = time().$file->getClientOriginalName();
            $file->move('assets/images/admin/',$name);
            @unlink('assets/images/admin/'.$data->photo);
            $input['photo'] = $name;
        }
        $data->update($input);

        $msg = 'Data Updated Sucessfully';
        return response()->json($msg);
    }
    public function delete($id){
        $data  = User::find($id);
        @unlink('assets/images/admin/'.$data->photo);
        $data->delete();
    }
}
