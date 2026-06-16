@extends('layouts.front')
@section('contents')
@section('meta')
<meta name="Description" content="{!! $seo->meta_description !!}">
<meta name="Keywords" content="{!! $seo->meta_keys !!}">
<meta property="og:title" content="{{ $gs->title }}" />
<meta property="og:description" content="{!! $seo->meta_description !!}" />
<meta property="og:image" content="{{asset('assets/images/'.$gs->og_baner)}}" />
@endsection

<!--=======secroll-section start========-->

<!-- --------------------
    নেক্সট ডিজিট
    Next Digit
    NextDigitOfficial
    nextdigit.dev
---------------------- -->

<div class="row">
    <div class="col-md-12 scrool">
        <div class="col-md-2 scrool_1">
            নোটিশ : </div>
        <div class="col-md-10 scrool_2">

            <marquee direction="left" scrollamount="4px" onmouseover="this.stop()" onmouseout="this.start()">
                <i class="fa fa-square" aria-hidden="true"></i>
                <a href="">{{ $gs->notice_text }}</a>

            </marquee>

        </div>
    </div>
</div>



<!--=======secroll-section End========-->
<!--=======section one Start========-->

<div class="row">
    <div class="col-md-6 col-sm-5">
        <div class="photo_gallary">
            <div id="myCarousell" class="carousel slide" data-ride="carousel">
                <!-- Wrapper for slides -->
                <div class="carousel-inner" role="listbox">

                    @foreach ($sliders1 as $slider1)
                    <div class="item active">
                        <div class="Name">
                            <a
                                href="{{ route('frontend.postBySubcategory.details',[$slider1->category->slug,$slider1->slug])}}">
                                <img width="600" height="337" src="{{asset('assets/images/post/'.$slider1->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" /> </a>
                            <h4 class="photo_caption"><a
                                    href="{{ route('frontend.postBySubcategory.details',[$slider1->category->slug,$slider1->slug])}}">{{strlen($slider1->title)>100
                                    ? mb_substr($slider1->title,0,100,"utf-8") : $slider1->title}}</a></h4>
                        </div>
                    </div>
                    @endforeach



                    @foreach ($sliders as $slider)
                    <div class="item">
                        <div class="Name">
                            <a
                                href="{{ route('frontend.postBySubcategory.details',[$slider->category->slug,$slider->slug])}}">
                                <img width="570" height="320" src="{{asset('assets/images/post/'.$slider->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                                    srcset="{{asset('assets/images/post/'.$slider->image_big)}} 570w, {{asset('assets/images/post/'.$slider->image_big)}} 300w"
                                    sizes="(max-width: 570px) 100vw, 570px" /> </a>
                            <h4 class="photo_caption"><a
                                    href="{{ route('frontend.postBySubcategory.details',[$slider->category->slug,$slider->slug])}}">{{strlen($slider->title)>100
                                    ? mb_substr($slider->title,0,100,"utf-8") : $slider->title}}</a></h4>
                        </div>
                    </div>
                    @endforeach

                </div>
                <!-- Controls -->
                <a class="left carousel-control" href="#myCarousell" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#myCarousell" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    </div>

    <div class="col-md-3 col-sm-4">


        <div class="box-shadow">
            @foreach ($sliders2 as $slider2)
            <div class="exclisive_news_image">
                <a href="{{ route('frontend.postBySubcategory.details',[$slider2->category->slug,$slider2->slug])}}">
                    <img width="600" height="337" src="{{asset('assets/images/post/'.$slider2->image_big)}}"
                        class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                        srcset="{{asset('assets/images/post/'.$slider2->image_big)}} 600w, {{asset('assets/images/post/'.$slider2->image_big)}} 300w"
                        sizes="(max-width: 600px) 100vw, 600px" /> </a>
            </div>
            <div class="exclisive_news_padding">
                <div class="hadding_01">
                    <a
                        href="{{ route('frontend.postBySubcategory.details',[$slider2->category->slug,$slider2->slug])}}">{{strlen($slider2->title)>100
                        ? mb_substr($slider2->title,0,100,"utf-8") : $slider2->title}}</a>
                </div>

                <div class="content-datelis">
                    {!! strlen($slider2->short_description)>100 ? mb_substr($slider2->short_description,0,100,"utf-8") :
                    $slider2->short_description !!} <span style="text-align:right"><a
                            href="{{ route('frontend.postBySubcategory.details',[$slider2->category->slug,$slider2->slug])}}">বিস্তারিত...</a></span>
                </div>
            </div>
            @endforeach


        </div>


    </div>
    <div class="col-md-3 col-sm-3">
        @if ($ws->poll_inhome == 1)
            <div class="poll-area mt-4">
                <div class="header-area">
                    <h4 class="title">
                       {{__('Poll')}}
                    </h4>
                    <h5 class="title"><a href="{{ route('front.allPoll') }}" style="color: :#ff0000;">{{__('Previous Result')}}</a></h5>
                </div> 

                @foreach ($polls as $poll)
                <div class="poll-box">
                    <h4 class="title">
                        <i class="far fa-question-circle"></i> {{$poll->question}}
                    </h4>
                    <form id="voteform{{$poll->id}}" action="{{ route('front.poll.vote')}}" method="POST" class="voteform">
                        @csrf
                        <input type="hidden" name="poll_question_id" value="{{ $poll->id }}" id="poll_question_id">
                        <input type="hidden" name="ip_address">
                        @foreach ($poll->child as $answer)
                        <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customControlValidation{{$answer->id}}" name="poll_answer_id" value="{{$answer->id}}">
                            <label class="custom-control-label" for="customControlValidation{{$answer->id}}">{{$answer->poll_option}}</label>
                        </div>
                        @endforeach
                        @php
                            $ip = request()->ip();
                            $isVote = App\Models\PollResult::where('poll_question_id',$poll->id)->where('ip_address',$ip)->first();
                        @endphp
                        @if (!$isVote)
                            <button data-id="{{$poll->id}}" type="submit" class="mybtn1 vote" id="vote_success-{{$poll->id}}">{{__('Vote')}}</button>
                        @else
                            <button data-id="{{$poll->id}}" type="submit" class="mybtn1 result view_result" id="vote_view-{{$poll->id}}">{{__('View Result')}}</button>
                        @endif
                        <div class="viewVoteResult"></div>
                        <p id="errMsg"></p>
                        <div class="voteresult"></div>
                    </form>
                </div>
                @endforeach
            </div>
        @endif
    </div>


</div>

<!--=======section one End========-->


<!--=======section one add start========-->
<div class="add-section" style="margin-top: 35px; margin-bottom: 40px;">
    <div class="row">
        <div class="col-md-6 col-sm-6">
            <div class="top-add-img">
                <div class="widget_area">
                    <div class="textwidget">
                        {!!$gs->header3_728!!}
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6 col-sm-6">
            <div class="top-add-img">
                <div class="widget_area">
                    <div class="textwidget">
                        {!!$gs->header4_728!!}
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<!--=======section one add End========-->


<div class="row">
    <div class="col-md-8 col-sm-8">

        <!--=======section two  start========-->
        <div class="section-maring">

            @php
            $secondcat=DB::table('categories')->where('parent_id',null)->skip(1)->first();
            $secondcatpostbig=DB::table('posts')->where('category_id',$secondcat->id ?? 'Not
            Found')->where('is_trending',1)->orderBy('id','DESC')->limit(4)->get();
            $secondcatpostsmall=DB::table('posts')->where('category_id',$secondcat->id ?? 'Not
            Found')->where('is_trending',1)->orderBy('id','DESC')->skip(4)->limit(4)->get();
            @endphp

            <div class="category-title">
                <a href="{{ route('frontend.category',$secondcat->slug ?? 'Not Found')}}"> <i class="fa fa-bars"
                        aria-hidden="true"></i> {{ $secondcat->title ?? 'Not Found'}} </a>
            </div>

            <div class="row">


                @foreach ($secondcatpostbig as $row)
                <div class="col-md-6 col-sm-6">
                    <div class="imagr-border">
                        <div class="moddel_image">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}"> <img
                                    width="480" height="250" src="{{asset('assets/images/post/'.$row->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                                    srcset="{{asset('assets/images/post/'.$row->image_big)}} 480w, {{asset('assets/images/post/'.$row->image_big)}} 300w"
                                    sizes="(max-width: 480px) 100vw, 480px" /> </a>
                        </div>
                        <div class="hadding_02">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                        </div>
                    </div>
                </div>
                @endforeach


                @foreach ($secondcatpostsmall as $row)
                <div class="col-md-6 col-sm-6">
                    <div class="imagr-border">
                        <div class="moddel_image">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}"> <img
                                    width="480" height="250" src="{{asset('assets/images/post/'.$row->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                                    srcset="{{asset('assets/images/post/'.$row->image_big)}} 480w, {{asset('assets/images/post/'.$row->image_big)}} 300w"
                                    sizes="(max-width: 480px) 100vw, 480px" /> </a>
                        </div>
                        <div class="hadding_02">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                        </div>
                    </div>
                </div>
                @endforeach





            </div>





        </div>

        <!--=======section two  End========-->


        <!--======= add section start========-->
        <div class="add-section" style="margin-top: 35px; margin-bottom: 40px;">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="top-add-img">
                        <div class="widget_area">
                            <div class="textwidget">{!!$gs->header1_728!!}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--======= add section End========-->




        <!--=======section three  start========-->


        @php
        $thirdcat=DB::table('categories')->where('parent_id',null)->skip(2)->first();
        $thirdcatpostbig=DB::table('posts')->where('category_id',$thirdcat->id ?? 'Not
        Found')->where('is_trending',1)->orderBy('id','DESC')->limit(1)->get();
        $thirdcatpostsmall=DB::table('posts')->where('category_id',$thirdcat->id ?? 'Not
        Found')->where('is_trending',1)->orderBy('id','DESC')->skip(1)->limit(6)->get();
        @endphp

        <div class="category-title">
            <a href="{{ route('frontend.category',$thirdcat->slug ?? 'Not Found')}}"> <i class="fa fa-bars"
                    aria-hidden="true"></i> {{ $thirdcat->title ?? 'Not Found'}} </a>
        </div>

















        <div class="row">

            @foreach ($thirdcatpostsmall as $row)
            <div class="col-md-4 col-sm-4">
                <div class="box-shadow image_margin">
                    <div class="exclisive_news_image">
                        <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}"> <img
                                width="600" height="337" src="{{asset('assets/images/post/'.$row->image_big)}}"
                                class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" /> </a>
                    </div>
                    <div class="exclisive_news_padding">
                        <div class="hadding_02">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                        </div>

                    </div>

                </div>
            </div>
            @endforeach




        </div>



        <!--=======section three  End========-->

        <!--======= add section start========-->
        <div class="add-section" style="margin-top: 35px; margin-bottom: 40px;">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="top-add-img">
                        <div class="widget_area">
                            <div class="textwidget">{!!$gs->header4_728!!}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--======= add section End========-->



        <!--=======section four  start========-->
        <div class="section-margin">
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <div class="box-shadow">
                        @php
                        $saradeshcat=DB::table('categories')->where('parent_id',null)->skip(5)->first();
                        $saradeshcatpostbig=DB::table('posts')->where('category_id',$saradeshcat->id ?? 'Not
                        Found')->where('is_trending',1)->orderBy('id','DESC')->limit(1)->get();
                        $saradeshcatpostsmall=DB::table('posts')->where('category_id',$saradeshcat->id ?? 'Not
                        Found')->where('is_trending',1)->orderBy('id','DESC')->skip(1)->limit(3)->get();
                        @endphp


                        <div class="category-title">
                            <a href="{{ route('frontend.category',$saradeshcat->slug ?? 'Not Found')}}"> <i
                                    class="fa fa-bars" aria-hidden="true"></i> {{ $saradeshcat->title ?? 'Not Found'}}
                            </a>
                        </div>


                        @foreach ($saradeshcatpostbig as $row)
                        <div class="exclisive_news_image">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}"> <img
                                    width="480" height="250" src="{{asset('assets/images/post/'.$row->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                                    srcset="{{asset('assets/images/post/'.$row->image_big)}} 480w, {{asset('assets/images/post/'.$row->image_big)}} 300w"
                                    sizes="(max-width: 480px) 100vw, 480px" /> </a>
                        </div>
                        <div class="exclisive_news_padding">
                            <div class="hadding_01">
                                <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                    ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                            </div>

                            <div class="content-datelis">
                                {{strlen($row->short_description)>120 ? mb_substr($row->short_description,0,120,"utf-8")
                                : $row->short_description}} <span style="text-align:right"><a
                                        href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">বিস্তারিত...</a></span>
                            </div>
                        </div>

                        @endforeach
                        <div class="margin-top">



                            @foreach ($saradeshcatpostsmall as $row)
                            <div class="imagr-border">
                                <div class="small-imgae">
                                    <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">
                                        <img width="600" height="337"
                                            src="{{asset('assets/images/post/'.$row->image_big)}}"
                                            class="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                                            alt="" /> </a>
                                </div>
                                <div class="hadding_02">
                                    <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                        ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                                </div>
                            </div>

                            @endforeach





                            <div class="row">
                                <div class="col-md-12">
                                    <div class="more_news">
                                        <a href="{{ route('frontend.category',$saradeshcat->slug ?? 'Not Found')}}"> আরো
                                            খবর.. <i class="fa fa-angle-double-right" aria-hidden="true"></i> </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-6">
                    <div class="box-shadow">

                        @php
                        $campuscat=DB::table('categories')->where('parent_id',null)->skip(6)->first();
                        $campuscatpostbig=DB::table('posts')->where('category_id',$campuscat->id ?? 'Not
                        Found')->where('is_trending',1)->orderBy('id','DESC')->limit(1)->get();
                        $campuscatpostsmall=DB::table('posts')->where('category_id',$campuscat->id ?? 'Not
                        Found')->where('is_trending',1)->orderBy('id','DESC')->skip(1)->limit(3)->get();
                        @endphp



                        <div class="category-title">
                            <a href="{{ route('frontend.category',$campuscat->slug ?? 'Not Found')}}"> <i
                                    class="fa fa-bars" aria-hidden="true"></i> {{ $campuscat->title ?? 'Not Found'}}
                            </a>
                        </div>



                        @foreach ($campuscatpostbig as $row)
                        <div class="exclisive_news_image">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}"> <img
                                    width="600" height="337" src="{{asset('assets/images/post/'.$row->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" /> </a>
                        </div>
                        <div class="exclisive_news_padding">
                            <div class="hadding_01">
                                <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                    ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                            </div>

                            <div class="content-datelis">
                                {{strlen($row->short_description)>120 ? mb_substr($row->short_description,0,120,"utf-8")
                                : $row->short_description}}<span style="text-align:right"> <a
                                        href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">বিস্তারিত...</a></span>
                            </div>
                        </div>
                        @endforeach

                        <div class="margin-top">



                            @foreach ($campuscatpostsmall as $row)
                            <div class="imagr-border">
                                <div class="small-imgae">
                                    <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">
                                        <img width="480" height="250"
                                            src="{{asset('assets/images/post/'.$row->image_big)}}"
                                            class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                                            srcset="{{asset('assets/images/post/'.$row->image_big)}} 480w, {{asset('assets/images/post/'.$row->image_big)}} 300w"
                                            sizes="(max-width: 480px) 100vw, 480px" /> </a>
                                </div>
                                <div class="hadding_02">
                                    <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                        ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                                </div>
                            </div>
                            @endforeach






                            <div class="row">
                                <div class="col-md-12">
                                    <div class="more_news">
                                        <a href="{{ route('frontend.category',$campuscat->slug ?? 'Not Found')}}"> আরো
                                            খবর.. <i class="fa fa-angle-double-right" aria-hidden="true"></i> </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>









        <!--=======section six  start========-->

        <div class="section-margin">

            @php
            $binodoncat=DB::table('categories')->where('parent_id',null)->skip(7)->first();
            $binodoncatpostbig=DB::table('posts')->where('category_id',$binodoncat->id ?? 'Not
            Found')->where('is_trending',1)->orderBy('id','DESC')->limit(1)->get();
            $binodoncatpostsmall=DB::table('posts')->where('category_id',$binodoncat->id ?? 'Not
            Found')->where('is_trending',1)->orderBy('id','DESC')->skip(1)->limit(2)->get();
            @endphp



            <div class="category-title">
                <a href="{{ route('frontend.category',$binodoncat->slug ?? 'Not Found')}}"> <i class="fa fa-bars"
                        aria-hidden="true"></i> {{ $binodoncat->title ?? 'Not Found'}} </a>
            </div>



            <div class="row">

                <div class="col-md-8 col-sm-6">

                    @foreach ($binodoncatpostbig as $row)
                    <div class="box-shadow">
                        <div class="exclisive_news_image">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}"> <img
                                    width="600" height="337" src="{{asset('assets/images/post/'.$row->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" /> </a>
                        </div>
                        <div class="exclisive_news_padding">
                            <div class="hadding_01">
                                <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                    ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                            </div>

                            <div class="content-datelis">
                                {{strlen($row->short_description)>170 ? mb_substr($row->short_description,0,170,"utf-8")
                                : $row->short_description}} <span style="text-align:right"><a
                                        href="archives/724.html">বিস্তারিত...</a></span>
                            </div>
                        </div>

                    </div>
                    @endforeach



                </div>
                <div class="col-md-4 col-sm-6">

                    @foreach ($binodoncatpostsmall as $row)
                    <div class="box-shadow image_margin">
                        <div class="exclisive_news_image">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}"> <img
                                    width="600" height="337" src="{{asset('assets/images/post/'.$row->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" /> </a>
                        </div>
                        <div class="exclisive_news_padding">
                            <div class="hadding_02">
                                <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                    ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                            </div>
                        </div>
                    </div>
                    @endforeach


                </div>
            </div>
        </div>

        <!--=======section six  End========-->





        <!--=======photo gallery start========-->

        <div class="photo-gallery-section">


            <div class="category-title">
                <span><i class="fa fa-camera" aria-hidden="true"></i> ফটো গ্যালারী</span>
            </div>


            <div class="photo_gallary">
                <div id="myCarousel" class="carousel slide" data-ride="carousel">
                    <!-- Wrapper for slides -->
                    <div class="carousel-inner" role="listbox">


                        @foreach ($image_albums1 as $image_album1)
                        <div class="item active">
                            <div class="Name">
                                <a href="{{asset('assets/images/image-album/'.$image_album1->photo)}}">
                                    <img width="600" height="337"
                                        src="{{asset('assets/images/image-album/'.$image_album1->photo)}}"
                                        class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                                        srcset="{{asset('assets/images/image-album/'.$image_album1->photo)}} 600w, {{asset('assets/images/image-album/'.$image_album1->photo)}} 300w"
                                        sizes="(max-width: 600px) 100vw, 600px" /></a>
                                <h4 class="photo_caption"><a
                                        href="{{asset('assets/images/image-album/'.$image_album1->photo)}}">{{$image_album1->album_name}}</a>
                                </h4>
                            </div>
                        </div>
                        @endforeach



                        @foreach ($image_albums as $image_album)
                        <div class="item">
                            <div class="Name">
                                <a href="{{asset('assets/images/image-album/'.$image_album->photo)}}">
                                    <img width="600" height="337"
                                        src="{{asset('assets/images/image-album/'.$image_album->photo)}}"
                                        class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                                        srcset="{{asset('assets/images/image-album/'.$image_album->photo)}} 600w, {{asset('assets/images/image-album/'.$image_album->photo)}} 300w"
                                        sizes="(max-width: 600px) 100vw, 600px" /></a>
                                <h4 class="photo_caption"><a
                                        href="{{asset('assets/images/image-album/'.$image_album->photo)}}">{{$image_album->album_name}}</a>
                                </h4>
                            </div>
                        </div>
                        @endforeach


                    </div>
                    <!-- Controls -->
                    <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>


        </div>


        <!--=======photo gallery End========-->


        <!--======= add section start========-->
        <div class="add-section" style="margin-top: 40px; margin-bottom: 60px;">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="top-add-img">
                        <div class="widget_area">
                            <div class="textwidget">
                                {!!$gs->homepageads4_970!!}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--======= add section End========-->



        <!--=======video gallery start========-->
        <div class="video-section" style="margin-bottom: 100px;">

            <div class="category-title">
                <span> <i class="fa fa-video-camera" aria-hidden="true"></i> ভিডিও গ্যালারী </span>
            </div>

            <div class="row">

                @foreach ($video_smalls as $video_small)
                <div class="col-md-4 col-sm-4">
                    <div class="embed-responsive embed-responsive-16by9 embed-responsive-item"
                        style="margin-bottom:5px;">
                        <p><iframe src="https://www.youtube.com/embed/{{ $video_small->embed_video ??'' }}" width="263"
                                height="148" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>
                    </div>
                </div>
                @endforeach




            </div>
        </div>


        <!--=======video gallery  End========-->




        <!--=======section nine  start========-->
        <div class="section-margin">
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <div class="box-shadow">
                        @php
                        $fourthcat=DB::table('categories')->where('parent_id',null)->skip(3)->first();
                        $fourthcatpostbig=DB::table('posts')->where('category_id',$fourthcat->id ?? 'Not
                        Found')->where('is_trending',1)->orderBy('id','DESC')->limit(1)->get();
                        $fourthcatpostsmall=DB::table('posts')->where('category_id',$fourthcat->id ?? 'Not
                        Found')->where('is_trending',1)->orderBy('id','DESC')->skip(1)->limit(4)->get();
                        @endphp


                        <div class="category-title">
                            <a href="{{ route('frontend.category',$fourthcat->slug ?? 'Not Found')}}"> <i
                                    class="fa fa-bars" aria-hidden="true"></i> {{ $fourthcat->title ?? 'Not Found'}}
                            </a>
                        </div>


                        @foreach ($fourthcatpostbig as $row)
                        <div class="exclisive_news_image">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}"> <img
                                    width="480" height="250" src="{{asset('assets/images/post/'.$row->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                                    srcset="{{asset('assets/images/post/'.$row->image_big)}} 480w, {{asset('assets/images/post/'.$row->image_big)}} 300w"
                                    sizes="(max-width: 480px) 100vw, 480px" /> </a>
                        </div>
                        <div class="exclisive_news_padding">
                            <div class="hadding_01">
                                <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                    ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                            </div>

                            <div class="content-datelis">
                                {{strlen($row->short_description)>130 ? mb_substr($row->short_description,0,130,"utf-8")
                                : $row->short_description}} <span style="text-align:right"><a
                                        href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">বিস্তারিত...</a></span>
                            </div>
                        </div>
                        @endforeach

                        <div class="margin-top">



                            @foreach ($fourthcatpostsmall as $row)
                            <div class="imagr-border">
                                <div class="small-imgae">
                                    <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">
                                        <img width="600" height="337"
                                            src="{{asset('assets/images/post/'.$row->image_big)}}"
                                            class="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                                            alt="" /> </a>
                                </div>
                                <div class="hadding_02">
                                    <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                        ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                                </div>
                            </div>
                            @endforeach






                            <div class="row">
                                <div class="col-md-12">
                                    <div class="more_news">
                                        <a href="{{ route('frontend.category',$fourthcat->slug ?? 'Not Found')}}"> আরো
                                            খবর.. <i class="fa fa-angle-double-right" aria-hidden="true"></i> </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-6">
                    <div class="box-shadow">

                        @php
                        $fifthcat=DB::table('categories')->where('parent_id',null)->skip(4)->first();
                        $fifthcatpostbig=DB::table('posts')->where('category_id',$fifthcat->id ?? 'Not
                        Found')->where('is_trending',1)->orderBy('id','DESC')->limit(1)->get();
                        $fifthcatpostsmall=DB::table('posts')->where('category_id',$fifthcat->id ?? 'Not
                        Found')->where('is_trending',1)->orderBy('id','DESC')->skip(1)->limit(4)->get();
                        @endphp

                        <div class="category-title">
                            <a href="{{ route('frontend.category',$fifthcat->slug ?? 'Not Found')}}"> <i
                                    class="fa fa-bars" aria-hidden="true"></i> {{ $fifthcat->title ?? 'Not Found'}} </a>
                        </div>



                        @foreach ($fifthcatpostbig as $row)
                        <div class="exclisive_news_image">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}"> <img
                                    width="600" height="337" src="{{asset('assets/images/post/'.$row->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" /> </a>
                        </div>
                        <div class="exclisive_news_padding">
                            <div class="hadding_01">
                                <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                    ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                            </div>

                            <div class="content-datelis">
                                {{strlen($row->short_description)>130 ? mb_substr($row->short_description,0,130,"utf-8")
                                : $row->short_description}} <span style="text-align:right"><a
                                        href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">বিস্তারিত...</a></span>
                            </div>
                        </div>
                        @endforeach

                        <div class="margin-top">



                            @foreach ($fifthcatpostsmall as $row)
                            <div class="imagr-border">
                                <div class="small-imgae">
                                    <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">
                                        <img width="600" height="337"
                                            src="{{asset('assets/images/post/'.$row->image_big)}}"
                                            class="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                                            alt="" /> </a>
                                </div>
                                <div class="hadding_02">
                                    <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                        ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                                </div>
                            </div>
                            @endforeach





                            <div class="row">
                                <div class="col-md-12">
                                    <div class="more_news">
                                        <a href="{{ route('frontend.category',$fifthcat->slug ?? 'Not Found')}}"> আরো
                                            খবর.. <i class="fa fa-angle-double-right" aria-hidden="true"></i> </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>

        <!--=======section nine  End========-->
        <!--======= add section start========-->
        <div class="add-section">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="top-add-img">
                    </div>
                </div>
            </div>
        </div>
        <!--======= add section End============-->
        <!--=======section ten  start========-->

        <div class="section-margin">


            @php
            $endcat=DB::table('categories')->where('parent_id',null)->skip(9)->first();
            $endcatpostbig=DB::table('posts')->where('category_id',$endcat->id ?? 'Not
            Found')->where('is_trending',1)->orderBy('id','DESC')->limit(1)->get();
            $endcatpostsmall=DB::table('posts')->where('category_id',$endcat->id ?? 'Not
            Found')->where('is_trending',1)->orderBy('id','DESC')->limit(2)->get();
            @endphp
            <div class="category-title">
                <a href="{{ route('frontend.category',$endcat->slug ?? 'Not Found')}}"> <i class="fa fa-bars"
                        aria-hidden="true"></i> {{ $endcat->title ?? 'Not Found'}} </a>
            </div>


            <div class="row">

                <div class="col-md-8 col-sm-6">

                    @foreach ($endcatpostbig as $row)
                    <div class="box-shadow">
                        <div class="exclisive_news_image">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}"> <img
                                    width="600" height="337" src="{{asset('assets/images/post/'.$row->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" /> </a>
                        </div>
                        <div class="exclisive_news_padding">
                            <div class="hadding_01">
                                <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                    ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                            </div>

                            <div class="content-datelis">
                                {{strlen($row->short_description)>240 ? mb_substr($row->short_description,0,240,"utf-8")
                                : $row->short_description}}<span style="text-align:right"><a
                                        href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">বিস্তারিত...</a></span>
                            </div>
                        </div>
                        @endforeach
                    </div>




                </div>
                <div class="col-md-4 col-sm-6">

                    @foreach ($endcatpostsmall as $row)
                    <div class="box-shadow image_margin">
                        <div class="exclisive_news_image">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}"> <img
                                    width="480" height="250" src="{{asset('assets/images/post/'.$row->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                                    srcset="{{asset('assets/images/post/'.$row->image_big)}} 480w, {{asset('assets/images/post/'.$row->image_big)}} 300w"
                                    sizes="(max-width: 480px) 100vw, 480px" /> </a>
                        </div>
                        <div class="exclisive_news_padding">
                            <div class="hadding_02">
                                <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>45
                                    ? mb_substr($row->title,0,45,"utf-8") : $row->title}}..</a>
                            </div>
                        </div>
                    </div>
                    @endforeach




                </div>
            </div>
        </div>

        <!--=======section ten  End========-->







    </div>




    <div class="col-md-4 col-sm-4">



        <div class="sitebar-widget">
        </div>

        <!------------- facebook & archive Start -------------->

        <!-- Facebook Start -->

                @if ($ws->calendar_inhome == 1)
                    <div class="celander-widget-area mt-4">
                        <div id="datecalender"></div>
                    </div>
                @endif

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

                        @foreach($is_trendings as $is_trending)
                        <div class="tab-border">
                            <h4 class="hadding_02"><i class="fa fa-angle-double-right" aria-hidden="true"></i> <a
                                    href="{{ route('frontend.postBySubcategory.details',[$is_trending->category->slug,$is_trending->slug])}}">{{strlen($is_trending->title)>60
                                    ? mb_substr($is_trending->title,0,60,"utf-8") : $is_trending->title}}</a> </h4>
                        </div>
                        @endforeach

                    </div>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="tab22">
                    <div class="news-titletab">
                        @foreach ($is_recents as $is_recent)
                        <div class="tab-border">
                            <h4 class="hadding_02"><i class="fa fa-angle-double-right" aria-hidden="true"></i> <a
                                    href="{{route('frontend.postBySubcategory.details',[$is_recent->category->slug,$is_recent->slug])}}">{{strlen($is_recent->title)>60
                                    ? mb_substr($is_recent->title,0,60,"utf-8") : $is_recent->title}} </a> </h4>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>



        {{-- <div class="add-section">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="top-add-img">
                        <div class="widget_area">
                            <div class="textwidget">

                                {!! $gs->sidebar_ads !!}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> --}}

        <div class="facebook_title">
            ফেসবুকে আমরা... </div>

        <div class="fb-root">
            <script>
                (function(d, s, id) {
								  var js, fjs = d.getElementsByTagName(s)[0];
								  if (d.getElementById(id)) return;
								  js = d.createElement(s); js.id = id;
								  js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
								  fjs.parentNode.insertBefore(js, fjs);
								  }(document, 'script', 'facebook-jssdk'));
            </script>
            <div class="fb-page" data-href="https://www.facebook.com/{{ $gs->facebook_page_url }}" data-tabs="timeline"
                data-width="390" data-height="330" data-small-header="true" data-adapt-container-width="true"
                data-hide-cover="false" data-show-facepile="true"></div>
        </div>


        <!-- Facebook Close -->


        <div class="archive_calender_sec">
            <div class="archive_title">আমাদের জাতীয় সঙ্গীত</div>
            <audio controls="" style="width:100%">
                <source src="{{asset('assets/frontend/bd_national_anthem.mp3')}}" type="audio/mp3">
            </audio>
        </div>




        <!--======= sitebar category section one  Start========-->
        <div class="section-margin">



            <div class="category-title">
                <a href=""> <i class="fa fa-bars" aria-hidden="true"></i> সম্প্রতি প্রকাশিত সংবাদ </a>
            </div>


            <div class="box-shadow">


                @foreach ($slider_rights_seconds as $is_recent)
                <div class="exclisive_news_image">
                    <a
                        href="{{route('frontend.postBySubcategory.details',[$is_recent->category->slug,$is_recent->slug])}}">
                        <img width="600" height="337" src="{{asset('assets/images/post/'.$is_recent->image_big)}}"
                            class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" /> </a>
                </div>
                <div class="exclisive_news_padding">
                    <div class="hadding_01">
                        <a
                            href="{{route('frontend.postBySubcategory.details',[$is_recent->category->slug,$is_recent->slug])}}">{{strlen($is_recent->title)>60
                            ? mb_substr($is_recent->title,0,60,"utf-8") : $is_recent->title}}</a>
                    </div>

                    <div class="content-datelis">
                        {{strlen($is_recent->short_description)>80 ?
                        mb_substr($is_recent->short_description,0,80,"utf-8") : $is_recent->short_description}} <span
                            style="text-align:right"><a href="archives/972.html">বিস্তারিত...</a></span>
                    </div>
                </div>
                @endforeach

                <div class="margin-top">


                    @foreach ($slider_rights_seconds1 as $is_recent)
                    <div class="imagr-border">
                        <div class="small-imgae">
                            <a
                                href="{{route('frontend.postBySubcategory.details',[$is_recent->category->slug,$is_recent->slug])}}">
                                <img width="600" height="337"
                                    src="{{asset('assets/images/post/'.$is_recent->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" /> </a>
                        </div>
                        <div class="hadding_02">
                            <a
                                href="{{route('frontend.postBySubcategory.details',[$is_recent->category->slug,$is_recent->slug])}}">{{strlen($is_recent->title)>60
                                ? mb_substr($is_recent->title,0,60,"utf-8") : $is_recent->title}}</a>
                        </div>
                    </div>
                    @endforeach




                    <div class="row">
                        <div class="col-md-12">
                        </div>
                    </div>
                </div>
            </div>
        </div>





        <!--======= sitebar category section one  End========-->

        <div class="add-section">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="top-add-img">
                        <div class="widget_area">
                            <div class="textwidget">
                                {!! $gs->sidebar_ads1 !!}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




        <!--======= sitebar category section Two  Start========-->
        <div class="section-margin">
            @php
            $khelacat=DB::table('categories')->where('parent_id',null)->skip(8)->first();
            $khelacatpostbig=DB::table('posts')->where('category_id',$khelacat->id ?? 'Not
            Found')->where('is_trending',1)->orderBy('id','DESC')->limit(1)->get();
            $khelacatpostsmall=DB::table('posts')->where('category_id',$khelacat->id ?? 'Not
            Found')->where('is_trending',1)->orderBy('id','DESC')->skip(1)->limit(4)->get();
            @endphp


            <div class="category-title">
                <a href="{{ route('frontend.category',$khelacat->slug ?? 'Not Found')}}"> <i class="fa fa-bars"
                        aria-hidden="true"></i> {{ $khelacat->title ?? 'Not Found'}} </a>
            </div>


            <div class="box-shadow">


                @foreach ($khelacatpostbig as $row)
                <div class="exclisive_news_image">
                    <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}"> <img width="480"
                            height="250" src="{{asset('assets/images/post/'.$row->image_big)}}"
                            class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                            srcset="{{asset('assets/images/post/'.$row->image_big)}} 480w, {{asset('assets/images/post/'.$row->image_big)}} 300w"
                            sizes="(max-width: 480px) 100vw, 480px" /> </a>
                </div>
                <div class="exclisive_news_padding">
                    <div class="hadding_01">
                        <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                            ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                    </div>

                    <div class="content-datelis">
                        {{strlen($row->short_description)>120 ? mb_substr($row->short_description,0,120,"utf-8") :
                        $row->short_description}} <span style="text-align:right"><a
                                href="archives/1039.html">বিস্তারিত...</a></span>
                    </div>
                </div>
                @endforeach

                <div class="margin-top">


                    @foreach ($khelacatpostsmall as $row)
                    <div class="imagr-border">
                        <div class="small-imgae">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}"> <img
                                    width="600" height="337" src="{{asset('assets/images/post/'.$row->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" /> </a>
                        </div>
                        <div class="hadding_02">
                            <a href="{{ route('frontend.postBySubcategory.details',[$row->id,$row->slug])}}">{{strlen($row->title)>60
                                ? mb_substr($row->title,0,60,"utf-8") : $row->title}}</a>
                        </div>
                    </div>
                    @endforeach




                    <div class="row">
                        <div class="col-md-12">
                            <div class="more_news">
                                <a href="{{ route('frontend.category',$khelacat->slug ?? 'Not Found')}}"> আরো খবর.. <i
                                        class="fa fa-angle-double-right" aria-hidden="true"></i> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>





        <!--======= sitebar category section two  End========-->

        <div class="add-section">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="top-add-img">
                        <div class="widget_area">
                            <div class="textwidget">
                                {!! $gs->sidebar_adsbig !!}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!--======= sitebar category section Three  Start========-->
        <div class="section-margin">



            <div class="category-title">
                <a href=""> <i class="fa fa-bars" aria-hidden="true"></i> ফিচারড নিউজ </a>
            </div>


            <div class="box-shadow">


                @foreach ($is_features as $is_recent)
                <div class="exclisive_news_image">
                    <a
                        href="{{route('frontend.postBySubcategory.details',[$is_recent->category->slug,$is_recent->slug])}}">
                        <img width="600" height="337" src="{{asset('assets/images/post/'.$is_recent->image_big)}}"
                            class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                            srcset="{{asset('assets/images/post/'.$is_recent->image_big)}} 600w, {{asset('assets/images/post/'.$is_recent->image_big)}} 300w, {{asset('assets/images/post/'.$is_recent->image_big)}} 640w"
                            sizes="(max-width: 600px) 100vw, 600px" /> </a>
                </div>
                <div class="exclisive_news_padding">
                    <div class="hadding_01">
                        <a
                            href="{{route('frontend.postBySubcategory.details',[$is_recent->category->slug,$is_recent->slug])}}">{{strlen($is_recent->title)>70
                            ? mb_substr($is_recent->title,0,70,"utf-8") : $is_recent->title}}</a>
                    </div>

                    <div class="content-datelis">
                        {{strlen($is_recent->short_description)>150 ?
                        mb_substr($is_recent->short_description,0,150,"utf-8") : $is_recent->short_description}} <span
                            style="text-align:right"><a
                                href="{{route('frontend.postBySubcategory.details',[$is_recent->category->slug,$is_recent->slug])}}">বিস্তারিত...</a></span>
                    </div>
                </div>
                @endforeach

                <div class="margin-top">


                    @foreach ($is_features1 as $is_recent)
                    <div class="imagr-border">
                        <div class="small-imgae">
                            <a
                                href="{{route('frontend.postBySubcategory.details',[$is_recent->category->slug,$is_recent->slug])}}">
                                <img width="600" height="337"
                                    src="{{asset('assets/images/post/'.$is_recent->image_big)}}"
                                    class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                                    srcset="{{asset('assets/images/post/'.$is_recent->image_big)}} 600w, {{asset('assets/images/post/'.$is_recent->image_big)}} 300w, {{asset('assets/images/post/'.$is_recent->image_big)}} 640w"
                                    sizes="(max-width: 600px) 100vw, 600px" /> </a>
                        </div>
                        <div class="hadding_02">
                            <a
                                href="{{route('frontend.postBySubcategory.details',[$is_recent->category->slug,$is_recent->slug])}}">{{strlen($is_recent->title)>70
                                ? mb_substr($is_recent->title,0,70,"utf-8") : $is_recent->title}}</a>
                        </div>
                    </div>
                    @endforeach






                    <div class="row">
                        <div class="col-md-12">
                            <div class="more_news">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!--======= sitebar category section Three  End========-->


        <div class="add-section">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="top-add-img">
                        <div class="widget_area">
                            <div class="textwidget">

                                {!! $gs->sidebar_ads !!}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>

</div>


<!--======= add section start========-->
<div class="add-section">
    <div class="row">
        <div class="col-md-12 col-sm-12">
            <div class="top-add-img">
                <div class="widget_area">
                    <div class="textwidget">{!!$gs->homepageads2_970!!}</div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--======= add section End============-->

@endsection