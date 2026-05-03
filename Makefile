.PHONY: dev build preview install

dev:
	cd enigma-web && npm run dev

build:
	cd enigma-web && npm run build

preview: build
	cd enigma-web && npm run preview

install:
	cd enigma-web && npm install
