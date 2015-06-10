import http from "http";
import https from "https";
import {request} from "./router";
import contentType from "content-type";
import isJSON from "is-json";

export default class Server
{
	constructor(options)
	{
		let handler = function(req, res)
		{
			let ctx = Object.assign({}, req, res);
			ctx.req = req;
			ctx.res = res;
			request(ctx);
			ctx.status = ctx.status || 200;

			let body = ctx.status === 200 ? ctx.body : http.STATUS_CODES[ctx.status];
			let isObj = Object.prototype.toString.call(body) === "[object Object]";
			let type = "text/plain";
			// if body isn't set, return status
			if (body === null || body === undefined) body = http.STATUS_CODES[ctx.status];
			// if body is json, set type
			if (isJSON(body, isObj))
				type = "application/json";
				if (isObj) body = JSON.stringify(body);

			res.writeHead(ctx.status, {
				"Content-Type": contentType.format({
					type: type,
					parameters: {charset: "utf-8"}
				})
			});
			res.end(body);
		};
		let opts = options || {};
		let useHttps = opts.key && opts.cert;
		if (useHttps)
		{
			this.server = https.createServer(opts, handler);
			return;
		}

		this.server = http.createServer(handler);
	}

	listen(port, cb)
	{
		this.server.listen(port);
		if (cb) cb();
	}
}
