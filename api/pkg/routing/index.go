package routing

import (
	"api/pkg/handler/secret"
	"api/pkg/http_logger"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func Init(app *fiber.App) {
	baseRouter := app.Group("")
	baseRouter.Use(SetResponseHeaders)
	baseRouter.Use(recover.New())
	baseRouter.Use(http_logger.Log)
	_ = InitSecretRouter(baseRouter)
}

func InitSecretRouter(baseRouter fiber.Router) fiber.Router {
	secretRouter := baseRouter.Group("/secret")
	secretRouter.Post("/create", secret.Create)
	secretRouter.Get("/find", secret.Find)
	secretRouter.Get("/search", secret.Search)
	secretRouter.Put("/update", secret.Update)
	return secretRouter
}
