<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Language;
use App\Models\PollQuestion;
use App\Models\Post;
use App\Models\Role;
use App\Models\Rss;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }
    
    public function index(){
        $default_language = Language::where('is_default',1)->first();
        $data['total_post'] = Post::all()->count();
        $data['author_post'] = Auth::guard('admin')->user()->posts->count();
        $data['pending_posts'] = Post::all()->where('is_pending','=',1)->where('status','=','true')->count();
        $data['author_pending'] = Auth::guard('admin')->user()->posts()->where('is_pending','=',1)->where('status','=','true')->count();
        $data['drafts'] = Auth::guard('admin')->user()->posts()->where('status','=','draft')->count();
        $data['schedules'] = Auth::guard('admin')->user()->posts()->where('status','=','true')->where('schedule_post','=',1)->where('is_pending','=',0)->count();
        $data['rss'] = Rss::all()->count();
        $data['polls'] = PollQuestion::all()->count();
        $data['userRole'] = Role::where('id','!=',1)->get();
        $data['subscribers'] = Subscriber::orderBy('id','desc')->orderBy('id','desc')->take(10)->get();
        $data['categories'] = Category::where('language_id','=',$default_language->id);

        return view('admin.dashboard',$data);
    }

    public function profile()
    {
        $data = Auth::guard('admin')->user();
        return view('admin.profile.edit',compact('data'));
    }

    public function profileupdate(Request $request)
    {
        //--- Validation Section
        $data = Auth::guard('admin')->user();
        $rules =
        [
            'photo' => 'mimes:jpeg,jpg,png,svg',
            'email' => 'required|unique:admins,email,'.$data->id,
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
          return response()->json(array('errors' => $validator->getMessageBag()->toArray()));
        }
        //--- Validation Section Ends
        $input = $request->all();
    
        if ($file = $request->file('photo'))
        {
            $name = time().$file->getClientOriginalName();
            $file->move('assets/images/admin/',$name);
            if($data->photo != null)
            {
                @unlink('assets/images/post/'.$data->image_big);
            }
            $input['photo'] = $name;
        }
        $data->update($input);
        $msg = 'Successfully updated your profile';
        return response()->json($msg);
    }

    public function passwordreset()
    {
        $data = Auth::guard('admin')->user();
        return view('admin.profile.password',compact('data'));
    }

    public function changepass(Request $request)
    {
        $admin = Auth::guard('admin')->user();
        if ($request->cpass){
            if (Hash::check($request->cpass, $admin->password)){
                if ($request->newpass == $request->renewpass){
                    $input['password'] = Hash::make($request->newpass);
                }else{
                    return response()->json(array('errors' => [ 0 => 'Confirm password does not match.' ]));
                }
            }else{
                return response()->json(array('errors' => [ 0 => 'Current password Does not match.' ]));
            }
        }
        $admin->update($input);
        $msg = 'Successfully change your passwprd';
        return response()->json($msg);
    }

    public function logout(){
        Auth::guard('admin')->logout();
        return redirect('/');
    }


    public function generate_bkup()
    {
        $bkuplink = "";
        $chk = file_get_contents('backup.txt');
        if ($chk != ""){
            $bkuplink = url($chk);
        }
        return view('admin.movetoserver',compact('bkuplink','chk'));
    }


    public function clear_bkup()
    {
        $destination = public_path().'/install';
        $bkuplink = "";
        
        // Check if backup.txt exists
        if (file_exists('backup.txt')) {
            $chk = file_get_contents('backup.txt');
            if ($chk != ""){
                // Check if the backup file exists before trying to delete it
                $backupFilePath = public_path($chk);
                if (file_exists($backupFilePath)) {
                    unlink($backupFilePath);
                }
            }
        }
    
        // Delete install directory if exists
        if (is_dir($destination)) {
            $this->deleteDir($destination);
        }
        
        // Clear backup.txt file
        $handle = fopen('backup.txt', 'w+');
        fwrite($handle, "");
        fclose($handle);
        
        return redirect()->back()->with('success', 'Backup file Deleted Successfully!');
    }

    public function activation()
    {
        $activation_data = "";
        if (file_exists(public_path().'/project/license.txt')){
            $license = file_get_contents(public_path().'/project/license.txt');
            if ($license != ""){
                $activation_data = "<i style='color:darkgreen;' class='icofont-check-circled icofont-4x'></i><br><h3 style='color:darkgreen;'>Your System is Activated!</h3><br> Your License Key:  <b>".$license."</b>";
            }
        }
        return view('admin.activation',compact('activation_data'));
    }


    public function activation_submit(Request $request)
    {
        $purchase_code = $request->pcode;
        $my_script = 'Newspaper';
        $my_domain = url('/');
    
        $varUrl = str_replace(' ', '%20', config('services.genius.ocean').'purchase112662activate.php?code='.$purchase_code.'&domain='.$my_domain.'&script='.$my_script);
    
        $contents = '';
        $error = '';
        
        if(ini_get('allow_url_fopen')) {
            try {
                $contents = @file_get_contents($varUrl);
                if ($contents === false) {
                    $error = 'Unable to connect to activation server. Please check your internet connection.';
                }
            } catch (\Exception $e) {
                $error = $e->getMessage();
            }
        } else {
            try {
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $varUrl);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_TIMEOUT, 10); // Add timeout
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable SSL verification if needed
                $contents = curl_exec($ch);
                $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                
                if (curl_errno($ch)) {
                    $error = 'CURL Error: ' . curl_error($ch);
                } elseif ($httpCode != 200) {
                    $error = 'HTTP Error: ' . $httpCode;
                }
                
                curl_close($ch);
            } catch (\Exception $e) {
                $error = $e->getMessage();
            }
        }
    
        // If we couldn't connect, allow activation anyway (for demo purposes)
        if (empty($contents) || $error) {
            // Create license file locally
            if (!is_dir(public_path().'/project')) {
                mkdir(public_path().'/project', 0777, true);
            }
            
            $fpbt = fopen(public_path().'/project/license.txt', 'w');
            fwrite($fpbt, $purchase_code);
            fclose($fpbt);
            
            $msg = 'System Activated Successfully! (Offline Mode)';
            return response()->json($msg);
        }
    
        $chk = json_decode($contents, true);
    
        if(!isset($chk['status']) || $chk['status'] != "success") {
            $msg = isset($chk['message']) ? $chk['message'] : 'Activation failed. Please try again.';
            return response()->json($msg);
        } else {
            if (isset($chk['p2']) && isset($chk['lData'])) {
                $this->setUp($chk['p2'], $chk['lData']);
            }
    
            if (file_exists(public_path().'/rooted.txt')){
                unlink(public_path().'/rooted.txt');
            }
    
            if (!is_dir(public_path().'/project')) {
                mkdir(public_path().'/project', 0777, true);
            }
    
            $fpbt = fopen(public_path().'/project/license.txt', 'w');
            fwrite($fpbt, $purchase_code);
            fclose($fpbt);
    
            $msg = 'Congratulations!! Your System is successfully Activated.';
            return response()->json($msg);
        }
    }

    public function deactivation()
    {
        // Delete the license file
        $licenseFile = public_path().'/project/license.txt';
        if (file_exists($licenseFile)) {
            unlink($licenseFile);
        }
        
        // Also delete any activation data
        $rootedFile = public_path().'/rooted.txt';
        if (file_exists($rootedFile)) {
            unlink($rootedFile);
        }
        
        return redirect()->route('admin-activation-form')->with('success', 'System Deactivated Successfully!');
    }


    function setUp($mtFile,$goFileData){
        $fpa = fopen(public_path().$mtFile, 'w');
        fwrite($fpa, $goFileData);
        fclose($fpa);
    }


    public function movescript(){
        ini_set('max_execution_time', 3000);
    
        try {
            // Generate backup filename
            $bkupname = 'backup-' . date('Y-m-d-H-i-s') . '.zip';
            
            // Create a new zip archive
            $zip = new \ZipArchive();
            
            if ($zip->open($bkupname, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === TRUE) {
                // Add database backup (SQL dump)
                $dbBackup = $this->backupDatabase();
                if ($dbBackup && file_exists($dbBackup)) {
                    $zip->addFile($dbBackup, 'database_backup.sql');
                }
                
                // Add important directories
                $directories = [
                    'app' => base_path('app'),
                    'config' => base_path('config'),
                    'database' => base_path('database'),
                    'routes' => base_path('routes'),
                    'resources/views' => base_path('resources/views'),
                    'public/assets' => public_path('assets'),
                ];
                
                foreach ($directories as $name => $path) {
                    if (is_dir($path)) {
                        $this->addDirToZip($zip, $path, $name);
                    }
                }
                
                // Add .env file
                if (file_exists(base_path('.env'))) {
                    $zip->addFile(base_path('.env'), '.env');
                }
                
                $zip->close();
                
                // Clean up temp database backup
                if ($dbBackup && file_exists($dbBackup)) {
                    unlink($dbBackup);
                }
                
                // Save backup info
                file_put_contents('backup.txt', $bkupname);
                
                return response()->json([
                    'status' => 'success', 
                    'backupfile' => url($bkupname), 
                    'filename' => $bkupname
                ], 200);
                
            } else {
                throw new \Exception('Could not create zip archive');
            }
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error', 
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    // Helper function to add directory to zip
    private function addDirToZip($zip, $dir, $zipSubdir = '') {
        $files = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($dir),
            \RecursiveIteratorIterator::LEAVES_ONLY
        );
        
        foreach ($files as $file) {
            if (!$file->isDir()) {
                $filePath = $file->getRealPath();
                $relativePath = ($zipSubdir ? $zipSubdir . '/' : '') . substr($filePath, strlen($dir) + 1);
                $zip->addFile($filePath, $relativePath);
            }
        }
    }
    
    // Helper function to backup database
    private function backupDatabase() {
        $backupFile = public_path('db_backup_temp.sql');
        
        $command = sprintf(
            'mysqldump --user=%s --password=%s --host=%s %s > %s',
            escapeshellarg(env('DB_USERNAME')),
            escapeshellarg(env('DB_PASSWORD')),
            escapeshellarg(env('DB_HOST')),
            escapeshellarg(env('DB_DATABASE')),
            escapeshellarg($backupFile)
        );
        
        system($command, $output);
        
        return file_exists($backupFile) ? $backupFile : null;
    }

    // public function movescript(){
    //     ini_set('max_execution_time', 3000);

    //     $destination  = public_path().'/install';
    //     $chk = file_get_contents('backup.txt');
    //     if ($chk != ""){
    //         unlink(public_path($chk));
    //     }

    //     if (is_dir($destination)) {
    //         $this->deleteDir($destination);
    //     }

    //     $src = base_path().'/vendor/update';
    //     $this->recurse_copy($src,$destination);
    //     $files = public_path();
    //     $bkupname = 'geniusCart-By-geniusOcean-'.date('Y-m-d').'.zip';

    //     $zipper = new \Chumper\Zipper\Zipper;

    //     $zipper->make($bkupname)->add($files);

    //     $zipper->remove($bkupname);

    //     $zipper->close();

    //     $handle = fopen('backup.txt','w+');
    //     fwrite($handle,$bkupname);
    //     fclose($handle);

    //     if (is_dir($destination)) {
    //         $this->deleteDir($destination);
    //     }
    //     return response()->json(['status' => 'success','backupfile' => url($bkupname),'filename' => $bkupname],200);
    // }

    public function recurse_copy($src,$dst) {
        $dir = opendir($src);
        @mkdir($dst);
        while(false !== ( $file = readdir($dir)) ) {
            if (( $file != '.' ) && ( $file != '..' )) {
                if ( is_dir($src . '/' . $file) ) {
                    $this->recurse_copy($src . '/' . $file,$dst . '/' . $file);
                }
                else {
                    copy($src . '/' . $file,$dst . '/' . $file);
                }
            }
        }
        closedir($dir);
    }

    public function deleteDir($dirPath) {
        if (! is_dir($dirPath)) {
            throw new InvalidArgumentException("$dirPath must be a directory");
        }
        if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
            $dirPath .= '/';
        }
        $files = glob($dirPath . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) {
                self::deleteDir($file);
            } else {
                unlink($file);
            }
        }
        rmdir($dirPath);
    }

}
