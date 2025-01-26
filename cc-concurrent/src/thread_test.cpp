//
// Created by admin on 2024/9/21.
//

#include "thread_test.h"

#include <gtest/gtest.h>

#include <iomanip>
#include <iostream>
#include <thread>

using namespace std;

// atomic<int> sharedInt{0};
static int sharedInt = 0;

void addTask(int *sharedInt_) {
  for (int i = 0; i < 50000; ++i) {
    (*sharedInt_)++;
  }
}

void subTask(int *sharedInt_) {
  for (int i = 0; i < 50000; ++i) {
    (*sharedInt_)--;
  }
}

//! ctest -R ThreadSafeTest
TEST(ThreadSafeTest, TestThreadSafe) {
  // 有并发安全问题 sharedInt != 0
  thread{addTask, &sharedInt}.join();
  thread{subTask, &sharedInt}.join();
  cout << "sharedInt = " << sharedInt << '\n';

  sharedInt = 0;
  // 有并发安全问题 sharedInt != 0
  thread{[]() -> void {
    for (int i = 0; i < 50000; ++i) {
      sharedInt++;
    }
  }}.join();
  thread{[]() -> void {
    for (int i = 0; i < 50000; ++i) {
      sharedInt--;
    }
  }}.join();
  cout << "sharedInt = " << sharedInt << '\n';
}

void task() { cout << "I am a sub thread\n"; }

//! ctest -R ThreadTest
TEST(ThreadTest, TestThread) {
  //! 传递一个函数
  thread t1{task};  // 创建并启动线程 t1
  t1.join();        // 主线程等待线程 t1 运行结束

  //! 传递一个可调用对象, 例如重载了 operator() 的对象 Callable{}
  thread t2{CallableClass{}};  // 创建并启动线程 t2
  t2.join();                   // 主线程等待线程 t2 运行结束

  //! 传递一个 lambda 表达式
  thread t3(  // 创建并启动线程 t3
      []() -> void { cout << "I am a sub thread\n"; });
  t3.join();  // 主线程等待线程 t3 运行结束

  //! 传递一个可调用对象, 例如重载了 operator() 的对象 Func{v}
  int v = 0;
  thread t4{CallableStruct{v}, 5};  // 创建并启动线程 t4
  t4.detach();  // 子线程 t4 分离主线程 detach 后不能再 join

  // 硬件线程上下文的数量
  const unsigned int n = thread::hardware_concurrency();
  cout << "Hardware concurrency: " << n << '\n';  // 24
}

// RAII, Resource Acquisition Is Initialization
void callableFunc(const int &x) { cout << "Sub thread: &x = " << &x << '\n'; }

void CallableFuncWrapper::fn(int y) const {
  cout << "Sub thread: &y = " << &y << '\n';
}

void CallableFuncWrapper::fm(int &z) const {
  cout << "Sub thread: &z = " << &z << '\n';
}

/**
 * 资源获取即初始化
 *
 * 构造函数申请资源, 析构函数释放资源, 对象的生命周期和资源的分配与回收绑定
 */

//! ctest -R RAIITest
TEST(RAIITest, TestRAII) {
  int v = 0;
  // 向可调用对象 CallableStruct{v} 传递参数
  thread t1{CallableStruct{v}, 5};
  ThreadGuard tg{
      t1,
  };

  int x = 1;
  cout << "Main thread: &x = " << &x << '\n';
  thread t2{callableFunc, x};  // x 传递值
  t2.join();

  // ref: reference
  // cref: const reference
  thread t3{callableFunc, ref(x)};  // x 传递引用
  t3.join();

  // 使用成员函数指针
  CallableFuncWrapper wrapper;
  int y = 1;
  cout << "Main thread: &y = " << &y << '\n';

  // 成员指针: &类名::非静态成员
  thread t4{// y 传递值
            &CallableFuncWrapper::fn, &wrapper, y};
  t4.join();

  int z = 1;
  cout << "Main thread: &z = " << &z << '\n';

  thread t5{// z 传递值
            bind(&CallableFuncWrapper::fm, &wrapper, z)};
  t5.join();

  thread t6{// z 传递引用
            bind(&CallableFuncWrapper::fm, &wrapper, std::ref(z))};
  t6.join();
}

TEST(ThisThreadTest, TestThisThread) {
  cout << "main " << this_thread::get_id() << '\n';

  thread t1{[]() -> void {
    // t1 线程睡眠 1s
    this_thread::sleep_for(chrono::seconds(1));
    // t1 线程睡眠 1s
    this_thread::sleep_for(chrono::seconds(1));
    cout << "t1 " << this_thread::get_id() << '\n';
  }};
  t1.join();

  auto start = chrono::system_clock::now();
  auto startTime = chrono::system_clock::to_time_t(start);
  cout << "Thread sleep begin at "
       << put_time(localtime(&startTime), "%H:%M:%S") << '\n';

  auto end = start + chrono::seconds(5);
  auto endTime = chrono::system_clock::to_time_t(end);
  this_thread::sleep_until(end);
  cout << "Thread sleep end at " << put_time(localtime(&endTime), "%H:%M:%S")
       << '\n';

  // 使用移动构造 std::move 转移线程的资源的所有权
  thread t2{[]() -> void { cout << "t2 " << this_thread::get_id() << '\n'; }};
  cout << "Before move construct, t2 can join: "
       << (t2.joinable() ? "true\n" : "false\n");  // true
  // 使用移动构造 std::move 转移 t2 线程的资源的所有权给 t3 线程
  thread t3{std::move(t2)};
  cout << "After move construct, t2 can join: "
       << (t2.joinable() ? "true\n" : "false\n");  // false
  t3.join();

  // 使用移动赋值 std::move 转移线程资源的所有权
  thread t4{[]() -> void { cout << "t4 " << this_thread::get_id() << '\n'; }};
  cout << "Before move assignment, t4 can join: "
       << (t4.joinable() ? "true\n" : "false\n");  // true
  // 使用移动构造 std::move 转移 t4 线程的资源的所有权给 t5 线程
  thread t5 = std::move(t4);
  cout << "After move assignment, t4 can join: "
       << (t4.joinable() ? "true\n" : "false\n");  // false
  t5.join();

  // 在函数体中转移线程资源的所有权
  auto transferOwnership = [](thread t) -> void { t.join(); };

  thread t6{[]() -> void {
    cout << "Transfer ownership of thread resources within a function "
            "body\n";
  }};
  transferOwnership(std::move(t6));
  transferOwnership(thread{[]() -> void {
    cout << "Transfer ownership of thread resources within a function "
            "body\n";
  }});
}
