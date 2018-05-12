let myLibrary = [];

function Book(title, author, pages, read){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function (){
		return `${title} by ${author}, ${pages}, ${read}`;
	}
}

function addBookToLibrary(){
	let title = $("input:text[name='title']").val();
	$("input:text[name='title']").val("");

	let author = $("input:text[name='author']").val();
	$("input:text[name='author']").val("");

	let pages =	document.getElementById("pages").value;
	document.getElementById("pages").value = null;
	pages = Number(pages);

	if($("input:checkbox").prop("checked")) {read = true;} 
	else {read = false;}
	$("input:checkbox").prop("checked", false);

	if (title != "" && author != "" && pages > 0) {
	myLibrary.push(new Book(title, author, pages, read));
	} 
	listBooks();	deleteEntry(); deleteEntry(); readChange();
	$("#form").hide();	
}

$("#newBookButton").click(function(){
		$("#form").show();
});

$("input[name='addToLibrary']").click(addBookToLibrary);		



// Sample Books
const firstBook = new Book(
	"Object-Oriented Programming in C# 5.0",
	"B.M.Harwani",
	654,
	false)

const secondBook = new Book(
	"Advanced JavaScript",
	"Chuck Easttom",
	591,
	true)

const thirdBook = new Book(
	"C# 5.0 For Dummies",
	"Bill Sempf",
	790,
	false)

myLibrary.push(firstBook,secondBook,thirdBook);

function listBooks() {
	$("#table tr").not('#listTitle').remove();
	for (let i = 0; i < myLibrary.length; i++) {
	let readText = "";
	if (myLibrary[i].read == true) {readText = "Yes";}
		else {readText = "No";}
	$("#table").append(`<tr id="${i}"> 	<td> 	${myLibrary[i].title} 	</td>
										<td>	${myLibrary[i].author}	</td>
										<td> 	${myLibrary[i].pages} 	</td>
										<td> 	${readText} 			</td>	
										<td><button class ="removed" id="${i}">x</button>	</td>			
																	</tr>`);
	}
}

function deleteEntry() {
	$(".removed").click(function(){
	let id = $(this).attr("id");
	let position = $("#" + id + " td:nth-child(1)").html();
	let pos = position.trim();

  	for(var x in myLibrary) {
    if (myLibrary[x].title == pos) 
    	return myLibrary.splice(x,1); 
	}
	
	$("#" + id).remove();
	deleteEntry();
	});
}

function readChange(){
$("tr td:nth-child(4)").click(function(){
	let value = $(this).html();
	let valueTrimmed = value.trim();
	if ( valueTrimmed == "Yes") $(this).html("No");
	else if ( valueTrimmed == "No") $(this).html("Yes");
});
}

listBooks(); deleteEntry(); deleteEntry(); readChange();