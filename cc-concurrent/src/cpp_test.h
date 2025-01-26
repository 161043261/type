//
// Created by admin on 2024/9/28.
//

#ifndef CPP_TEST_H
#define CPP_TEST_H

#include <gtest/gtest.h>

#include <condition_variable>
#include <mutex>
#include <vector>

static int factorial(int n);

template <typename E>  // E is the element type
class Queue {
  // private:
  std::vector<E> elemSlice;
  std::mutex mut;

 public:
  Queue();  // constructor
  void enqueue(const E &elem);
  std::unique_ptr<E> dequeue();
  size_t size();
};

class QueueTest : public testing::Test {
 protected:
  QueueTest();  // constructor

  [[maybe_unused]] Queue<int> q0;  // q0 remains empty
  [[maybe_unused]] Queue<int> q1;
  [[maybe_unused]] Queue<int> q2;
};

#endif  // CPP_TEST_H
