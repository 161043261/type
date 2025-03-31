package cmd

import (
	"bronya.com/gin-gorm/src/conf"
	"bronya.com/gin-gorm/src/global"
	"bronya.com/gin-gorm/src/router"
)

func Start() {
	conf.ReadConf()                  //! 读取配置文件
	global.Logger = conf.NewLogger() //! 启动日志
	session, err := conf.ConnMysql() //! 连接 mysql，创建表

	if err != nil {
		global.Logger.Errorf("Connect mysql error %s", err.Error())
		panic(err.Error())
	}
	global.Database = session

	redisCli, err := conf.ConnRedis() //! 连接 redis
	if err != nil {
		global.Logger.Errorf("Connect redis error %s", err.Error())
		panic(err.Error())
	}
	global.RedisCli = redisCli

	router.StartRouter() //! 创建路由组，启动路由器
}

func Done() {
	global.Logger.Infoln("==================== Done! ====================")
}
