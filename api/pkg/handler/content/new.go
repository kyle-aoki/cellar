package content

import (
	"api/pkg/db"
	"api/pkg/handler"
	"api/pkg/service"
	"api/pkg/util"
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

func New(c *fiber.Ctx) error {
	content := service.ParseContent(c)
	content.Version = 1

	tx := db.BeginTransaction()

	rows := tx.NamedQuery(content.Exists(), content)

	if rows.Next() {
		tx.Rollback("")
		return c.SendString(handler.AlreadyExists())
	}

	res := tx.NamedExec(content.NewContentQ(), content)

	i64, err := res.RowsAffected()
	util.MustExec(err)

	if i64 == 1 {
		json, err := json.Marshal(content)
		util.MustExec(err)
		tx.Commit()
		return c.SendString(string(json))
	}

	tx.Rollback("Rows affected not 1.")
	return c.SendString(handler.SomethingWentWrong())
}
