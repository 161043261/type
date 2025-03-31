package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"reflect"
)

type Resp struct {
	//! -           json 编解码时忽略该字段
	//! code        json 中的字段名为 code
	//! omitempty   如果该字段为空，则 json 编解码时忽略该字段
	Code int    `json:"-"`
	Msg  string `json:"msg,omitempty"`
	Data any    `json:"data,omitempty"`
}

func (resp Resp) IsEmpty() bool {
	return reflect.DeepEqual(resp, Resp{}) //? 通过反射，判断 resp 是否为空
}

func Ok(ctx *gin.Context, resp Resp) { //* 2xx 成功
	if resp.IsEmpty() {
		ctx.AbortWithStatus(http.StatusOK) // 200
		return
	}
	if resp.Code < 200 || resp.Code >= 300 {
		resp.Code = http.StatusOK // 200
	}
	ctx.AbortWithStatusJSON(resp.Code, resp)
}

func Err(ctx *gin.Context, resp Resp) { //* 4xx 客户端错误
	if resp.IsEmpty() {
		ctx.AbortWithStatus(http.StatusBadRequest) // 400
		return
	}
	if resp.Code < 400 || resp.Code >= 500 {
		resp.Code = http.StatusBadRequest // 400
	}
	ctx.AbortWithStatusJSON(resp.Code, resp)
}
