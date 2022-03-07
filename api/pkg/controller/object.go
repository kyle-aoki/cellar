package controller

import (
	"api/pkg/model"
	"api/pkg/response"
	"api/pkg/service"
	"api/pkg/util"
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

type ObjectController struct{}

func ParseReqBody[T any](ctx *fiber.Ctx) *T {
	t := new(T)
	err := json.Unmarshal(ctx.Body(), t)
	util.MustExec(err)
	return t
}

func (oc ObjectController) New(ctx *fiber.Ctx) error {
	defer response.HandleError()
	object := ParseReqBody[model.Object](ctx)
	object = service.New(object)
	return ctx.Send(response.Ok("", object))
}

func (oc ObjectController) FindPath(ctx *fiber.Ctx) error {
	defer response.HandleError()
	object := ParseReqBody[model.Object](ctx)
	objects := service.FindPath(object)
	return ctx.Send(response.Ok("", objects))
}
