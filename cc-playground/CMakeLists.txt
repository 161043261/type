cmake_minimum_required(VERSION 3.21)

# 指定项目名
project(cc-playground)

# 指定 c 语言级别
set(CMAKE_C_STANDARD 17)
set(CMAKE_C_STANDARD_REQUIRED ON)

# 指定 c++ 语言级别
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 使用 clang
# set(CMAKE_C_COMPILER gcc)
set(CMAKE_C_COMPILER clang)

# 使用 clang++
# set(CMAKE_CXX_COMPILER g++)
set(CMAKE_CXX_COMPILER clang++)

# 使用 ninja
set(CMAKE_GENERATOR Ninja)

# 设置 c 编译选项
# set(CMAKE_C_FLAGS "-Wall -O3")
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wall -O3")

# 设置 c++ 编译选项
# set(CMAKE_CXX_FLAGS "-Wall -O3")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -O3")

# 使用 clang-format
#! clang-format --style=google -dump-config > ./.clang-format
find_program(CLANG_FORMAT clang-format)
if(CLANG_FORMAT)
  add_custom_target(format ALL
    COMMAND ${CLANG_FORMAT} -i -style=google
    ${CMAKE_SOURCE_DIR}/src/*.cpp
    ${CMAKE_SOURCE_DIR}/src/noj/*.cpp
  )
else()
  message(WARNING "clang-format not found")
endif()

# find_program(TSC tsc)
# if(TSC)
#   add_custom_target(tsc ALL
#     COMMAND ${TSC}
#   )
# else()
#   message(WARNING "tsc not found")
# endif()

# 添加可执行文件
add_executable(closure ./src/closure.cpp)
add_executable(backtrack ./src/backtrack.cpp)
add_executable(solution ./src/solution.cpp)
add_executable(prob1001 ./src/noj/prob1001.cpp)
add_executable(prob1002 ./src/noj/prob1002.cpp)
add_executable(prob1003 ./src/noj/prob1003.cpp)
add_executable(prob1004 ./src/noj/prob1004.cpp)
add_executable(prob1005 ./src/noj/prob1005.cpp)
add_executable(prob1006 ./src/noj/prob1006.cpp)
add_executable(prob1007 ./src/noj/prob1007.cpp)
add_executable(prob1008 ./src/noj/prob1008.cpp)
add_executable(prob1009 ./src/noj/prob1009.cpp)
add_executable(prob1010 ./src/noj/prob1010.cpp)
add_executable(prob1011 ./src/noj/prob1011.cpp)
add_executable(prob1012 ./src/noj/prob1012.cpp)
add_executable(prob1014 ./src/noj/prob1014.cpp)
add_executable(prob1015 ./src/noj/prob1015.cpp)
add_executable(prob1017 ./src/noj/prob1017.cpp)


# -S ./src   指定源代码目录为 ./src 目录
# -B ./build 指定构建目录为 ./build 目录
# ! cmake -S ./src -B ./build
# ! cmake --build ./build
