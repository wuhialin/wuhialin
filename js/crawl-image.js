(function() {
    'use strict';
    var attr = 'use' + String(Math.random()).substr(2);

    function resolve(url, base_url) {
        var doc      = document,
            old_base = doc.getElementsByTagName('base')[0],
            old_href = old_base && old_base.href,
            doc_head = doc.head || doc.getElementsByTagName('head')[0] ,
            our_base = old_base || doc_head.appendChild(doc.createElement('base')),
            resolver = doc.createElement('a'),
            resolved_url;
        our_base.href = base_url || '';
        resolver.href = url;
        resolved_url  = resolver.href; // browser magic at work here
        if (old_base) old_base.href = old_href;
        else doc_head.removeChild(our_base);
        return resolved_url;
    }

    setInterval(function(){
        var urls = [];
        $('*:visible:not(['+attr+'])').each(function(){
            $(this).attr(attr, 1);
            var image = $(this).css('background-image'),
                url;
            image = image.substr(3).replace(/[\'\"\(\)]/g, '');
            if(image && image != 'none' && image != 'e'){
                url = resolve(image);
                urls.push(url);
            }
            if(this.tagName.toLowerCase() === 'img'){
                url = resolve($(this).attr('src'));
                urls.push(url);
            }
        });
        if(urls.length){
            try{
                $.post('http://yii2.tk/crawl/img', {data: urls});
            }
            catch(e){
                if(typeof console.log === 'function'){
                    console.log(e);
                }
            }
        }
    }, 5000);
})();
