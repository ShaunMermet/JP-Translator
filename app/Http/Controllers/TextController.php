<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vocabulary;

class TextController extends Controller
{
    public function translate(Request $request){
        $data = $request->validate([
            'jpInput' => 'required|string',
            'kuromoji'=> ''
        ]);
        $data['kuromoji'] = json_decode($data['kuromoji']);
        foreach ($data['kuromoji'] as $key => $value) {
            //$kanji = ;
            $url = 'https://jisho.org/api/v1/search/words?keyword='.urlencode($value->basic_form);//$kanji;
            //$url = urlencode($url);
            //dd($url);
            $data['kuromoji'][$key]->jurl = $url;
            $jisho = file_get_contents($url);
            $data['kuromoji'][$key]->jdata = json_decode($jisho);
            //
            //dd($data['kuromoji'][$key]);
            if (Vocabulary::where('vocabulary', '=', $value->basic_form)->exists()) {
                $data['kuromoji'][$key]->alreadyAdded = true;
                $data['kuromoji'][$key]->url = "/delete";
             }else{
                $data['kuromoji'][$key]->alreadyAdded = false;
                $data['kuromoji'][$key]->url = "/store";
             }     
        }
        
        return response(['translation' => $data]);
    }

    public function store(Request $request){
        $data = $request->validate([
            'jpText' => 'required|string',
            'reading' => 'required|string',
            'sense' => 'required|string',
        ]);

        $newVocabulary = Vocabulary::create([
            'vocabulary' => $data['jpText'],
            'reading' => $data['reading'],
            'sense_eng' => $data['sense']
        ]);
        
        return response(['data' => $newVocabulary]);
    }

    public function delete(Request $request){
        $data = $request->validate([
            'jpText' => 'required|string',
        ]);

        $checkVocabulary = Vocabulary::where('vocabulary', '=', $data['jpText']);
        $checkVocabulary->delete();
        
        return response(['data' => $checkVocabulary]);
    }

    public function getAll(Request $request){

        $Vocabulary = Vocabulary::all();
        
        return response(['data' => $Vocabulary]);
    }
}
