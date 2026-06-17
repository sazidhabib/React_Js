@extends('layouts.front')
@section('contents')
 @section('meta')
<title>{{$subcategory}}</title>
<meta property="og:title" content="{{$subcategory}}" />
<meta property="og:image" content="{{asset('assets/images/'.$gs->og_baner)}}" />
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

    .bbc-archive-wrapper {
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
        margin-bottom: 24px;
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

    /* Archive Card List */
    .bbc-archive-list {
        display: flex;
        flex-direction: column;
        gap: 0;
    }
    .bbc-archive-item {
        display: flex;
        flex-direction: row;
        gap: 20px;
        padding: 20px 0;
        border-bottom: 1px solid var(--bbc-border);
        text-decoration: none !important;
        color: inherit !important;
    }
    .bbc-archive-item:first-child {
        padding-top: 0;
    }
    .bbc-archive-item:last-child {
        border-bottom: none;
    }
    .bbc-archive-img-wrapper {
        width: 200px;
        height: 125px;
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
    }
    .bbc-archive-img-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .bbc-archive-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: start;
    }
    .bbc-archive-item:hover .bbc-archive-title {
        color: var(--bbc-red);
        text-decoration: underline;
    }
    .bbc-archive-title {
        font-size: 18px !important;
        font-weight: 700;
        line-height: 1.4;
        margin: 0 0 8px 0;
        color: var(--bbc-text-primary);
    }
    .bbc-archive-desc {
        font-size: 14px;
        color: var(--bbc-text-secondary);
        line-height: 1.5;
        margin-bottom: 8px;
    }
    .bbc-archive-more {
        font-size: 13px;
        font-weight: 700;
        color: var(--bbc-red);
    }

    @media (max-width: 576px) {
        .bbc-archive-item {
            flex-direction: column;
            gap: 12px;
        }
        .bbc-archive-img-wrapper {
            width: 100%;
            height: auto;
            padding-top: 56.25%; /* 16:9 aspect ratio */
        }
        .bbc-archive-img-wrapper img {
            position: absolute;
            top: 0;
            left: 0;
        }
    }

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

    /* Pagination container style */
    .post-nav {
        margin-top: 24px;
        display: flex;
        justify-content: center;
    }
    .post-nav ul {
        display: flex;
        list-style: none;
        padding: 0;
        gap: 4px;
    }
    .post-nav ul li a, .post-nav ul li span {
        padding: 6px 12px;
        border: 1px solid var(--bbc-border);
        text-decoration: none;
        color: var(--bbc-text-primary);
        font-weight: 600;
        font-size: 14px;
    }
    .post-nav ul li.active span {
        background-color: var(--bbc-red);
        color: #FFF;
        border-color: var(--bbc-red);
    }
</style>

<div class="bbc-archive-wrapper">
    <div class="row">
        <!-- Left Column -->
        <div class="col-md-8 col-sm-8">
            <!-- Breadcrumbs -->
            <div class="bbc-breadcrumb">
                <a href="{{ route('frontend.index') }}"><i class="fa fa-home"></i> প্রচ্ছদ</a>
                <span class="bbc-breadcrumb-separator">&rsaquo;</span>
                <a href="{{ route('frontend.category', $parent->slug ?? 'category') }}">{{ $parent->title ?? 'Category' }}</a>
                <span class="bbc-breadcrumb-separator">&rsaquo;</span>
                <span>{{$subcategory}}</span>
            </div>

            <!-- Archive List -->
            @if ($datas->count()>0)
                <div class="bbc-archive-list">
                    @foreach ($datas as $post)
                        <a href="{{ route('frontend.postBySubcategory.details',[$post->category->slug ?? 'category',$post->slug])}}" class="bbc-archive-item">
                            <div class="bbc-archive-img-wrapper">
                                <img src="{{asset('assets/images/post/'.$post->image_big)}}" alt="" />
                            </div>
                            <div class="bbc-archive-content">
                                <h2 class="bbc-archive-title">{{ strlen($post->title)>100 ? mb_substr($post->title,0,100,'utf-8').'...' : $post->title}}</h2>
                                <p class="bbc-archive-desc">
                                    {{ strlen($post->short_description)>250 ? mb_substr($post->short_description,0,250,'utf-8').'...' : $post->short_description}}
                                </p>
                                <span class="bbc-archive-more">বিস্তারিত পড়ুন &rarr;</span>
                            </div>
                        </a>
                    @endforeach
                </div>

                <!-- Pagination -->
                <div class="post-nav">
                    {{ $datas->links() }}
                </div>
            @else
                <div class="card" style="border-radius: 0; border: 1px solid var(--bbc-border);">
                    <div class="card-body" style="padding: 30px; text-align: center;">
                        <p style="color: var(--bbc-red); font-weight: 700; margin: 0;">{{__('This Sub Category has no news.')}}</p>
                    </div>
                </div>
            @endif  
        </div>

        <!-- Right Column (Sidebar) -->
        <div class="col-md-4 col-sm-4">
            <!-- Latest and Popular News Tab Widget -->
            <div class="bbc-widget">
                <div class="bbc-tabs">
                    <button class="bbc-tab-btn active" onclick="switchBbcArchiveTab('latest')">সর্বশেষ সংবাদ</button>
                    <button class="bbc-tab-btn" onclick="switchBbcArchiveTab('popular')">জনপ্রিয় সংবাদ</button>
                </div>
                
                @php
                    $secondcat = DB::table('categories')->where('parent_id',null)->skip(1)->first();
                    $secondcatpostbig = $secondcat ? DB::table('posts')->where('category_id',$secondcat->id)->where('is_trending',1)->orderBy('id','DESC')->limit(6)->get() : collect([]);
                    
                    $thirdcat = DB::table('categories')->where('parent_id',null)->skip(2)->first();
                    $thirdcatpostbig = $thirdcat ? DB::table('posts')->where('category_id',$thirdcat->id)->where('is_trending',1)->orderBy('id','DESC')->limit(6)->get() : collect([]);
                @endphp

                <div id="bbc-tab-archive-latest">
                    @foreach($secondcatpostbig as $row)
                        <a href="{{ route('frontend.postBySubcategory.details',[$row->category_id ?? 1, $row->slug])}}" class="bbc-list-item">
                            <img class="bbc-list-item-img" src="{{asset('assets/images/post/'.$row->image_big)}}" alt="" />
                            <div class="bbc-list-item-title">{{strlen($row->title)>60 ? mb_substr($row->title,0,60,"utf-8").'...' : $row->title}}</div>
                        </a>
                    @endforeach
                </div>
                
                <div id="bbc-tab-archive-popular" style="display: none;">
                    @foreach($thirdcatpostbig as $row)
                        <a href="{{ route('frontend.postBySubcategory.details',[$row->category_id ?? 1, $row->slug])}}" class="bbc-list-item">
                            <img class="bbc-list-item-img" src="{{asset('assets/images/post/'.$row->image_big)}}" alt="" />
                            <div class="bbc-list-item-title">{{strlen($row->title)>60 ? mb_substr($row->title,0,60,"utf-8").'...' : $row->title}}</div>
                        </a>
                    @endforeach
                </div>
            </div>

            <script>
                function switchBbcArchiveTab(tabName) {
                    var buttons = document.querySelectorAll('.bbc-tab-btn');
                    buttons.forEach(btn => btn.classList.remove('active'));
                    
                    if (tabName === 'latest') {
                        document.getElementById('bbc-tab-archive-latest').style.display = 'block';
                        document.getElementById('bbc-tab-archive-popular').style.display = 'none';
                    } else {
                        document.getElementById('bbc-tab-archive-latest').style.display = 'none';
                        document.getElementById('bbc-tab-archive-popular').style.display = 'block';
                    }
                    event.currentTarget.classList.add('active');
                }
            </script>

            <!-- Sidebar Ad -->
            @if($gs->sidebar_ads1)
                <div class="bbc-ad-slot" style="display: flex; justify-content: center; overflow: hidden; max-width: 100%;">
                    {!! $gs->sidebar_ads1 !!}
                </div>
            @endif
        </div>
    </div>
</div>
@endsection