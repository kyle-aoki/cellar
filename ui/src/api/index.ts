import { Content } from "../model/content";
import FsObject from "../model/fsobject";
import fetchJSON from "../util/fetch-json";

export default class API {
  static host: string = "http://localhost:8080";
  static async create(fsobject: FsObject): Promise<FsObject> {
    return (await fetchJSON(`${API.host}/secret/create`, {
      method: "POST",
      body: JSON.stringify(fsobject),
    })) as FsObject;
  }
  static async find(fsobject: FsObject): Promise<Content> {
    const json = await fetchJSON(`${API.host}/content/find`, {
      method: "POST",
      body: JSON.stringify(fsobject),
    });
    return json as Content;
  }
  static async search(fsobject: FsObject): Promise<FsObject[]> {
    return (await fetchJSON(`${API.host}/secret/search`, {
      method: "POST",
      body: JSON.stringify(fsobject),
    })) as FsObject[];
  }
  static async update(fsobject: FsObject): Promise<FsObject> {
    return (await fetchJSON(`${API.host}/secret/update`, {
      method: "PUT",
      body: JSON.stringify(fsobject),
    })) as FsObject;
  }
}
