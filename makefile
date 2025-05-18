pull:
	git pull
stop:
	docker rm $$(docker stop $$(docker ps -a -q -f "expose=3000")) || true
build:
	docker build -t tymex-web .
run:
	docker run -d --restart unless-stopped -p 3000:3000 --name tymex-web tymex-web
log:
	docker logs -f $$(docker ps -a -q -f "expose=3000")
auto: pull build stop run
