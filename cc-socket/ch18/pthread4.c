//
// Created by Tiancheng on 2024/8/31.
//

#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define THREAD_NUM 100

typedef void* any;
long long num = 0;
pthread_mutex_t mut;

any add(any arg) {
  pthread_mutex_lock(&mut);  //! 临界区加锁
  for (int i = 0; i < 50 * 1000 * 1000; i++) {
    num += 1;
  }
  pthread_mutex_unlock(&mut);  //! 临界区解锁
  return NULL;
}

any sub(any arg) {
  pthread_mutex_lock(&mut);  //! 临界区加锁
  for (int i = 0; i < 50 * 1000 * 1000; i++) {
    num -= 1;
  }
  pthread_mutex_unlock(&mut);  //! 临界区解锁
  return NULL;
}

int main() {
  pthread_mutex_init(&mut, NULL);  //! 创建互斥锁
  pthread_t threadIdArr[THREAD_NUM];
  for (int i = 0; i < THREAD_NUM; i++) {
    if (i % 2 == 0) {
      pthread_create(&threadIdArr[i], NULL, add, NULL);
    } else {
      pthread_create(&threadIdArr[i], NULL, sub, NULL);
    }
  }
  for (int i = 0; i < THREAD_NUM; i++) {
    pthread_join(threadIdArr[i], NULL);
  }
  printf("num = %lld", num);
  pthread_mutex_destroy(&mut);  //! 销毁互斥锁
  return 0;
}