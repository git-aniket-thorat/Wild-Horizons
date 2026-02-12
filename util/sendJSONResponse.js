export function sendJSONResponse(res,code, data) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Method','GET')
  res.statusCode = code;
  res.end(JSON.stringify(data));
}
