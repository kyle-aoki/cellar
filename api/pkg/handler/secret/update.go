package secret

import (
	"api/pkg/db"
	"api/pkg/service"
	"api/pkg/util"
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

func Update(c *fiber.Ctx) error {
	object := service.ParseObject(c)

	tx := db.BeginTransaction()

	rows := tx.NamedQuery(object.FindQ(), object)

	if !rows.Next() {
		tx.Commit()
		return c.SendString("not found")
	}

	rows.Close()

	_ = tx.NamedExec(object.UpdateQ(), object)

	// c.Response().Header.Add("Content-Type", "application/json")
	json, err := json.Marshal(object)
	util.MustExec(err)
	tx.Commit()
	return c.SendString(string(json))
}
