<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    // GET: Menampilkan semua data
    public function index()
    {
        return response()->json(Employee::all(), 200);
    }

    // POST: Menambah data baru
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'position' => 'required',
        ]);

        $employee = Employee::create($request->all());
        return response()->json($employee, 201);
    }

    // GET {id}: Menampilkan satu data spesifik
    public function show($id)
    {
        $employee = Employee::find($id);
        if (!$employee) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($employee, 200);
    }

    // PUT {id}: Mengupdate data
    public function update(Request $request, $id)
    {
        $employee = Employee::find($id);
        if (!$employee) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $employee->update($request->all());
        return response()->json($employee, 200);
    }

    // DELETE {id}: Menghapus data
    public function destroy($id)
    {
        $employee = Employee::find($id);
        if (!$employee) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $employee->delete();
        return response()->json(['message' => 'Data berhasil dihapus'], 200);
    }
}