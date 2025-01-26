//
// Created by admin on 2024/9/24.
//

#ifndef THREAD_TEST_H
#define THREAD_TEST_H

#include <iostream>
#include <ostream>
#include <thread>

void addTask(int *sharedInt);

void subTask(int *sharedInt);

void task();

class CallableClass {
 public:  // 默认 private
  void operator()() const { std::cout << "I am a sub thread\n"; }
};

struct CallableStruct {
  // 默认 public
  int &v;

  explicit CallableStruct(int &v_) : v(v_) {}

  void operator()(int n) const {
    for (int i = 0; i < n; i++) {
      this->v += i;
    }
    std::cout << "callableStruct() v = " << this->v << '\n';
  }
};

class ThreadGuard {
 public:
  std::thread &t;

  explicit ThreadGuard(std::thread &t_) : t{t_} {}

  ~ThreadGuard() {
    if (std::cout << "Destructing..."; t.joinable()) {
      t.join();
    }
  }

  // 删除拷贝构造函数
  ThreadGuard(const ThreadGuard &, int i) = delete;

  // 删除 = 运算符重载
  ThreadGuard &operator=(const ThreadGuard &) = delete;
};

void callableFunc(const int &x);

struct CallableFuncWrapper {
  void fn(int) const;

  void fm(int &) const;
};

#endif  // THREAD_TEST_H
