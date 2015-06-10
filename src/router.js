export let routes = {};

/**
* @private
* @param path a route path
* @param method an HTTP method
* @param handler a function that takes a context as the first argument
*/
export function register(path, method, handler)
{
	routes[path] = routes[path] || {};
	routes[path][method] = handler;
}

/**
* @private
* @param ctx the context
*/
export function request(ctx)
{
	if (!routes[ctx.url] || !routes[ctx.url][ctx.method])
	{
		ctx.status = 404;
		return;
	}

	let handler = routes[ctx.url][ctx.method];
	handler(ctx);
}
