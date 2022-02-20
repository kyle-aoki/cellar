package model

type Object struct {
	Name    string `json:"name" db:"name"`
	Path    string `json:"path" db:"path"`
	File    bool   `json:"file" db:"file"`
	Content string `json:"content" db:"content"`
}

func (object Object) InsertQ() string {
	return `INSERT INTO cellar.object (name, path, file, content)
	VALUES (:name, :path, :file, :content);`
}

func (object Object) FindQ() string {
	return `SELECT * FROM cellar.object
	WHERE name = :name
	AND path = :path`
}

func (object Object) SearchQ() string {
	return `SELECT name, path, file FROM cellar.object
	WHERE path = :path`
}

func (object Object) UpdateQ() string {
	return `UPDATE cellar.object
	SET content = :content
	WHERE name = :name
	AND path = :path`
}
