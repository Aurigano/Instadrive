export default function getFolderData(state, id, folder) {
	if (id === null) return state;
	else {
		const findObjById = (state, id) => {
			if (state.id === id) {
				return state;
			} else if (
				state.children.folders &&
				state.children.folders.length > 0
			) {
				for (let i = 0; i < state.children.folders.length; i++) {
					const obj2 = findObjById(state.children.folders[i], id);
					if (obj2) {
						return obj2;
						break;
					}
				}
				return null;
			} else {
				return null;
			}
		};

		const obj = findObjById(state, id);
		return obj;
	}
}
