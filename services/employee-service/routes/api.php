<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/employees', [EmployeeController::class, 'index']);
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']); // Untuk Delete