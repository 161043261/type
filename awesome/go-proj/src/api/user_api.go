package api

import (
	"bronya.com/go-proj/src/dto"
	"bronya.com/go-proj/src/global"
	"bronya.com/go-proj/src/service"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"path/filepath"
)

type UserApi struct {
	UserService *service.UserService //! 组合 UserService
}

// ! UserApi 单例
var userApi *UserApi

func NewUserApi() *UserApi {
	if userApi == nil {
		userApi = &UserApi{
			UserService: service.NewUserService(),
		}
	}
	return userApi
}

// Login api 的 swagger 注释
// @Tag         用户 api
// @Summary     用户登录, 简略
// @Description 用户登录, 详细
// @Accept      json
// @Produce     json
// @Param       username   formData   string   true   "用户名"
// @Param       password   formData   string   true   "密码"
// @Success     200   {string}   string   "登录成功"
// @Failure     401   {string}   string   "登录失败"
// @Router      /api/v1/public/user/login [post]
func (userApi UserApi) Login(ctx *gin.Context) { //! 不使用指针接收
	//// ctx.AbortWithStatusJSON(http.StatusOK /* 200 */, gin.H{
	////     "msg": "Login ok",
	//// } /* gin.H 是 map[string]any 的别名 */)

	var loginDto dto.LoginDto
	//* ctx.ShouldBind 检查请求方式 GET, POST, ... 和 Content-Type 以自动解析并绑定
	//* 例如 "application/json" -> json 绑定, "application/xml" -> xml 绑定
	//* ctx.ShouldBind 与 ctx.Bind 相似, 不同的是
	//* 绑定失败时, ctx.ShouldBind 不会将响应状态码设置为 404 或终止
	validationErrs := ctx.ShouldBind(&loginDto) //! 自动解析并绑定
	if validationErrs != nil {
		global.Logger.Errorln(validationErrs.Error())
		Err(ctx, Resp{Msg: validationErrs.Error()})
		return
	}
	user, token, err := userApi.UserService.Login(&loginDto)
	if err != nil {
		Err(ctx, Resp{Msg: err.Error()})
		return
	}
	Ok(ctx, Resp{
		Data: gin.H{
			"token": token, //! 响应 token
			"user":  user,
		},
		Msg: "User Login OK",
	})
}

func (userApi UserApi) InsertUser(ctx *gin.Context) {
	var userInsertDto dto.UserInsertDto
	//* ctx.ShouldBind(any)
	validationErrs := ctx.ShouldBind(&userInsertDto)
	if validationErrs != nil {
		global.Logger.Errorln(validationErrs.Error())
		Err(ctx, Resp{Msg: validationErrs.Error()})
		return
	}
	if userInsertDto.Avatar != "" {
		//! 文件上传
		avatar, err := ctx.FormFile("avatar")
		if err != nil {
			Err(ctx, Resp{Msg: err.Error()})
			return
		}
		dstFilename, err := uuid.NewUUID()
		if err != nil {
			Err(ctx, Resp{Msg: err.Error()})
			return
		}
		dstFilePath := fmt.Sprintf("./upload/%s", dstFilename.String()+filepath.Ext(avatar.Filename))
		err = ctx.SaveUploadedFile(avatar, dstFilePath)
		if err != nil {
			Err(ctx, Resp{Msg: err.Error()})
			return
		}
	}
	err := userApi.UserService.InsertUser(&userInsertDto)
	if err != nil {
		Err(ctx, Resp{Msg: err.Error()})
		return
	}
	Ok(ctx, Resp{
		Data: userInsertDto,
		Msg:  "Insert User OK",
	})
}

func (userApi UserApi) SelectUserById(ctx *gin.Context) {
	var idDto dto.IdDto
	//* ctx.ShouldBindUri(any)
	validationErrs := ctx.ShouldBindUri(&idDto)
	if validationErrs != nil {
		global.Logger.Errorln(validationErrs.Error())
		Err(ctx, Resp{Msg: validationErrs.Error()})
		return
	}
	user, err := userApi.UserService.SelectUserById(&idDto)
	if err != nil {
		Err(ctx, Resp{Msg: err.Error()})
		return
	}
	Ok(ctx, Resp{
		Data: user,
		Msg:  "Select User By Id OK",
	})
}

func (userApi UserApi) SelectPaginatedUsers(ctx *gin.Context) {
	var paginateDto dto.PaginateDto
	//* ctx.ShouldBind(any)
	validationErrs := ctx.ShouldBind(&paginateDto)
	if validationErrs != nil {
		global.Logger.Errorln(validationErrs.Error())
		Err(ctx, Resp{Msg: validationErrs.Error()})
		return
	}
	userArr, total, err := userApi.UserService.SelectPaginatedUsers(&paginateDto)
	if err != nil {
		Err(ctx, Resp{Msg: err.Error()})
		return
	}
	Ok(ctx, Resp{
		Data: gin.H{
			"users": userArr,
			"total": total,
		},
		Msg: "Select Paginated Users OK",
	})
}

func (userApi UserApi) UpdateUser(ctx *gin.Context) {
	var userUpdateDto dto.UserUpdateDto
	validationErrs := ctx.ShouldBindUri(&userUpdateDto)
	if validationErrs != nil {
		global.Logger.Errorln(validationErrs.Error())
		Err(ctx, Resp{Msg: validationErrs.Error()})
		return
	}
	validationErrs = ctx.ShouldBind(&userUpdateDto)
	if validationErrs != nil {
		global.Logger.Errorln(validationErrs.Error())
		Err(ctx, Resp{Msg: validationErrs.Error()})
		return
	}
	err := userApi.UserService.UpdateUser(&userUpdateDto)
	if err != nil {
		Err(ctx, Resp{Msg: err.Error()})
		return
	}
	Ok(ctx, Resp{
		Msg: "Update User OK",
	})
}

func (userApi UserApi) DeleteUserById(ctx *gin.Context) {
	var idDto dto.IdDto
	validationErrs := ctx.ShouldBindUri(&idDto)
	if validationErrs != nil {
		global.Logger.Errorln(validationErrs.Error())
		Err(ctx, Resp{Msg: validationErrs.Error()})
		return
	}
	user, err := userApi.UserService.DeleteUserById(&idDto)
	if err != nil {
		Err(ctx, Resp{Msg: err.Error()})
		return
	}
	Ok(ctx, Resp{
		Data: user,
		Msg:  "Delete User By Id OK",
	})
}
