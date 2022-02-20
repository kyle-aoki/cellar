package routing

import "github.com/gofiber/fiber/v2"

func SetResponseHeaders(ctx *fiber.Ctx) error {
	ctx.Response().Header.Add("Content-Type", "application/json")
	return ctx.Next()
}
