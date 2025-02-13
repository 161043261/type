//
// Created by Tiancheng on 2024/8/18.
//

#include <arpa/inet.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/wait.h>
#include <unistd.h>

#define BUF_SIZE 30

// 定义信号处理函数 childExitCallback
//! 僵尸进程: 子进程先于父进程终止, 父进程未释放子进程的资源, 子进程成为僵尸进程
void childExitCallback(int sig) {
  // 预防僵尸进程
  int status;
  pid_t pid = waitpid(-1 /* -1 等待任一子进程终止 */, &status,
                      WNOHANG /* 没有子进程终止时, 父进程不会阻塞 */);
  if (WIFEXITED(status) /* 子进程正常终止时返回 true, 否则返回 false */) {
    printf("Remove child proc { pid: %d, return: %d }\n", pid,
           WEXITSTATUS(status) /* 获取子进程的返回值 */);
  }
}

int main(int argc, char *argv[]) {
  if (argc != 2) {
    printf("Usage: %s <port>\n", argv[0]);
    exit(1);
  }
  // 创建信号处理器 sigAct
  struct sigaction sigAct = {0};
  sigAct.sa_handler = childExitCallback;
  sigemptyset(&sigAct.sa_mask);  // sa_mask 置 0
  sigAct.sa_flags = 0;           // sa_flags 置 0
  //* 调用 sigation 函数注册信号 SIGCHLD 和信号处理器 sigAct
  if (sigaction(SIGCHLD /* 子进程终止 */, &sigAct,
                0 /* oldSigAct 不需要则传递 0 */) == -1) {
    perror("Register signal handler failed");  // 注册信号处理器失败
    exit(1);
  }
  //* 调用 socket 函数, 服务器创建 listener
  int serverSocketFd = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
  if (serverSocketFd == -1) {
    perror("Error created socket");
  }

  struct sockaddr_in serverAddr = {0};
  serverAddr.sin_family = AF_INET;  // IPv4 协议族
  // htonl 函数将一个 32 位 (4 字节) 的 int 整数从主机字节序转换为网络字节序
  serverAddr.sin_addr.s_addr =
      htonl(INADDR_ANY);  // 0.0.0.0 接受所有 IP 地址的 TCP/UDP 连接
  // htons 函数将一个 16 位 (2 字节) 的 short 整数从主机字节序转换为网络字节序
  serverAddr.sin_port = htons(atoi(argv[1]));  // 端口 = 第 1 个命令行参数

  //* 调用 bind 函数, 给 socket 套接字分配 IP 地址和端口
  if (bind(serverSocketFd, (struct sockaddr *)&serverAddr,
           sizeof(serverAddr)) ==
      -1 /* 绑定 IP 地址; 端口, 成功时返回 0, 失败时返回 -1 */) {
    perror("Error bound IP addr and port");
  }

  //* 调用 listen 函数, 监听客户端的连接请求
  if (listen(serverSocketFd, 3 /* 最大连接数 */) == -1) {
    printf("Error listened on 127.0.0.1:%d\n", ntohs(serverAddr.sin_port));
  }

  int fd[2];
  pipe(fd);            // 创建管道
  pid_t pid = fork();  // 创建子进程

  if (pid == -1) {          // 创建子进程失败
    close(serverSocketFd);  // 父进程关闭 listener
    perror("Error created child proc");
    exit(1);
  }

  if (pid == 0) {  // 是子进程
    FILE *fp = fopen("../README.txt", "wt");
    char recv[BUF_SIZE];
    while (1) {
      int readBytes = read(fd[0], recv,
                           BUF_SIZE);  //! 子进程使用 fd[0] 接收数据, 写入 recv
      if (readBytes <= 0) {
        perror("[ERROR] Input is empty");
        break;
      }
      printf("Pipe reads: %s\n", recv);
      size_t writeBytes = fwrite(recv, 1, readBytes,
                                 fp);  // 读出 recv, 写入 ../README.txt
      printf("Server child proc fwrites: %ld bytes\n", writeBytes);
    }
    fclose(fp);
    return 0;
  }

  // 是主进程
  while (1) {
    struct sockaddr_in clientAddr = {0};           // 接收客户端 IP 地址
    socklen_t clientAddrLen = sizeof(clientAddr);  // 接收客户端 IP 地址长度
    int clientSocketFd =
        accept(serverSocketFd, (struct sockaddr *)&clientAddr, &clientAddrLen);

    if (clientSocketFd == -1) {
      perror("Error accepted connection");
      continue;
    }

    pid = fork();             // 创建一个子进程
    if (pid == -1) {          // 子进程创建失败
      close(clientSocketFd);  // 断开连接
      perror("Error created child proc");
      continue;
    }
    // 子进程创建成功
    //* 父子进程都有 serverSocketFd, clientSocketFd 等变量
    if (pid == 0) {           // 是子进程
      close(serverSocketFd);  //? 子进程关闭 listener
      char buf[BUF_SIZE];
      while (1) {
        int readBytes = read(clientSocketFd, buf, BUF_SIZE);
        if (readBytes <= 0) break;
        printf("Server child proc reads: %s\n", buf);
        write(clientSocketFd, buf, readBytes);  // echo
        write(fd[1], buf,
              readBytes);  //! 另一个子进程使用 fd[1] 发送数据
      }

      // 服务器的输出流已断开
      char send[BUF_SIZE] = "Thank you";
      write(clientSocketFd, send, strlen(send) + 1 /* strlen 不计算 '/0' */);

      close(clientSocketFd);  // 子进程断开与客户端的连接
      puts("Server child proc disconnects from client");
      return 0;
    }
    // 是父进程 (子进程与客户端已建立连接)
    close(clientSocketFd);  // 父进程断开与客户端的连接
  }
  close(serverSocketFd);  //! 父进程关闭 listner
  return 0;
}
