package service

import (
	"api/pkg/db"
	"api/pkg/model"
	"api/pkg/response"
)

func New(object *model.Object) *model.Object {
	tx := db.BeginTransaction()
	rows := tx.NamedQuery(object.Exists())
	objects := db.Rows[model.Object](rows)
	if len(objects) != 0 {
		tx.Rollback()
		response.Error(400, "Object already exists.")
	}
	ra := tx.NamedExec(object.New())
	if ra != 1 {
		tx.Rollback()
		response.Error(500, "Something went wrong.")
	}
	tx.Commit()
	return object
}

func FindPath(object *model.Object) []*model.Object {
	tx := db.BeginTransaction()
	rows := tx.NamedQuery(object.FindPath())
	objects := db.Rows[model.Object](rows)
	return objects
}
