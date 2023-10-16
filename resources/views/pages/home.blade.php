@extends('layouts.default')
@section('content')
@vite(['resources/js/pages/home.js'])
<h1>JP Analyser</h1>

<form method="post" id="form-data" action=""{{route('text.translate')}}"">
    @csrf
    @method('post')
  <p><label>Add your japanese and click process </label></p>
  <textarea id="jpTextArea" name="jpInput" rows="4" cols="50">Add your japanese here</textarea>
  <br>
  <button type="button" class="submit-form btn btn-success" id="Process">Process</button>
</form>

<div id = explanationTable></div>
<Table border='1' id="explanationTextArea">
    <tr>
        <th>Text</th>
        <th>Reading</th>
        <th>Sense</th>
        <th>Action</th>
    </tr>
</Table>

@stop