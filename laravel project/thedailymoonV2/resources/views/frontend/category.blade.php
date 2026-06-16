@extends('layouts.front')
@section('contents')
    @section('meta')
<title>{{$data->title}}</title>
<meta property="og:title" content="{{$data->title}}" />
<meta property="og:image" content="{{asset('assets/images/'.$gs->og_baner)}}" />
@endsection	
@push('css')

@endpush
         <!--==================================
               archive-page-section start
         ===================================-->

         <section class="archive-page-section">
		 
            
                    <div class="row">
                
                        <div class="col-md-8 col-sm-8">
										    <!--Next Pages Close--->

<div class="category_info">
<a href=""><i class="fa fa-home" aria-hidden="true"></i> 
							</a> <i class="fa fa-chevron-right"></i> {{$data->title}}</div>

			   
		         @if ($posts->count()>0)                       
 @foreach ($posts as $post)		   		   
		<div class="archive_page archive_back">
		    <div class="col-md-4 col-sm-4">
		        <!-- Post Image Code Start--> 
					<img width="480" height="250" src="{{asset('assets/images/post/'.$post->image_big)}}" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" srcset="{{asset('assets/images/post/'.$post->image_big)}} 480w, {{asset('assets/images/post/'.$post->image_big)}} 300w" sizes="(max-width: 480px) 100vw, 480px" />					<!-- Post Image Code Close-->
					
		    </div>
		    <div class="col-md-8 col-sm-8">
		        <h3 class="archive_title01"><a href="{{ route('frontend.postBySubcategory.details',[$post->category->slug,$post->slug])}}">{{ strlen($post->title)>100 ? mb_substr($post->title,0,100,'utf-8').'...' : $post->title}} </a></h3>
							
                       {{ strlen($post->short_description)>250 ? mb_substr($post->short_description,0,250,'utf-8').'...' : $post->short_description}} <h4 class="archvie_more"><a href="{{ route('frontend.postBySubcategory.details',[$post->category->slug,$post->slug])}}">বিস্তারিত...</a></h4>
                       
		    </div>
		</div>
			    @endforeach
                               @else
                                <div class="col-lg-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <p class="text-danger text-danger text-center">{{__('This Category has no news.')}}</p>
                                        </div>
                                    </div>
                                </div>
                        @endif  
	 		   		   
		
			    
	 	
	 

                    
                    
                <div class="row"><div class="col-md-12 col-sm-12"><div class="post-nav">
				{{ $posts->links() }}
				
				</ul></div></div></div>
						</div>
                        
                  <div class="col-md-4 col-sm-4">
                    <div class="tab-header">
                            <!-- Nav tabs -->
                            <ul class="nav nav-tabs nav-justified" role="tablist">
								<li role="presentation" class="active"><a href="#tab21" aria-controls="tab21" role="tab" data-toggle="tab" aria-expanded="false">সর্বশেষ সংবাদ</a></li>
								<li role="presentation" ><a href="#tab22" aria-controls="tab22" role="tab" data-toggle="tab" aria-expanded="true">জনপ্রিয় সংবাদ</a></li>
							</ul>

                            <!-- Tab panes -->
                            <div class="tab-content ">
                                <div role="tabpanel" class="tab-pane in active" id="tab21">

                                    <div class="news-titletab">
									
										@foreach($is_trendings as $is_trending)	
                                        <div class="imagr-border">
											<div class="small-imgae">
												<a href="{{ route('frontend.postBySubcategory.details',[$is_trending->category->slug,$is_trending->slug])}}"> <img width="480" height="250" src="{{asset('assets/images/post/'.$is_trending->image_big)}}" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" srcset="{{asset('assets/images/post/'.$is_trending->image_big)}} 480w, {{asset('assets/images/post/'.$is_trending->image_big)}} 300w" sizes="(max-width: 480px) 100vw, 480px" /> </a>
											</div>
											<div class="hadding_02">
											   <a href="{{ route('frontend.postBySubcategory.details',[$is_trending->category->slug,$is_trending->slug])}}">{{strlen($is_trending->title)>60 ? mb_substr($is_trending->title,0,60,"utf-8") : $is_trending->title}}</a>
											</div>
										</div>
										@endforeach
											
                                        
										
																				
                                    </div> 
                                </div>
                                <div role="tabpanel" class="tab-pane fade" id="tab22">                                      
                                    <div class="news-titletab">
                                       
									   											@foreach ($is_recents as $is_recent)	
                                        <div class="imagr-border">
											<div class="small-imgae">
												<a href="{{ route('frontend.postBySubcategory.details',[$is_recent->category->slug,$is_recent->slug])}}"> <img width="480" height="250" src="{{asset('assets/images/post/'.$is_recent->image_big)}}" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" srcset="{{asset('assets/images/post/'.$is_recent->image_big)}} 480w, {{asset('assets/images/post/'.$is_recent->image_big)}} 300w" sizes="(max-width: 480px) 100vw, 480px" /> </a>
											</div>
											<div class="hadding_02">
											   <a href="{{ route('frontend.postBySubcategory.details',[$is_recent->category->slug,$is_recent->slug])}}">{{strlen($is_recent->title)>60 ? mb_substr($is_recent->title,0,60,"utf-8") : $is_recent->title}}</a>
											</div>
										</div>
										@endforeach
										
										
										
										
										
                                    </div>                                          
                                </div>
                            </div>
                        </div>
					
					<div class="add">
						 <div class="widget_area">			<div class="textwidget">{!! $gs->sidebar_ads1 !!}</div>
		</div>					</div>
							
                </div>
				
				
                </div>
   
         </section>

		
		
@endsection