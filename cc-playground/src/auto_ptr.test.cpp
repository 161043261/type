//
// Created by admin on 2024/10/15.
//

//
// 智能指针
// * std::shared_ptr
// * std::unique_ptr
// * std::weak_ptr
//

#include <gtest/gtest.h>

#include <iostream>
#include <memory>

using namespace std;

void foo(const std::shared_ptr<int> &p) { (*p)++; }

//
// std::shared_ptr 共享的智能指针, 共享对象所有权
//

TEST(MakeSharedTest, TestMakeShared) {
  // int* p = new int{10}; // 非法
  // 使用 std::make_shared 创建 std::shared_ptr 智能指针
  auto sp = make_shared<int>(10);
  foo(sp);
  cout << *sp << '\n';  // 11
}

// auto sp = make_shared<int>{10};
// sp.get();
// 获取裸指针

// sp.reset();
// 如果 sp 指向的对象引用计数 >1, 则将 sp 置空, 该对象的引用计数 -1
// 如果 sp 指向的对象引用计数 =1, 则回收该对象

// sp.use_count()
// 获取 sp 指向的对象的引用计数

TEST(Get_Set_UseCountTest, TestGet_Set_UseCount) {
  auto px = make_shared<int>(10);
  auto py = px;  // pointer 引用计数 +1
  auto pz = px;  // pointer 引用计数 +1

  cout << "px use_count: " << px.use_count() << '\n';  // 3
  cout << "py use_count: " << py.use_count() << '\n';  // 3
  cout << "pz use_count: " << pz.use_count() << '\n';  // 3

  cout << "==================== py reset ====================" << '\n';
  py.reset();  // 引用计数 -1

  cout << "px use_count: " << px.use_count() << '\n';  // 2
  cout << "py use_count: " << py.use_count() << '\n';  // 0
  cout << "pz use_count: " << pz.use_count() << '\n';  // 2

  cout << "==================== pz reset ====================" << '\n';
  pz.reset();

  cout << "px use_count: " << px.use_count() << '\n';  // 1
  cout << "py use_count: " << py.use_count() << '\n';  // 0
  cout << "pz use_count: " << pz.use_count() << '\n';  // 0
}

//
// std::unique_str 独占的智能指针, 独占对象所有权
//

TEST(MakeUniqueTest, TestMakeUnique) {
  unique_ptr<int> up = make_unique<int>(10);
  // unique_ptr<int> up2 = up; // 非法
}

struct Foo {
  Foo() { cout << "New foo\n"; }

  ~Foo() { cout << "Delete foo\n"; }

  void out(const string &prefix) { cout << prefix << "Mamba out!\n"; }
};

void say(const Foo &foo) { cout << "What can I say, haha!\n"; }

TEST(UniquePtrTest, TestUniquePtr) {
  unique_ptr<Foo> p1{make_unique<Foo>()};

  if (p1 != nullptr) {
    unique_ptr<Foo> p2{std::move(p1)};
    // New foo
    say(*p2);

    if (p1 != nullptr) {
      p1->out("First -- ");
    }
    if (p2 != nullptr) {
      p2->out("Second -- ");
    }  // Second -- Mamba out!

    p1 = std::move(p2);

    if (p1 != nullptr) {
      p1->out("Third -- ");
    }  // Third -- Mamba out!
    if (p2 != nullptr) {
      p2->out("Fourth -- ");
    }
  }
  // Delete foo
}

//
// std::weak_str 弱引用指针, 不参与对象所有权管理
//

struct Gopher;

struct Duke {
  shared_ptr<Gopher> gopher;
  Duke() { cout << "New duke\n"; }
  ~Duke() { cout << "Delete duke\n"; }
};

struct Gopher {
  shared_ptr<Duke> duke;
  Gopher() { cout << "New gopher\n"; }
  ~Gopher() { cout << "Delete gopher\n"; }
};

TEST(SharedPtrTest, TestSharedPtr) {
  auto aGopher = make_shared<Gopher>();
  auto aDuke = make_shared<Duke>();
  aGopher->duke = aDuke;
  aDuke->gopher = aGopher;
  assert(aGopher->duke.use_count() == 2);  // 2
  assert(aDuke->gopher.use_count() == 2);  // 2
  cout << "Shared pointer test return\n";
}

// New gopher
// New duke
// Shared pointer test return

// 问题: aGopher, aDuke 未被析构 -> 内存泄露
// 解决: 使用弱引用指针 std::weak_ptr
// 强引用 std::shared_ptr, std::unique_ptr 引用计数会 +1, 参与对象所有权管理
// 弱引用 std::weak_ptr 引用计数不会 +1, 不参与对象所有权管理

struct Dll;

struct So {
  weak_ptr<Dll> dll;
  So() { cout << "New so\n"; }
  ~So() { cout << "Delete so\n"; }
};

struct Dll {
  weak_ptr<So> so;
  Dll() { cout << "New dll\n"; }
  ~Dll() { cout << "Delete dll\n"; }
};

TEST(WeakPtrTest, TestWeakPtr) {
  auto aSo = make_shared<So>();
  auto aDll = make_shared<Dll>();
  aSo->dll = aDll;
  aDll->so = aSo;
  assert(aSo->dll.use_count() == 1);  // 1
  assert(aDll->so.use_count() == 1);  // 1
  cout << "Weak pointer test return\n";
}

// New so
// New dll
// Weak pointer test return
// Delete dll
// Delete so
