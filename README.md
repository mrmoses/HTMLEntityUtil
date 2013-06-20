HTMLEntityUtil
==============

A JavaScript utility for encoding/decoding HTML entities.

Usage
-----
Includes 3 default entities: & < >

Add more HTML entities with HTMLEntityUtil.AddHtmlEntity(ENTITY, CHARACTER)
```javascript
HTMLEntityUtil.AddHtmlEntity('&quot;','"',); // "
HTMLEntityUtil.AddHtmlEntity('&#x27;',"'"); // '
HTMLEntityUtil.AddHtmlEntity('&#x2F;','/'); // /
```

HTMLEntityUtil will attempt to autodetect the unescaped entity if only the entity is provided.
```javascript
HTMLEntityUtil.AddHtmlEntity('&raquo;'); // »
```

HTMLEntityUtil also extends JavaScript String objects with .getDecodedHTML() and .getEncodedHTML()
```javascript
'Home &raquo; News &amp; Blogs'.getDecodedHTML(); // 'Home » News & Blogs'

'News & Blogs <Read It Here>'.getEncodedHTML(); // 'News &amp; Blogs &lt;Read It Here&gt;'
```