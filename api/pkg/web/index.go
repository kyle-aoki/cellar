package web

import (
	"api/pkg/routing"
	"github.com/gofiber/fiber/v2"
)

func Init() {
	app := fiber.New()

	routing.Init(app)

	app.Listen(":3000")
}
