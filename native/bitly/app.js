import { serve } from "https://deno.land/std@0.120.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as urlService from "./services/urlService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};
const redirect = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      Location: path,
    },
  })
}
function makeid(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const handleRequest = async (request) => {
  const url = new URL(request.url)
  const path = url.pathname
  const parts = path.split('/')
  if (url.pathname === '/' && request.method === 'GET') {
    return new Response(await renderFile('main.eta'), responseDetails)
  }
  else if (url.pathname === '/' && request.method === 'POST') {
    const form = await request.formData()
    const url = form.get('url')
    const string = makeid(6);
    await urlService.addUrl(url, string);
    const data = {
      url: url,
      shortened: string
    }
    console.log(string)
    return new Response(
      await renderFile('main.eta', data ),
      responseDetails
    )
  } else if (request.method === 'GET' && parts[1].length === 6) {
    const url = await urlService.findUrl(parts[1])

    return redirect(url)
  }
}
let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}
serve(handleRequest, { port: port });