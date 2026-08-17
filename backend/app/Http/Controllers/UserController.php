<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function ListUsers(Request $request){
        $user = User::all();

        return response()->json([
            'no'=>$user->count(),
            'user'=>$user
        ]);

    }
    public function me(Request $request){
       
        $id = $request->id;
        $user = User::find($id);

        return response()->json([
            'user'=>$user
        ]);

    }

}
