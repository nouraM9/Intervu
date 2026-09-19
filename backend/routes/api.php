<?php 
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\InterviewController;

use Illuminate\Support\Facades\Route;

Route::post('/sign-up',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/user/{id}',[UserController::class,'me']);
    Route::get('/users',[UserController::class,'ListUsers']);
    Route::post('/upload-resume',[ResumeController::class,'UploadResume']);
    Route::post('/update-resume',[ResumeController::class,'UpdateResume']);
    Route::get('/users/{userId}/resume',[ResumeController::class,'GetResume']);
    Route::post('/interview-session',[InterviewController::class,'interviewSession']);



});