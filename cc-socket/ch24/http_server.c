//
// Created by Tiancheng on 2024/9/1.
//

#include <arpa/inet.h>
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#define BUF_SIZE 1024
#define LEN 128
typedef void *any;

any reqHandler(any arg);
void respHandler(FILE *writeFp, char *ct, char *path);
const char *getContentType(char *path);

int main(int argc, char *argv[]) {
  const char *port;
  if (argc != 2) {
    printf("Usage: %s <port>\n", argv[0]);
    port = "3333";
  } else {
    port = argv[1];
  }

  int serverSocketFd = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
  if (serverSocketFd == -1) {
    perror("Error created socket");
    exit(1);
  }

  int optVal = 1;  // 地址可重用
  socklen_t optLen = sizeof(optVal);
  setsockopt(serverSocketFd, SOL_SOCKET, SO_REUSEADDR, &optVal, optLen);

  struct sockaddr_in serverAddr = {0};
  serverAddr.sin_family = AF_INET;
  serverAddr.sin_addr.s_addr = htonl(INADDR_ANY);
  serverAddr.sin_port = htons(atoi(port));

  if (bind(serverSocketFd, (struct sockaddr *)&serverAddr,
           sizeof(serverAddr)) == -1) {
    perror("[ERROR] Error bound IP addr and port");
    exit(1);
  }

  if (listen(serverSocketFd, 3 /* 最大连接数 */) == -1) {
    printf("[ERROR] Error listened on 127.0.0.1:%d\n",
           ntohs(serverAddr.sin_port));
    exit(1);
  }

  while (1) {
    struct sockaddr_in clientAddr = {0};
    socklen_t clientAddrLen = sizeof(clientAddr);

    int clientSocketFd =
        accept(serverSocketFd, (struct sockaddr *)&clientAddr, &clientAddrLen);
    if (clientSocketFd == -1) {
      perror("[ERROR] Error accepted connection");
      break;
    }

    printf("[INFO] Connection accepted %s:%d\n", inet_ntoa(clientAddr.sin_addr),
           ntohs(clientAddr.sin_port));

    pthread_t reqThreadId;
    pthread_create(&reqThreadId, NULL, reqHandler, &clientSocketFd);
    pthread_detach(reqThreadId);
  }
  close(serverSocketFd);
  return 0;
}

any reqHandler(any arg) {
  int clientSocketFd = *(int *)arg;
  char reqLine[LEN];  // 请求行

  FILE *readFp = fdopen(clientSocketFd, "r");
  FILE *writeFp = fdopen(dup(clientSocketFd), "w");

  //! 从 readFp 读出一行到 reqLine
  fgets(reqLine, LEN, readFp);
  //! 在 reqLine 中查找第一个 "HTTP/" 的位置
  if (strstr(reqLine, "HTTP/") == NULL) {
    respHandler(writeFp, NULL, NULL);
    fclose(readFp);
    fclose(writeFp);
    return NULL;
  }

  // GET /index.html HTTP/1.1
  char method[LEN];
  char contentType[LEN];
  char path[LEN];
  //! reqLine = GET /index.html HTTP/1.1
  printf("[DEBUG] reqLine = %s\n", reqLine);
  strcpy(method, strtok(reqLine, " /"));
  //! method = GET
  printf("[DEBUG] method = %s\n", method);
  strcpy(path, strtok(NULL, " /"));
  //! path = index.html
  printf("[DEBUG] path = %s\n", path);
  strcpy(contentType, getContentType(path));
  //! contentType = text/html
  printf("[DEBUG] contentType = %s\n", contentType);
  if (strcasecmp(method, "GET") != 0) {
    respHandler(writeFp, NULL, NULL);  // resp err
    fclose(readFp);
    fclose(writeFp);
    return NULL;
  }
  fclose(readFp);
  respHandler(writeFp, contentType, path);  // resp msg
  return NULL;
}

void respHandler(FILE *writeFp, char *ct, char *path) {
  FILE *homepage = fopen(path, "r");
  if (homepage == NULL) {
    path = NULL;
  }

  // resp err
  if (path == NULL) {
    char protocol[] = "HTTP/1.1 400 Bad Request\r\n";
    char server[] = "Server:HTTP Server\r\n";
    char contentLength[] = "Content-Length:2048\r\n";
    char contentType[] = "Content-Type:text/html\r\n\r\n";
    char content[] =
        "<html><head><title>HTTP Server</title></head><body>URI "
        "or method error!</body></html>";
    fputs(protocol, writeFp);
    fputs(server, writeFp);
    fputs(contentLength, writeFp);
    fputs(contentType, writeFp);
    fputs(content, writeFp);
    fflush(writeFp);
    return;
  }

  // resp msg
  char protocol[] = "HTTP/1.1 200 OK\r\n";
  char server[] = "Server:HTTP Server\r\n";
  char contentLength[] = "Content-Length:2048\r\n";
  char contentType[LEN];
  char content[BUF_SIZE];
  fputs(protocol, writeFp);
  fputs(server, writeFp);
  fputs(contentLength, writeFp);

  sprintf(contentType, "Content-Type:%s\r\n\r\n", ct);
  fputs(contentType, writeFp);

  while (1) {
    char *newLine = fgets(content, BUF_SIZE, homepage);
    if (newLine == NULL) {
      break;
    }
    //* printf("[DEBUG] newLine = %s\n", newLine);
    //* printf("[DEBUG] content = %s\n", content);
    fputs(content, writeFp);
    fflush(writeFp);
  }
  fflush(writeFp);
  fclose(writeFp);
}

const char *getContentType(char *path) {
  char extName[LEN];
  char path_[LEN];
  strcpy(path_, path);
  //! path_ = index.html
  printf("[INFO] path_ = %s\n", path_);
  strtok(path_, ".");
  //! path_ = index
  printf("[DEBUG] path_ = %s\n", path_);
  strcpy(extName, strtok(NULL, "."));
  //! path_ = index, extName = html
  printf("[DEBUG] path_ = %s, extName = %s\n", path_, extName);
  if (strcmp(extName, "html") == 0) {
    return "text/html";
  }
  return "text/plain";
}