import { postPredictionHandler, getHistories } from "./handler.js";

const routes = [
	{
		path: "/predict",
		method: "POST",
		handler: postPredictionHandler,
		options: {
			payload: {
				allow: "multipart/form-data",
				multipart: true,
			},
		},
	},
	{
		path: "/predict/histories",
		method: "GET",
		handler: getHistories,
	},
];

export default routes;