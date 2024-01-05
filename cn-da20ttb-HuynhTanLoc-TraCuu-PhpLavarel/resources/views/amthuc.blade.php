@extends('web.layouts.app')
@section('content')
<div class="searchhotel">
    <div class="searchhotel1">
        <form action="{{ route('luutru') }}" method="GET">
            @csrf
            <input name="searchTerm" placeholder="Nhập nơi ở cần tra cứu" type="text">
            <button type="submit">Tìm kiếm</button>
        </form>
    </div>
  <h3 style="font-family: 'Times New Roman', Times, serif; "><a href="/">Trang chủ</a>&nbsp;<i class="fa-solid fa-arrow-right"></i>&nbsp;<a href="{{ route('amthuc') }}">Ẩm thực</a></h3>
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
<footer style="height: 50px;">
  <div class="copyright">
      <p>&copy; 2023 Your Website. All rights reserved.</p>
  </div>
</footer>
@endsection
@section('foot')
@endsection
