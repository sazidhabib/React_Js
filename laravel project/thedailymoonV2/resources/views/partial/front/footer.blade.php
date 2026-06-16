<!--======= Footer Section Start============-->
<div class="footer-section">

    {{-- <div class="row">
        <div class="col-md-2 col-sm-2 col-xs-4">
            <div class="footer-menu-01">
                <div class="menu">
                    <ul>
                        <li class="page_item page-item-1147"><a href="{{ URL::to('/reporter') }}">প্রতিনিধির তালিকা</a>
                        </li>
                        <li class="page_item page-item-1208"><a href="{{ URL::to('/photo') }}">ফটো গ্যালারী</a></li>
                        <li class="page_item page-item-1211"><a href="{{ URL::to('/video') }}">ভিডিও গ্যালারী</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-md-2 col-sm-2 col-xs-2">
            <div class="footer-menu-0">

                @php
                Session::has('language')
                ? ($lid = Session::get('language'))
                : ($lid = DB::table('languages')->where('is_default', '=', 1)->first()->id);
                @endphp

                @php
                $header_footer_logo = d_logo($lid);
                @endphp
                <div class="footer_logo">
                    <a href="{{ route('frontend.index') }}"> <img
                            src="{{ asset('assets/images/logo/' . $gs->footer_logo) }}" alt="{{ $gs->title }}"> </a>
                </div>
            </div>
        </div>

        <div class="col-md-2 col-sm-2 col-xs-4">
            <div class="footer-menu-01">
                @php
                $footer_menus = \App\Models\Page::where('placement', 'footer')->where('status', 1)->get();
                @endphp
                <div class="menu">
                    <ul>
                        @foreach ($footer_menus as $menu)
                        <li class="page_item page-item-1147"><a href="{{ route('dynamic.page', $menu->slug) }}">{{
                                $menu->title }}</a></li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    </div> --}}



    <div class="footer-wrpp">
        <div class="row">
            <div class="col-md-3 col-sm-3">
                <div class="footer-content-rihgt">
                    সম্পাদক ও প্রকাশক : {{ $gs->prokashok }} <br>
                    নির্বাহী সম্পাদক : {{ $gs->sompadok }} <br>
                    বার্তা সম্পাদক : {{ $gs->barta_sompadok }}
                </div>
            </div>
            <div class="col-md-5 col-sm-5">
                <div class="footer-content-left">
                    অফিস : {{ $gs->adress }} <br>
                    মোবাইল নং: {{ $gs->phone }} <br>
                    ইমেইল: {{ $gs->email }}
                </div>
            </div>
            <div class="col-md-2 col-sm-2">
                <div class="">
                    <div class="footer-menu-01">
                        @php
                        $footer_menus = \App\Models\Page::where('placement', 'footer')->where('status', 1)->get();
                        @endphp
                        <div class="menu">
                            <ul>
                                @foreach ($footer_menus as $menu)
                                <li class="page_item page-item-1147"><a
                                        href="{{ route('dynamic.page', $menu->slug) }}">{{
                                        $menu->title }}</a></li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

             <div class="col-md-2 col-sm-2">
                <div class="footer-content-left">
                    @php
                    Session::has('language')
                    ? ($lid = Session::get('language'))
                    : ($lid = DB::table('languages')->where('is_default', '=', 1)->first()->id);
                    @endphp

                    @php
                    $header_footer_logo = d_logo($lid);
                    @endphp
                    <div class="footer_logo">
                        <a href="{{ route('frontend.index') }}"> <img
                                src="{{ asset('assets/images/logo/' . $gs->footer_logo) }}" alt="{{ $gs->title }}"> </a>
                    </div>
                </div>
            </div>
        </div>




        <div class="root">
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <div class="root_01">
                        {!! $gs->copyright_text !!} </div>
                </div>
                <div class="col-md-6 col-sm-6">
                    <div class="root_02">
                        সকল কারিগরী সহযোগিতায় <a href='https://www.facebook.com/NextDigitOfficial/' target='_blank'
                            title='nextdigit.dev'> নেক্সট ডিজিট </a>
                    </div>
                </div>
            </div>

        </div>
        <a href="#" class="scrollToTop"><i class="fa fa-angle-up"></i></a>
    </div>


    <!--======= Footer Section End============-->

    <!-- --------------------
    নেক্সট ডিজিট
    Next Digit
    NextDigitOfficial
    nextdigit.dev
---------------------- -->

</div>
</section>