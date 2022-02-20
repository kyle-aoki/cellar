package secret

import (
	"api/pkg/db"
	"api/pkg/model"
	"api/pkg/service"
	"api/pkg/util"
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

func Search(ctx *fiber.Ctx) error {
	object := service.ParseObject(ctx)

	tx := db.BeginTransaction()

	rows := tx.NamedQuery(object.SearchQ(), object)

	results := []model.Object{}

	for rows.Next() {
		obj := model.Object{}
		rows.StructScan(&obj)
		results = append(results, obj)
	}

	tx.Commit()

	data, err := json.Marshal(results)
	util.MustExec(err)

	// ctx.Response().Header.Add("Content-Type", "application/json")
	return ctx.Send(data)
}
