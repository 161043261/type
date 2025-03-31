package dto

import "github.com/spf13/viper"

type IdDto struct {
	Id uint `json:"id" form:"id" uri:"id" binding:"required"`
}

type PaginateDto struct {
	//* offset = (curr - 1) * offset
	Curr  int `json:"curr,omitempty" form:"curr"`   //! 当前页号，从 1 开始，默认 1
	Limit int `json:"limit,omitempty" form:"limit"` //! 每页记录数，默认 10
}

func (paginateDto *PaginateDto) GetPage() int {
	if paginateDto.Curr <= 0 {
		paginateDto.Curr = viper.GetInt("db.paginate.curr")
	}
	return paginateDto.Curr
}

func (paginateDto *PaginateDto) GetLimit() int {
	if paginateDto.Limit <= 0 {
		paginateDto.Limit = viper.GetInt("db.paginate.limit")
	}
	return paginateDto.Limit
}
