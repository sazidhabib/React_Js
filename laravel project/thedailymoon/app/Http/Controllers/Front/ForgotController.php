<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\GeneralSettings;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Classes\geniusMailer;


class ForgotController extends Controller
{
    public function showForgotForm()
    {
      return view('frontend.forgot');
    }

    public function forgot(Request $request)
    {
        $gs = GeneralSettings::findOrFail(1);
        $input =  $request->all();
  
        if (Admin::where('email', '=', $request->email)->count() > 0) {
          // user found
          $admin = Admin::where('email', '=', $request->email)->firstOrFail();
          $autopass = Str::random(8);
          $input['password'] = bcrypt($autopass);
          $admin->update($input);
          $subject = "Reset Password Request";
          $msg = "Your New Password is : ".$autopass;
          if($gs->is_smtp == 1)
          {
              $data = [
                      'to' => $request->email,
                      'subject' => $subject,
                      'body' => $msg,
              ];
    
              $mailer = new geniusMailer();
              $mailer->sendCustomMail($data);                
          }
          else
          {
              $headers = "From: ".$gs->from_name."<".$gs->from_email.">";
              mail($request->email,$subject,$msg,$headers);            
          }
          return response()->json('Your Password Reseted Successfully. Please Check your email for new Password.');
          }
          else{
          // user not found
          return response()->json(array('errors' => [ 0 => 'No Account Found With This Email.' ]));    
          }
    }
}
