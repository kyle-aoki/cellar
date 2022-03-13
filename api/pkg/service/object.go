package service

import (
	"api/pkg/db"
	"api/pkg/model"
	"errors"
)

type ObjectService struct{}

func (os ObjectService) New() (*model.Object, error) {
	tx := db.BeginTransaction()

	newObject := model.NewObject()

	rows := tx.NamedQuery(newObject.Exists())

	_, empty := db.Row(model.NewObject(), rows)

	if !empty {
		tx.Rollback()
		return nil, errors.New("Already exists.")
	}

	ra := tx.NamedExec(newObject.New())

	if ra != 1 {
		tx.Rollback()
		return nil, errors.New("Failed to insert.")
	}

	tx.Commit()
	return newObject, nil
}
