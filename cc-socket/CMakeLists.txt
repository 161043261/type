cmake_minimum_required(VERSION 3.21)

# 指定项目名
project(cc-socket)

# 指定 c 语言级别
set(CMAKE_C_STANDARD 17)
set(CMAKE_C_STANDARD_REQUIRED ON)

# 使用 clang
# set(CMAKE_C_COMPILER gcc)
set(CMAKE_C_COMPILER clang)

# 使用 ninja
set(CMAKE_GENERATOR "Ninja")

# 添加可执行文件
add_executable(ch01_server "ch01/server.c")
add_executable(ch01_client "ch01/client.c")
add_executable(ch01_test_fd "ch01/test_fd.c")
add_executable(ch01_test_rw "ch01/test_rw.c")

add_executable(ch02_tcp_server "ch02/tcp_server.c")
add_executable(ch02_tcp_client "ch02/tcp_client.c")

add_executable(ch03_test_inet "ch03/test_inet.c")

add_executable(ch04_echo_server "ch04/echo_server.c")
add_executable(ch04_echo_client "ch04/echo_client.c")

add_executable(ch06_udp_server "ch06/udp_server.c")
add_executable(ch06_udp_client "ch06/udp_client.c")
add_executable(ch06_conn_client "ch06/conn_client.c")

add_executable(ch07_file_server "ch07/file_server.c")
add_executable(ch07_file_client "ch07/file_client.c")

add_executable(ch08_test_gethostbyname "ch08/test_gethostbyname.c")
add_executable(ch08_test_gethostbyaddr "ch08/test_gethostbyaddr.c")

add_executable(ch09_test_sockopt "ch09/test_sockopt.c")
add_executable(ch09_reuseaddr_server "ch09/reuseaddr_server.c")

add_executable(ch10_test_fork "ch10/test_fork.c")
add_executable(ch10_zombie "ch10/zombie.c")
add_executable(ch10_kill_zombie "ch10/kill_zombie.c")
add_executable(ch10_test_wait "ch10/test_wait.c")
add_executable(ch10_test_waitpid "ch10/test_waitpid.c")
add_executable(ch10_test_signal "ch10/test_signal.c")
add_executable(ch10_test_sigaction "ch10/test_sigaction.c")
add_executable(ch10_proc_server "ch10/proc_server.c")
add_executable(ch10_proc_client "ch10/proc_client.c")

add_executable(ch11_test_pipe1 "ch11/test_pipe1.c")
add_executable(ch11_test_pipe2 "ch11/test_pipe2.c")
add_executable(ch11_test_pipe3 "ch11/test_pipe3.c")
add_executable(ch11_pipe_server "ch11/pipe_server.c")

add_executable(ch12_test_select "ch12/test_select.c")
add_executable(ch12_select_server "ch12/select_server.c")

add_executable(ch13_oob_server "ch13/oob_server.c")
add_executable(ch13_oob_client "ch13/oob_client.c")
add_executable(ch13_peek_server "ch13/peek_server.c")
add_executable(ch13_peek_client "ch13/peek_client.c")
add_executable(ch13_test_writev "ch13/test_writev.c")
add_executable(ch13_test_readv "ch13/test_readv.c")

add_executable(ch14_multicast_server "ch14/multicast_server.c")
add_executable(ch14_multicast_client "ch14/multicast_client.c")
add_executable(ch14_broadcast_server "ch14/broadcast_server.c")
add_executable(ch14_broadcast_client "ch14/broadcast_client.c")

add_executable(ch15_io "ch15/io.c")
add_executable(ch15_fd_fp "ch15/fd_fp.c")
add_executable(ch15_echo_server "ch15/echo_server.c")
add_executable(ch15_echo_client "ch15/echo_client.c")

add_executable(ch16_server1 "ch16/server1.c")
add_executable(ch16_server2 "ch16/server2.c")
add_executable(ch16_client "ch16/client.c")
add_executable(ch16_test_dup "ch16/test_dup.c")

add_executable(ch17_epoll_server "ch17/epoll_server.c")

add_executable(ch18_pthread1 "ch18/pthread1.c")
add_executable(ch18_pthread2 "ch18/pthread2.c")
add_executable(ch18_pthread3 "ch18/pthread3.c")
add_executable(ch18_pthread4 "ch18/pthread4.c")
add_executable(ch18_pthread_server "ch18/pthread_server.c")
add_executable(ch18_pthread_client "ch18/pthread_client.c")

add_executable(ch24_http_server "ch24/http_server.c")

add_executable(send_file "send_file.c")

# 查找 pthread 库
find_package(Threads REQUIRED)

# 链接 pthread 库
target_link_libraries(ch18_pthread1 Threads::Threads)
target_link_libraries(ch18_pthread2 Threads::Threads)
target_link_libraries(ch18_pthread3 Threads::Threads)
target_link_libraries(ch18_pthread4 Threads::Threads)
target_link_libraries(ch18_pthread_server Threads::Threads)
target_link_libraries(ch18_pthread_client Threads::Threads)
target_link_libraries(ch24_http_server Threads::Threads)

find_program(CLANG_FORMAT clang-format)

# 使用 clang-format
#! clang-format --style=google -dump-config > ./.clang-format
if (CLANG_FORMAT)
    add_custom_target(format ALL
            COMMAND ${CLANG_FORMAT} -i -style=google
            ${CMAKE_SOURCE_DIR}/ch01/*.c
            ${CMAKE_SOURCE_DIR}/ch02/*.c
            ${CMAKE_SOURCE_DIR}/ch03/*.c
            ${CMAKE_SOURCE_DIR}/ch04/*.c
            ${CMAKE_SOURCE_DIR}/ch06/*.c
            ${CMAKE_SOURCE_DIR}/ch07/*.c
            ${CMAKE_SOURCE_DIR}/ch08/*.c
            ${CMAKE_SOURCE_DIR}/ch09/*.c
            ${CMAKE_SOURCE_DIR}/ch10/*.c
            ${CMAKE_SOURCE_DIR}/ch11/*.c
            ${CMAKE_SOURCE_DIR}/ch12/*.c
            ${CMAKE_SOURCE_DIR}/ch13/*.c
            ${CMAKE_SOURCE_DIR}/ch14/*.c
            ${CMAKE_SOURCE_DIR}/ch15/*.c
            ${CMAKE_SOURCE_DIR}/ch16/*.c
            ${CMAKE_SOURCE_DIR}/ch17/*.c
            ${CMAKE_SOURCE_DIR}/ch18/*.c
            ${CMAKE_SOURCE_DIR}/ch24/*.c
            ${CMAKE_SOURCE_DIR}/*.c
    )
else ()
    message(WARNING "clang-format not found")
endif ()
