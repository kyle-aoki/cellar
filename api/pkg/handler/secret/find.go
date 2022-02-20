package secret

import (
	"api/pkg/db"
	"api/pkg/model"
	"api/pkg/service"
	"api/pkg/util"
	"encoding/json"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func Find(ctx *fiber.Ctx) error {
	object := service.ParseObject(ctx)

	fmt.Println(object)

	tx := db.BeginTransaction()

	rows := tx.NamedQuery(object.FindQ(), object)

	for rows.Next() {
		obj := model.Object{}
		err := rows.StructScan(&obj)
		util.MustExec(err)

		bytes, err := json.Marshal(obj)
		util.MustExec(err)

		return ctx.SendString(string(bytes))
	}

	tx.Commit()

	return ctx.SendString("not found")
}
