import { serve } from "https://deno.land/std/http/server.ts";

const port = 8000;

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  const path = "./" + pathname;

  console.log("Request received for", pathname);

  const filetype = pathname.split(".").pop();

  try {
    if (filetype === "/") {
      const file = await Deno.readFile("./index.html");
      return new Response(file, {
        headers: {
          "content-type": "text/html",
        },
      });
    } else if (filetype == "html") {
      const file = await Deno.readFile(path);
      return new Response(file, {
        headers: {
          "content-type": "text/html",
        },
      });
    } else if (filetype == "css") {
      const file = await Deno.readFile(path);
      return new Response(file, {
        headers: {
          "content-type": "text/css",
        },
      });
    } else if (filetype == "js") {
      const file = await Deno.readFile(path);
      return new Response(file, {
        headers: {
          "content-type": "text/javascript",
        },
      });
    } else if (filetype == "json") {
      const file = await Deno.readFile(path);
      return new Response(file, {
        headers: {
          "content-type": "application/json",
        },
      });
    } else if (filetype == "webp") {
      const file = await Deno.readFile(path);
      return new Response(file, {
        headers: {
          "content-type": "image/webp",
        },
      });
    } else if (filetype == "gif") {
      const file = await Deno.readFile(path);
      return new Response(file, {
        headers: {
          "content-type": "image/gif",
        },
      });
    } else if (filetype == "svg") {
      const file = await Deno.readFile(path);
      return new Response(file, {
        headers: {
          "content-type": "image/svg+xml",
        },
      });
    } else if (filetype == "ttf") {
      const file = await Deno.readFile(path);
      return new Response(file, {
        headers: {
          "content-type": "font/ttf",
        },
      });
    }else {
      return new Response("400 - bad filetype (" + pathname + ") requested", {
        status: 400,
      });
    }
  } catch (e) {
    console.log("Encountered a bad file request: " + e);
    return new Response("404 - file " + pathname + " not found", {
      status: 404,
    });
  }
}

await serve(handleRequest, { port });
