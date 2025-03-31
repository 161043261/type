package conf

import (
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"log"
	"os"
	"path/filepath"
	"time"
)

var logger *zap.SugaredLogger

func NewLogger() *zap.SugaredLogger {
	if logger == nil {
		logLevel := zap.DebugLevel
		if viper.GetString("buildType") == "Release" {
			logLevel = zap.InfoLevel
		}

		stdoutSync := zapcore.AddSync(os.Stdout)
		core := zapcore.NewCore(getEncoder(), zapcore.NewMultiWriteSyncer(getWriterSyncer(), stdoutSync), logLevel)

		logger = zap.New(core).Sugar()
	}
	return logger
}

func getEncoder() zapcore.Encoder {
	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.EncodeLevel = zapcore.CapitalLevelEncoder // 大写日志级别 INFO, WARN, DEBUG, ...
	encoderConfig.TimeKey = "time"                          // ts (timestamp) => time
	encoderConfig.EncodeTime = func(t time.Time, encoder zapcore.PrimitiveArrayEncoder) {
		encoder.AppendString(t.Local().Format(time.DateTime)) // time.DateTime = "2006-01-02 15:04:05"
	}
	return zapcore.NewJSONEncoder(encoderConfig)
}

func getWriterSyncer() zapcore.WriteSyncer {
	sep := string(filepath.Separator)
	rootDir, _ := os.Getwd()
	_, err := os.Stat("./log")
	if os.IsNotExist(err) {
		os.Mkdir("./log", os.ModePerm)
	}
	// logFile := fmt.Sprintf("./log/%s.log", time.Now().Format(time.DateOnly))
	logFile := rootDir + sep + "log" + sep + time.Now().Format(time.DateOnly) + ".log"
	log.Printf("logFile = %s\n", logFile)
	//! O_CREATE 如果文件不存在，则创建文件
	//! O_RDONLY 只读
	//! O_WRONLY 只写
	//! O_RDWR   读写
	//! O_APPEND 追加
	//! O_TRUNC  重写
	fp, _ := os.OpenFile(logFile, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0755)
	return zapcore.AddSync(fp /* fp 实现了 io.Writer 接口 */)
}
