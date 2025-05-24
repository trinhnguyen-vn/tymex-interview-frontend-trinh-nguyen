stop-frontend:
	docker rm $$(docker stop $$(docker ps -a -q -f "name=tymex-web")) || true
build-frontend:
	cd packages/frontend
	docker build -t tymex-web .
	cd ../..
run-frontend:
	docker run -d --restart unless-stopped -p 3000:3000 --name tymex-web tymex-web
log-frontend:
	docker logs -f $$(docker ps -a -q -f "name=tymex-web")

stop-server:
	docker rm $$(docker stop $$(docker ps -a -q -f "name=tymex-server")) || true
build-server:
	cd packages/server
	docker build -t tymex-server .
	cd ../..
run-server:
	docker run -d --restart unless-stopped -p 5005:5005 --name tymex-server tymex-server
log-server:
	docker logs -f $$(docker ps -a -q -f "name=tymex-server")

