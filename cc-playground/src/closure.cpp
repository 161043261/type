//
// Created by admin on 2024/11/20.
//

#include <functional>
#include <iostream>
#include <memory>

using namespace std;

auto outer() {
  auto cnt = make_shared<int>(1);
  using t = function<void()>;
  auto ret = make_shared<t>([cnt]() -> void {
    std::cout << "Called " << *cnt << " times\n";
    (*cnt)++;
  });
  return ret;
}

int main() {
  auto counter = outer();
  // (*(counter.get()))();
  (*counter)();
  (*counter)();
  (*counter)();
}
