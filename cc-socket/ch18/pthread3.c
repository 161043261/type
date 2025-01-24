//
// Created by Tiancheng on 2024/8/31.
//

#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define NUM_THREAD 100

typedef void* any;
long long num = 0;

any add(any arg) {
  for (int i = 0; i < 50 * 1000 * 1000; i++) {
    num += 1;
  }
  return NULL;
}

any sub(any arg) {
  for (int i = 0; i < 50 * 1000 * 1000; i++) {
    num -= 1;
  }
  return NULL;
}

int main() {
  pthread_t threadIdArr[NUM_THREAD];
  for (int i = 0; i < NUM_THREAD; i++) {
    if (i % 2 == 0) {
      pthread_create(&threadIdArr[i], NULL, add, NULL);
    } else {
      pthread_create(&threadIdArr[i], NULL, sub, NULL);
    }
  }

  for (int i = 0; i < NUM_THREAD; i++) {
    pthread_join(threadIdArr[i], NULL);
  }
  printf("num = %lld", num);
  return 0;
}
