export default function getBreadcrumb(folderId, state) {
	if (state.id === folderId) {
		let breadcrumbArray = [];
		breadcrumbArray.push({ id: state.id, name: state.name });
		return breadcrumbArray;
	} else if (state.children.folders) {
		const modFolders = state.children.folders;
		for (let i = 0; i < modFolders.length; i++) {
			let breadcrumbArray = getBreadcrumb(folderId, modFolders[i]);
			if (breadcrumbArray.length > 0) {
				breadcrumbArray.push({ id: state.id, name: state.name });
				return breadcrumbArray;
			}
		}
	}
	return [];
}
