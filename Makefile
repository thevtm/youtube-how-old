
PACKED_FILE_NAME="youtube-how-old.zip"


install:
	npm install

build: clean
	zip ${PACKED_FILE_NAME} manifest.json src/*.js img/icon-*.png
	ls -lh ${PACKED_FILE_NAME}

clean:
	rm ${PACKED_FILE_NAME}

.PHONY: install pack clean
