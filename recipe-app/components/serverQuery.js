import { db } from "../config";

const API_URL = "http://ec2274c9.ngrok.io/procReceipt";

const processImage = (data) => {
	// query Deep & Andy's api thing
	fetch(API_URL,
	{
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
			'X-Requested-With': 'XMLHttpRequest'
		},
		body: data
	}).then((response) => response.json())
	.then(ingredientList => {
		console.log(ingredientList);

		// add each ingredient to firebase
		ingredientList.forEach(ingredient => {
			const newItemRef = db.ref("/ingredients").push();

			newItemRef.set({
				name: ingredient
			}).then(response => {
			  //console.log(response);
			}).catch(error => {
				console.log(error);
			});
		});
	})
	.catch((error) => {
		console.log(error);
	});
}

module.exports = {processImage};