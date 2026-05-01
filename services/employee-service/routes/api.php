<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;

// Satu baris ini otomatis membuat route untuk GET, POST, PUT, dan DELETE
Route::apiResource('employees', EmployeeController::class);