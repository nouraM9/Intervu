<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['id' => 1 , 'name'=>'admin'],
            ['id'=> 2 , 'name'=>'user'],
            
        ];

        foreach($roles as $role){
            DB::table('roles')->updateOrInsert(
                ['id' => $role['id']], 
                [
                'name' => $role['name'],
                'created_at'=>now(),
                'updated_at'=>now()
                ],
                
            );
        }
    }
}
