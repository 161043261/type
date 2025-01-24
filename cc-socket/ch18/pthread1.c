//
// Created by Tiancheng on 2024/8/31.
//

#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

typedef void *any;

any threadFunc(any arg) {
  int *cntPtr = (int *)arg;
  for (int i = 1; i <= *cntPtr; i++) {
    sleep(1);
    printf("Sub thread counter: %d\n", i);
  }
  char msg[] = "Hutao!";
  char *retPtr = (char *)malloc(sizeof(msg));
  strcpy(retPtr, msg);
  return retPtr;
}

int main() {
  // typedef unsigned long pthread_t;
  // using pthread_t = unsigned long;
  pthread_t threadId;
  int arg = 5;
  //! 创建子进程
  if (pthread_create(&threadId, NULL, threadFunc, &arg) != 0) {
    perror("[ERROR] Fatal error");
    exit(1);
  }

  any retPtr;
  //! 子进程运行 5s, 主进程等待子进程终止
  if (pthread_join(threadId, &retPtr) != 0) {
    perror("[ERROR] Fatal error");
    exit(1);
  }
  printf("Sub thread returns: %s\n", (char *)retPtr);
  free(retPtr);
  printf("Main thread returns\n");
  return 0;
}
