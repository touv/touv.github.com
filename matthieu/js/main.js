$(document).ready(function() {
            var max = 6;
            var min = 1;
            var z = 0;
            var inAnimation = false;
						/*            
						var json = "http://picasaweb.google.fr/data/feed/base/user/nthouvenin/albumid/5178454291725747889?kind=photo&authkey=Gv1sRgCLjxlpH7xYOGqgE&hl=fr&alt=json&callback=?";
						*/
						var json = "http://picasaweb.google.fr/data/feed/base/user/nthouvenin/albumid/5332082931950241313?kind=photo&authkey=Gv1sRgCNOfo5fw-7PYRw&hl=fr&alt=json&callback=?";

            if (typeof document.body.style.maxHeight === "undefined") {
                $('#content').hide();
                return;
            }

            $.getJSON(json,function(data){
                    z = data.feed.entry.length;
                    $.each(data.feed.entry, function(i,item){
                        m = Math.floor(Math.random() * (max - min + 1)) + min;
                        $("<img/>")
                        .attr("src", item.content.src+'?imgmax=512')
                        .attr("title", item.media$group.media$description.$t)
                        .css({
                            'z-index' : z,
                            'margin' : m+'0px'
                        })
                        .prependTo("#pictures");
                        if ($('#title').text() == '?')
                            $('#title').text(item.media$group.media$description.$t);
                        z--;
                    });
                    z = data.feed.entry.length;
		   $('#myGallery').spacegallery({loadingClass: 'loading'});
            });

        
});
