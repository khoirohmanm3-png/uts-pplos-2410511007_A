<?php

namespace App\Http\Controllers;

use App\Models\Employee; // Memanggil model dari folder Models
use Illuminate\Http\Request;

class EmployeeController extends Controller 
{
    public function index() 
    { 
        return response()->json(Employee::all()); 
    }

    // ... method lainnya (store, update, destroy)
}