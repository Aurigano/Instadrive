export default function addDirectory(
	parentFolderId,
	state,
	itemName,
	isFileSelected,
	driveContext
) {
	console.log(parentFolderId, state, itemName, isFileSelected, driveContext);
	const modState = findParentNode(
		parentFolderId,
		state,
		itemName,
		isFileSelected,
		driveContext
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
	driveContext
) {
	// pre area
	console.log("pre", state.id, parentFolderId, state.id === parentFolderId);
	if (state.id === parentFolderId) {
		console.log("1", state);
		const modState = addNode(state, itemName, isFileSelected, driveContext);
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
				driveContext
			);
			console.log("modParent", modParent, state);
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
		}
	}

	console.log("post", state.id);
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

function addNode(state, newFilename, isFileSelected, driveContext) {
	const ObjectToBeAdded = generateObject(
		isFileSelected,
		driveContext.updatedId,
		driveContext.setUpdatedId,
		newFilename
	);

	let modState = {};

	if (isFileSelected) {
		if (!state.children.files) {
			console.log("created a file array");
			state.children = { ...state.children, files: [] };
		}
		modState = {
			...state,
			children: {
				...state.children,
				files: [...state.children.files, ObjectToBeAdded],
			},
		};
	} else {
		if (!state.children.folders) {
			console.log("created a folder");
			state.children = { ...state.children, folders: [] };
		}
		modState = {
			...state,
			children: {
				...state.children,
				folders: [...state.children.folders, ObjectToBeAdded],
			},
		};
	}

	return modState;
}

function generateObject(isFileSelected, updatedId, setUpdatedId, newFilename) {
	let newObject = {};
	if (isFileSelected) {
		newObject = { name: `${newFilename}`, path: "/" };
	} else {
		newObject = {
			name: `${newFilename}`,
			id: `${updatedId}`,
			children: {},
			path: "/",
		};
		setUpdatedId((prev) => prev + 1);
		localStorage.setItem("id", updatedId + 1);
	}
	return newObject;
}
