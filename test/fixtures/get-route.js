import {Route, Method} from "../../src";

@Route("/")
export default class GetRoute
{
	@Method("GET")
	getStuff(ctx)
	{
		ctx.body = "Hello world!";
	}
}
