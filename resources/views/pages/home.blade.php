@extends('layouts.default')
@section('content')
@vite(['resources/js/pages/home.js'])

<br></br>
<form method="post" id="form-data" action=""{{route('text.translate')}}"">
    @csrf
    @method('post')
  <textarea id="jpTextArea" name="jpInput" rows="5" cols="100">Add your japanese here and click process</textarea>
  <br>
  <button type="button" class="submit-form btn btn-success" id="Process">Process</button>
</form>
<br></br>
<div id = explanationTable></div>
<Table class="table" id="explanationTextArea">
    <thead>
        <tr>
            <th>Text</th>
            <th>Reading</th>
            <th>Sense</th>
            <th>Action</th>
        </tr>
    </thead>
</Table>

@stop