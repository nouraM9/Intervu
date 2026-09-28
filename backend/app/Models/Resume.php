<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    protected $fillable = [
        'user_id',
        'resume_url',
        'original_file_name',
        'extracted_text',
        
    ];
    
}
