import * as urlService from "../../services/urlService.js";

const showMain = ({ render }) => {
  render("main.eta");
};

function makeid(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const saveUrls = async ({ render, request }) => {
  const body = request.body();
  const params = await body.value;
  const url = params.get("url");
  const string = makeid(6);
  await urlService.addUrl(url, string);
  console.log(string)
  render("main.eta", { url: url, shortened: string });
};

const redirect = async ({ request, params, response }) => {
  const shortened = params.shortened;
  const url = await urlService.findUrl(shortened);
  console.log("tämä on url " + url);
  console.log("tämä on string" + shortened);
  return response.redirect(url);
};

export { redirect, saveUrls, showMain };
