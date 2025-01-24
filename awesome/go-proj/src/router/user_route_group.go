package router

import (
	"bronya.com/go-proj/src/api"
)

// UserRouteGroup 创建 user 子路由组
func UserRouteGroup() {
	userApi := api.NewUserApi()

	//* 创建 public 子路由组 publicUserRouteGroup
	publicUserRouteGroup := publicRouteGroup.Group("/user" /* 路由前缀 */)
	{ //? publicUserRouteGroup
		publicUserRouteGroup.POST("/login", userApi.Login /* 回调函数 */)
	}

	//* 创建 authorized 子路由组 authorizedUserRouteGroup
	authorizedUserRouteGroup := authorizedRouteGroup.Group("/user" /* 路由前缀 */)
	{ //? authorizedUserRouteGroup
		authorizedUserRouteGroup.GET("/:id", userApi.SelectUserById)
		authorizedUserRouteGroup.POST("", userApi.InsertUser)
		authorizedUserRouteGroup.POST("/page", userApi.SelectPaginatedUsers)
		authorizedUserRouteGroup.PUT("/:id", userApi.UpdateUser)
		authorizedUserRouteGroup.DELETE("/:id", userApi.DeleteUserById)
	}
}
