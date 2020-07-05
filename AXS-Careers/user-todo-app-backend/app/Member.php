<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = ['first_name', 'last_name', 'mobile_no', 'email_id', 'dob', 'address'];
}
