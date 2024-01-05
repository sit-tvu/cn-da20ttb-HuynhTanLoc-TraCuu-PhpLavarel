@extends('web.layouts.app')
@section('head')
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<!--    <link rel="stylesheet" href="/css/searchdd.css">-->
@endsection
@section('content')
<div class="container pt-5"  > <!--style="overflow: hidden;"-->
    <div class = "row">
        <div class = "col-md-6">
            @php
                $slides_image = explode(',',$data->slides); 
            @endphp
            @if($data->slides != null)
            <!-- Carousel -->
            <div id="demo" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    @foreach($slides_image as $key => $slide)
                    <button type="button" data-bs-target="#demo" class="@if($key == 0) active @endif" data-bs-slide-to="{!! $key??0 !!}"></button>
                    @endforeach
                </div>
                <div class="carousel-inner">
                    @foreach($slides_image as $key => $slide)
                    <div class="carousel-item @if($key == 0) active @endif">
                        <img src="{!! $slide??'' !!}" alt="{!! $data->name??'' !!}" class="d-block" style="width:100%; height:600px">
                        <div class="carousel-caption">
                            <h3>{!! $data->name??'' !!}</h3>
                        </div>
                    </div>
                    @endforeach
                </div>
                    
                <!-- Left and right controls/icons -->
                <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>
            </div>
            @endif
        </div>
        <div class = "col-md-6 p-5">
            <h4 style="font-size: 40px; margin-bottom:35px" >Thông tin tóm tắt</h4>
            <div class="container">
                <div class="flex">
                    <div class="box0">
                        <i class="fa-solid fa-location-dot"></i>
                        <b style="font-size: 20px;">Địa chỉ: </b><p style="font-size: 20px;">{!! $data->address??'' !!}</p>
                    </div>
                    <div class="box0">
                        <i class="fa-solid fa-compass"></i>
                        <b style="font-size: 20px;">Loại hình du lịch: </b><p style="font-size: 20px;">{!! $category->name??'' !!}</p>
                    </div>
                    <div class="box0">
                        <i class="fa-solid fa-flag"></i>
                        <b style="font-size: 20px;">Tên: </b><p style="font-size: 20px;">{!! $data->name??'' !!}</p>
                    </div>
                    <div class="box0">
                        <i class="fa-solid fa-money-bill"></i>
                        <b style="font-size: 20px;">Giá </b><p style="font-size: 20px;">{!! $data->price??'' !!}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row pt-5">
        <div class="col-md-6">
            <div class="container">
                <div class="box1">
                    <h2 style="font-size: 40px" >Giới thiệu</h2>
                    <p style="text-align: justify;font-size: 18px;">{!! $data->description ?? '' !!}</p>     
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                        Xem thêm
                    </button>
                </div>
                    
                <!-- The Modal -->
                <div class="modal" id="myModal">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                    
                            <!-- Modal Header -->
                            <div class="modal-header">
                                <h4 class="modal-title" style="font-size: 25px;">Giới thiệu chi tiết</h4>
                                {{-- <button type="button" class="btn-close" data-bs-dismiss="modal"></button> --}}
                            </div>
                        
                            <!-- Modal body -->
                            <div class="modal-body">
                                <p>{!! $data->detail??'' !!}</p>
                            </div>
                        
                            <!-- Modal footer -->
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
                            </div>           
                        </div>
                    </div>
                </div>
            </div>

            
      
       </div>
       <div class="col-md-6">
            <!--Nhung map-->
            <div >
                {!! $data->maps??'' !!}
           </div>

       </div>
    </div>
    
</div>
<section class="wrap d_flex food-home">
    <div class="containers">
        <div class="wrap food-home__title">
            <h2 class="text--green">Ẩm thực - Nhà hàng {{ $data->name??'' }}</h2>
        </div>
        <div class="wrap food-home__content">
            <div class="wrap d_flex food-home__content-list">
                @include('web.generals.item_food',[
                    'data'=>$foods??[]
                ])
            </div>
        </div>
    </div>
</section>
<section class="wrap d_flex hotel-home">
    <div class="containers">
        <div class="wrap hotel-home__title">
            <h2 class="text--green">Dịch vụ lưu trú {{ $data->name??'' }}</h2>
        </div>
        <div class="wrap hotel-home__content">
            <div class="wrap d_flex hotel-home__content-list">
                @include('web.generals.item_hotel',[
                    'data'=>$hotels??[]
                ])
            </div>
        </div>
    </div>
</section>
<footer style="height: 50px;">
        <div class="copyright">
            <p>&copy; 2023 Your Website. All rights reserved.</p>
        </div>
</footer>
@endsection
@section('foot')
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
@endsection
