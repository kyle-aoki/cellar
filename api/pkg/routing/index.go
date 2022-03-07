package routing

import (
	"api/pkg/controller"
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

	ObjectRouter(baseRouter)
}

func ObjectRouter(baseRouter fiber.Router) {
	objectRouter := baseRouter.Group("/object")
	oc := controller.ObjectController{}
	objectRouter.Post("/new", oc.New)
	objectRouter.Post("/find-path", oc.FindPath)
}
