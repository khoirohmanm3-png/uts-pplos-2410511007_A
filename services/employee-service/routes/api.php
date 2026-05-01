<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AuthController; // Pastikan kamu punya AuthController
use Illuminate\Support\Facades\Route;

// Rute untuk mengambil data karyawan
Route::get('/employees', [EmployeeController::class, 'index']);

// TAMBAHKAN KODE INI:
Route::post('/login', [AuthController::class, 'login']);