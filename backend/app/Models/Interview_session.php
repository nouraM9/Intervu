<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Interview_session extends Model
{
    protected $fillable = [
        'user_id',
        'resume_id',
        'interview_type',
        'difficulty',
        'duration',
        'status',
        'ended_at',
        'created_at'
        
    ];
}
