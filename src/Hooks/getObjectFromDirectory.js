export default function getFolderData(state, id, folder) {
	console.log("inside", state, id, folder);
	if (id === null) return state;
	else {
		const findObjById = (state, id) => {
			if (state.id === id) {
				console.log("1x");
				return state;
			} else if (
				state.children.folders &&
				state.children.folders.length > 0
			) {
				console.log("2x");
				for (let i = 0; i < state.children.folders.length; i++) {
					const obj2 = findObjById(state.children.folders[i], id);
					if (obj2) {
						return obj2;
						break;
					}
				}
				return null;
			} else {
				console.log("3x");
				return null;
			}
		};

		const obj = findObjById(state, id);
		console.log(obj);
		return obj;
	}
}
