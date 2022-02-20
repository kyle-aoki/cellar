package routing

import (
	"api/pkg/handler/secret"
	"api/pkg/http_logger"

	"github.com/gofiber/fiber/v2"
)

func Init(app *fiber.App) {
	baseRouter := app.Group("", http_logger.Log)
	_ = InitSecretRouter(baseRouter)
}

func InitSecretRouter(baseRouter fiber.Router) fiber.Router {
	secretRouter := baseRouter.Group("/secret")
	secretRouter.Post("/create", secret.Create)
	return secretRouter
}
