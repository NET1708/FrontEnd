default:
	@echo "============= Build container ============="
	docker build -t frontend .
up:
	@echo "============= Starting frontend locally ============="
	docker-compose up -d
down:
	@echo "============= Stopping frontend locally ============="
	docker-compose down
logs:
	@echo "============= Showing logs ============="
	docker-compose logs -f
prune:
	@echo "============= delete prune ============="
	docker system prune -a --volumes
restart:
	@echo "============= Restarting frontend locally ============="
	docker-compose down
	docker-compose up -d