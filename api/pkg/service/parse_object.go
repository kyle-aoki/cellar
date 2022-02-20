package service

import (
	"api/pkg/model"
	"api/pkg/util"
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

func ParseObject(ctx *fiber.Ctx) *model.Object {
	object := model.Object{}
	err := json.Unmarshal(ctx.Body(), &object)
	util.MustExec(err)
	return &object
}
