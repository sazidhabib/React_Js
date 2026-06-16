@extends('layouts.front')
@section('contents')
@section('meta')
<title>{{$data->title}}</title>
<meta name="Description" content="{!! $data->short_description !!}">
<meta name="Keywords" content="{!! $data->meta_tag !!}">
<meta property="og:title" content="{{$data->title}}" />
<meta property="og:description" content="{!! $data->short_description !!}" />
<meta property="og:image" content="{{asset('assets/images/post/'.$data->image_big)}}" />
@endsection

<!--==================================
               national-section start
         ===================================-->

<section class="singlepage-section">


	<div class="row">
		<div class="col-md-8 col-sm-8">

			<div class="biggapon">
				<div class="widget_area">
					<div class="textwidget">{!!$gs->header1_728!!}</div>
				</div>
			</div>


			<div class="single-cat-info">
				<div class="single-cat-home">
					<a href=""><i class="fa fa-home" aria-hidden="true"></i> প্রচ্ছদ </a>
				</div>
				<div class="single-cat-cate">
					<i class="fa fa-bars" aria-hidden="true"></i> <a href=""
						rel="category tag">{{$data->category->title}} </a>
				</div>
			</div>

			<div class="single-title">
				<h3>{{$data->title}}</h3>
			</div>



			<!--========= reporter image title section start ===========-->


			<div class="view-section">
				<div class="row">
					@if ($data->admin_id == 0 && $data->user_id != 0)
					<div class="col-md-1 col-sm-1 col-xs-2">
						<div class="reportar-img">
							<img src="{{asset('assets/images/admin/'.$data->user->photo)}}" width="100%" />
						</div>
					</div>
					<div class="col-md-11 col-sm-11 col-xs-10">
						<div class="reportar-sec">
							<div class="reportar-title">



								রিপোর্টারের নাম: {{ $data->user->name }}



							</div>
							@else
							<div class="col-md-1 col-sm-1 col-xs-2">
								<div class="reportar-img">

									<img src="{{asset('assets/images/admin/'.$data->admin->photo)}}" width="100%" />




								</div>
							</div>
							<div class="col-md-11 col-sm-11 col-xs-10">
								<div class="reportar-sec">
									<div class="reportar-title">



										রিপোর্টারের নাম: {{$data->admin->name}}



									</div>
									@endif




									<div class="sgl-page-views-count">
										<ul>
											<li> <i class="fa fa-clock-o"></i>
												সংবাদ প্রকাশের তারিখ :
												{{$data->createdAt()}} ইং </li>

											<!-- *(view-tab show or hide open)*-->

											<!-- *(view-tab show or hide open)*-->

											<li class="active">
												<i class="fa fa-eye"></i>
												৭৮১
												বার
											</li>


											<!-- *(view-tab show or hide close)*-->

										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>


					<!--========= reporter image title section close ===========-->



					<div class="single-img">
						<!-- Post Image Code Start-->
						<img width="480" height="250" src="{{asset('assets/images/post/'.$data->image_big)}}"
							class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
							srcset="{{asset('assets/images/post/'.$data->image_big)}} 480w, {{asset('assets/images/post/'.$data->image_big)}} 300w"
							sizes="(max-width: 480px) 100vw, 480px" /> <!-- Post Image Code Close-->
						<div class="caption">
							ছবির ক্যাপশন: {{ $data->images_caption }}
						</div>

					</div>

					<div class="single-dtls">
						@if ($data->post_type == 'article')
						<p>{!! $data->description !!}</p>
						@endif

						@if ($data->post_type == 'video')
						@if ($data->embed_video)
						<p>{!! $data->description !!}</p>

						<iframe width="615" height="400" src="https://www.youtube.com/embed/{!!$data->embed_video!!}"
							title="Types Of ভাড়াটিয়া || Comedy Special || Sanjay Das - Bishakto Sanju | Joy-Rupam-Ayan-Shuvro || 2024"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
						@else
						<video controls>
							<source src="{{asset('assets/videos/'.$data->video)}}" type="video/mp4">
						</video>
						@endif

						@endif

						@if ($data->post_type == 'audio')
						<p style="text-align: center;"><b>&nbsp;অডিও&nbsp; ফাইল</b></p>
						<audio controls="" style="width:100%">
							<source src="{{asset('assets/audios/'.$data->audio)}}" type="audio/mp3">
						</audio>
						{!! $data->description !!}
						@endif



					</div>

					<div class="add">
						<div class="widget_area">
							<div class="textwidget">{!!$gs->header2_728!!}</div>
						</div>
					</div>

					{{-- <div class="sgl-cat-tittle"> কমেন্ট বক্স </div> --}}
					{{-- <div id="fb-root"></div> --}}
					<script async defer crossorigin="anonymous"
						src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v20.0&appId=1716117305495236"
						nonce="OKS9Fdbx"></script>
					<div class="fb-comments" data-href="{{ URL::to($data->id.'/'.$data->slug)}}" data-width="600"
						data-numposts="10"></div>


					<div class="sgl-page-social-title" style="margin-top: 20px;">
						<h4>নিউজটি শেয়ার করুন..</h4>
					</div>

					<div class="sgl-page-social">
						<ul>
							<li><a href="http://www.facebook.com/sharer.php?u={{ URL::to($data->id.'/'.$data->slug)}}"
									class="ffacebook" target="_blank"> <i class="fa fa-facebook"></i> Facebook</a></li>

							<li><a href="https://twitter.com/share?text={{ URL::to($data->id.'/'.$data->slug)}}"
									class="ttwitter" target="_blank"> <i class="fa fa-twitter"></i> Twitter</a></li>

							<li><a href="http://digg.com/submit?url={{ URL::to($data->id.'/'.$data->slug)}}"
									class="digg" target="_blank"> <i class="fa fa-digg"></i> Digg </a></li>

							<li><a href="http://www.linkedin.com/shareArticle?mini={{ URL::to($data->id.'/'.$data->slug)}}"
									class="linkedin" target="_blank"> <i class="fa fa-linkedin"></i> Linkedin </a></li>

							<li><a href="http://www.reddit.com/submit?url={{ URL::to($data->id.'/'.$data->slug)}}"
									class="reddit" target="_blank"> <i class="fa fa-reddit"></i> Reddit </a></li>

							<li><a href="https://plus.google.com/share?url={{ URL::to($data->id.'/'.$data->slug)}}"
									class="google-plus" target="_blank"> <i class="fa fa-google-plus"></i> Google
									Plus</a></li>

							<li><a href="http://www.pinterest.com/pin/create/button/?url={{ URL::to($data->id.'/'.$data->slug)}}"
									class="pinterest" target="_blank"> <i class="fa fa-pinterest"></i> Pinterest </a>
							</li>

							<li><a href="{{ URL::to('print/'.$data->id.'/'.$data->slug)}}" class="print"
									target="_blank"> <i class="fa fa-print"></i> Print </a></li>
						</ul>

					</div>

					<script>
						function myFunction() {
						window.print();
					}
					</script>

					<div class="visible-xs">
						<div class="sgl-cat-tittle" style="margin-top: 25px; margin-bottom: 15px;">
							এ জাতীয় আরো খবর..
						</div>
						<div class="news-titletab">
							@php
							$popular=DB::table('posts')->inRandomOrder()->orderBy('id','DESC')->where('is_feature',1)->limit(6)->get();
							@endphp
							@foreach($popular as $row)
							<div class="imagr-border">
								<div class="small-imgae">
									<a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">
										<img width="480" height="250"
											src="{{asset('assets/images/post/'.$row->image_big)}}"
											class="attachment-post-thumbnail size-post-thumbnail wp-post-image"
											alt=""
											srcset="{{asset('assets/images/post/'.$row->image_big)}} 480w, {{asset('assets/images/post/'.$row->image_big)}} 300w"
											sizes="(max-width: 480px) 100vw, 480px" />
									</a>
								</div>
								<div class="hadding_02">
									<a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">
										{{strlen($row->title)>60 ? mb_substr($row->title,0,60,"utf-8") : $row->title}}
									</a>
								</div>
							</div>
							@endforeach
						</div>
					</div>



					<!-- *(view-tab show or hide open)*-->






					<!-- *(view-tab show or hide close)*-->





					<div class="add">
					</div>


				</div>
				<div class="col-md-4 col-sm-4">
					<div class="tab-header">
						<!-- Nav tabs -->
						<ul class="nav nav-tabs nav-justified" role="tablist">
							<li role="presentation" class="active"><a href="#tab21" aria-controls="tab21" role="tab"
									data-toggle="tab" aria-expanded="false">সর্বশেষ সংবাদ</a></li>
							<li role="presentation"><a href="#tab22" aria-controls="tab22" role="tab" data-toggle="tab"
									aria-expanded="true">জনপ্রিয় সংবাদ</a></li>
						</ul>

						<!-- Tab panes -->
						<div class="tab-content ">
							<div role="tabpanel" class="tab-pane in active" id="tab21">

								<div class="news-titletab">
									@php
									$latest=DB::table('posts')->inRandomOrder()->orderBy('id','DESC')->where('is_trending',1)->limit(10)->get();
									@endphp
									@foreach ($latest as $row)
									<div class="imagr-border">
										<div class="small-imgae">
											<a
												href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">
												<img width="480" height="250"
													src="{{asset('assets/images/post/'.$row->image_big)}}"
													class="attachment-post-thumbnail size-post-thumbnail wp-post-image"
													alt=""
													srcset="{{asset('assets/images/post/'.$row->image_big)}} 480w, {{asset('assets/images/post/'.$row->image_big)}} 300w"
													sizes="(max-width: 480px) 100vw, 480px" /> </a>
										</div>
										<div class="hadding_02">
											<a
												href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
												? mb_substr($row->title,0,60,"utf-8") : $row->title}} </a>
										</div>
									</div>
									@endforeach




								</div>
							</div>
							<div role="tabpanel" class="tab-pane fade" id="tab22">
								<div class="news-titletab">
									@php
									$alocito1=DB::table('posts')->inRandomOrder()->orderBy('id','DESC')->where('is_slider',1)->limit(1)->get();
									$alocito2=DB::table('posts')->inRandomOrder()->orderBy('id','DESC')->where('is_slider',1)->skip(1)->limit(10)->get();
									@endphp

									@foreach ($alocito2 as $row)
									<div class="imagr-border">
										<div class="small-imgae">
											<a
												href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">
												<img width="480" height="250"
													src="{{asset('assets/images/post/'.$row->image_big)}}"
													class="attachment-post-thumbnail size-post-thumbnail wp-post-image"
													alt=""
													srcset="{{asset('assets/images/post/'.$row->image_big)}} 480w, {{asset('assets/images/post/'.$row->image_big)}} 300w"
													sizes="(max-width: 480px) 100vw, 480px" /> </a>
										</div>
										<div class="hadding_02">
											<a
												href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
												? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
										</div>
									</div>
									@endforeach



								</div>
							</div>
						</div>
					</div>

					<div class="add">
						<div class="widget_area">
							<div class="textwidget">{!! $gs->sidebar_ads1 !!}</div>
						</div>
					</div>

					<div class="hidden-xs">
						<div class="sgl-cat-tittle" style="margin-top: 25px; margin-bottom: 15px;">
							এ জাতীয় আরো খবর..
						</div>
						<div class="news-titletab">
							@php
							$popular=DB::table('posts')->inRandomOrder()->orderBy('id','DESC')->where('is_feature',1)->limit(6)->get();
							@endphp
							@foreach($popular as $row)
							<div class="imagr-border">
								<div class="small-imgae">
									<a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">
										<img width="480" height="250"
											src="{{asset('assets/images/post/'.$row->image_big)}}"
											class="attachment-post-thumbnail size-post-thumbnail wp-post-image"
											alt=""
											srcset="{{asset('assets/images/post/'.$row->image_big)}} 480w, {{asset('assets/images/post/'.$row->image_big)}} 300w"
											sizes="(max-width: 480px) 100vw, 480px" />
									</a>
								</div>
								<div class="hadding_02">
									<a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">
										{{strlen($row->title)>60 ? mb_substr($row->title,0,60,"utf-8") : $row->title}}
									</a>
								</div>
							</div>
							@endforeach
						</div>
					</div>

				</div>
			</div>


</section>

@endsection