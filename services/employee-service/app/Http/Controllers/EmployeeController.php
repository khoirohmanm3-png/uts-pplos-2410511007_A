<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Menampilkan daftar semua karyawan.
     */
    public function index()
    {
        $employees = Employee::all();
        return response()->json($employees, 200);
    }
}