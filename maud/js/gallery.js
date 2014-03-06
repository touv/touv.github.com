var Gallery= Class.create();
Gallery.prototype = {
		initialize: function() {
                /* Publique : Parametres presque fixe ! */
                this.width     = 512;
			    this.maxwidth  = 720;
                this.height    = 382;
                this.minheight = 30;
                /* Priv� : Variables internes */
				this.ul        = document.createElement('ul');
                this.firstflag = true;
                this.firstimg  = null;
                this.firsta    = null;
                this.lastimg   = null;
                this.lasta     = null;
				Element.extend(this.ul);
				this.ul.setStyle({
                padding: '0px',
                margin: '0 auto',
                listStyleType: 'none',
                overflow: 'hidden',
                width: this.width+'px',
                height: this.height+'px',
                border: 'none'
				});
    },
    fromPicasaJSON: function(json) {
        for(i = 0; i < json.feed.entry.length; i++) {
            this.addImage(json.feed.entry[i].content.src+'?imgmax='+this.width,
            json.feed.entry[i].media$group.media$description.$t);
        }
    },
    fromPicasaRSS: function(varname, url) {
				url = url.replace(/alt=rss/g, 'alt=json-in-script&callback='+varname+'.fromPicasaJSON');
				url = url.replace(/&nbsp;/g, ''); // patch for SPIP !
				document.write('<'+'script type="text/javascript" src="'+url+'"></'+'script>');
		},
    addImage: function(url, title) {
				var li = document.createElement('li');
				Element.extend(li);
				li.setStyle({
                    float:'left'
				});

				var a = document.createElement('a');
				Element.extend(a);
				a.setAttribute('href', url.replace(new RegExp('='+this.width,"g"), '='+this.maxwidth));
                a.setStyle({
                    display: 'block',
                    height: this.firstflag ? this.height+'px' : this.minheight+'px',
                    width: this.width+'px',
                    float: 'left',
                    textDecoration: 'none',
                    borderBottom: '1px solid #fff',
                    cursor: 'default'
				});

				var img = document.createElement('img');
				Element.extend(img);
				img.setAttribute('src', url);
        a.setAttribute('title', title);
        a.setAttribute('alt', title);
        a.setAttribute('rel', "lightbox[roadtrip]");
				img.setStyle({
                    width: this.width+'px',
                    height: this.firstflag ? this.height+'px' : this.minheight+'px',
                    border: '0px'
				});

        /* On agrandit pour chaque image la taille de UL */
        this.ul.setStyle({
            height: ((this.ul.childNodes.length * 30) + this.height)+'px'
        });

        /* simule a:hover et img:hover */
        a.onmouseover = this.onmouseover.bindAsEventListener(this, a, img);
        a.onmouseout = this.onmouseout.bindAsEventListener(this, a, img);

				a.appendChild(img);
				li.appendChild(a);
				this.ul.appendChild(li);

        /* Permet d'afficher la premrier image de manière complète */
        if (this.firstflag) {
            this.firstflag = false;
            this.firstimg = img;
            this.firsta = a;
        }
               
        this.lastimg = img;
        this.lasta = a;
    },
    onmouseover: function(e, a, img) {
        this.firsta.setStyle({
            height: this.minheight+'px'
        });
        this.firstimg.setStyle({
            height: this.minheight+'px'
        });

        a.setStyle({
            height: this.height+'px'
        });
        img.setStyle({
            height: this.height+'px'
        });

    },
    onmouseout: function(e, a, img) {
    if (a != this.lasta && img != this.lastimg) {
        a.setStyle({
            height: this.minheight+'px'
        });
        img.setStyle({
            height: this.minheight+'px'
        });
        }
    },
    getDOMObject: function() {
        return this.ul;
    },
    insertInto: function(id) {
        $(id).appendChild(this.ul);
    }
};
