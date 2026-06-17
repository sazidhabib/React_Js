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

<style>
    :root {
        --bbc-red: #B80000;
        --bbc-dark-red: #8B0000;
        --bbc-bg: #FFFFFF;
        --bbc-text-primary: #111111;
        --bbc-text-secondary: #555555;
        --bbc-border: #E5E7EB;
        --bbc-font-main: 'BBC Reith Sans', 'Noto Serif Bengali', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    .bbc-details-wrapper {
        font-family: var(--bbc-font-main);
        background-color: #ffffff;
        color: var(--bbc-text-primary);
        padding: 20px 5px;
    }

    /* Breadcrumbs */
    .bbc-breadcrumb {
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 14px;
        margin-bottom: 20px;
        color: var(--bbc-text-secondary);
    }
    .bbc-breadcrumb a {
        color: var(--bbc-text-secondary);
        text-decoration: none;
        font-weight: 600;
    }
    .bbc-breadcrumb a:hover {
        color: var(--bbc-red);
    }
    .bbc-breadcrumb-separator {
        color: var(--bbc-border);
    }

    /* Article Title */
    .bbc-article-title {
        font-size: 30px !important;
        font-weight: 800;
        line-height: 1.35;
        margin-bottom: 20px;
        color: var(--bbc-text-primary);
    }
    @media (max-width: 768px) {
        .bbc-article-title {
            font-size: 24px !important;
        }
    }

    /* Reporter Profile Card */
    .bbc-reporter-card {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 0;
        border-top: 1px solid var(--bbc-border);
        border-bottom: 1px solid var(--bbc-border);
        margin-bottom: 24px;
    }
    .bbc-reporter-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        background: #eee;
    }
    .bbc-reporter-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .bbc-reporter-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .bbc-reporter-name {
        font-size: 15px;
        font-weight: 700;
        color: var(--bbc-text-primary);
    }
    .bbc-article-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        font-size: 13px;
        color: var(--bbc-text-secondary);
    }
    .bbc-article-meta span {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    /* News Image & Caption */
    .bbc-article-media {
        margin-bottom: 24px;
        max-width: 100%;
    }
    .bbc-article-img {
        width: 100%;
        height: auto;
        border-radius: 0;
        display: block;
    }
    .bbc-article-caption {
        font-size: 14px;
        color: var(--bbc-text-secondary);
        padding: 10px 12px;
        background-color: #F9FAFA;
        border-left: 3px solid var(--bbc-red);
        margin-top: 0;
    }

    /* Content Area */
    .bbc-article-content {
        font-size: 18px !important;
        line-height: 1.65;
        color: #222222;
        margin-bottom: 30px;
    }
    .bbc-article-content p,
    .bbc-article-content span,
    .bbc-article-content div,
    .bbc-article-content font {
        font-size: 18px !important;
        line-height: 1.65 !important;
        color: #222222 !important;
    }

    /* Video iframe wrapper */
    .bbc-video-wrapper {
        position: relative;
        padding-top: 56.25%;
        margin-bottom: 24px;
    }
    .bbc-video-wrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
    }

    /* Audio / Video local players */
    .bbc-media-player {
        width: 100%;
        margin: 15px 0 24px 0;
    }

    /* Ads spacing */
    .bbc-ad-slot {
        margin: 20px 0;
        display: flex;
        justify-content: center;
        max-width: 100%;
        overflow: hidden;
    }

    /* Social Sharing */
    .bbc-share-section {
        margin: 30px 0;
        border-top: 1px solid var(--bbc-border);
        padding-top: 20px;
    }
    .bbc-share-title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 12px;
    }
    .bbc-share-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .bbc-share-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        font-size: 13px;
        font-weight: 700;
        color: #FFF !important;
        text-decoration: none !important;
        transition: opacity 0.2s;
    }
    .bbc-share-btn:hover {
        opacity: 0.9;
    }
    .share-fb { background-color: #1877F2; }
    .share-tw { background-color: #1DA1F2; }
    .share-li { background-color: #0077B5; }
    .share-rd { background-color: #FF4500; }
    .share-pin { background-color: #BD081C; }
    .share-pr { background-color: #555; }

    /* Widgets sidebar */
    .bbc-widget {
        background: #FFF;
        border: 1px solid var(--bbc-border);
        padding: 16px;
        margin-bottom: 20px;
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
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid var(--bbc-border);
        text-decoration: none !important;
        color: inherit !important;
    }
    .bbc-list-item:hover .bbc-list-item-title {
        color: var(--bbc-red);
        text-decoration: underline;
    }
    .bbc-list-item:first-child {
        padding-top: 0;
    }
    .bbc-list-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }
    .bbc-list-item-img {
        width: 80px;
        height: 55px;
        object-fit: cover;
        flex-shrink: 0;
    }
    .bbc-list-item-title {
        font-size: 14px;
        font-weight: 700;
        line-height: 1.4;
    }
</style>

<div class="bbc-details-wrapper">
    <div class="row">
        <!-- Main Column -->
        <div class="col-md-8 col-sm-8">
            <!-- Ad Slot Top -->
            @if($gs->header1_728)
                <div class="bbc-ad-slot">
                    {!! $gs->header1_728 !!}
                </div>
            @endif

            <!-- Breadcrumbs -->
            <div class="bbc-breadcrumb">
                <a href="{{ route('frontend.index') }}"><i class="fa fa-home"></i> প্রচ্ছদ</a>
                <span class="bbc-breadcrumb-separator">&rsaquo;</span>
                <a href="{{ route('frontend.category', $data->category->slug) }}">{{ $data->category->title }}</a>
            </div>

            <!-- Article Title -->
            <h1 class="bbc-article-title">{{ $data->title }}</h1>

            <!-- Reporter Profile Card -->
            <div class="bbc-reporter-card">
                <div class="bbc-reporter-avatar">
                    @if ($data->admin_id == 0 && $data->user_id != 0 && $data->user)
                        <img src="{{ asset('assets/images/admin/'.$data->user->photo) }}" alt="" />
                    @elseif ($data->admin)
                        <img src="{{ asset('assets/images/admin/'.$data->admin->photo) }}" alt="" />
                    @else
                        <img src="{{ asset('assets/images/admin/default.png') }}" alt="" />
                    @endif
                </div>
                <div class="bbc-reporter-info">
                    <div class="bbc-reporter-name">
                        রিপোর্টার: 
                        @if ($data->admin_id == 0 && $data->user_id != 0 && $data->user)
                            {{ $data->user->name }}
                        @elseif ($data->admin)
                            {{ $data->admin->name }}
                        @else
                            প্রশাসক
                        @endif
                    </div>
                    <div class="bbc-article-meta">
                        <span><i class="fa fa-calendar"></i> {{ $data->createdAt() }} ইং</span>
                        <span><i class="fa fa-eye"></i> ৭৭১ বার পঠিত</span>
                    </div>
                </div>
            </div>

            <!-- Main Media Image -->
            <div class="bbc-article-media">
                <img class="bbc-article-img" src="{{ asset('assets/images/post/'.$data->image_big) }}" alt="{{ $data->title }}" />
                @if($data->images_caption)
                    <div class="bbc-article-caption">
                        ছবির ক্যাপশন: {{ $data->images_caption }}
                    </div>
                @endif
            </div>

            <!-- Article Body Details -->
            <div class="bbc-article-content">
                @if ($data->post_type == 'article')
                    {!! $data->description !!}
                @endif

                @if ($data->post_type == 'video')
                    @if ($data->embed_video)
                        {!! $data->description !!}
                        <div class="bbc-video-wrapper">
                            <iframe src="https://www.youtube.com/embed/{!!$data->embed_video!!}" allowfullscreen></iframe>
                        </div>
                    @else
                        <video class="bbc-media-player" controls>
                            <source src="{{ asset('assets/videos/'.$data->video) }}" type="video/mp4">
                        </video>
                        {!! $data->description !!}
                    @endif
                @endif

                @if ($data->post_type == 'audio')
                    <audio class="bbc-media-player" controls>
                        <source src="{{ asset('assets/audios/'.$data->audio) }}" type="audio/mp3">
                    </audio>
                    {!! $data->description !!}
                @endif
            </div>

            <!-- Ad Slot Middle -->
            @if($gs->header2_728)
                <div class="bbc-ad-slot">
                    {!! $gs->header2_728 !!}
                </div>
            @endif

            <!-- Comments Section -->
            <div class="bbc-widget" style="padding: 16px 0; border: none; border-top: 1px solid var(--bbc-border);">
                <div class="bbc-widget-title">মন্তব্য করুন</div>
                <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v20.0&appId=1716117305495236" nonce="OKS9Fdbx"></script>
                <div style="max-width: 100%; overflow-x: auto;">
                    <div class="fb-comments" data-href="{{ URL::to($data->id.'/'.$data->slug) }}" data-width="100%" data-numposts="10"></div>
                </div>
            </div>

            <!-- Social Sharing -->
            <div class="bbc-share-section">
                <div class="bbc-share-title">নিউজটি শেয়ার করুন...</div>
                <ul class="bbc-share-buttons">
                    <li><a href="http://www.facebook.com/sharer.php?u={{ URL::to($data->id.'/'.$data->slug) }}" class="bbc-share-btn share-fb" target="_blank"><i class="fa fa-facebook"></i> Facebook</a></li>
                    <li><a href="https://twitter.com/share?text={{ URL::to($data->id.'/'.$data->slug) }}" class="bbc-share-btn share-tw" target="_blank"><i class="fa fa-twitter"></i> Twitter</a></li>
                    <li><a href="http://www.linkedin.com/shareArticle?mini={{ URL::to($data->id.'/'.$data->slug) }}" class="bbc-share-btn share-li" target="_blank"><i class="fa fa-linkedin"></i> Linkedin</a></li>
                    <li><a href="http://www.reddit.com/submit?url={{ URL::to($data->id.'/'.$data->slug) }}" class="bbc-share-btn share-rd" target="_blank"><i class="fa fa-reddit"></i> Reddit</a></li>
                    <li><a href="http://www.pinterest.com/pin/create/button/?url={{ URL::to($data->id.'/'.$data->slug) }}" class="bbc-share-btn share-pin" target="_blank"><i class="fa fa-pinterest"></i> Pinterest</a></li>
                    <li><a href="{{ URL::to('print/'.$data->id.'/'.$data->slug) }}" class="bbc-share-btn share-pr" target="_blank"><i class="fa fa-print"></i> Print</a></li>
                </ul>
            </div>
        </div>

        <!-- Sidebar Column -->
        <div class="col-md-4 col-sm-4">
            <!-- Latest and Popular News Tab Widget -->
            <div class="bbc-widget">
                <div class="bbc-tabs">
                    <button class="bbc-tab-btn active" onclick="switchBbcDetailsTab('latest')">সর্বশেষ সংবাদ</button>
                    <button class="bbc-tab-btn" onclick="switchBbcDetailsTab('popular')">জনপ্রিয় সংবাদ</button>
                </div>
                
                <div id="bbc-tab-details-latest">
                    @php
                        $latest = DB::table('posts')->where('status',true)->where('is_pending',0)->orderBy('id','DESC')->limit(6)->get();
                    @endphp
                    @foreach ($latest as $row)
                        <a href="{{ route('frontend.postBySubcategory.details', [$row->category_id ?? 1, $row->slug]) }}" class="bbc-list-item">
                            <img class="bbc-list-item-img" src="{{ asset('assets/images/post/'.$row->image_big) }}" alt="" />
                            <div class="bbc-list-item-title">{{ strlen($row->title)>60 ? mb_substr($row->title,0,60,"utf-8").'...' : $row->title }}</div>
                        </a>
                    @endforeach
                </div>
                
                <div id="bbc-tab-details-popular" style="display: none;">
                    @php
                        $popular = DB::table('posts')->where('status',true)->where('is_pending',0)->where('is_slider',1)->orderBy('id','DESC')->limit(6)->get();
                    @endphp
                    @foreach ($popular as $row)
                        <a href="{{ route('frontend.postBySubcategory.details', [$row->category_id ?? 1, $row->slug]) }}" class="bbc-list-item">
                            <img class="bbc-list-item-img" src="{{ asset('assets/images/post/'.$row->image_big) }}" alt="" />
                            <div class="bbc-list-item-title">{{ strlen($row->title)>60 ? mb_substr($row->title,0,60,"utf-8").'...' : $row->title }}</div>
                        </a>
                    @endforeach
                </div>
            </div>

            <script>
                function switchBbcDetailsTab(tabName) {
                    var buttons = document.querySelectorAll('.bbc-tab-btn');
                    buttons.forEach(btn => btn.classList.remove('active'));
                    
                    if (tabName === 'latest') {
                        document.getElementById('bbc-tab-details-latest').style.display = 'block';
                        document.getElementById('bbc-tab-details-popular').style.display = 'none';
                    } else {
                        document.getElementById('bbc-tab-details-latest').style.display = 'none';
                        document.getElementById('bbc-tab-details-popular').style.display = 'block';
                    }
                    event.currentTarget.classList.add('active');
                }
            </script>

            <!-- Sidebar Ad -->
            @if($gs->sidebar_ads1)
                <div class="bbc-ad-slot">
                    {!! $gs->sidebar_ads1 !!}
                </div>
            @endif

            <!-- Related Category Stories Widget -->
            <div class="bbc-widget">
                <div class="bbc-widget-title">এ জাতীয় আরো খবর</div>
                @php
                    $related = DB::table('posts')->where('category_id', $data->category_id)->where('id', '!=', $data->id)->where('status',true)->where('is_pending',0)->orderBy('id','DESC')->limit(6)->get();
                @endphp
                @if(count($related) > 0)
                    @foreach($related as $row)
                        <a href="{{ route('frontend.postBySubcategory.details', [$row->category_id, $row->slug]) }}" class="bbc-list-item">
                            <img class="bbc-list-item-img" src="{{ asset('assets/images/post/'.$row->image_big) }}" alt="" />
                            <div class="bbc-list-item-title">{{ strlen($row->title)>60 ? mb_substr($row->title,0,60,"utf-8").'...' : $row->title }}</div>
                        </a>
                    @endforeach
                @else
                    <p style="font-size: 14px; color: var(--bbc-text-secondary); margin: 0;">কোনো খবর পাওয়া যায়নি।</p>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection