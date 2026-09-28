<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ResumeController extends Controller
{
    function UploadResume(Request $request)
    {    \Log::info('Authenticated user ID: ' . auth()->id());

        $data = $request->validate([
            'resume' => 'required|file|mimes:pdf|max:5120',
            'extracted_text' => 'required|string',
            'original_file_name' => 'required|string',
        ]);

        $path = $request->file('resume')->store('resumes', 'public');
        $url = Storage::url($path);

        $resume = Resume::create([
            'user_id' => auth()->id(),
            'resume_url' => $url,
            'original_file_name' => $data['original_file_name'],
            'extracted_text' => $data['extracted_text'],
        ]);

        return response()->json([
            'data' => $resume,
        ]);
    }
   
public function UpdateResume(Request $request)
{
    
    $data = $request->validate([
        'resume'=> 'required|file|mimes:pdf|max:5120',
        'extracted_text'=>'required|string',
        'original_file_name'=>'required|string'
    ]);

    $path = $request->file('resume')->store('resumes', 'public');
    $url = Storage::url($path);

    $resume = Resume::where('user_id', auth()->id())->first();

    $resume->update([
        'resume_url' => $url,
        'extracted_text' => $data['extracted_text'],
        'original_file_name' => $data['original_file_name']
    ]);

    return response()->json([
        'data' => $resume
    ]);
}

    function GetResume(Request $request){
        $resume = Resume::where('user_id', auth()->id())->first();
        if(!$resume){
            return response()->json('no resume',404);
        }
       return $resume->original_file_name;
        
    }

    
}