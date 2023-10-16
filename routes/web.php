<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TextController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('pages/home');
});

Route::get('/vocab', function () {
    return view('pages/myvocabulary');
});

Route::post('/',[TextController::class,'translate'])->name('text.translate');
Route::post('/store',[TextController::class,'store'])->name('text.store');
Route::post('/delete',[TextController::class,'delete'])->name('text.delete');
Route::get('/vocab/all',[TextController::class,'getAll'])->name('text.getAll');
