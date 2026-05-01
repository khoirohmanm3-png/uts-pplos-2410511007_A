<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model {
    // Wajib ada agar POST & PUT tidak error
    protected $fillable = ['name', 'email', 'position']; 
}