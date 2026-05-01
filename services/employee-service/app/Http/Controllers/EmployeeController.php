<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Menampilkan semua data karyawan
     * Endpoint: GET /api/employees
     */
    public function index()
    {
        $employees = Employee::all();
        
        return response()->json([
            'status' => 'success',
            'data' => $employees
        ], 200);
    }

    /**
     * Menghapus data karyawan berdasarkan ID
     * Endpoint: DELETE /api/employees/{id}
     */
    public function destroy($id)
    {
        // Cari data karyawan berdasarkan ID
        $employee = Employee::find($id);

        // Jika data tidak ditemukan
        if (!$employee) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data karyawan tidak ditemukan'
            ], 404);
        }

        // Hapus data dari database
        $employee->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data karyawan dengan ID ' . $id . ' berhasil dihapus'
        ], 200);
    }
}