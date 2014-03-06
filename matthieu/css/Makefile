
all: style.min.css 

style.css : reset.css 960.css main.css
	cat $^ > $@

style.min.css : style.css
	curl http://www.refresh-sf.com/yui/ -F type=CSS -F compressfile[]=@$^ | \
		grep "<textarea" | grep "class=\"output\"" | \
		sed -e "s/<\/textarea>//g" \
		-e "s/<textarea rows=\"20\" cols=\"80\" class=\"output\">//g" \
		-e "s/^\s*//g" \
		-e "s/\s*$$//g" > $@

clean: style*.css
	rm $^

