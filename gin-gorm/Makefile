.PHONY: init get # phony target

run: build
	./main

init:
	echo "go mod init bronya.com/gin-gorm"

get:
	@echo "==================== Get --update ===================="
	go get -u github.com/spf13/viper
	go get -u github.com/gin-gonic/gin
	go get -u github.com/swaggo/swag/cmd/swag
	go get -u github.com/swaggo/gin-swagger
	go get -u github.com/swaggo/files
	go get -u go.uber.org/zap
	go get -u gorm.io/gorm
	go get -u gorm.io/driver/mysql
	go get -u github.com/redis/go-redis/v9
	go get -u github.com/golang-jwt/jwt/v5
	go get -u github.com/gin-contrib/cors
	go get github.com/google/uuid
	go get golang.org/x/crypto/bcrypt
	@echo "==================== Install ===================="
	go install github.com/swaggo/swag/cmd/swag@latest

tidy:
	go mod tidy

build:
	go build -o ./main ./src/main.go
	# set GOOS=linux   && set GOARCH=amd64 && go build -o ./main ./src/main.go
	# set GOOS=darwin  && set GOARCH=arm64 && go build -o ./main ./src/main.go
	# set GOOS=windows && set GOARCH=amd64 && go build -o ./main ./src/main.go

clean:
	rm -rf ./main ./log

test:
	cd ./test && \
	go test -run TestBuildByMap && \
	go test -run TestBuildByDir
	@echo "Test Done!"

swag:
	cd ./src && swag init # 将在 src 目录下创建 docs 目录
