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
	docker system prune -a --volumes -f
restart:
	@echo "============= Restarting frontend locally ============="
	docker-compose down
	docker rmi frontend-app
	docker-compose up -d
network:
	@echo "============= Creating network ============="
	docker network create swd391-network