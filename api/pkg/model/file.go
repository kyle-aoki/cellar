package model

type SecretVersion struct {
	Id       int64  `json:"Id" db:"id"`
	ObjectId int64  `json:"ObjectId" db:"object_id"`
	Content  string `json:"Content" db:"content"`
	Version  int    `json:"Version" db:"version"`
	IsFinal  bool   `json:"IsFinal" db:"is_final"`
}
