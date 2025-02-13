//
// Created by Tiancheng on 2024/8/29.
//

#include <fcntl.h>
#include <stdio.h>
#include <time.h>
#include <unistd.h>

#define BUF_SIZE 3

void sysIo() {
  clock_t start = clock();
  int readFd = open("../README.md", O_RDONLY);
  int writeFd = open("../README.txt", O_WRONLY | O_CREAT | O_TRUNC);
  char buf[BUF_SIZE];
  while (1) {
    int readBytes = read(readFd, buf, BUF_SIZE);
    if (readBytes <= 0) {
      break;
    }
    write(writeFd, buf, readBytes);
  }
  close(readFd);
  close(writeFd);
  clock_t end = clock();
  printf("Sys IO costs %fms\n", ((double)(end - start)) / 1000);
}

void stdIo() {
  clock_t start = clock();
  FILE *readFd = fopen("../README.md", "r");
  FILE *writeFd = fopen("../README.txt", "w");
  char buf[BUF_SIZE];
  while (1) {
    char *row = fgets(buf, BUF_SIZE, readFd);
    if (row == NULL) {
      break;
    }
    fputs(buf, writeFd);
  }
  fclose(readFd);
  fclose(writeFd);
  clock_t end = clock();
  printf("Std IO total %fms\n", ((double)(end - start)) / 1000);
}

int main() {
  sysIo();
  stdIo();
}