pull:
	git pull
stop:
	docker rm $$(docker stop $$(docker ps -a -q -f "name=tymex-web")) || true
build:
	docker build -t tymex-web .
run:
	docker run -d --restart unless-stopped -p 4000:3000 --name tymex-web tymex-web
log:
	docker logs -f $$(docker ps -a -q -f "name=tymex-web"))
auto: pull build stop run
