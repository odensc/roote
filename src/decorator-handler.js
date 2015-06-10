import {register} from "./router";

let methods = [];

/**
* @private
* @param route a class with functions decorated with {Method}
* @param path the route path
*/
export function addRoute(route, path)
{
	let inst = new route;
	for (let method of methods)
	{
		// if this route owns the method
		if (method.constructor === route.constructor)
		{
			register(path, method.method, method);
		}
	}
}

/**
* @private
* @param method a function that takes a context as the first argument and has a
* `method` property set to an HTTP method
*/
export function addMethod(method)
{
	methods.push(method);
}
