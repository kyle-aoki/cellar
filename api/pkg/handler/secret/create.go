package secret

import (
	"api/pkg/db"
	"api/pkg/handler"
	"api/pkg/service"
	"api/pkg/util"
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

func Create(ctx *fiber.Ctx) error {
	object := service.ParseObject(ctx)

	tx := db.BeginTransaction()

	rows := tx.NamedQuery(object.FindQ(), object)

	if rows.Next() {
		return ctx.SendString(tx.Rollback(handler.AlreadyExists()))
	}

	rows.Close()

	_ = tx.NamedExec(object.InsertQ(), object)

	tx.Commit()

	data, err := json.Marshal(object)
	util.MustExec(err)

	return ctx.SendString(string(data))
}
