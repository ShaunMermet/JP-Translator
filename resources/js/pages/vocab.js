document.addEventListener("DOMContentLoaded", function(event) {
    console.log('vocab page');
    $.ajax({
        type: 'get',
        url: '/vocab/all',
        
        beforeSend: function(){
            
        },
        success: function(response){
            console.log(response);
            processData(response.data);
        },
        complete: function(response){
            
        }
    });


    function processData(data){
        var tableData = [];
        data.forEach(element => {
            var rowData = [];
            var initialForm = element.vocabulary;
            var reading = element.reading;
            var meaning = element.sense_eng;
            rowData.push(initialForm);
            rowData.push(reading);
            rowData.push(meaning);
            tableData.push(rowData);
        });
        addTable(tableData)
    }

    function addTable(data) {
        $('#vocabTable').html('');
        var myTableDiv = document.getElementById("vocabTable")
        var table = document.createElement('TABLE')
        var tableBody = document.createElement('TBODY')
        var tableHead = document.createElement('thead')
    
        table.classList.add("table");
        table.classList.add("table-striped");
        table.appendChild(tableHead);
        table.appendChild(tableBody);
    
        var heading = new Array();
        heading[0] = "Text"
        heading[1] = "Reading"
        heading[2] = "Sense"
    
        var stock = data;
    
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
                td.appendChild(document.createTextNode(stock[i][j]));
                tr.appendChild(td)
            }
            tableBody.appendChild(tr);
        }  
        myTableDiv.appendChild(table)
    }
});





