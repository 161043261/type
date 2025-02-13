//
// Created by Tiancheng on 2024/8/31.
//

#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
typedef void *any;

int sum;

any threadFunc(any arg) {
  int *fromTo = (int *)arg;
  int from = fromTo[0];
  int to = fromTo[1];
  for (int i = from; i <= to; i++) {
    sum += i;
  }
  int *retPtr = (int *)malloc(sizeof(int));
  *retPtr = sum;
  return retPtr;
}

int main() {
  pthread_t threadIdA, threadIdB;
  int fromToA[] = {1, 5};
  int fromToB[] = {6, 10};

  pthread_create(&threadIdA, NULL, threadFunc, fromToA);
  pthread_create(&threadIdB, NULL, threadFunc, fromToB);

  any retPtrA;
  any retPtrB;
  pthread_join(threadIdA, &retPtrA);
  pthread_join(threadIdB, &retPtrB);

  printf("sumA = %d, sumB = %d, sum = %d\n", *(int *)retPtrA, *(int *)retPtrB,
         sum);

  free(retPtrA);
  free(retPtrB);
  return 0;
}
