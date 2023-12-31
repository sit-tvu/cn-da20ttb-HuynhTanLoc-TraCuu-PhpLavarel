<div class="form-group">
    <label class="control-label col-md-2 col-sm-2 col-xs-12">@if($value['required']==1)<span class="form-asterick">* </span>@endif {!! $value['title'] !!}</label>
    <div class="controls col-md-9 col-sm-10 col-xs-12">
      	<input class="form-control @if($value['slug']==1){!! 'slug-title' !!}@endif" type="text" name="{!! $value['name'] !!}" id="{!! $value['name'] !!}" value="{!! $value['value'] !!}" placeholder="{!! $value['placeholder'] !!}" {!! $value['extra'] !!} @if($value['slug']==1) data-slug="{!! $value['slugField'] !!}" @endif>
    </div>
</div>