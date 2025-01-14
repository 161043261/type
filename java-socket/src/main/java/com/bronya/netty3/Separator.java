package com.bronya.netty3;

import io.netty.bootstrap.Bootstrap;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.buffer.ByteBuf;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.LineBasedFrameDecoder;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import java.util.Arrays;
import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// 使用分隔符 \n 或 \r\n
// 如果超过指定长度, 仍找不到分隔符, 则抛出异常
public class Separator {
  static final Logger log = LoggerFactory.getLogger(Separator.class);

  public static void main(String[] args) {

    Thread server =
        new Thread(
            () -> {
              try (var boss = new NioEventLoopGroup(1);
                  var workers = new NioEventLoopGroup()) {
                ChannelFuture channelFuture =
                    new ServerBootstrap()
                        .channel(NioServerSocketChannel.class)
                        .group(boss, workers)
                        .childHandler(
                            new ChannelInitializer<SocketChannel>() {

                              @Override
                              protected void initChannel(SocketChannel ch) {
                                // 使用分隔符 \n 或 \r\n. 如果超过指定长度, 仍未找到分隔符, 则抛出异常
                                // ! 默认使用 \n 分隔符
                                ch.pipeline().addLast(new LineBasedFrameDecoder(1024));
                                ch.pipeline().addLast(new LoggingHandler(LogLevel.DEBUG));
                              }
                            })
                        // 设置服务器的接收缓冲区大小为 30 字节
                        .option(ChannelOption.SO_RCVBUF, 30)
                        .bind(3261);

                channelFuture.channel().closeFuture().sync();
                log.info("Server started");
              } catch (InterruptedException e) {
                log.error(e.getMessage());
              }
            });

    server.start();

    Thread client =
        new Thread(
            () -> {
              try (var workers = new NioEventLoopGroup()) {
                ChannelFuture channelFuture =
                    new Bootstrap()
                        .channel(NioSocketChannel.class)
                        .group(workers)
                        .handler(
                            new ChannelInitializer<SocketChannel>() {

                              @Override
                              protected void initChannel(SocketChannel ch) throws Exception {
                                log.info("Connected to server");
                                ch.pipeline()
                                    .addLast(
                                        new ChannelInboundHandlerAdapter() {

                                          @Override
                                          public void channelActive(ChannelHandlerContext ctx) {
                                            log.info("Sending packets");
                                            Random rand = new Random();
                                            ByteBuf buf = ctx.alloc().buffer();
                                            for (int cnt = 0; cnt < 30; cnt++) {
                                              var len = rand.nextInt(16) + 1;
                                              var aByte = (byte) rand.nextInt('a', 'z' + 1);
                                              var msg = new byte[len];
                                              Arrays.fill(msg, aByte);
                                              buf.writeBytes(msg);
                                              // 写入 \n 分隔符
                                              buf.writeByte((byte) '\n');
                                            }
                                            ctx.writeAndFlush(buf);
                                          }
                                        });
                              }
                            })
                        .connect("127.0.0.1", 3261)
                        .sync();
                channelFuture.channel().closeFuture().sync();
              } catch (InterruptedException e) {
                log.error(e.getMessage());
              }
            });
    client.start();
  }
}
