<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
    $data = $request->validate([
        'firstName'=> 'required|string',
        'lastName'=> 'required|string',
        'email'=>'required|email|unique:users',
        'password'=>'required|min:8',
        'role_id' => 'required|exists:roles,id'

    ]);


    $user = User::create([
        'firstName' => $data['firstName'],
        'lastName' => $data['lastName'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
        'role_id' => $data['role_id'],
    ]);

    $token = $user->createToken('react-app')->plainTextToken;
    return response()->json([
        'message'=>'User created.',
        'user'=>$user,
        'token'=>$token


    ]);
    }

    public function login(Request $request)
{
    $data = $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);
    $user = User::where('email', $data['email'])->first();
   

    if (!$user || !Hash::check($data['password'], $user->password)) {

        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }

    $token = $user->createToken('react-app')->plainTextToken;
    
    return response()->json([
        'user' => $user,
        'token' => $token
    ]);
}

public function logout(Request $request){

$request->user()->currentAccessToken()->delete();

return response()->json([
    'message' => 'Token deleted!'
]);

}}