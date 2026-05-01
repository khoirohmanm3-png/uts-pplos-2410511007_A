<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    // Menentukan tabel secara eksplisit agar tidak salah sambung
    protected $table = 'employees';

    // Kolom yang diizinkan untuk diisi data
    protected $fillable = ['name', 'position'];
}