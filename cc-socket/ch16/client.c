//
// Created by Tiancheng on 2024/8/30.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <unistd.h>

#define BUF_SIZE 30

int main(int argc, char *argv[]) {
  if (argc != 3) {
    printf("Usage: %s <serverAddr> <serverPort>\n", argv[0]);
    exit(1);
  }
  int clientSocketFd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
  if (clientSocketFd == -1) {
    printf("Error created socket\n");
    exit(1);
  }
  struct sockaddr_in serverAddr = {0};
  serverAddr.sin_family = AF_INET;
  serverAddr.sin_addr.s_addr = inet_addr(argv[1]);
  serverAddr.sin_port = htons(atoi(argv[2]));
  if (connect(clientSocketFd, (struct sockaddr *)&serverAddr,
              sizeof(serverAddr)) == -1) {
    printf("Error connected to server\n");
    exit(1);
  }
  FILE *readFp = fdopen(clientSocketFd, "r");
  FILE *writeFp = fdopen(clientSocketFd, "w");
  char buf[BUF_SIZE];
  while (1) {
    char *newLine = fgets(buf, BUF_SIZE, readFp);
    if (newLine == NULL) {
      break;
    }
    fputs(buf, stdout);
    fflush(stdout);
  }
  //! server.c 不能收到 Thank you!
  //! sep_server.c 可以收到 Thank you!
  fputs("Thank you!", writeFp);
  fflush(writeFp);
  fclose(writeFp);
  fclose(readFp);
  return 0;
}