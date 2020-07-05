<?php

namespace App\Http\Controllers;

use App\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function store(Request $req)
    {
        $member = Member::create($req->all());
        return response()->json(array( 'status' => true, 'message' => 'Member created successfully.', 'data' => [ $member ] ));
    }

    public function update(Request $req, $id)
    {
        $member = Member::find($id);
        $member->first_name = $req->input('first_name');
        $member->last_name  = $req->input('last_name');
        $member->mobile_no  = $req->input('mobile_no');
        $member->dob        = $req->input('dob');
        $member->address    = $req->input('address');
        $member->save();
        return response()->json(array( 'status' => true, 'message' => 'Member details updated successfully.', 'data' => [ $member ] ));
    }

    public function destroy($id)
    {
        // TODO: implement soft delete
        $member = Member::find($id);
        $member->delete();
        return response()->json(array( 'status' => true, 'message' => 'Removed Successfully.', 'data' => [] ));
    }

    public function index()
    {
        // TODO: implement flag check to fetch user
        $members = Member::all();
        return response()->json(array( 'status' => true, 'message' => 'All members list fetched.', 'data' => $members ));
    }

    public function show($id) {
        $member = Member::find($id);
        return response()->json(array( 'status' => true, 'message' => 'User found with '.$id, 'data' => [ $member ] ));
    }
}
