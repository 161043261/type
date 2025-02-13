//
// Created by Tiancheng on 2024/8/29.
//

#include <fcntl.h>
#include <stdio.h>

int main() {
  int fd = open("../README.txt", O_WRONLY | O_CREAT | O_TRUNC);
  if (fd == -1) {
    return 1;
  }
  printf("fd ==> fp, fd = %d\n", fd);
  //! fdopen
  FILE *fp = fdopen(fd, "w");  //! 将文件描述符 fd 转换为 FILE* 文件指针 fp
  fputs(
      "Convert fd to fp using ```FILE *fp = fdopen(fd, 'w')```\n"
      "Convert fp to fd using ```int fd = fileno(fp)```\n",
      fp);  // 写入 ../README.txt
  int fd_ = fileno(fp);
  //! fileno
  printf("fp ==> fd, fd = %d\n",
         fd_);  //! 将 FILE* 文件指针 fp 转换为文件描述符 fd
  fclose(fp);
  return 0;
}