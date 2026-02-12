import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSONResponse} from "./util/sendJSONResponse.js";
import { getDataByPathParams } from "./util/getDataByPathParams.js";
import { getDataByQueryParams } from "./util/getDataByQueryParams.js";

const PORT = 8000;
const server = http.createServer(async (req, res) => {
  const destination = await getDataFromDB();

  const urlObject =new URL(req.url,`http://${req.headers.host}`)
  const queryObject = Object.fromEntries(urlObject.searchParams)
  
  if (urlObject.pathname === "/api" && req.method === "GET") {
    const filterData =getDataByQueryParams(destination,queryObject)
    console.log(queryObject)
    sendJSONResponse(res,200,filterData)
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    const continent = req.url.split("/").pop();
    const filterData = getDataByPathParams(destination,'continent',continent)

   sendJSONResponse(res,200,filterData)
  } else if (req.url.startsWith("/api/country") && req.method === "GET") {
    const country = req.url.split("/").pop();
    const filterData = getDataByPathParams(destination,'country',country)

   sendJSONResponse(res,200,filterData)
  }else {
    const data ={
        error: "not found",
        message: "The request route does not exist",
      }
    sendJSONResponse(res,404,data)
  }
});

server.listen(PORT, () => console.log(`server running on ${PORT}`));
