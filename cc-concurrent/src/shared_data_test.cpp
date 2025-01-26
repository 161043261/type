//
// Created by admin on 2024/9/26.
//

#include "shared_data_test.h"

#include <gtest/gtest.h>

#include <functional>
#include <iostream>
#include <list>
#include <memory>
#include <mutex>
#include <numeric>
#include <thread>

using namespace std;

//! ctest -R DataRaceTest
TEST(DataRaceTest, TestDataRace) {
  std::vector<int> is;
  thread t1{[&is]() -> void { is.emplace_back(1); }};
  thread t2{[&is]() -> void { is.erase(is.begin()); }};
  t1.join();
  t2.join();
  // 可能有数据竞争
  cout << "size = " << is.size() << ", cap = " << is.capacity() << '\n';
}

//! ctest -R UnorderedTest
TEST(UnorderedTest, TestUnordered) {
  vector<thread> ts;
  ts.reserve(5);  // 预分配数组大小为 5
  cout << "size = " << ts.size() << ", cap = " << ts.capacity() << '\n';
  for (size_t i = 0; i < 5; i++) {
    // [&, =, &x, y]
    // &  | 默认引用捕获
    // =  | 默认值捕获
    // &x | 对 x 使用引用捕获
    // y  | 对 y 使用值捕获
    ts.emplace_back(
        [i /* 使用值捕获 */]() -> void { cout << "i = " << i << "; "; });
  }
  for (auto &t : ts) {
    t.join();
  }
  cout << '\n';
}

static std::mutex mut;

//! ctest -R MutexTest
TEST(MutexTest, TestMutex) {
  vector<thread> ts;
  ts.reserve(5);  // 预分配数组大小为 5
  for (size_t i = 0; i < 5; i++) {
    ts.emplace_back([i /* 使用值捕获 */]() -> void {
      mut.lock();  // 对互斥锁 mut 加锁
      cout << "i = " << i << "; ";
      mut.unlock();  // 对互斥锁 mut 解锁
    });
  }
  for (auto &t : ts) {
    t.join();
  }
  cout << '\n';
}

//! ctest -R LockGuardTest
TEST(LockGuardTest, TestLockGuard) {
  vector<thread> ts;
  ts.reserve(5);  // 预分配数组容量为 5
  for (size_t i = 0; i < 5; i++) {
    ts.emplace_back([i /* 使用值捕获 */]() -> void {
      lock_guard<mutex> lock{mut};  // 对互斥锁 mut 加 RAII 风格的锁
      cout << "i = " << i << "; ";
    });  // RAII 风格的锁销毁 (解锁)
  }
  for (auto &t : ts) {
    t.join();
  }
  cout << '\n';
}

// {
//   std::lock_guard<std::mutex> lock{mut}; // lock
// } // unlock
void appendlist(int n, list<int> &slice /* 引用 */) {
  vector<int> nums(n + 1);  // 分配数组容量为 n + 1
  //! #include <numeric>
  iota(nums.begin(), nums.end(), 0);

  cout << "nums = { ";
  for_each(nums.cbegin(), nums.cend(),
           [&/* 引用捕获 */](int i) -> void { cout << i << " "; });
  cout << "}" << '\n';
  {
    int sum = std::accumulate(nums.cbegin(), nums.cend(), 0);
    //! c++17 泛型推断
    lock_guard /* <mutex> */ lock{mut};  // 对互斥锁 mut 加 RAII 风格的锁
    slice.push_back(sum);
  }  // RAII 风格的锁销毁 (解锁)
}

void fmtPrintList(const list<int> &slice) {
  // lock_guard 可以锁定一个互斥锁
  // std::scoped_lock 可以同时锁定多个 mutex
  scoped_lock<mutex> lock{mut};
  cout << "slice = { ";
  for (const auto &i : slice) {
    cout << i << " ";
  }
  cout << "}" << '\n';
}

//! ctest -R ListTest
TEST(ListTest, TestList) {
  list<int> slice;
  thread{appendlist, 5, ref(slice)}.join();
  thread{appendlist, 5, ref(slice)}.join();
  thread{fmtPrintList, cref(slice)}.join();
  thread{fmtPrintList, cref(slice)}.join();
}

// std::mutex mut;
// mut.lock();
// 如果线程获取锁失败, 则该线程放弃 cpu, 阻塞直到锁被释放
// mut.try_lock();
// 如果线程获取锁成功, 则返回 true
// 如果线程获取锁失败, 则返回 false, 线程不阻塞, 继续运行

//! ctest -R TryLockTest
TEST(TryLockTest, TestTryLock) {
  auto tryLock = [](int id) -> void {
    if (mut.try_lock()) {
      cout << "Thread " << id << " acquires lock\n";
      // 睡眠 3s, 模拟临界区
      this_thread::sleep_for(std::chrono::milliseconds(3000));
      mut.unlock();
      cout << "Thread " << id << " releases lock\n";
    } else {
      cout << "Thread " << id << " acquires lock failed\n";
    }
  };
  thread t1{tryLock, 1};
  thread t2{tryLock, 2};
  t1.join();
  t2.join();
}

static std::mutex mut1, mut2;
static int sharedInt{};  // sharedInt = 0;

// 有多个互斥锁时, 可能有死锁问题

//! ctest -R DeadLockTest
TEST(DeadLockTest, TestDeadlock) {
  // 可能死锁
  thread t1{[]() -> void {
    lock_guard<mutex> lock1{mut1};
    // 睡眠 1s, 方便 t2 获得锁
    this_thread::sleep_for(std::chrono::milliseconds(500));
    lock_guard<mutex> lock2{mut2};
    for (size_t i = 0; i < 50000; i++) {
      sharedInt++;
    }
  }};
  thread t2{[]() -> void {
    lock_guard<mutex> lock2{mut2};
    // 睡眠 1s, 方便 t1 获得锁
    this_thread::sleep_for(std::chrono::milliseconds(500));
    lock_guard<mutex> lock1{mut1};
    for (size_t i = 0; i < 50000; i++) {
      sharedInt--;
    }
  }};
  t1.join();
  t2.join();
  cout << "sharedInt = " << sharedInt << '\n';
}

// RAII 风格的锁
// std::lock_guard  | 互斥锁
// std::unique_lock | 灵活的互斥锁
// std::scoped_lock | 可以同时锁定多个 mutex
// std::shared_lock | 共享 (读) 锁

// std::adopt_lock
//! 假定非 RAII 风格的锁 mut 已锁定, 转移 mut 的所有权给 RAII 风格的锁

//! std::defer_lock  延迟锁定
//! std::try_to_lock 尝试锁定 (非阻塞)

// 预防死锁: 同时锁定

//! ctest -R LockTest
TEST(LockTest, TestLock) {
  thread t1{[]() -> void {
    // 同时锁定 mut1, mut2 (非 RAII 风格)
    std::lock(mut1, mut2);
    // 假定非 RAII 风格的互斥锁 mut1 已锁定
    // 转移 mut1 的所有权给  RAII 风格的互斥锁 lock1
    lock_guard<mutex> lock1{mut1, std::adopt_lock};
    // 假定非 RAII 风格的互斥锁 mut2 已锁定
    // 转移 mut2 的所有权给 RAII 风格的互斥锁 lock2
    lock_guard<mutex> lock2{mut2, std::adopt_lock};
    for (size_t i = 0; i < 50000; i++) {
      sharedInt++;
    }
  }};

  thread t2{[]() -> void {
    // 同时锁定 mut1, mut2 (非 RAII 风格)
    std::lock(mut1, mut2);
    // 假定非 RAII 风格的互斥锁 mut2 已锁定
    // 转移 mut2 的所有权给 RAII 风格的互斥锁 lock2
    lock_guard<mutex> lock2{mut2, std::adopt_lock};
    // 假定非 RAII 风格的互斥锁 mut1 已锁定
    // 转移 mut1 的所有权给  RAII 风格的互斥锁 lock1
    lock_guard<mutex> lock1{mut1, std::adopt_lock};
    for (size_t i = 0; i < 50000; i++) {
      sharedInt--;
    }
  }};

  t1.join();
  t2.join();
  cout << "sharedInt = " << sharedInt << '\n';
}

// 预防死锁: 使用 std::scoped_lock 同时锁定多个互斥锁

//! ctest -R ScopedLockTest
TEST(ScopedLockTest, TestScopedLock) {
  thread t1{[]() -> void {
    // 同时锁定 mut1, mut2 (RAII 风格)
    scoped_lock<mutex, mutex> guard{mut1, mut2};
    this_thread::sleep_for(std::chrono::milliseconds(500));
    for (size_t i = 0; i < 50000; i++) {
      sharedInt++;
    }
  }};

  thread t2{[]() -> void {
    // 同时锁定 mut1, mut2 (RAII 风格)
    scoped_lock<mutex, mutex> guard{mut1, mut2};
    this_thread::sleep_for(std::chrono::milliseconds(500));
    for (size_t i = 0; i < 50000; i++) {
      sharedInt--;
    }
  }};

  t1.join();
  t2.join();
  cout << "sharedInt = " << sharedInt << '\n';
}

// std::mutex mut1, mut2;
// int sharedInt{};  // sharedInt = 0;
// 预防死锁, 使用 std::unique_lock 灵活的互斥锁

//! ctest -R UniqueLockTest
TEST(UniqueLockTest, TestUniqueLock) {
  thread t1{[]() -> void {
    // 延迟锁定互斥锁 mut1
    unique_lock<mutex> lock1{mut1, std::defer_lock};
    // 睡眠 1s, 方便 t2 获得锁
    this_thread::sleep_for(std::chrono::milliseconds(500));
    // 延迟锁定互斥锁 mut2
    unique_lock<mutex> lock2{mut2, std::defer_lock};
    for (size_t i = 0; i < 50000; i++) {
      sharedInt++;
    }
  }};
  thread t2{[]() -> void {
    // 延迟锁定互斥锁 mut2
    unique_lock<mutex> lock2{mut2, std::defer_lock};
    // 睡眠 1s, 方便 t1 获得锁
    this_thread::sleep_for(std::chrono::milliseconds(500));
    // 延迟锁定互斥锁 mut1
    unique_lock<mutex> lock1{mut1, std::defer_lock};
    for (size_t i = 0; i < 50000; i++) {
      sharedInt--;
    }
  }};

  t1.join();
  t2.join();
  cout << "sharedInt = " << sharedInt << '\n';
}

// 单例模式
// 双重检查锁 Double-checked Locking 有潜在的条件竞争！
// 使用 std::call_once, std::once_flag 实现单例模式
shared_ptr<string> resource;
std::once_flag initedFlag;

//! ctest -R OnceTest
TEST(OnceTest, TestOnce) {
  for (size_t i = 0; i < 5; i++) {
    thread{[]() -> void {
      std::call_once(initedFlag, []() -> void {
        resource = std::make_shared<string>("some string");
        cout << "&resource = " << &resource << '\n';
      });
    }}.join();
  }
}

static std::once_flag calledFlag;
static int calledTime = 0;

void onceException() {
  std::call_once(calledFlag, []() -> void {
    ++calledTime;
    cout << "No." << calledTime << " called\n";
    throw runtime_error("A runtime error");
  });
}

//! ctest -R OnceExceptionTest
TEST(OnceExceptionTest, TestOnceException) {
  try {
    onceException();
  } catch (exception &) {
  }

  try {
    onceException();
  } catch (exception &) {
  }
}

Instance &getInstance() {
  static Instance instance;  // 静态局部变量的初始化是并发安全的
  return instance;
}

//! ctest -R SingletonTest
TEST(SingletonTest, TestSingleton) {
  for (size_t i = 0; i < 5; i++) {
    thread{[]() -> void {
      auto instance = getInstance();
      cout << "&instance = " << &instance << '\n';
    }}.join();
  }
}

void MapWrapper::set(const std::string &key, const std::string &value) {
  // 互斥锁 (独占写锁)
  lock_guard<shared_mutex> lock(this->mut_);  // 独占写
  this->data_[key] = value;
}

string MapWrapper::get(const std::string &key) const {
  // 共享 (读) 锁
  shared_lock<shared_mutex> lock(this->mut_);  // 共享读
  const auto it = this->data_.find(key);
  //! error: non-pointer operand type 'const std::basic_string<char>'
  //! incompatible with nullptr
  return it == this->data_.end() ? "Not found" : it->second;
}

void readMap(MapWrapper &map_, const string &k, int threadId) {
  cout << "Thread " << threadId << " reads " << k << ":" << map_.get(k) << '\n';
}

void writeMap(MapWrapper &map_, const string &k, const string &v,
              int threadId) {
  map_.set(k, v);
  cout << "Thread " << threadId << " writes " << k << ":" << v << '\n';
}

//! ctest -R MapWrapperTest
TEST(MapWrapperTest, TestMapWrapper) {
  MapWrapper map_;
  thread writer{[&map_]() -> void {
    for (int i = 0; i < 5; i++) {
      writeMap(map_, "k" + std::to_string(i), "v" + std::to_string(i), 1);
    }
  }};
  thread reader1{[&map_]() -> void {
    for (int i = 0; i < 5; i++) {
      readMap(map_, "k" + std::to_string(i), 2);
      this_thread::sleep_for(chrono::milliseconds(500));
    }
  }};
  thread reader2{[&map_]() -> void {
    for (int i = 0; i < 5; i++) {
      readMap(map_, "k" + std::to_string(i), 3);
      this_thread::sleep_for(chrono::milliseconds(500));
    }
  }};
  reader1.join();
  reader2.join();
  writer.join();
}

// 不能对已加锁的 std::mutex 再次加锁, 属于未定义的行为
// 可以对已加锁的 std::recursive_mutex 再次加锁, 加锁 n 次时, 需要解锁 n 次
recursive_mutex recursiveMut;

// recurseFunc 递归函数, 每次调用时, 都对 recursiveMut 加锁
void recursiveFunc(int count) {
  recursiveMut.lock();  // 对 recursiveMut 加锁
  cout << "Locked by thread " << std::this_thread::get_id()
       << ", count: " << count << '\n';
  if (count > 0) {
    recursiveFunc(count - 1);  // 递归
  }
  recursiveMut.unlock();  // 对 recursive 解锁
}

//! ctest -R RecursiveTest1
TEST(RecursiveTest1, TestRecursive1) {
  std::thread t1{recursiveFunc, 3};
  std::thread t2{recursiveFunc, 3};
  t1.join();
  t2.join();
}

// 可以使用 std::lock_guard, std::unique_lock 包装, 帮助管理
// std::recursive_mutex
//! ctest -R RecursiveTest2
TEST(RecursiveTest2, TestRecursive2) {
  std::function<void(int)> recursiveFunc = [&recursiveFunc](int count) -> void {
    cout << "Locked by thread " << std::this_thread::get_id()
         << ", count: " << count << '\n';
    if (count > 0) {
      recursiveFunc(count - 1);  // 递归
    }
  };
  thread t1{recursiveFunc, 3};
  thread t2{recursiveFunc, 3};
  t1.join();
  t2.join();
}

static int globalCnt = 0;

//! ctest -R ThreadLocalTest
TEST(ThreadLocalTest, TestThreadLocal) {
  thread_local int threadLocalCnt = 0;
  auto printCnt = []() -> void {
    cout << "Global count: " << ++globalCnt << '\n';
    cout << "Thread local count: " << ++threadLocalCnt << '\n';
  };
  thread{printCnt}.join();
  thread{printCnt}.join();
}