<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InterviewMessage;
use App\Models\Interview_session;
use Illuminate\Support\Facades\Http;

class InterviewChatController extends Controller
{
    public function startConversation($sessionId)
{
    $session = Interview_session::findOrFail($sessionId);

    // If messages already exist, don't start again — just return them
    $existingMessages = InterviewMessage::where('session_id', $sessionId)->count();
    if ($existingMessages > 0) {
        $messages = InterviewMessage::where('session_id', $sessionId)
            ->orderBy('created_at')
            ->get();
        return response()->json(['data' => $messages]);
    }

    $systemPrompt = [
        'role' => 'system',
        'content' => "You are conducting a {$session->difficulty} level {$session->interview_type} interview. Start by briefly greeting the candidate and asking your first interview question. Keep it concise and professional."
    ];

    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
        'Content-Type' => 'application/json',
    ])->post('https://api.groq.com/openai/v1/chat/completions', [
        'model' => 'openai/gpt-oss-120b',
        'messages' => [$systemPrompt],
    ]);

    if ($response->failed()) {
        return response()->json(['error' => 'Failed to start interview'], 500);
    }

    $aiMessage = $response->json('choices.0.message.content');

    $saved = InterviewMessage::create([
        'session_id' => $sessionId,
        'sender' => 'ai',
        'message' => $aiMessage,
        'created_at' => now(),
    ]);

    return response()->json(['data' => [$saved]]);
}
    // Get all messages for a session (to load chat history)
    public function getMessages($sessionId)
    {
        $messages = InterviewMessage::where('session_id', $sessionId)
            ->orderBy('created_at')
            ->get();

        return response()->json(['data' => $messages]);
    }

    // Send a user message, get AI response back
   public function sendMessage(Request $request, $sessionId)
{
    $data = $request->validate([
        'message' => 'required|string',
    ]);

    $session = Interview_session::findOrFail($sessionId);

    // Save the user's message
    InterviewMessage::create([
        'session_id' => $sessionId,
        'sender' => 'user',
        'message' => $data['message'],
        'created_at' => now(),
    ]);

    // Build conversation history for context
    $history = InterviewMessage::where('session_id', $sessionId)
        ->orderBy('created_at')
        ->get()
        ->map(function ($msg) {
            return [
                'role' => $msg->sender === 'user' ? 'user' : 'assistant',
                'content' => $msg->message,
            ];
        })
        ->toArray();

    $systemPrompt = [
        'role' => 'system',
        'content' => "You are conducting a {$session->difficulty} level {$session->interview_type} interview. Ask one relevant question at a time, follow up naturally based on the candidate's answers, and keep responses concise and professional."
    ];

    $messages = array_merge([$systemPrompt], $history);

$response = Http::withHeaders([
    'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
    'Content-Type' => 'application/json',
])->post('https://api.groq.com/openai/v1/chat/completions', [
    'model' => 'openai/gpt-oss-120b',
    'messages' => $messages,
]);
    if ($response->failed()) {
        \Log::error('Groq API call failed', [
            'status' => $response->status(),
            'body' => $response->body(),
        ]);

        return response()->json([
            'message' => 'AI service failed to respond. Please try again.',
        ], 502);
    }

    $aiMessage = $response->json('choices.0.message.content');

    if (!$aiMessage) {
        \Log::error('Groq API returned no message content', [
            'response' => $response->json(),
        ]);

        return response()->json([
            'message' => 'AI response was empty. Please try again.',
        ], 502);
    }

    $saved = InterviewMessage::create([
        'session_id' => $sessionId,
        'sender' => 'ai',
        'message' => $aiMessage,
        'created_at' => now(),
    ]);

    return response()->json(['data' => $saved]);
}
}