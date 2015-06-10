import {readFileSync} from "fs";
import {Server, Route, Method} from "../../../src";

// the path for the route
@Route("/")
class GetRoute
{
	// the HTTP method, e.g GET, POST, PUT, etc.
	@Method("GET")
	// method name can be anything
	get(ctx)
	{
		ctx.body = "Hello world!";
		// you can send json in the form of an object or a string:
		// ctx.body = {test: 123};
		// ctx.body = `{"test": 123}`;
	}
}

// create and start the server on port 3000
let port = process.env.PORT || 3000;
// using https is simple, just provide your cert and key in an object as the
// first argument when you create a Server
let serv = new Server({
	key: readFileSync("fixtures/key.pem"),
	cert: readFileSync("fixtures/cert.pem")
});
serv.listen(port, () => console.log(`Started on port ${port}.`));
