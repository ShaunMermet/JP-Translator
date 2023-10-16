<!doctype html>
<html>
<head>
   @include('includes.head')
   @vite(['resources/js/app.js'])
   <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
<div class="container">
   <header class="row">
       @include('includes.header')
   </header>
   <div id="main" class="row">
           @yield('content')
   </div>
</div>
</body>
</html>