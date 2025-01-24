# target: dependencies
#	commands

# 声明 all 和 clean 是伪目标
.PHONY: all clean

# 变量
TARGETS =                        \
./build/go/ch01_server           \
./build/go/ch01_client           \
./build/go/ch02_tcp_server       \
./build/go/ch02_tcp_client       \
./build/go/ch03_test_endian      \
./build/go/ch04_echo_server      \
./build/go/ch04_echo_client      \
./build/go/ch06_udp_server       \
./build/go/ch06_udp_client       \
./build/go/ch06_conn_client      \
./build/go/ch07_file_server      \
./build/go/ch07_file_client      \
./build/go/ch08_test_lookup      \
./build/go/ch10_test_cmd         \
./build/go/ch14_multicast_server \
./build/go/ch14_multicast_client \
./build/go/ch14_broadcast_server \
./build/go/ch14_broadcast_client \
./build/go/ch15_io               \
./build/go/ch15_fd_fp            \
./build/go/ch15_echo_server      \
./build/go/ch15_echo_client      \
./build/go/ch16_server1          \
./build/go/ch16_server2          \
./build/go/ch16_client           \
./build/go/ch18_goroutine1       \
./build/go/ch18_goroutine2       \
./build/go/ch18_goroutine3       \
./build/go/ch18_goroutine4       \
./build/go/ch18_goroutine_server \
./build/go/ch18_goroutine_client

all: $(TARGETS)
	cd ./build && ninja
	cp ./ch24/index.html ./build/
	@echo "Done!"

./build/go/ch01_server: ./ch01/go/server/server.go
	go build -o ./build/go/ch01_server ./ch01/go/server/server.go

./build/go/ch01_client: ./ch01/go/client/client.go
	go build -o ./build/go/ch01_client ./ch01/go/client/client.go

./build/go/ch02_tcp_server: ./ch02/go/server/tcp_server.go
	go build -o ./build/go/ch02_tcp_server ./ch02/go/server/tcp_server.go

./build/go/ch02_tcp_client: ./ch02/go/client/tcp_client.go
	go build -o ./build/go/ch02_tcp_client ./ch02/go/client/tcp_client.go

./build/go/ch03_test_endian: ./ch03/go/test_endian.go
	go build -o ./build/go/ch03_test_endian ./ch03/go/test_endian.go

./build/go/ch04_echo_server: ./ch04/go/server/echo_server.go
	go build -o ./build/go/ch04_echo_server ./ch04/go/server/echo_server.go

./build/go/ch04_echo_client: ./ch04/go/client/echo_client.go
	go build -o ./build/go/ch04_echo_client ./ch04/go/client/echo_client.go

./build/go/ch06_udp_server: ./ch06/go/udp_server/udp_server.go
	go build -o ./build/go/ch06_udp_server ./ch06/go/udp_server/udp_server.go

./build/go/ch06_udp_client: ./ch06/go/udp_client/udp_client.go
	go build -o ./build/go/ch06_udp_client ./ch06/go/udp_client/udp_client.go

./build/go/ch06_conn_client: ./ch06/go/conn_client/conn_client.go
	go build -o ./build/go/ch06_conn_client ./ch06/go/conn_client/conn_client.go

./build/go/ch07_file_server: ./ch07/go/server/file_server.go
	go build -o ./build/go/ch07_file_server ./ch07/go/server/file_server.go

./build/go/ch07_file_client: ./ch07/go/client/file_client.go
	go build -o ./build/go/ch07_file_client ./ch07/go/client/file_client.go

./build/go/ch08_test_lookup: ./ch08/go/test_lookup.go
	go build -o ./build/go/ch08_test_lookup ./ch08/go/test_lookup.go

./build/go/ch10_test_cmd: ./ch10/go/test_cmd.go
	go build -o ./build/go/ch10_test_cmd ./ch10/go/test_cmd.go

./build/go/ch14_multicast_server: ./ch14/go/multicast_server/multicast_server.go
	go build -o ./build/go/ch14_multicast_server ./ch14/go/multicast_server/multicast_server.go

./build/go/ch14_multicast_client: ./ch14/go/multicast_client/multicast_client.go
	go build -o ./build/go/ch14_multicast_client ./ch14/go/multicast_client/multicast_client.go

./build/go/ch14_broadcast_server: ./ch14/go/broadcast_server/broadcast_server.go
	go build -o ./build/go/ch14_broadcast_server ./ch14/go/broadcast_server/broadcast_server.go

./build/go/ch14_broadcast_client: ./ch14/go/broadcast_client/broadcast_client.go
	go build -o ./build/go/ch14_broadcast_client ./ch14/go/broadcast_client/broadcast_client.go

./build/go/ch15_io: ch15/go/io/io.go
	go build -o ./build/go/ch15_io ./ch15/go/io/io.go

./build/go/ch15_fd_fp: ./ch15/go/fd_fp/fd_fp.go
	go build -o ./build/go/ch15_fd_fp ./ch15/go/fd_fp/fd_fp.go

./build/go/ch15_echo_server: ./ch15/go/server/echo_server.go
	go build -o ./build/go/ch15_echo_server ./ch15/go/server/echo_server.go

./build/go/ch15_echo_client: ./ch15/go/client/echo_client.go
	go build -o ./build/go/ch15_echo_client ./ch15/go/client/echo_client.go

./build/go/ch16_server1: ./ch16/go/server1/server1.go
	go build -o ./build/go/ch16_server1 ./ch16/go/server1/server1.go

./build/go/ch16_server2: ./ch16/go/server2/server2.go
	go build -o ./build/go/ch16_server2 ./ch16/go/server2/server2.go

./build/go/ch16_client: ./ch16/go/client/client.go
	go build -o ./build/go/ch16_client ./ch16/go/client/client.go

./build/go/ch18_goroutine1: ./ch18/go/goroutine1/goroutine1.go
	go build -o ./build/go/ch18_goroutine1 ./ch18/go/goroutine1/goroutine1.go

./build/go/ch18_goroutine2: ./ch18/go/goroutine2/goroutine2.go
	go build -o ./build/go/ch18_goroutine2 ./ch18/go/goroutine2/goroutine2.go

./build/go/ch18_goroutine3: ./ch18/go/goroutine3/goroutine3.go
	go build -o ./build/go/ch18_goroutine3 ./ch18/go/goroutine3/goroutine3.go

./build/go/ch18_goroutine4: ./ch18/go/goroutine4/goroutine4.go
	go build -o ./build/go/ch18_goroutine4 ./ch18/go/goroutine4/goroutine4.go

./build/go/ch18_goroutine_server: ./ch18/go/goroutine_server/goroutine_server.go
	go build -o ./build/go/ch18_goroutine_server ./ch18/go/goroutine_server/goroutine_server.go

./build/go/ch18_goroutine_client: ./ch18/go/goroutine_client/goroutine_client.go
	go build -o ./build/go/ch18_goroutine_client ./ch18/go/goroutine_client/goroutine_client.go

clean:
	rm -rf ./build/*
	cd ./build && cmake ../
	cp ./ch24/index.html ./build/
