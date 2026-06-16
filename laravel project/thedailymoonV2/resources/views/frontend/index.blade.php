@extends('layouts.front')
@section('contents')
@section('meta')
<meta name="Description" content="{!! $seo->meta_description !!}">
<meta name="Keywords" content="{!! $seo->meta_keys !!}">
<meta property="og:title" content="{{ $gs->title }}" />
<meta property="og:description" content="{!! $seo->meta_description !!}" />
<meta property="og:image" content="{{asset('assets/images/'.$gs->og_baner)}}" />
@endsection

<!-- BBC Inspired Stylesheet -->
<style>
    :root {
        --bbc-red: #B80000;
        --bbc-dark-red: #8B0000;
        --bbc-bg: #FFFFFF;
        --bbc-card-bg: #FFFFFF;
        --bbc-text-primary: #111111;
        --bbc-text-secondary: #555555;
        --bbc-border: #E5E7EB;
        --bbc-notice-bg: #FFECEC;
        --bbc-notice-text: #B80000;
        --bbc-font-main: 'BBC Reith Sans', 'Noto Serif Bengali', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    /* Base Layout Reset */
    .bbc-home-wrapper {
        font-family: var(--bbc-font-main);
        background-color: #F8F9FA;
        color: var(--bbc-text-primary);
        padding: 20px 0;
    }

    /* Breaking News Ticker */
    .bbc-breaking-bar {
        display: flex;
        align-items: center;
        background-color: var(--bbc-notice-bg);
        border: 1px solid #FFD3D3;
        margin-bottom: 16px;
        border-radius: 0px;
        overflow: hidden;
    }
    .bbc-breaking-label {
        background-color: var(--bbc-red);
        color: #FFF;
        font-weight: 800;
        padding: 8px 16px;
        font-size: 14px;
        white-space: nowrap;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .bbc-breaking-ticker {
        flex: 1;
        padding: 8px 12px;
        font-size: 14px;
        font-weight: 600;
    }
    .bbc-breaking-ticker marquee a {
        color: var(--bbc-notice-text);
        text-decoration: none;
        transition: color 0.2s;
    }
    .bbc-breaking-ticker marquee a:hover {
        text-decoration: underline;
    }

    /* Hero Layout Grid */
    .bbc-hero-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 12px;
        margin-bottom: 20px;
    }
    @media (max-width: 1024px) {
        .bbc-hero-grid {
            grid-template-columns: 1.5fr 1fr;
        }
        .bbc-hero-sidebar {
            grid-column: span 2;
        }
    }
    @media (max-width: 768px) {
        .bbc-hero-grid {
            grid-template-columns: 1fr;
        }
        .bbc-hero-sidebar, .bbc-hero-middle {
            grid-column: span 1;
        }
    }

    /* Component Cards */
    .bbc-card {
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--bbc-border);
        padding-bottom: 12px;
        border-radius: 0px;
        overflow: hidden;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
        height: auto;
        text-decoration: none !important;
        color: inherit !important;
    }
    .bbc-card:hover .bbc-card-title {
        color: var(--bbc-red);
        text-decoration: underline;
    }
    .bbc-card-img-wrapper {
        position: relative;
        overflow: hidden;
        padding-top: 56.25%; /* 16:9 Aspect Ratio */
        margin-bottom: 8px;
    }
    .bbc-card-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    .bbc-card:hover .bbc-card-img {
        transform: scale(1.03);
    }
    .bbc-card-content {
        padding: 4px 0;
        display: flex;
        flex-direction: column;
    }
    .bbc-card-category {
        color: var(--bbc-red);
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
        margin-bottom: 4px;
        letter-spacing: 0.5px;
    }
    .bbc-card-title {
        font-size: 17px;
        font-weight: 700;
        line-height: 1.35;
        margin-bottom: 6px;
        color: var(--bbc-text-primary);
    }
    .bbc-card-desc {
        font-size: 13px;
        color: var(--bbc-text-secondary);
        line-height: 1.45;
        margin-bottom: 8px;
    }

    /* Lead Hero Card Styling */
    .bbc-lead-card {
        border-bottom: none;
    }
    .bbc-lead-card .bbc-card-title {
        font-size: 22px;
        font-weight: 800;
    }
    @media (max-width: 768px) {
        .bbc-lead-card .bbc-card-title {
            font-size: 18px;
        }
    }

    /* Category Section Headers */
    .bbc-section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid var(--bbc-text-primary);
        padding-bottom: 6px;
        margin-bottom: 16px;
        margin-top: 24px;
    }
    .bbc-section-title {
        font-size: 20px;
        font-weight: 800;
        color: var(--bbc-text-primary);
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .bbc-section-title::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 18px;
        background-color: var(--bbc-red);
        border-radius: 0px;
    }
    .bbc-section-title:hover {
        color: var(--bbc-red);
    }
    .bbc-section-more {
        font-size: 13px;
        font-weight: 700;
        color: var(--bbc-red);
        text-decoration: none;
    }
    .bbc-section-more:hover {
        text-decoration: underline;
    }

    /* Grid layouts for components */
    .bbc-grid-4 {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
    }
    .bbc-grid-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }
    .bbc-grid-2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }
    @media (max-width: 992px) {
        .bbc-grid-4 {
            grid-template-columns: repeat(2, 1fr);
        }
        .bbc-grid-3 {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width: 600px) {
        .bbc-grid-4, .bbc-grid-3, .bbc-grid-2 {
            grid-template-columns: 1fr;
        }
    }

    /* Sidebar Widgets */
    .bbc-widget {
        background: #FFF;
        border: 1px solid var(--bbc-border);
        border-radius: 0px;
        padding: 16px;
        margin-bottom: 16px;
    }
    .bbc-widget-title {
        font-size: 16px;
        font-weight: 800;
        margin-bottom: 12px;
        border-bottom: 2px solid var(--bbc-red);
        padding-bottom: 4px;
    }
    
    /* Tabs styling */
    .bbc-tabs {
        display: flex;
        border-bottom: 1px solid var(--bbc-border);
        margin-bottom: 12px;
    }
    .bbc-tab-btn {
        flex: 1;
        text-align: center;
        padding: 8px;
        font-weight: 700;
        font-size: 13px;
        background: none;
        border: none;
        color: var(--bbc-text-secondary);
        cursor: pointer;
        border-bottom: 2px solid transparent;
        outline: none !important;
    }
    .bbc-tab-btn.active {
        color: var(--bbc-red);
        border-bottom-color: var(--bbc-red);
    }
    
    /* List items in widgets */
    .bbc-list-item {
        display: flex;
        gap: 10px;
        padding: 10px 0;
        border-bottom: 1px solid var(--bbc-border);
        text-decoration: none;
        color: inherit;
    }
    .bbc-list-item:last-child {
        border-bottom: none;
    }
    .bbc-list-item-img {
        width: 70px;
        height: 50px;
        object-fit: cover;
        border-radius: 0px;
    }
    .bbc-list-item-title {
        font-size: 13px;
        font-weight: 700;
        line-height: 1.35;
    }
    .bbc-list-item:hover .bbc-list-item-title {
        color: var(--bbc-red);
    }

    /* Poll custom styling */
    .poll-box {
        margin-top: 8px;
    }
    .poll-box .custom-radio {
        margin-bottom: 8px;
        font-size: 13px;
    }
    .vote-btn {
        background-color: var(--bbc-red);
        color: #FFF;
        border: none;
        padding: 6px 12px;
        font-weight: 700;
        border-radius: 0px;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .vote-btn:hover {
        background-color: var(--bbc-dark-red);
    }

    /* Video section styling */
    .bbc-video-grid {
        background-color: #111;
        color: #FFF;
        padding: 24px 16px;
        border-radius: 0px;
        margin-bottom: 24px;
    }
    .bbc-video-grid .bbc-section-title {
        color: #FFF;
        border-bottom: 1px solid #333;
        padding-bottom: 8px;
    }
    .bbc-video-card {
        background: #222;
        border-color: #333;
    }
    .bbc-video-card .bbc-card-title {
        color: #FFF;
    }

    /* Ad Banner Center Align */
    .bbc-ad-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
    }
</style>

<div class="bbc-home-wrapper">
    <div class="container">
        
        <!-- Breaking News Bar -->
        <div class="bbc-breaking-bar">
            <div class="bbc-breaking-label">নোটিশ</div>
            <div class="bbc-breaking-ticker">
                <marquee direction="left" scrollamount="4px" onmouseover="this.stop()" onmouseout="this.start()">
                    <i class="fa fa-square" aria-hidden="true" style="font-size: 10px; margin-right: 10px; color: var(--bbc-red);"></i>
                    <a href="#">{{ $gs->notice_text }}</a>
                </marquee>
            </div>
        </div>

        <!-- Hero Section Grid -->
        <div class="bbc-hero-grid">
            
            <!-- Main Lead Story (Left Column) -->
            <div class="bbc-hero-left">
                @if(isset($sliders1) && count($sliders1) > 0)
                    @php $lead = $sliders1[0]; @endphp
                    <a href="{{ route('frontend.postBySubcategory.details',[$lead->category->slug ?? 'category',$lead->slug])}}" class="bbc-card bbc-lead-card">
                        <div class="bbc-card-img-wrapper">
                            <img class="bbc-card-img" src="{{asset('assets/images/post/'.$lead->image_big)}}" alt="{{ $lead->title }}" />
                        </div>
                        <div class="bbc-card-content">
                            <div>
                                <span class="bbc-card-category">{{ $lead->category->title ?? '' }}</span>
                                <h2 class="bbc-card-title">{{strlen($lead->title)>100 ? mb_substr($lead->title,0,100,"utf-8") : $lead->title}}</h2>
                                <p class="bbc-card-desc">{!! strlen($lead->short_description)>150 ? mb_substr($lead->short_description,0,150,"utf-8").'...' : $lead->short_description !!}</p>
                            </div>
                            <span style="color: var(--bbc-red); font-weight: 700; font-size: 13px;">বিস্তারিত পড়ুন &rarr;</span>
                        </div>
                    </a>
                @endif
            </div>

            <!-- Secondary Vertical Grid (Middle Column) -->
            <div class="bbc-hero-middle" style="display: flex; flex-direction: column; gap: 12px;">
                @foreach ($sliders->take(2) as $slider)
                    <a href="{{ route('frontend.postBySubcategory.details',[$slider->category->slug ?? 'category',$slider->slug])}}" class="bbc-card">
                        <div class="bbc-card-img-wrapper">
                            <img class="bbc-card-img" src="{{asset('assets/images/post/'.$slider->image_big)}}" alt="{{ $slider->title }}" />
                        </div>
                        <div class="bbc-card-content">
                            <span class="bbc-card-category">{{ $slider->category->title ?? '' }}</span>
                            <h3 class="bbc-card-title" style="font-size: 15px;">{{strlen($slider->title)>60 ? mb_substr($slider->title,0,60,"utf-8").'...' : $slider->title}}</h3>
                        </div>
                    </a>
                @endforeach
            </div>

            <!-- Widgets (Right Column) -->
            <div class="bbc-hero-sidebar">
                
                <!-- Tabbed Latest / Popular -->
                <div class="bbc-widget" style="padding: 15px;">
                    <div class="bbc-tabs">
                        <button class="bbc-tab-btn active" onclick="switchBbcTab('latest')">সর্বশেষ সংবাদ</button>
                        <button class="bbc-tab-btn" onclick="switchBbcTab('popular')">জনপ্রিয় সংবাদ</button>
                    </div>
                    
                    <div id="bbc-tab-latest">
                        @foreach($is_trendings->take(5) as $is_trending)
                            <a href="{{ route('frontend.postBySubcategory.details',[$is_trending->category->slug ?? 'category',$is_trending->slug])}}" class="bbc-list-item">
                                <img class="bbc-list-item-img" src="{{asset('assets/images/post/'.$is_trending->image_big)}}" alt="" />
                                <div class="bbc-list-item-title">{{strlen($is_trending->title)>50 ? mb_substr($is_trending->title,0,50,"utf-8").'...' : $is_trending->title}}</div>
                            </a>
                        @endforeach
                    </div>
                    
                    <div id="bbc-tab-popular" style="display: none;">
                        @foreach ($is_recents->take(5) as $is_recent)
                            <a href="{{route('frontend.postBySubcategory.details',[$is_recent->category->slug ?? 'category',$is_recent->slug])}}" class="bbc-list-item">
                                <img class="bbc-list-item-img" src="{{asset('assets/images/post/'.$is_recent->image_big)}}" alt="" />
                                <div class="bbc-list-item-title">{{strlen($is_recent->title)>50 ? mb_substr($is_recent->title,0,50,"utf-8").'...' : $is_recent->title}}</div>
                            </a>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>

        <script>
            function switchBbcTab(tabName) {
                var buttons = document.querySelectorAll('.bbc-tab-btn');
                buttons.forEach(btn => btn.classList.remove('active'));
                
                if (tabName === 'latest') {
                    document.getElementById('bbc-tab-latest').style.display = 'block';
                    document.getElementById('bbc-tab-popular').style.display = 'none';
                    event.currentTarget.classList.add('active');
                } else {
                    document.getElementById('bbc-tab-latest').style.display = 'none';
                    document.getElementById('bbc-tab-popular').style.display = 'block';
                    event.currentTarget.classList.add('active');
                }
            }
        </script>

        <!-- Dynamic Category Section 1 (Second Category) -->
        @php
            $secondcat=DB::table('categories')->where('parent_id',null)->skip(1)->first();
            if ($secondcat) {
                $secondcatpostbig=DB::table('posts')->where('category_id',$secondcat->id)->where('status',true)->where('is_pending',0)->orderBy('id','DESC')->limit(4)->get();
            }
        @endphp
        @if ($secondcat && isset($secondcatpostbig) && count($secondcatpostbig) > 0)
            <div class="bbc-section-header">
                <a href="{{ route('frontend.category',$secondcat->slug)}}" class="bbc-section-title">{{ $secondcat->title }}</a>
                <a href="{{ route('frontend.category',$secondcat->slug)}}" class="bbc-section-more">আরো খবর &raquo;</a>
            </div>
            <div class="bbc-grid-4">
                @foreach ($secondcatpostbig as $row)
                    <a href="{{ route('frontend.postBySubcategory.details',[$secondcat->slug,$row->slug])}}" class="bbc-card">
                        <div class="bbc-card-img-wrapper">
                            <img class="bbc-card-img" src="{{asset('assets/images/post/'.$row->image_big)}}" alt="{{ $row->title }}" />
                        </div>
                        <div class="bbc-card-content">
                            <h3 class="bbc-card-title" style="font-size: 15px;">{{strlen($row->title)>65 ? mb_substr($row->title,0,65,"utf-8").'...' : $row->title}}</h3>
                        </div>
                    </a>
                @endforeach
            </div>
        @endif

        <!-- Poll & Facebook Section -->
        <div class="bbc-grid-2" style="margin-top: 30px; margin-bottom: 20px;">
            <!-- Poll widget -->
            @if ($ws->poll_inhome == 1 && count($polls) > 0)
                @php $poll = $polls[0]; @endphp
                <div class="bbc-widget" style="margin-bottom: 0;">
                    <div class="bbc-widget-title" style="border-bottom: 2px solid var(--bbc-red);">জনমত জরিপ</div>
                    <div class="poll-box">
                        <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 12px; line-height: 1.4;">
                            <i class="far fa-question-circle"></i> {{$poll->question}}
                        </h4>
                        <form id="voteform{{$poll->id}}" action="{{ route('front.poll.vote')}}" method="POST" class="voteform">
                            @csrf
                            <input type="hidden" name="poll_question_id" value="{{ $poll->id }}">
                            <input type="hidden" name="ip_address">
                            @foreach ($poll->child as $answer)
                                <div class="custom-control custom-radio" style="margin-bottom: 8px;">
                                    <input type="radio" class="custom-control-input" id="customControlValidation{{$answer->id}}" name="poll_answer_id" value="{{$answer->id}}">
                                    <label class="custom-control-label" for="customControlValidation{{$answer->id}}">{{$answer->poll_option}}</label>
                                </div>
                            @endforeach
                            @php
                                $ip = request()->ip();
                                $isVote = App\Models\PollResult::where('poll_question_id',$poll->id)->where('ip_address',$ip)->first();
                            @endphp
                            <div style="margin-top: 15px;">
                                @if (!$isVote)
                                    <button data-id="{{$poll->id}}" type="submit" class="vote-btn vote" id="vote_success-{{$poll->id}}">ভোট দিন</button>
                                @else
                                    <button data-id="{{$poll->id}}" type="submit" class="vote-btn result view_result" id="vote_view-{{$poll->id}}">ফলাফল দেখুন</button>
                                @endif
                            </div>
                            <div class="viewVoteResult" style="margin-top: 10px;"></div>
                            <p id="errMsg" style="color: red; font-size: 12px; margin-top: 5px;"></p>
                            <div class="voteresult"></div>
                        </form>
                    </div>
                </div>
            @endif

            <!-- Facebook widget -->
            <div class="bbc-widget" style="margin-bottom: 0; display: flex; flex-direction: column;">
                <div class="bbc-widget-title" style="border-bottom: 2px solid var(--bbc-red);">ফেসবুকে আমরা...</div>
                <div class="fb-root-wrapper" style="flex-grow: 1; display: flex; align-items: center; justify-content: center; min-height: 200px;">
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
                            data-width="390" data-height="220" data-small-header="true" data-adapt-container-width="true"
                            data-hide-cover="false" data-show-facepile="true"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Ad Slot -->
        @if($gs->header1_728)
            <div class="bbc-ad-container">
                {!! $gs->header1_728 !!}
            </div>
        @endif

        <!-- Dynamic Category Section 2 (Third Category) -->
        @php
            $thirdcat=DB::table('categories')->where('parent_id',null)->skip(2)->first();
            if ($thirdcat) {
                $thirdcatpostsmall=DB::table('posts')->where('category_id',$thirdcat->id)->where('status',true)->where('is_pending',0)->orderBy('id','DESC')->limit(6)->get();
            }
        @endphp
        @if ($thirdcat && isset($thirdcatpostsmall) && count($thirdcatpostsmall) > 0)
            <div class="bbc-section-header">
                <a href="{{ route('frontend.category',$thirdcat->slug)}}" class="bbc-section-title">{{ $thirdcat->title }}</a>
                <a href="{{ route('frontend.category',$thirdcat->slug)}}" class="bbc-section-more">আরো খবর &raquo;</a>
            </div>
            <div class="bbc-grid-3">
                @foreach ($thirdcatpostsmall as $row)
                    <a href="{{ route('frontend.postBySubcategory.details',[$thirdcat->slug,$row->slug])}}" class="bbc-card">
                        <div class="bbc-card-img-wrapper">
                            <img class="bbc-card-img" src="{{asset('assets/images/post/'.$row->image_big)}}" alt="{{ $row->title }}" />
                        </div>
                        <div class="bbc-card-content">
                            <h3 class="bbc-card-title" style="font-size: 15px;">{{strlen($row->title)>65 ? mb_substr($row->title,0,65,"utf-8").'...' : $row->title}}</h3>
                        </div>
                    </a>
                @endforeach
            </div>
        @endif

        <!-- Ad Slot -->
        @if($gs->header4_728)
            <div class="bbc-ad-container">
                {!! $gs->header4_728 !!}
            </div>
        @endif

        <!-- Two Column Categories (Saradesh & Campus) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 20px;">
            @php
                $saradeshcat=DB::table('categories')->where('parent_id',null)->skip(5)->first();
                if ($saradeshcat) {
                    $saradeshcatpostbig=DB::table('posts')->where('category_id',$saradeshcat->id)->where('status',true)->where('is_pending',0)->orderBy('id','DESC')->limit(3)->get();
                }
                $campuscat=DB::table('categories')->where('parent_id',null)->skip(6)->first();
                if ($campuscat) {
                    $campuscatpostbig=DB::table('posts')->where('category_id',$campuscat->id)->where('status',true)->where('is_pending',0)->orderBy('id','DESC')->limit(3)->get();
                }
            @endphp
            
            <!-- Saradesh -->
            @if($saradeshcat && isset($saradeshcatpostbig) && count($saradeshcatpostbig) > 0)
                <div>
                    <div class="bbc-section-header">
                        <a href="{{ route('frontend.category',$saradeshcat->slug)}}" class="bbc-section-title">{{ $saradeshcat->title }}</a>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        @foreach($saradeshcatpostbig as $row)
                            <a href="{{ route('frontend.postBySubcategory.details',[$saradeshcat->slug,$row->slug])}}" class="bbc-card" style="flex-direction: row; height: auto;">
                                <div class="bbc-card-img-wrapper" style="width: 140px; padding-top: 100px; flex-shrink: 0;">
                                    <img class="bbc-card-img" src="{{asset('assets/images/post/'.$row->image_big)}}" alt="" />
                                </div>
                                <div class="bbc-card-content" style="padding: 12px;">
                                    <h3 class="bbc-card-title" style="font-size: 14px; margin: 0;">{{strlen($row->title)>60 ? mb_substr($row->title,0,60,"utf-8").'...' : $row->title}}</h3>
                                </div>
                            </a>
                        @endforeach
                    </div>
                </div>
            @endif

            <!-- Campus -->
            @if($campuscat && isset($campuscatpostbig) && count($campuscatpostbig) > 0)
                <div>
                    <div class="bbc-section-header">
                        <a href="{{ route('frontend.category',$campuscat->slug)}}" class="bbc-section-title">{{ $campuscat->title }}</a>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        @foreach($campuscatpostbig as $row)
                            <a href="{{ route('frontend.postBySubcategory.details',[$campuscat->slug,$row->slug])}}" class="bbc-card" style="flex-direction: row; height: auto;">
                                <div class="bbc-card-img-wrapper" style="width: 140px; padding-top: 100px; flex-shrink: 0;">
                                    <img class="bbc-card-img" src="{{asset('assets/images/post/'.$row->image_big)}}" alt="" />
                                </div>
                                <div class="bbc-card-content" style="padding: 12px;">
                                    <h3 class="bbc-card-title" style="font-size: 14px; margin: 0;">{{strlen($row->title)>60 ? mb_substr($row->title,0,60,"utf-8").'...' : $row->title}}</h3>
                                </div>
                            </a>
                        @endforeach
                    </div>
                </div>
            @endif
        </div>

        <!-- Video Gallery (Dark styling like BBC Reel/Video) -->
        @if(isset($video_smalls) && count($video_smalls) > 0)
            <div class="bbc-video-grid" style="margin-top: 40px;">
                <div class="bbc-section-header" style="border-bottom-color: #444;">
                    <span class="bbc-section-title" style="color: #FFF;"><i class="fa fa-play-circle"></i> ভিডিও গ্যালারী</span>
                </div>
                <div class="bbc-grid-3">
                    @foreach ($video_smalls->take(3) as $video_small)
                        <div class="bbc-card bbc-video-card">
                            <div style="position: relative; padding-top: 56.25%;">
                                <iframe style="position: absolute; top:0; left:0; width:100%; height:100%; border:none; border-radius: 6px 6px 0 0;" src="https://www.youtube.com/embed/{{ $video_small->embed_video }}" allowfullscreen></iframe>
                            </div>
                            <div class="bbc-card-content" style="background: #1A1A1A;">
                                <h3 class="bbc-card-title" style="font-size: 14px; margin: 0; color: #FFF;">{{strlen($video_small->title)>60 ? mb_substr($video_small->title,0,60,"utf-8").'...' : $video_small->title}}</h3>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif

        <!-- Two Column Categories 2 (Entertainment & Sports) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 20px; margin-bottom: 40px;">
            @php
                $binodoncat=DB::table('categories')->where('parent_id',null)->skip(7)->first();
                if ($binodoncat) {
                    $binodoncatpostbig=DB::table('posts')->where('category_id',$binodoncat->id)->where('status',true)->where('is_pending',0)->orderBy('id','DESC')->limit(3)->get();
                }
                $khelacat=DB::table('categories')->where('parent_id',null)->skip(8)->first();
                if ($khelacat) {
                    $khelacatpostbig=DB::table('posts')->where('category_id',$khelacat->id)->where('status',true)->where('is_pending',0)->orderBy('id','DESC')->limit(3)->get();
                }
            @endphp
            
            <!-- Entertainment -->
            @if($binodoncat && isset($binodoncatpostbig) && count($binodoncatpostbig) > 0)
                <div>
                    <div class="bbc-section-header">
                        <a href="{{ route('frontend.category',$binodoncat->slug)}}" class="bbc-section-title">{{ $binodoncat->title }}</a>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        @foreach($binodoncatpostbig as $row)
                            <a href="{{ route('frontend.postBySubcategory.details',[$binodoncat->slug,$row->slug])}}" class="bbc-card" style="flex-direction: row; height: auto;">
                                <div class="bbc-card-img-wrapper" style="width: 140px; padding-top: 100px; flex-shrink: 0;">
                                    <img class="bbc-card-img" src="{{asset('assets/images/post/'.$row->image_big)}}" alt="" />
                                </div>
                                <div class="bbc-card-content" style="padding: 12px;">
                                    <h3 class="bbc-card-title" style="font-size: 14px; margin: 0;">{{strlen($row->title)>60 ? mb_substr($row->title,0,60,"utf-8").'...' : $row->title}}</h3>
                                </div>
                            </a>
                        @endforeach
                    </div>
                </div>
            @endif

            <!-- Sports -->
            @if($khelacat && isset($khelacatpostbig) && count($khelacatpostbig) > 0)
                <div>
                    <div class="bbc-section-header">
                        <a href="{{ route('frontend.category',$khelacat->slug)}}" class="bbc-section-title">{{ $khelacat->title }}</a>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        @foreach($khelacatpostbig as $row)
                            <a href="{{ route('frontend.postBySubcategory.details',[$khelacat->slug,$row->slug])}}" class="bbc-card" style="flex-direction: row; height: auto;">
                                <div class="bbc-card-img-wrapper" style="width: 140px; padding-top: 100px; flex-shrink: 0;">
                                    <img class="bbc-card-img" src="{{asset('assets/images/post/'.$row->image_big)}}" alt="" />
                                </div>
                                <div class="bbc-card-content" style="padding: 12px;">
                                    <h3 class="bbc-card-title" style="font-size: 14px; margin: 0;">{{strlen($row->title)>60 ? mb_substr($row->title,0,60,"utf-8").'...' : $row->title}}</h3>
                                </div>
                            </a>
                        @endforeach
                    </div>
                </div>
            @endif
        </div>

        <!-- Photo Gallery Carousel -->
        @if(isset($image_albums) && count($image_albums) > 0)
            <div style="margin-bottom: 40px;">
                <div class="bbc-section-header">
                    <span class="bbc-section-title"><i class="fa fa-camera"></i> ফটো গ্যালারী</span>
                </div>
                <div class="bbc-grid-3">
                    @foreach ($image_albums->take(3) as $album)
                        <a href="{{asset('assets/images/image-album/'.$album->photo)}}" class="bbc-card" target="_blank">
                            <div class="bbc-card-img-wrapper">
                                <img class="bbc-card-img" src="{{asset('assets/images/image-album/'.$album->photo)}}" alt="{{ $album->album_name }}" />
                            </div>
                            <div class="bbc-card-content">
                                <h3 class="bbc-card-title" style="font-size: 15px; margin: 0;">{{ $album->album_name }}</h3>
                            </div>
                        </a>
                    @endforeach
                </div>
            </div>
        @endif

        <!-- National Anthem player -->
        <div class="bbc-widget" style="margin-top: 20px; max-width: 400px;">
            <div class="bbc-widget-title" style="font-size: 15px; margin-bottom: 10px;">আমাদের জাতীয় সঙ্গীত</div>
            <audio controls style="width: 100%;">
                <source src="{{asset('assets/frontend/bd_national_anthem.mp3')}}" type="audio/mp3">
                Your browser does not support the audio element.
            </audio>
        </div>

    </div>
</div>

@endsection