import {addMethod} from "./decorator-handler";

/**
* A decorator. Use on functions within a class decorated with {Route}.
*
* @param method an HTTP method
*/
export default function Method(method)
{
	return function(target, name, descriptor)
	{
		descriptor.value.method = method;
		addMethod(descriptor.value);
		return descriptor;
	};
}
