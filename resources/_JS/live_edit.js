(function(){

	var EnableLiveEditButton = document.getElementById("EnableLiveEditButton");
	var live_edit_css_save = document.getElementById("live_edit_css_save");
	var head = document.getElementsByTagName('head')[0];
	var live_edit_css_save_display = false;
	var select = document.querySelector("#live_edit_css_selector");
	var sheets = document.getElementsByTagName('link'); // every stylesheet on the page (including plugins, adsense, etc.)
	var userSheets = [];  // full href of any 'data-wato' stylesheet
	var sheetNames = [];  // just the 'name.css' at the end
	var live_edit_css_selector_loaded = false;
	var editor = ace.edit("live_edit_ace_editor");
	var current_css = '';

	EnableLiveEditButton.addEventListener("click", function(){
		
		if (live_edit_css_selector_loaded == false){
				for (i=0; i<sheets.length; i++) {
				if (sheets[i].rel == 'stylesheet'){
					if (sheets[i].dataset.wato == 'user-style'){
						userSheets.push(sheets[i].href);
					}
				}
			};

			for (i=0; i<userSheets.length; i++) {
				var parts = userSheets[i].split("/");
				var name = parts[parts.length-1];

				sheetNames.push(name);

				var option = document.createElement('option');
				option.name = name;
				option.value = name;
				var text = document.createTextNode(name);
				option.appendChild(text);
				select.appendChild(option);
			};
		live_edit_css_selector_loaded = true;
		}
	});

	select.addEventListener("change", function(){
		var order = sheetNames.indexOf(select.value);
		var path = userSheets[order].toString();
		var data = '';
		current_css = select.value;

		var xmlhttp = mypage.ajaxFunction();
		xmlhttp.open("GET", path, true);
		xmlhttp.send();
		xmlhttp.onreadystatechange = function(){
			if ((xmlhttp.status == 200) && (xmlhttp.readyState ==4)){
				data = xmlhttp.responseText;

				//document.querySelector("#live_edit_ace_editor").innerHTML = data;

				editor.setTheme("ace/theme/monokai");
				editor.getSession().setMode("ace/mode/css");
				editor.setValue(data);
			}
		}
	});

	function make_base_auth() {
		var key = localStorage.getItem("WATOKEY");
	  	var tok = key + ': ';
	  	var hash = Base64.encode(tok);
	  	return "Basic " + hash;
	}

	function refreshPage(){
		var order = sheetNames.indexOf(select.value);
		var path = userSheets[order].toString();
		var xmlhttp = mypage.ajaxFunction();
		xmlhttp.open("GET",path,true);
		xmlhttp.send();
		xmlhttp.onreadystatechange = function(){
			if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)){
				for(i=0;i<sheets.length;i++){
					if (sheets[i].href == path){
						head.removeChild(sheets[i]);
					}
				}

				if (document.getElementById("live_edit_style")){
					console.log('deleting old style');
					var old_style = document.getElementById("live_edit_style");
					head.removeChild(old_style);
				}

				var newSheet = document.createElement('style');
              	newSheet.type = "text/css";
              	newSheet.id = "live_edit_style";
				var data = document.createTextNode(xmlhttp.responseText.toString().replace(/body/g,'#slidetable'));
				newSheet.appendChild(data);

              	document.head.appendChild(newSheet);
			}
		}
	}

	live_edit_css_save.addEventListener("click", function(){
		var newdata = editor.getValue();
		var xmlhttp = mypage.ajaxFunction();
		xmlhttp.open("POST", "/auth/savehfcssfile", true);
        var fn = {"doctype":"css","content":newdata, "url":current_css};
        var m = JSON.stringify(fn);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("Authorization", make_base_auth());
        xmlhttp.send(m);
        xmlhttp.onreadystatechange = function(){
            if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)){
                refreshPage();
            }else if ((xmlhttp.readyState == 4) && (xmlhttp.status != 200)){
                alert(xmlhttp.responseText);
            }
        } 

	});
}());


    //var editor = ace.edit("editor");
    //editor.setTheme("ace/theme/monokai");
    //editor.getSession().setMode("ace/mode/javascript");
