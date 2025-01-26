package service

import (
	"bronya.com/go-proj/src/dao"
	"bronya.com/go-proj/src/data"
	"bronya.com/go-proj/src/dto"
	"bronya.com/go-proj/src/global"
	"bronya.com/go-proj/src/util"
	"context"
	"encoding/json"
	"errors"
	"github.com/spf13/viper"
	"strconv"
	"time"
)

type UserService struct {
	UserDao *dao.UserDao
}

// ! UserService 单例
var userService *UserService

func NewUserService() *UserService {
	if userService == nil {
		userService = &UserService{
			UserDao: dao.NewUserDao(), //! 组合 UserDao
		}
	}
	return userService
}

func (userService *UserService) Login(loginDto *dto.LoginDto) (data.User, string, error) {
	var err error
	user, err := userService.UserDao.SelectUserByUsername(loginDto.Username)
	// 登录失败
	if err != nil {
		return user, "", err
	}
	// 登录失败
	if !util.IsEquivalent(user.Password /* hashStr */, loginDto.Password /* password */) {
		err = errors.New("password error")
		return user, "", err
	}
	token, err := util.GenToken(user.ID, user.Username)
	// 登录失败
	if err != nil {
		return user, token, err
	}
	// 登录成功
	expire := viper.GetDuration("redis.expire") * time.Second

	//! 使用 redis 缓存 token
	tokenKey := "token" + strconv.Itoa(int(user.ID))
	err = global.RedisCli.Set(context.Background(), tokenKey, token, expire).Err()
	if err != nil {
		return user, token, err
	}
	//! 使用 redis 缓存 LoginInfo
	userId := "user" + strconv.Itoa(int(user.ID))
	loginInfo, _ := json.Marshal(map[string]any{
		"id":       user.ID,
		"username": user.Username,
	})
	err = global.RedisCli.Set(context.Background(), userId, loginInfo, expire).Err()
	return user, token, err
}

func (userService *UserService) InsertUser(userInsertDto *dto.UserInsertDto) error {
	if _, err := userService.UserDao.SelectUserByUsername(userInsertDto.Username); err == nil {
		return errors.New("username exists")
	}
	return userService.UserDao.InsertUser(userInsertDto)
}

func (userService *UserService) SelectUserById(idDto *dto.IdDto) (data.User, error) {
	return userService.UserDao.SelectUserById(idDto.Id)
}

func (userService *UserService) SelectPaginatedUsers(paginateDto *dto.PaginateDto) ([]data.User, int64, error) {
	return userService.UserDao.SelectPaginatedUsers(paginateDto)
}

func (userService *UserService) UpdateUser(userUpdateDto *dto.UserUpdateDto) error {
	if userUpdateDto.Id <= 0 {
		return errors.New("id invalid")
	}
	return userService.UserDao.UpdateUser(userUpdateDto)
}

func (userService *UserService) DeleteUserById(idDto *dto.IdDto) (data.User, error) {
	return userService.UserDao.DeleteUserById(idDto.Id)
}
