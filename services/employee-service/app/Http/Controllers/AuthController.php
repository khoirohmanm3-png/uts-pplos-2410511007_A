<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Pastikan nama fungsi ini persis "login" (case sensitive)
    public function login(Request $request) 
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Logika jika login sukses
            return response()->json([
                'message' => 'Login success',
                'user' => Auth::user()
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}