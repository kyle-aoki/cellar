package web

import (
	"api/pkg/routing"
	"log"

	"github.com/gofiber/fiber/v2"
)

func Init() {
	app := fiber.New()

	routing.Init(app)

	err := app.Listen(":8080")
	log.Print(err)
}
