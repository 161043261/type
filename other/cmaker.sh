#!/bin/bash

# sudo apt install build-essential clang clang-format clangd cmake gdb lld llvm ninja-build -y

if [ -z "$1" ]; then
  ROOT="cmake-app"
else
  ROOT=$1
fi

if [ -d "$ROOT" ]; then
  rm -rf "$ROOT"
fi

mkdir $ROOT

cd $ROOT

cat <<EOL >CMakeLists.txt
cmake_minimum_required(VERSION 3.21)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_C_COMPILER clang-cl)
set(CMAKE_CXX_COMPILER clang-cl)

set(CMAKE_BUILD_TYPE Debug)

project($ROOT)

add_executable(main ./src/main.cpp)

find_program(CLANG_FORMAT clang-format)
if(CLANG_FORMAT)
  add_custom_target(format ALL
    COMMAND \${CLANG_FORMAT} -i -style=google
    \${CMAKE_SOURCE_DIR}/src/*.cpp
  )
else()
  message(WARNING "clang-format not found")
endif()
EOL

mkdir src

cat <<EOL >src/main.cpp
//
// Created by $(whoami) on $(date +"%Y/%m/%d").
//

#include <iostream>

using namespace std;

int main() {
  cout << "Hello World\n";
}
EOL

mkdir build && cd build
cmake .. -G Ninja && ninja
./main
