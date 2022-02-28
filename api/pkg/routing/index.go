package routing

import (
	"api/pkg/handler/content"
	"api/pkg/handler/secret"
	"api/pkg/http_logger"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func Init(app *fiber.App) {
	baseRouter := app.Group("")
	baseRouter.Use(SetResponseHeaders)
	baseRouter.Use(recover.New())
	baseRouter.Use(cors.New())
	baseRouter.Use(http_logger.Log)
	_ = InitSecretRouter(baseRouter)
	_ = ContentRouter(baseRouter)
}

func InitSecretRouter(baseRouter fiber.Router) fiber.Router {
	secretRouter := baseRouter.Group("/secret")
	secretRouter.Post("/create", secret.Create)
	secretRouter.Post("/find", secret.Find)
	secretRouter.Post("/search", secret.Search)
	return secretRouter
}

func ContentRouter(baseRouter fiber.Router) fiber.Router {
	contentRouter := baseRouter.Group("/content")
	contentRouter.Post("/new", content.New)
	return contentRouter
}
