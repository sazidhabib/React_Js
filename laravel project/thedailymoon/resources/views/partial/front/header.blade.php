<!-- --------------------
    নেক্সট ডিজিট
    Next Digit
    NextDigitOfficial
    nextdigit.dev
---------------------- -->

<script src="https://bangla.plus/scripts/bangladatetoday.min.js"></script>
<script>dateToday('date-today', 'bangla');</script>
           
<script>
                        setInterval(displayTime, 1000);

function displayTime() {

    const timeNow = new Date();

    let hoursOfDay = timeNow.getHours();
    let minutes = timeNow.getMinutes();
    let seconds = timeNow.getSeconds();
    let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let today = weekDay[timeNow.getDay()];
    let months = timeNow.toLocaleString("default", {
        month: "long"
    });
    let year = timeNow.getFullYear();
    let period = "AM";

    if (hoursOfDay > 12) {
        hoursOfDay-= 12;
        period = "PM";
    }

    if (hoursOfDay === 0) {
        hoursOfDay = 12;
        period = "AM";
    }

    hoursOfDay = hoursOfDay < 10 ? "0" + hoursOfDay : hoursOfDay;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let time = hoursOfDay + ":" + minutes + ":" + seconds + " " + period;

   document.getElementById('Clock').innerHTML = time ;
    
    var chars = {'1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯','0':'০','A':'এ','P':'পি','M':'এম'};
    let str = document.getElementById("Clock").innerHTML; 
    let res = str.replace(/[1234567890AMP]/g, m => chars[m]);
    document.getElementById("Clock").innerHTML = res;

}
displayTime();

                        </script>
<section class="body-section">	
	<div class="container main_wbsite">
						
				            
            <!--=======header-section Start========-->
               <div class="header-section" style="background: #fff;">
                    <div class="row">
                        {{-- <div class="col-md-4 col-sm-4 col-sm-4">
                            <div class="verson">
                                <a href="{{ $gs->epaper_link }}" target="_blank" rel="noopener noreferrer"> <i class="fa fa-newspaper-o" aria-hidden="true"></i> ই-পেপার ভার্শন </a>
                            </div>
                        </div> --}}
                        <div class="col-md-8 col-sm-8 col-sm-8">
                            <div class="date" style="font-size: 18px; font-weight: 400; color: #000;">

                            <i class="fa fa-map-marker" aria-hidden="true" style="margin-right: 5px;"></i>					
							ঢাকা  <i class="fa fa-calendar-o" aria-hidden="true" style="margin-right: 5px; margin-left: 10px;"></i>
                            <span id ="Clock" onload="displayTime()">  </span> | <span id="date-today"></span> বঙ্গাব্দ												   
								                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                            <div class="top_hdr_social">
                                <ul>
								
								
								@foreach ($social_links as $social_link) 
									<li><a href="{{ $social_link->link}}" target="_blank" class="{{$social_link->name}}"> <i class="{{$social_link->icon}}"></i></a></li>
@endforeach	


								</ul>
	                        </div>
                        </div>
                    </div>
               </div>
                
            <!--=======header-section End========-->
            
                
            
            
            <!--=======Logo & banner-section Start========-->
            
            <div class="logobanner-section">
                <div class="row">
							@php
								Session::has('language') ? $lid=Session::get('language') : $lid = (DB::table('languages')->where('is_default','=',1)->first()->id)
							@endphp
							
							@php
								$header_footer_logo = d_logo($lid);
							@endphp
                    <div class="col-md-4 col-sm-4">
                        <div class="logo">
                             <a href="{{route('frontend.index')}}"><img src="{{asset('assets/images/logo/'.$gs->logo)}}" alt="Logo" width="100%"></a>
                        </div>
                    </div>
                    <div class="col-md-8 col-sm-8">
                        <div class="banner">
                            {!!$gs->horizontal_adds1!!}
                        </div>
                    </div>
                </div>
            </div>
            
        <!--=======Logo & banner-section End========-->
        
        
        <!--=======secroll-section start========-->
		
		
        <div class="row">
            <div class="col-md-9 col-sm-9">
                <div class="row">
                    <div class="col-md-12 top_scrool"> 
                        <div class="col-md-2 scrool_1">
							সংবাদ শিরোনাম :						</div>
						<div class="col-md-10 scrool_2">
													
<marquee direction="left" scrollamount="4px" onmouseover="this.stop()" onmouseout="this.start()">

@if(isset($is_trendings) && $is_trendings->count() > 0)
    @foreach($is_trendings as $is_trending)
        <i class="fa fa-square" aria-hidden="true"></i>
        <a href="{{ route('frontend.postBySubcategory.details',[$is_trending->category->slug,$is_trending->slug])}}">{{ $is_trending->title }}</a>
    @endforeach
@else
    <i class="fa fa-square" aria-hidden="true"></i>
    <a href="">এই মুহূর্তে কোন ব্রেকিং নিউজ নেই, দয়া করে নিউজ পোস্ট করুন।</a>
@endif

</marquee>
								
																							   						</div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 col-sm-3">
                <div class="search-box">
                    <form class="example" method="get" action="{{ route('front.news_search') }}">
						<input type="text"  maxlength="64" placeholder="এখানে লিখুন.." value="" name="search" />
						<button type="submit">খুজুন</button>
					</form>
                </div>
            </div>
        </div>
		
		   
						
					
        <!--=======secroll-section End========-->
            
            
               
            <!-------menu option stsrt-------->


            <div class="row">
                <div class="col-xs-12 col-md-12 col-sm-12">
                    <div id="menu-area" class="menu_area">
                        <div class="menu_bottom">
                            <nav role="navigation" class="navbar navbar-default mainmenu">
                        <!-- Brand and toggle get grouped for better mobile display -->
                                <div class="navbar-header">
                                    <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
                                        <span class="sr-only">Toggle navigation</span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                </div>
                                <!-- Collection of nav links and other content for toggling -->
                                <div id="navbarCollapse" class="collapse navbar-collapse">
                                    <div class="menu-%e0%a6%aa%e0%a7%8d%e0%a6%b0%e0%a6%9a%e0%a7%8d%e0%a6%9b%e0%a6%a6-container"><ul id="menu-%e0%a6%aa%e0%a7%8d%e0%a6%b0%e0%a6%9a%e0%a7%8d%e0%a6%9b%e0%a6%a6" class="nav navbar-nav">
									
                                @foreach ($categories as $category)
								 @if ($loop->first)									
<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-212" class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-212 active"><a title="{{$category->title}}" href="{{ route('frontend.index')}}">{{$category->title}}</a></li>
 @endif
 @if ($category->child()->count() > 0)
<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-1167" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-1167 dropdown"><a title="{{$category->title}}" href="{{ route('frontend.category',$category->slug)}}" data-toggle="dropdown" class="dropdown-toggle" aria-haspopup="true">{{$category->title}} <span class="caret"></span></a>
<ul role="menu" class=" dropdown-menu" >
@foreach ($category->child as $child)
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-1170" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-1170"><a title="{{$child->title}}" href="{{ route('frontend.postBySubcategory.details',[$category->slug,$child->slug])}}">{{$child->title}}</a></li>
@endforeach	
</ul>
</li>
					@else
					@if ($loop->first)
					@else 
<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-273" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-273"><a title="{{$category->title}}" href="{{ route('frontend.category',$category->slug)}}">{{$category->title}}</a></li>
             @endif
				@endif
			@endforeach	
			
			 @if (!auth()->user())	
			<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-273" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-273"><a title="লগইন" href="{{ route('front.LogReg') }}">লগইন</a></li>
		                                     @endif
									@if (auth()->user())
									     @php
											 $data = auth()->user();
										 @endphp
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-273" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-273"><a title="সাংবাদিক প্যানেল" href="{{ route('user.dashboard') }}">সাংবাদিক প্যানেল</a></li>
@endif	

</ul></div>                                </div>
                            </nav>

                        </div><!-- /.header_bottom -->

                    </div>
                </div>

            </div>   
             