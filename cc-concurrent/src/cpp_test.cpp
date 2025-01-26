//
// Created by admin on 2024/9/28.
//

#include "cpp_test.h"

using namespace std;

static int factorial(int n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

template <typename E>
Queue<E>::Queue() = default;

template <typename E>
void Queue<E>::enqueue(const E &elem) {
  // unique_lock 灵活的互斥锁
  unique_lock<std::mutex> lock{mut};
  elemSlice.push_back(elem);
}

template <typename E>
auto Queue<E>::dequeue() -> std::unique_ptr<E> {
  // unique_lock 灵活的互斥锁
  unique_lock<std::mutex> lock{mut};
  if (elemSlice.empty()) {
    return nullptr;
  }
  auto frontElem = std::make_unique<E>(elemSlice.front());
  elemSlice.erase(elemSlice.begin());
  return frontElem;
}

template <typename E>
size_t Queue<E>::size() {
  // lock_guard 互斥锁
  lock_guard<std::mutex> lock(mut);
  return elemSlice.size();
}

QueueTest::QueueTest() {
  q1.enqueue(1);
  q2.enqueue(2);
  q2.enqueue(3);
}

//! ctest -R Assertion
// void HelloTest_TestAssertions_Test::TestBody() {}
TEST(AssertionTest /* test suite name */, TestAssertion /* test name */) {
  EXPECT_STRNE("Hello", "World");
  EXPECT_EQ(6 * 7, 42);
}

//! ctest -R FactorialTest
TEST(FactorialTest /* test suite name */, TestFactorial /* test name */) {
  EXPECT_EQ(factorial(1), 1);
  EXPECT_EQ(factorial(8), 40320);
}

//! ctest -R QueueTest
TEST_F(QueueTest /* test fixture */, TestSize /* test name */) {
  EXPECT_EQ(q0.size(), 0);
}

TEST_F(QueueTest /* test fixture */, TestDequeue /* test name */) {
  // 使用 c++ {} 初始化
  unique_ptr<int> e0{q0.dequeue()};
  EXPECT_EQ(e0.get(), nullptr);

  unique_ptr<int> e1{q1.dequeue()};
  ASSERT_NE(e1, nullptr);
  EXPECT_EQ(*e1.get(), 1);
  EXPECT_EQ(q1.size(), 0);

  unique_ptr<int> e2{q2.dequeue()};
  ASSERT_NE(e2, nullptr);
  EXPECT_EQ(*e2.get(), 2);
  EXPECT_EQ(q2.size(), 1);
}