//
// Created by admin on 2024/9/30.
//

#ifndef SYNC_TEST_H
#define SYNC_TEST_H
#include <condition_variable>
#include <mutex>
#include <queue>

template <typename T>
class ThreadSafeQueue {
  mutable std::mutex mut;
  std::condition_variable condVar;
  std::queue<T> queue_;

 public:
  ThreadSafeQueue();

  // 入队
  void enqueue(T value);

  // 出队, 队列为空则等待
  std::shared_ptr<T> dequeue();

  bool empty() const;  // 该方法不会修改类的非静态成员
};

struct Square {
  int operator()(int x) const;
};

struct SquareWrapper {
  int calculate(int x);
};

struct MoveOnly {
  //! 默认构造函数
  MoveOnly() = default;
  //! 移动构造函数
  MoveOnly(MoveOnly &&) noexcept = default;
  //! 删除拷贝构造函数
  MoveOnly(const MoveOnly &) = delete;

  void printAddr();
};

#endif  // SYNC_TEST_H
