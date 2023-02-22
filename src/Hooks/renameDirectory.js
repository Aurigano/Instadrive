export default function renameDirectory(
	parentFolderId,
	state,
	itemName,
	isFileSelected,
	newName,
	driveContext
) {
	console.log(
		"renameDir",
		parentFolderId,
		state,
		itemName,
		isFileSelected,
		newName
	);
	const modState = findParentNode(
		parentFolderId,
		state,
		itemName,
		isFileSelected,
		newName
	);
	console.log("debug", modState);

	const { setDirectoryState } = driveContext;
	setDirectoryState(modState);

	localStorage.setItem("Drive", JSON.stringify(modState));
}

function findParentNode(
	parentFolderId,
	state,
	itemName,
	isFileSelected,
	newName
) {
	// pre area
	console.log("pre", state.id, parentFolderId, state.id === parentFolderId);
	if (state.id === parentFolderId) {
		console.log("1", state);
		const modState = renameNode(state, itemName, isFileSelected, newName);
		return modState;
	}
	if (state.children.folders) {
		const modFolders = state.children?.folders;
		for (let i = 0; i < modFolders.length; i++) {
			console.log("edgepre", state.id);
			const modParent = findParentNode(
				parentFolderId,
				modFolders[i],
				itemName,
				isFileSelected,
				newName
			);
			console.log("modParent", modParent, state);
			//   console.log(
			//     "replacedArray",
			//     replaceWithModifiedObject(state.children.folders, modParent)
			//   );
			if (modParent) {
				const modState = {
					...state,
					children: {
						...state.children,
						folders: replaceWithModifiedObject(
							state.children.folders,
							modParent
						),
					},
				};
				console.log("modState", modState);
				return modState;
			}

			console.log("edgepost", state.id);
			// return 'abc';
		}
	}

	console.log("post", state.id);
}

function renameNode(state, itemName, isFileSelected, newName) {
	console.log("RENAMENODE", state, itemName, isFileSelected, newName);
	let victimArray = [];
	let modState = {};
	if (isFileSelected) victimArray = [...state.children.files];
	else victimArray = [...state.children?.folders];
	console.log("victim", victimArray);
	const modifiedArray = renameObject(victimArray, itemName, newName);
	console.log("modArray", modifiedArray);
	// try string literal and ternary once
	if (isFileSelected)
		modState = {
			...state,
			children: { ...state.children, files: modifiedArray },
		};
	else
		modState = {
			...state,
			children: { ...state.children, folders: modifiedArray },
		};
	return state;
}

function renameObject(arr, itemName, newName) {
	const arrCopy = [...arr];
	const indexOfObject = arrCopy.findIndex(
		(object) => object.name === itemName
	);
	arrCopy[indexOfObject].name = newName;
	return arrCopy;
}

function replaceWithModifiedObject(folders, modObject) {
	const foldersCopy = [...folders];
	//   console.log("rep", modObject, folders);
	if (modObject) {
		const indexOfObject = foldersCopy.findIndex(
			(object) => object.name === modObject?.name
		);
		//   inserting object at the index and removing old one at the same time
		foldersCopy.splice(indexOfObject, 1, modObject);
	}

	return foldersCopy;
}

// -----------------------------------------------------------------------------------------------

function deleteNode(state, itemName, isFileSelected) {
	console.log("del", state);
	let victimArray = [];
	let modState = {};
	if (isFileSelected) victimArray = [...state.children.files];
	else victimArray = [...state.children?.folders];
	console.log("victim", victimArray);
	const modifiedArray = deleteObject(victimArray, itemName);
	console.log("modArray", modifiedArray);
	// try string literal and ternary once
	if (isFileSelected)
		modState = {
			...state,
			children: { ...state.children, files: modifiedArray },
		};
	else
		modState = {
			...state,
			children: { ...state.children, folders: modifiedArray },
		};

	console.log("deleted File", modState);
	return modState;
}

function deleteObject(arr, itemName) {
	const arrCopy = [...arr];
	arrCopy.splice(
		arrCopy.findIndex((object) => object.name === itemName),
		1
	);
	return arrCopy;
}
