import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import request from "request-promise";
import * as roote from "../src";
import * as router from "../src/router";
import GetRoute from "./fixtures/get-route";

let port = process.env.PORT || 3215;
let server;
const should = chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe("Routes", function()
{
	it("should register route", function()
	{
		// we required GetRoute, so it should have GET /
		router.routes.should.have.property("/").with.property("GET");
	});


	it("should change context when handler is called", function()
	{
		let ctx = {};
		let orig = {};
		router.routes["/"]["GET"](ctx);
		ctx.should.be.an("object").and.not.equal(orig);
	});
});

describe("Server", function()
{
	afterEach(() => server ? server.server.close() : 0);

	it("should call callback when listen is called", function()
	{
		let cb = sinon.spy();
		server = new roote.Server();
		server.listen(port, cb);
		cb.should.have.been.calledOnce;
	});

	it("should respond to defined routes", function()
	{
		server = new roote.Server();
		server.listen(port);
		return request(`http://localhost:${port}/`).should.eventually.equal("Hello world!");
	});
});
