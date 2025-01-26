//
// Created by admin on 2024/9/30.
//

#include "sync_test.h"

#include <gtest/gtest.h>

#include <cmath>
#include <condition_variable>
#include <future>
#include <iostream>
#include <queue>
#include <thread>

using namespace std;

static bool flag = false;
static mutex mut;
static condition_variable condVar;

//! ctest -R ConditionVariableTest
TEST(ConditionVariableTest, TestConditionVariable) {
  thread waiter{[]() -> void {
    unique_lock<mutex> lock{mut};  // 独占锁
    // 条件等待, 直到 Lambda 函数返回 true
    cout << "Waiter is waiting\n";

    // 传递该 lambda 函数, 以避免虚假唤醒 spurious wakeup
    condVar.wait(lock, []() -> bool { return flag; } /* predicate */);
    // condVar.wait(lock);
    // condVar.wait(lock, predicate)

    // 等价于
    // while (![]() -> bool { return flag; }()) {
    //   condVar.wait(lock);
    // }
    cout << "Waiter has been waken up\n";
  }};
  thread signer{[]() -> void {
    this_thread::sleep_for(chrono::seconds(3));
    {
      lock_guard<mutex> lock{mut};
      flag = true;
    }
    condVar.notify_all();
  }};
  waiter.join();
  signer.join();
}

template <typename T>
ThreadSafeQueue<T>::ThreadSafeQueue() = default;

// 入队
template <typename T>
void ThreadSafeQueue<T>::enqueue(T value) {
  {
    unique_lock<mutex> lock{mut};
    queue_.push(value);
  }
  condVar.notify_one();
}

// 出队, 队列为空则等待
template <typename T>
shared_ptr<T> ThreadSafeQueue<T>::dequeue() {
  unique_lock<mutex> lock{mut};
  // todo 引用捕获 this 指针
  condVar.wait(lock,
               [this /* &this */]() -> bool { return !this->queue_.empty(); });
  // this->queue_.empty() == false;
  // 使用 c++ {} 初始化
  shared_ptr<T> res{make_shared<T>(queue_.front())};
  this->queue_.pop();
  return res;
}

template <typename T>
bool ThreadSafeQueue<T>::empty() const /* // 该方法不会修改类的非静态成员 */ {
  lock_guard<mutex> lock{mut};
  return queue_.empty();
}

void MoveOnly::printAddr() { cout << this; }

//! ctest -R ThreadSafeQueueTest
TEST(ThreadSafeQueueTest, TestThreadSafeQueue) {
  ThreadSafeQueue<int> queue_;
  thread consumer{[&queue_]() -> void {
    for (int i = 0; i < 5; i++) {
      shared_ptr<int> top = queue_.dequeue();
      cout << "Dequeued " << *top << "\n";
    }
  }};
  thread producer{[&queue_]() -> void {
    for (int i = 0; i < 5; i++) {
      // 每隔 1s 生产一个元素
      this_thread::sleep_for(chrono::seconds(1));
      queue_.enqueue(i);
      cout << "Enqueued " << i << '\n';
    }
  }};
  consumer.join();
  producer.join();
}

//! ctest -R FutureTest
TEST(FutureTest, TestFuture) {
  // 调用 std::async 函数启动一个异步任务, 返回一个 future 对象
  future<int> fut = std::async(
      [](int n) -> int {
        // 异步线程睡眠 3s
        this_thread::sleep_for(chrono::seconds(3));
        cout << "Async task id: " << this_thread::get_id() << '\n';
        return n * n;
      },
      10 /* arguments */);
  cout << "Main thread id: " << this_thread::get_id() << '\n';
  // 调用 future.valid 方法, 判断 future 对象当前是否关联了异步任务
  cout << std::boolalpha /* 以 true 或 false 的形式打印, 而不是 1 或 0 */
       << fut.valid() << '\n';
  // 调用 future.get 方法, 等待异步任务执行结束, 获取返回值
  cout << "Async task returns: " << fut.get() << '\n';
  cout << std::boolalpha /* 以 true 或 false 的形式打印, 而不是 1 或 0 */
       << fut.valid() << '\n';
}

int Square::operator()(int x) const { return x * x; }

int SquareWrapper::calculate(int x) { return x * x; }

//! ctest -R AsyncTest1
TEST(AsyncTest1, TestAsync1) {
  SquareWrapper wrapper;
  auto fut1 = std::async(Square{} /* 可调用对象 */, 10);
  auto fut2 = std::async(&SquareWrapper::calculate, &wrapper, 10);
  cout << "Future1 returns: " << fut1.get() << '\n';
  cout << "Future2 returns: " << fut2.get() << '\n';
}

//! ctest -R AsyncTest2
TEST(AsyncTest2, TestAsync2) {
  // 向异步任务传递参数: 传递值
  int var = 0;
  auto fut1 = std::async(
      [](const /* 可以传递值 */ int &ptr) -> void {
        cout << "Future1 addr: " << &ptr << '\n';
      },
      var /* 传递值 */);
  //// std::ref(var) /* 传递引用 (的包装)  */);
  cout << "Future1 &var: " << &var << '\n';

  // 使用 std::ref 向异步任务传递参数: 传递引用 (的包装)
  auto fut2 = std::async(
      [](int &ptr) -> void { cout << "Future2 addr: " << &ptr << '\n'; },
      std::ref(var) /* 传递引用 (的包装) 
      不使用 std::ref 则编译错误 */);
  cout << "Future2 &var: " << &var << '\n';

  MoveOnly x;
  // 使用 std::move 向异步任务移动参数
  auto fut3 = async(
      [](MoveOnly arg) -> MoveOnly {
        cout << "Future3 async task id: " << this_thread::get_id() << '\n';
        return arg;
      },
      std::move(x));
  MoveOnly ret = fut3.get();
  ret.printAddr();
}

TEST(AsyncTest3, TestAsync3) {
  auto task = [](const string &prefix) -> void {
    cout << prefix << " thread id: " << this_thread::get_id() << '\n';
  };
  cout << "Main thread id: " << this_thread::get_id() << '\n';
  // Task1 懒汉式 lazy
  // 等待直到 future 对象调用 wait 方法或 get
  // 方法时, 执行异步任务 (不创建新线程)
  auto fut1 = std::async(std::launch::deferred, task, "Task1");
  // Task2 饿汉式 eager, 创建新线程执行异步任务
  auto fut2 = std::async(std::launch::async, task, "Task2");
  fut1.wait();
}

//! ctest -R AsyncTest4 -V
// Total Test time ≈ 6 sec 执行耗时约 6s
// 如果 std::async 函数返回的 std::future 对象未被引用 ref 或未被移动 move
// 则 task1, task2 将顺序执行, 失去异步性！
TEST(AsyncTest4, TestAsync4) {
  std::async(std::launch::async, []() -> void {
    this_thread::sleep_for(chrono::seconds(3));
    cout << "Async task1 returns\n";
  });  // 等待 3s 后 task1 执行结束

  std::async(std::launch::async, []() -> void {
    this_thread::sleep_for(chrono::seconds(3));
    cout << "Async task2 returns\n";
  });  // 等待 3s 后 task2 执行结束
}

//! ctest -R AsyncTest5 -V
// Total Test time ≈ 3 sec 执行耗时约 3s
TEST(AsyncTest5, TestAsync5) {
  auto f1 = std::async(std::launch::async, []() -> void {
    this_thread::sleep_for(chrono::seconds(3));
    cout << "Async task1 returns\n";
  });

  auto f2 = std::async(std::launch::async, []() -> void {
    this_thread::sleep_for(chrono::seconds(3));
    cout << "Async task2 returns\n";
  });
}

//! ctest -R AsyncTest6
// 将 fut1 异步任务的所有权移动给 fut2
// fut1 不能再调用 wait, get 等成员函数
TEST(AsyncTest6, TestAsync6) {
  auto fut1 = std::async([] /* () -> void */ {});
  // 将 fut1 异步任务的所有权移动给 fut2
  std::future<void> fut2{std::move(fut1)};
  // fut1 不能再调用 wait, get 等成员函数
  fut1.wait();  // std::future_error: No associated state
}

//! ctest -R PackageTaskTest1
TEST(PackageTaskTest1, TestPackageTask1) {
  std::packaged_task<double(int, int)> pkgTask(
      [](int a, int b) -> double { return std::pow(a, b); });
  pkgTask(10, 2);  // 执行传递的 lambda 函数, 无法获取 pkgTask 的返回值
}

//! ctest -R PackageTaskTest2
TEST(PackageTaskTest2, TestPackageTask2) {
  std::packaged_task<double(int, int)> pkgTask([](int a, int b) -> double {
    //! #include <cmath>
    return std::pow(a, b);
  });
  future<double> fut = pkgTask.get_future();
  pkgTask(10, 2);  // 执行传递的 lambda 函数
  cout << "Packaged task returns: " << fut.get()
       << '\n';  // 获取 pkgTask 的返回值
}

//! ctest -R PromiseTest
TEST(PromiseTest, TestPromise) {}