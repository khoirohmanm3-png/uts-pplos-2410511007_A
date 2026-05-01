<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Mengecek apakah email & password cocok dengan tabel users
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            // Membuat token (pastikan Laravel Sanctum sudah terinstal)
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login Berhasil',
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        }

        return response()->json(['message' => 'Email atau password salah'], 401);
    }
}