import predictionClassification from "../services/inferenceService.js";
import { randomUUID } from "crypto";
import { add, get } from '../services/storeData.js';

export async function postPredictionHandler(request, h) {
	const image = request.payload.image;
	const model = request.server.app.model;
	const result = await predictionClassification(model, image);
	const id = randomUUID();
	const createdAt = new Date().toISOString();
	const data = {
		id: id,
		result: result.class,
		suggestion: result.suggestion,
		createdAt: createdAt,
	};

	await add(id, data);

	const response = h.response({
		status: "success",
		message: "Model is predicted successfully",
		data: data,
	});
	response.code(201);
	return response;
}

export async function getHistories(request, h) {
	const data = await get().then(res => {
        return res;
    }).catch(err => {
        return null;
    });
    if (data){
        return h.response({
            status: "success",
            data: data,
        }).code(200);
    } else {
        return h.response({
            status: "fail",
        }).code(400);
    }
}