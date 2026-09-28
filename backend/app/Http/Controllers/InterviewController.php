<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Interview_session;
use App\Models\Resume;

class InterviewController extends Controller
{
    function interviewSession(Request $request){
        // dd($request);
        $user_id = auth()->id();

        $data = $request->validate([
        'interview_type'=>'required',
        'difficulty'=>'required',
        'duration'=>'string'
        ]);
    // $user = User::where('email', $data['email'])->first();

        $resume_id = Resume::where('user_id', $user_id)->value('id');
        // dd($resume_id);
        if(!$resume_id ){
            return response()->josn(['error'=>'Resume not uploaded'],404);
        }
        $interview_session = Interview_session::create([
            'user_id'=>$user_id,
            'resume_id'=>$resume_id,
            'interview_type'=>$data['interview_type'],
            'difficulty'=>$data['difficulty'],
            'duration'=>$data['duration'],
            'status'=> 'pending',
        ]);
        $id = $interview_session->id;
        
        return response()->json([
            'id'=> $id,
            'message'=>'interview session started.',

        ]);
    }

    function getSession($sessionId){
        $session = Interview_session::findOrFail($sessionId);

        return response()->json([
            'data' => $session,
        ]);
    }
    public function endSession($sessionId)
{
    $session = Interview_session::findOrFail($sessionId);
    $session->status = 'ended';
    $session->ended_at = now();
    $session->save();

    return response()->json(['message' => 'Session ended']);
}
}