@extends('layouts.front')
 @section('meta')
    <title>ফটো গ্যালারী</title>
<meta property="og:title" content="ফটো গ্যালারী" />
<meta property="og:image" content="{{asset('assets/images/'.$gs->og_baner)}}" />
@endsection
@section('contents')
 

<!----------__________ photogallary start ___________------------>

			
			
				<div class="row">
					<div class="photogallary">				
						
						 				@php
				$photobig=DB::table('image_albums')->orderBy('id','DESC')->limit(10000000)->get();
				@endphp 
                                @if ($photobig->count()>0)
                               @foreach ($photobig as $row)
        		
						<div class="col-md-3 col-sm-3">
							<div class="gallary">
							<a href="{{asset('assets/images/image-album/'.$row->photo)}}">
								<img width="600" height="337" src="{{asset('assets/images/image-album/'.$row->photo)}}" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" srcset="{{asset('assets/images/image-album/'.$row->photo)}} 600w, {{asset('assets/images/image-album/'.$row->photo)}} 300w" sizes="(max-width: 600px) 100vw, 600px" />								</a>
								<h4 class="photo_title"><a href="{{asset('assets/images/image-album/'.$row->photo)}}">{{$row->album_name}}</a></h4>
							</div>
						</div>
						@endforeach
						@else 
								
												<div class="col-md-3 col-sm-3">
							<div class="gallary">
							<a href="assets/images/nopic.png">
								<img width="600" height="337" src="assets/images/nopic.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" srcset="assets/images/nopic.png 600w, assets/images/nopic.png 300w" sizes="(max-width: 600px) 100vw, 600px" />								</a>
								<h4 class="photo_title"><a href="assets/images/nopic.png">কোন গ্যালারী ইমেইজ নেই</a></h4>
							</div>
						</div>
						@endif
						

					


    <!-- options -->
    <div class="col-md-12 options border-bottom">

        <!-- pagination -->
        <ul class="pagination pull-left">
		<li></li>
            <li></li>
            
        </ul>

    </div>
    <!-- /.options -->  

    
    						
					</div>
				</div>




  
@endsection