@extends('layouts.front')
 @section('meta')
    <title>ভিডিও  গ্যালারী</title>
<meta property="og:title" content="ভিডিও গ্যালারী" />
<meta property="og:image" content="{{asset('assets/images/'.$gs->og_baner)}}" />
@endsection

@section('contents')
 

		<!----------__________ photogallary start ___________------------>
			
			
				<div class="row">
					<div class="photogallary">				
						                   @php
				$video2=DB::table('posts')->inRandomOrder()->orderBy('id','DESC')->where('is_videoGallery',1)->limit(100000)->get();
				@endphp  
						 
        						                     @if ($video2->count()>0)
										@foreach($video2 as $row)
						<div class="col-md-3 col-sm-3">
							<div class="gallary">
							<div class="embed-responsive embed-responsive-16by9 	embed-responsive-item" style="margin-bottom:0px; margin-top:5px;">
									<p><iframe src="https://www.youtube.com/embed/{{ $row->embed_video}}" width="263" height="148" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>
								</div>
								<h4 class="photo_title"><a href="https://www.youtube.com/watch?v={{ $row->embed_video}}">{{strlen($row->title)>40 ? mb_substr($row->title,0,40,"utf-8") : $row->title}}</a></h4>
							</div>
						</div>
						      @endforeach                                
									@else 
										
														<div class="col-md-3 col-sm-3">
							<div class="gallary">
							<div class="embed-responsive embed-responsive-16by9 	embed-responsive-item" style="margin-bottom:0px; margin-top:5px;">
									<p><iframe src="https://www.youtube.com/embed/1GdR_JEnBwo" width="263" height="148" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>
								</div>
								<h4 class="photo_title"><a href="archives/videogallery/%e0%a6%9a%e0%a6%b2%e0%a6%a8%e0%a6%be-%e0%a6%b8%e0%a7%81%e0%a6%9c%e0%a6%a8.html">কোন ভিডিও নেই</a></h4>
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