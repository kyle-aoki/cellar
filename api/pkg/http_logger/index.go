package http_logger

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

func Log(ctx *fiber.Ctx) error {
	log.Print(fmt.Sprintf("%s %s", ctx.Method(), ctx.OriginalURL()))
	return ctx.Next()
}
