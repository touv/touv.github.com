
all: script.min.js

script.js : jquery-1.3.2.min.js jquery.curvycorners.min.js main.js
	cat $^ > $@

script.min.js : script.js
	curl http://www.refresh-sf.com/yui/ -F type=JS -F compressfile[]=@$^ | \
		grep "<textarea" | grep "class=\"output\"" | \
		sed -e "s/<\/textarea>//g" \
		-e "s/<textarea rows=\"20\" cols=\"80\" class=\"output\">//g" \
		-e "s/^\s*//g" \
		-e "s/\s*$$//g" \
		-e "s/&amp;/\&/g" \
		-e "s/&lt;/</g" \
		-e "s/&gt;/>/g" \
		> $@


clean: script*.js
	rm $^

