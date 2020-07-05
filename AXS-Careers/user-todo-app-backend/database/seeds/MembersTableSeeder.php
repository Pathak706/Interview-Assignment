<?php

use Illuminate\Database\Seeder;

class MembersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app('db')
            ->table('members')
            ->insert([
                'first_name' => 'Rahul',
                'last_name'  => 'Pathak',
                'mobile_no'  => '9326598839',
                'email_id'   => 'pathakrahul2704@gmail.com',
                'dob'        => '27-04-2000',
                'address'    => 'Salve Nagar MIDC Andheri East Mumbai 400093'
            ]);

        app('db')
            ->table('members')
            ->insert([
                'first_name' => 'Rohit',
                'last_name'  => 'Pathak',
                'mobile_no'  => '7021630982',
                'email_id'   => 'pathakrohit0712@gmail.com',
                'dob'        => '07-12-1993',
                'address'    => 'Munshi Nagar SV Road Andheri West Mumbai 400059'
            ]);
    }
}
