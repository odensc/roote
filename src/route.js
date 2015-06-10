import {addRoute} from "./decorator-handler";

/**
* A decorator. Use on a class with functions decorated with {Method}.
*
* @param path the route path
*/
export default function Route(path)
{
	return function(target)
	{
		addRoute(target, path);
	};
}
