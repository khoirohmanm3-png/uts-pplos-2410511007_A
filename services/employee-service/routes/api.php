<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

// Route untuk mengambil data karyawan
Route::get('/employees', [EmployeeController::class, 'index']);