export default function addToDirectory(
	isFileSelected,
	parentFolderId,
	driveContext,
	newFilename
) {
	console.log(isFileSelected, parentFolderId, driveContext, newFilename);
	const { directoryState, setDirectoryState, updatedId, setUpdatedId } =
		driveContext;
	setDirectoryState((prev) => {
		const newObj = getUpdatedDirectory(
			prev,
			isFileSelected,
			parentFolderId,
			newFilename,
			updatedId,
			setUpdatedId
		);
		console.log("NEEDED", newObj);
		return { ...newObj };
	});
	return [type, parentFolderId];
}

function getUpdatedDirectory(
	directory,
	isFileSelected,
	parentFolderId,
	newFilename,
	updatedId,
	setUpdatedId
) {
	let dummydir = { ...directory };
	let newObject = {};
	if (isFileSelected) {
		newObject = { name: `${newFilename}`, path: "/" };
	} else {
		setUpdatedId(updatedId + 1);
		newObject = {
			name: `${newFilename}`,
			id: `${updatedId}`,
			children: {},
			path: "/",
		};
	}
	if (!parentFolderId) {
		if (isFileSelected)
			dummydir.children.files = [...dummydir.children.files, newObject];
		else
			dummydir.children.folders = [
				...dummydir.children.folders,
				newObject,
			];
	} else {
		const getUpdatedObject = (state, id) => {
			if (state.id === id) {
				console.log("1x");
				return {
					...state,
					children: getUpdatedChildren(
						state.children,
						isFileSelected,
						newObject
					),
				};
			} else if (
				state.children.folders &&
				state.children.folders.length > 0
			) {
				console.log("2x");
				for (let i = 0; i < state.children.folders.length; i++) {
					const obj2 = getUpdatedObject(
						state.children.folders[i],
						id
					);
					if (obj2) {
						return {
							...obj2,
							children: getUpdatedChildren(
								obj2.children,
								isFileSelected,
								newObject
							),
						};
						break;
					}
				}
				return null;
			} else {
				console.log("3x");
				return null;
			}
		};
		const obj = getUpdatedObject(dummydir, parentFolderId);
		console.log(obj);
		return obj;
	}
}

function getUpdatedChildren(children, isFileSelected, newObject) {
	if (isFileSelected) {
		return { ...children, files: [...children.files, newObject] };
	} else {
		return { ...children, folders: [...children.folders, newObject] };
	}
}
