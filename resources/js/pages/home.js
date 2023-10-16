document.addEventListener("DOMContentLoaded", function(event) {
// Your code to run since DOM is loaded and ready
    //Tokenize input
    $(".submit-form").click(function(e){
        e.preventDefault();
        tokenizeJA($('#jpTextArea')[0].value);
    });

    function tokenizeJA(text) {
        var result;
        kuromoji.builder({ dicPath: "/build/assets/dict" }).build(function (err, tokenizer) {
            // tokenizer is ready
            var path = tokenizer.tokenize(text);
            submit(path);
        });
    }   
    function submit(kuromojiOutput){
        var data = $('#form-data').serialize() + '&kuromoji=' + window.JSON.stringify(kuromojiOutput);
        $.ajax({
            type: 'post',
            url: "/",
            data: data,
            
            beforeSend: function(){
                $('#Process').html('....Please wait');
            },
            success: function(response){
                $('#explanationTextArea').html('');
                const textArea = document.getElementById("explanationTextArea");
                var tableData = [];
                response.translation['kuromoji'].forEach(element => {
                    var rowData = [];
                    var initialForm = element.basic_form;
                    var reading = element.jdata?.data[0]?.japanese[0]?.reading;
                    var meaning = element.jdata?.data[0]?.senses[0]?.english_definitions[0];
                    var actionText = (!element.alreadyAdded)?"Add to My vocabulary":"Remove from My vocabulary";
                    var url = element.url;
                    var action = {  
                                    actionText :actionText,
                                    url:url,
                                    jpText:initialForm,
                                    reading:reading,
                                    sense:meaning
                                };
                    rowData.push(initialForm);
                    rowData.push(reading);
                    rowData.push(meaning);
                    rowData.push(action);
                    tableData.push(rowData);
                });
                addTable(tableData);
            },
            complete: function(response){
                $('#Process').html('Process');
            }
        });
    }

    function storeAction (evt){
        var button = evt.currentTarget;
        var action = evt.currentTarget.obj;
        $.ajax({
            type: 'post',
            url: action.url,
            data: {
                _token : $('meta[name="csrf-token"]').attr('content'),
                _method : "post",
                jpText:action.jpText,
                reading:action.reading,
                sense:action.sense
            },
            
            beforeSend: function(){
                button.innerText = '....Please wait';
            },
            success: function(response){
                button.innerText = 'edit success';
            },
            complete: function(response){
                console.log(response);
            }
        });
    }

    function addTable(data) {
        $('#explanationTable').html('');
        var myTableDiv = document.getElementById("explanationTable")
        var table = document.createElement('TABLE')
        var tableBody = document.createElement('TBODY')
    
        table.border = '1'
        table.appendChild(tableBody);
    
        var heading = new Array();
        heading[0] = "Text"
        heading[1] = "Reading"
        heading[2] = "Sense"
        heading[3] = "Action"
    
        var stock = data;//new Array()
    
        //TABLE COLUMNS
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
        for (var i = 0; i < heading.length; i++) {
            var th = document.createElement('TH')
            th.width = '75';
            th.appendChild(document.createTextNode(heading[i]));
            tr.appendChild(th);
        }
    
        //TABLE ROWS
        for (var i = 0; i < stock.length; i++) {
            var tr = document.createElement('TR');
            for (var j = 0; j < stock[i].length; j++) {
                var td = document.createElement('TD')
                if(j==stock[i].length-1){
                    const createButton= document.createElement('button')
                    createButton.innerText= stock[i][j].actionText;
                    createButton.obj = stock[i][j];
                    createButton.addEventListener("click", storeAction);
                    td.appendChild(createButton);
                }else
                td.appendChild(document.createTextNode(stock[i][j]));
                tr.appendChild(td)
            }
            tableBody.appendChild(tr);
        }  
        myTableDiv.appendChild(table)
    }
});