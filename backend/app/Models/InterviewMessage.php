<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InterviewMessage extends Model
{
    public $timestamps = false; // only created_at, no updated_at

    protected $fillable = [
        'session_id',
        'sender',
        'message',
        'created_at',
    ];
}