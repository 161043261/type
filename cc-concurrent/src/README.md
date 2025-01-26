# c++ 并发编程

## 非 RAII 风格的锁

std::mutex 非 RAII 风格的锁

```cpp
std::mutex mut;

// 如果线程获取锁失败, 则该线程放弃 cpu, 阻塞直到锁被释放
mut.lock();

// 如果线程获取锁成功, 则返回 true
// 如果线程获取锁失败, 则返回 false, 线程不阻塞, 继续运行
mut.try_lock();
```

## RAII 风格的锁

RAII, Resource Acquisition Is Initialization

资源获取即初始化: 构造函数申请资源, 析构函数释放资源, 对象的生命周期和资源的分配与回收绑定

| RAII 风格的锁    |                        |
| ---------------- | ---------------------- |
| std::lock_guard  | 互斥锁                 |
| std::unique_lock | 灵活的互斥锁           |
| std::scoped_lock | 可以同时锁定多个 mutex |
| std::shared_lock | 共享 (读) 锁           |

| constexpr        | 常量表达式                                                            |
| ---------------- | --------------------------------------------------------------------- |
| std::adopt_lock  | 假定非 RAII 风格的互斥锁已锁定, 转移 mut 的所有权给 RAII 风格的互斥锁 |
| std::defer_lock  | 延迟锁定                                                              |
| std::try_to_lock | 尝试锁定 (非阻塞)                                                     |

```c++
std::mutex mut;
mut.lock();
// std::adopt_lock
// 假定非 RAII 风格的互斥锁 mut 已锁定, 转移 mut 的所有权给 RAII 风格的互斥锁 lock
lock_guard<mutex> lock{mut, std::adopt_lock};
// std::defer_lock  延迟锁定
// std::try_to_lock 尝试锁定 (非阻塞)
```

```c++
// std::scoped_lock 可以同时锁定多个 mutex
std::mutex mut1, mut2;
//// 同时锁定 mut1, mut2 (非 RAII 风格)
//// std::lock(mut1, mut2);

// 同时锁定 mut1, mut2 (RAII 风格)
scoped_lock<mutex, mutex> guard{mut1, mut2};
```

```c++
// std::unique_lock 灵活的互斥锁
std::mutex mut;
// std::defer_lock 延迟锁定
unique_lock<mutex> lock{mut, std::defer_lock};
```

## 单例模式

> 双重检查锁 Double-checked Locking 有潜在的条件竞争！

使用 std::call_once, std::once_flag 实现单例模式

```c++
shared_ptr<string> resource;
std::once_flag initedFlag;

void testOnce() {
  for (size_t i = 0; i < 5; i++) {
    thread{[]() -> void {
      std::call_once(initedFlag, []() -> void {
        resource = std::make_shared<string>("some string");
        cout << "&resource = " << &resource << '\n';
      });
    }}.join();
  }
}
```

> 静态局部变量的初始化是并发安全的

```c++
class Instance {};

Instance &getInstance() {
  static Instance instance; // 静态局部变量的初始化是并发安全的
  return instance;
}

void testSingleton() {
  for (size_t i = 0; i < 5; i++) {
    thread{[]() -> void {
      auto instance = getInstance();
      cout << "&instance = " << &instance << '\n';
    }}.join();
  }
}
```

| 锁                     |                  |
| ---------------------- | ---------------- |
| std::mutex             | 互斥锁; 独占写锁 |
| std::shared_time_mutex |                  |
| std::shared_mutex      | 共享读锁         |
| std::recursive_mutex   | 可重入锁         |

## condition_variable 条件变量

线程忙等待 (自旋 spin) 线程获取锁失败时, 不放弃 cpu, 循环检查 (自旋) 锁是否被释放

- std::condition_variable 只能用于 std::unique_lock<std::mutex>, 性能高
- std::condition_variable_any 可以用于任意的锁, 性能低

## future 异步任务

### 启动异步任务, 获取返回值

```c++
//! ctest -R FutureTest
TEST(FutureTest, TestFuture) {
  // 调用 std::async 函数启动异步任务, 返回一个 future 对象
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
```

- std::future 独占, 只能关联一个事件, 类比 std::unique_ptr
- std::shared_future 共享, 可以关联多个事件, 类比 std::shared_ptr

### 异步任务 std::async 的执行策略 policy

- std::launch::async 饿汉式 eager, 创建新线程执行异步任务
- std::launch::deferred 懒汉式 lazy, 等待直到 future 对象调用 wait 方法或 get 方法时, 执行异步任务 (不创建新线程)
