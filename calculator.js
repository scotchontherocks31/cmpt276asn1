//JS file for Asn1
var trCount = 5; //Count starting from top of table (not including total) for row tracking

function calculate() { //calculates percent instantly
    for (var i = 1; i < trCount; i++) {
        var num = document.getElementById("a" + i + "_num").value;
        var den = document.getElementById("a" + i + "_denom").value;
        var per = (num / den) * 100;
        if (isFinite(per) == false || per < 0) { //skips calculation if input values are empty
            document.getElementById("percentage" + i).innerHTML = "";
            continue;
        }
        per = Math.round(per * 100) / 100;
        document.getElementById("percentage" + i).innerHTML = per + "%";

    }
}

function addRow() {
    $("tr:last").before('<tr>' +
        '<td><input class="activity" type="text" value="Activity ' + trCount + '" placeholder="Activity ' + trCount + '"></td>' +
        '<td><input class="sname" type="text" value="A' + trCount + '" placeholder="A' + trCount + '"></td>' +
        '<td><input id="a' + trCount + '_weight" class="weight" type="number"></td>' +
        '<td><input id="a' + trCount + '_num" class="num" type="number" onkeydown="calculate()" onkeyup="calculate()"> / <input id="a' + trCount + '_denom" type="number" class="den" onkeydown="calculate()" onkeyup="calculate()"></td>' +
        '<td id="percentage' + trCount + '" class="per" />' +
        '</tr>');
    trCount++;
}

function removeRow() {
    if (trCount == 2) {
        alert("You can't have less than one activity!");
        return; //exits if you try to remove the last row
    }
    var table = document.getElementById("main_table");
    table.deleteRow(trCount - 1);
    trCount--;
}

function resetButton() {
    //resetting input fields
    document.getElementById("main_form").reset();
    //resetting total
    document.getElementById("total_per").innerHTML = "";
    //resetting percentage fields
    var x = trCount - 5; //value to check how many rows need to be reset
    if (x < 0) { //less than 4
        for (var i = 0; i < Math.abs(x); i++) {
            addRow();
        }
    } else { //4 or more
        var table = document.getElementById("main_table");
        var x = trCount - 5; //value to check how rows need to be reset
        for (var i = 0; i < x; i++) {
            table.deleteRow(trCount - 1);
            trCount--;
        }
    }
    for (var j = 1; j < trCount; j++) {
        document.getElementById("percentage" + j).innerHTML = "";
    }
}

function weighted() {
    var sum = 0;
    var weight_total = 0
        //for loop
    for (var i = 1; i < trCount; i++) {
        var weight = document.getElementById("a" + i + "_weight").value;
        var numerator = document.getElementById("a" + i + "_num").value;
        var denominator = document.getElementById("a" + i + "_denom").value;
        weight_total += parseInt(weight);
        var value = numerator / denominator * weight;
        if (isFinite(value) == false || value < 0) {
            continue;
        }
        sum = sum + value;
    }

    var result = (sum / weight_total) * 100;
    result = Math.round(result * 100) / 100;
    document.getElementById("total_per").innerHTML = result + "%";

}

function mean() {
    var total = 0;
    var count = 0; //number of activities counted in the mean
    for (var i = 1; i < trCount; i++) {
        var num = document.getElementById("a" + i + "_num").value;
        var den = document.getElementById("a" + i + "_denom").value;
        var temp_total = num / den;
        if (isFinite(temp_total) == false || temp_total < 0) {
            continue;
        }
        count++;
        total += parseFloat(temp_total); //parseFloat to make sure it's adding and not concatenating
    }
    total = total / count * 100;
    total = Math.round(total * 100) / 100;
    document.getElementById("total_per").innerHTML = total + "%";
}