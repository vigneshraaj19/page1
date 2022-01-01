var table=document.createElement('table');
table.setAttribute('class','table');
var thead=document.createElement('thead');
thead.setAttribute('class','thead-dark');

var tr=document.createElement('tr');
var th1=createelement('th','Id');
var th2=createelement('th','Name');
var th3=createelement('th','Email');
tr.append(th1,th2,th3);
thead.append(tr);


var tbody=document.createElement('tbody');

var list = new Array();
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 5;
var numberOfPages = 0;
function getdata()
{
    return fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");

}
async function foo1()
{
    const s1=await getdata();
    let result=await s1.json();
    
    {
        for (var i = 0; i < 100; i++)
        list.push(result[i]); 
       numberOfPages = getNumberOfPages();  
       
    }
}foo1();

function getNumberOfPages()
 {
return Math.ceil(list.length /numberPerPage);
}

function nextPage() {
currentPage += 1;
loadList();
check();

}

function previousPage() {
currentPage -= 1;
loadList();
check();

}

function firstPage() {
   
currentPage = 1;
loadList();
check();

}

function lastPage()  {
    
currentPage = numberOfPages;
loadList();
check();

}

function loadList() {
var begin = ((currentPage - 1) * numberPerPage);
var end = begin + numberPerPage;

pageList = list.slice(begin, end);

drawList();
}
function drawList()
{
    for (r = 0; r < pageList.length; r++) {
       
        var tr=document.createElement('tr');
        var td1=createelement('td',pageList[r].id);
       var td2=createelement('td',pageList[r].name);
       var td3=createelement('td',pageList[r].email);
       tr.append(td1,td2,td3);
      thead.append(tr);
       
}
}

function check() {
document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
document.getElementById("previous").disabled = currentPage == 1 ? true : false;
document.getElementById("first").disabled = currentPage == 1 ? true : false;
document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}


function load() {
foo1();
loadList();
}

window.onload = load;

table.append(thead,tbody);
document.body.append(table);


function createelement(elename,value)
{
    var element=document.createElement(elename);
    element.innerHTML=value;
    return element;
}

