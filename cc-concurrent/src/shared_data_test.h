//
// Created by admin on 2024/9/26.
//

#ifndef SHARED_DATA_TEST_H
#define SHARED_DATA_TEST_H

#include <list>
#include <map>
#include <shared_mutex>
#include <string>

void appendlist(int n, std::list<int> &slice /* 引用 */);

void fmtPrintList(const std::list<int> &slice);

void onceException();

class Instance {};

// 静态局部变量的初始化是并发安全的
Instance &getInstance();

void testSingleton();

// 互斥锁
// std::mutex
// std::shared_time_mutex
// std::shared_mutex (higher performance)

class MapWrapper {
 private:
  std::map<std::string, std::string> data_;
  // shared_mutex (higher performance)
  mutable std::shared_mutex mut_;  // M&M principle: mutable & mutex
 public:
  void set(const std::string &key, const std::string &value);

  // 第一个 const 表示: 该方法不会修改传递的参数
  // 第二个 const 表示: 该方法不会修改类的非静态成员
  std::string get(const std::string &key) const;
};

void readMap(MapWrapper &map_, const std::string &k, int threadId);

void writeMap(MapWrapper &map_, const std::string &k, const std::string &v,
              int threadId);

void recursiveFunc(int count);

#endif  // SHARED_DATA_TEST_H
