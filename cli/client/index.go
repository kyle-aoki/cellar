package client

import (
	"bytes"
	"cli/util"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

var httpClient http.Client
var baseURL string

func init() {
	baseURL = "http://localhost:8080"
	httpClient = http.Client{}
}

func HTTP() *http.Client {
	return &httpClient
}

func Post(url string, someStruct any) string {
	json, err := json.Marshal(someStruct)
	util.MustExec(err)
	resp, err := httpClient.Post(baseURL+url, "application/json", bytes.NewBuffer(json))
	util.MustExec(err)

	if resp.StatusCode == 500 {
		fmt.Println(resp.Status)
		panic("Something went wrong.")
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	util.MustExec(err)

	return string(body)
}
