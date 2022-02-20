package secret

import (
	"github.com/gofiber/fiber/v2"
)

func Create(ctx *fiber.Ctx) error {
	return ctx.SendString("created")
}
