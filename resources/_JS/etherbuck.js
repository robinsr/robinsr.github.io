var mypage = {
	ajaxFunction:function(){
        var xmlhttp; 
        try { xmlhttp = new XMLHttpRequest();}
        catch (e) {
            try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); }
            catch (e) {
                try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
                catch (e) { console.log('no ajax?'); return false; }
            }
        }
        return xmlhttp;
    },
    loaded:null,
    get:function(code,article){
      var newcontent;
      var url;
      var switcher = document.getElementById("switcher");
      if(mypage.loaded == null){
         url = code;
         mypage.loaded = true;
         switcher.innerHTML = 'Back to article';
      } else {
         url = article;
         mypage.loaded = null;
         switcher.innerHTML = 'Full Code';
      }
      var xmlhttp = mypage.ajaxFunction();
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
      xmlhttp.onreadystatechange = function(){
         if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)){
            newcontent = xmlhttp.responseText; 
            mypage.makeswitch(newcontent);
         }
      }
   },
   makeswitch:function(stuffs){
      var dummy = document.createElement('div');
      dummy.innerHTML = stuffs;
      var code = dummy.getElementsByTagName('article')[1];
      var target = document.getElementsByTagName("article")[1];
      target.innerHTML = '';
      target.appendChild(code);
      prettyPrint();
   }
 }