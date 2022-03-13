package controller

import (
	"api/pkg/response"
	"api/pkg/service"
	"api/pkg/util"
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

var objectService = service.ObjectService{}

type ObjectController struct{}

func ParseReqBody[T any](ctx *fiber.Ctx) *T {
	t := new(T)
	err := json.Unmarshal(ctx.Body(), t)
	util.MustExec(err)
	return t
}

func (oc ObjectController) New(ctx *fiber.Ctx) error {
	defer response.HandleError()
	object, err := objectService.New()
	if err != nil {
		return ctx.Status(400).Send(util.ErrorJson(err))
	}
	return ctx.Send(util.JSON(object))
}
