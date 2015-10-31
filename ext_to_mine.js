// ext_to_mine.js Module
var ExtToMime = (function (module) {
  // Define the map for the extensions
  var _map = $.parseJSON('{"groovy":"groovy","ini":"text/x-properties","properties":"text/x-properties","css":"css","css.erb":"css","scss":"text/x-scss","scss.erb":"text/x-scss","styl":"text/x-styl","html":"text/x-html","htm":"text/x-html","shtm":"text/x-html","shtml":"text/x-html","xhtml":"text/x-html","cfm":"text/x-html","cfml":"text/x-html","cfc":"text/x-html","dhtml":"text/x-html","xht":"text/x-html","tpl":"text/x-html","twig":"text/x-html","kit":"text/x-html","jsp":"text/x-html","aspx":"text/x-html","ascx":"text/x-html","asp":"text/x-html","master":"text/x-html","cshtml":"text/x-html","vbhtml":"text/x-html","ejs":"application/x-ejs","dust":"application/x-ejs","erb":"application/x-erb","html.erb":"application/x-erb","htm.erb":"application/x-erb","js":"javascript","jsx":"javascript","js.erb":"javascript","jsm":"javascript","_js":"javascript","dart":"application/dart","vbs":"vbscript","vb":"text/x-vb","json":"application/json","xml":"xml","wxs":"xml","wxl":"xml","wsdl":"xml","rss":"xml","atom":"xml","rdf":"xml","xslt":"xml","xsl":"xml","xul":"xml","xsd":"xml","xbl":"xml","mathml":"xml","config":"xml","plist":"xml","xaml":"xml","svg":"image/svg+xml","php":"php","php3":"php","php4":"php","php5":"php","phtm":"php","phtml":"php","ctp":"php","c":"text/x-csrc","h":"text/x-csrc","i":"text/x-csrc","cc":"text/x-c++src","cp":"text/x-c++src","cpp":"text/x-c++src","c++":"text/x-c++src","cxx":"text/x-c++src","hh":"text/x-c++src","hpp":"text/x-c++src","hxx":"text/x-c++src","h++":"text/x-c++src","ii":"text/x-c++src","ino":"text/x-c++src","cs":"text/x-csharp","asax":"text/x-csharp","ashx":"text/x-csharp","java":"text/x-java","scala":"text/x-scala","sbt":"text/x-scala","coffee":"coffeescript","cf":"coffeescript","cson":"coffeescript","_coffee":"coffeescript","clj":"clojure","cljs":"clojure","cljx":"clojure","pl":"perl","pm":"perl","t":"perl","rb":"ruby","ru":"ruby","gemspec":"ruby","rake":"ruby","py":"python","pyw":"python","wsgi":"python","sass":"sass","lua":"lua","sql":"text/x-mysql","diff":"diff","patch":"diff","md":"markdown","markdown":"markdown","mdown":"markdown","mkdn":"markdown","yaml":"yaml","yml":"yaml","hx":"haxe","sh":"text/x-sh","command":"text/x-sh","bash":"text/x-sh","gif":"text","png":"text","jpe":"text","jpeg":"text","jpg":"text","ico":"text","bmp":"text","webp":"text","mp3":"text","wav":"text","aif":"text","aiff":"text","ogg":"text","a":"text","ai":"text","avi":"text","bin":"text","cab":"text","com":"text","db":"text","dll":"text","dmg":"text","doc":"text","docx":"text","dot":"text","dotx":"text","dsym":"text","dylib":"text","egg":"text","epub":"text","eot":"text","exe":"text","flv":"text","gz":"text","gzip":"text","htmz":"text","htmlz":"text","ipch":"text","iso":"text","jar":"text","jsz":"text","lib":"text","mpeg":"text","mpg":"text","mp4":"text","msi":"text","node":"text","o":"text","obj":"text","odc":"text","odb":"text","odf":"text","odg":"text","odp":"text","ods":"text","odt":"text","otf":"text","pak":"text","pdb":"text","pdf":"text","pdi":"text","ppt":"text","pptx":"text","psd":"text","rar":"text","sdf":"text","so":"text","sqlite":"text","suo":"text","svgz":"text","swf":"text","tar":"text","tif":"text","tiff":"text","ttf":"text","woff":"text","xls":"text","xlsx":"text","zip":"text","hs":"haskell"}');


  // Get the map for the mimetypes/modes from brackets source code
  var _getMapFromBrackets = function(replaceBracketsInString, callback){
    // Get the data from brackets language json file
    $.get("https://raw.githubusercontent.com/adobe/brackets/master/src/language/languages.json", function(data){
      // Parse the file as a JSON
      var _content = $.parseJSON(data);
      // Iterate the _content list and create an array that returns the codemirror modes / mime types based on the file extensions
      // The variable _return holds up the array of objects
      var _return = {};
      _.map(_content, function(item){
        // For each item, get the mimetype/codemirror mode and append for that mode, all the extensions that can be mapped to it
        var _extensions = item.fileExtensions;
        if(typeof item.mode == typeof []){ // Check if it's array
          // item.mode is an array, containing multiple modes/mime types
          _.map(item.mode, function(mode){ // Iterate through the array
            if(mode === undefined) mode = "text";
            if(replaceBracketsInString) mode = mode.replace("-brackets","");
            _.map(item.fileExtensions, function(ext){
              _return[ext] = mode;
            });
          });
        } else { // Is a single item
          _.map(item.fileExtensions, function(ext){
            if(item.mode === undefined) item.mode = "text";
            if(replaceBracketsInString) item.mode = item.mode.replace("-brackets","");
            _return[ext] = item.mode;
          });
        };
      }.bind(_return));
      // Return the contents
      callback(_return);
    });
  };

  // Reload the map with data from brackets source
  var _reloadMap = function(replaceBracketsInString){
    _getMapFromBrackets(replaceBracketsInString, function(newMap){ // Reload the list
      _map = newMap; // Update the current map with the new one
    });
  }

  // Define the function to get the mimetype/codemirror mode by file extension
  var _getByExtension = function(_searchExt){
    return _.find(_map, function(mode,ext){ return ext == _searchExt; });
  }

  // @method getByExtension - get's a mime type / code mirror mode by a file extension without the dot. Eg.: "rb", "html", "scss", etc.
  // @param ext {string} - File extension without the dot
  // @return {string} - MimeType/CodeMirror mode string to be used with codemirror.setOption("mode", <returnValue>);
  module.getByExtension = function(ext){
    return _getByExtension(ext);
  }

  // @method reload - Reload the map from Bracket's repository
  // @replaceBracketsInString {bool} - True if you want to replace "-brackets-" from the mime types. Eg: "text/x-brackets-html" will become "text/x-html", true by default
  // @return undefined - No return value
  module.reload = function(replaceBracketsInString){
    // Set the default value
    if(undefined === replaceBracketsInString) replaceBracketsInString = true;
    // Reload the map internally
    _reloadMap(replaceBracketsInString);
  }

	return module;
}(ExtToMime || {}));
