import {Server, Route, Method} from "../../../src";

// the path for the route
@Route("/")
export default class GetRoute
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
let serv = new Server();
serv.listen(port, () => console.log(`Started on port ${port}.`));
