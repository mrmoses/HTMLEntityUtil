var HTMLEntityUtil = (function() {
    var SELF = this;

    var _private = {
        HTMLEntites:{},
        AllCharacters:"",
        getEntityCharacter: function(entity) {
            var d = document.createElement("div");
            d.innerHTML = entity;
            // Chrome works with innerText
            // Firefox innerText is null, but innerHTML contains the charcter (tested with &raquo;)
            return d.innerText ? d.innerText : d.innerHTML;
        }
    };

    this.AddHtmlEntity = function(entity, character) {
        if (!character) {
            character = _private.getEntityCharacter(entity);
        };
        _private.HTMLEntites[entity] = {
            entity: entity,
            character: character
        };
        _private.HTMLEntites[character] = _private.HTMLEntites[entity];
        if (_private.AllCharacters.indexOf(character) < 0) {
            _private.AllCharacters += character;
        };
    };

    this.RemoveHTMLEntities = function(s) {
        return s.replace(/&([^\s;]*);/g,function(c) {
            return _private.HTMLEntites[c].character || c;
        });
    };

    this.AddHTMLEntites = function(s) {
        var re = new RegExp('[' + _private.AllCharacters + ']','gi');
        return s.replace(re,function(c) {
            return _private.HTMLEntites[c].entity || c;
        });
    };

    // init, add some defaults
    (function() {
        SELF.AddHtmlEntity('&amp;','&');
        SELF.AddHtmlEntity('&lt;','<');
        SELF.AddHtmlEntity('&gt;','>');
    })();
    return this;
})();

/** @returns {String} Escapes special characters into HTML entities. */
String.prototype.getEncodedHTML = function() {
    return HTMLEntityUtil.AddHTMLEntites(this.toString());

};
/** @returns {String} Replaces HTML entites with special characters. */
String.prototype.getDecodedHTML = function() {
    return HTMLEntityUtil.RemoveHTMLEntities(this.toString());
};