import { GraphModel, node } from "@tensorflow/tfjs-node";

/**
 * 
 * @param {GraphModel} model 
 * @param {*} image 
 * @returns 
 */
async function predictionClassification(model, image) {
	try {
		const tensor = node
			.decodeJpeg(image)
			.resizeNearestNeighbor([224, 224])
			.expandDims()
			.toFloat();

		const prediction = model.predict(tensor);
		const score = await prediction.data();
		const confidenceScore = Math.max(...score) * 100;

		

		if (confidenceScore > 50) {
            return {
                class: "Cancer",
                suggestion: "Segera periksa ke dokter!"
            }
		} else {
            return {
                class: "Non-cancer",
                suggestion: "Penyakit kanker tidak terdeteksi."
            }
		}
	} catch (error) {
		throw new Error("Terjadi kesalahan dalam melakukan prediksi");
	}
}

export default predictionClassification;