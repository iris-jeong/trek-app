import { useEffect, useState } from "react";
import { addItinerary, deleteItinerary, fetchItineraries } from "../api";
import Checkbox from "../inputs/Checkbox.js";
import Loading from "../Loading";
import "../css/admin.css";
import { toast } from "react-toastify";
function Admin() {
	//1. Keep state
	const [itineraries, setItineraries] = useState([]); //Itineraries from DB
	const [isLoading, setIsLoading] = useState(true); //Loading state
	const [isSelectAll, setIsSelectAll] = useState(false); //If Select All checked
	const [selectedItems, setSelectedItems] = useState([]); //Items that are checked
	const [deleteState, setDeleteState] = useState();
	const [isDeleted, setIsDeleted] = useState(false);
	//2. Retrieve the itinerary information from the DB.
	useEffect(() => {
		fetchItineraries().then((data) => {
			// console.log(data);
			setItineraries(data);
			// setDeleteState(data);
			setIsLoading(false);
		});
	}, [isDeleted]);

	function handleChange(isChecked) {
		setIsSelectAll(isChecked);

		//If it's checked, select all checkboxes
		if (isChecked) {
			itineraries.forEach((item) => {
				// console.log(item.id);
				if (!selectedItems.includes(item.id)) {
					let updatedItems = selectedItems;
					updatedItems.push(item.id);
					setSelectedItems(updatedItems);
				}
			});
		} else {
			setSelectedItems([]);
		}
	}

	function handleListChange(isChecked, itinerary) {
		// console.log(itinerary);
		if (isChecked) {
			setSelectedItems(selectedItems.concat(itinerary.id));
		} else {
			setSelectedItems(
				selectedItems.filter((selectedItem) => {
					return selectedItem !== itinerary.id;
				})
			);
		}
		// console.log(selectedItems);
	}

	function handleDelete() {
		setIsDeleted(true);
		let index = 0;
		//Set 'deleteState' in case of undo.
		const deletedItems = itineraries.filter((itinerary) => {
			// console.log(index);
			return itinerary.id === selectedItems[index++];
		});
		// console.log("DELETED ITEMS:", deletedItems);
		// console.log(deletedItems.length);
		setDeleteState(deletedItems);

		// 1. Make the fetch call to update itineraries in DB.
		const bulkDeletePromises = [];
		selectedItems.forEach((itineraryId) => {
			const promise = deleteItinerary(itineraryId);
			bulkDeletePromises.push(promise);
		});
		Promise.all(bulkDeletePromises).then(
			() => {
				//2. Display toastify notification for success.
				toast.success("Successfully deleted.", {
					autoClose: 400,
				});
				setIsDeleted(false);
			},
			(error) => {
				toast.error("Error deleting.", {
					autoClose: 400,
				});
			}
		);
	}

	return (
		<div className="admin-page">
			<h1>Delete Itineraries</h1>
			<hr></hr>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<div className="selector">
						<Checkbox
							label="Select All / Deselect All"
							isIndeterminate={true}
							checked={isSelectAll}
							onChange={(isChecked) => {
								handleChange(isChecked);
							}}
						/>
					</div>

					<div className="checkbox-container">
						{itineraries.map((itinerary, i) => {
							return (
								<Checkbox
									key={i}
									label={itinerary.name}
									checked={selectedItems.includes(
										itinerary.id
									)}
									onChange={(isChecked) => {
										handleListChange(isChecked, itinerary);
									}}
								/>
							);
						})}
					</div>
				</>
			)}
			<div className="admin-delete-button-container">
				{selectedItems.length > 0 ? (
					<button
						type="button"
						className="admin-delete-button"
						onClick={() => {
							handleDelete();
						}}
					>
						Delete
					</button>
				) : (
					<button
						type="button"
						className="admin-delete-button-disabled"
						disabled
					>
						Delete
					</button>
				)}
			</div>
			{/* <div className="undo-button-container">
				{isDeleted ? (
					<button type="button" onClick={undoDelete}>
						Undo
					</button>
				) : (
					<button type="button" onClick={undoDelete} disabled>
						Undo
					</button>
				)}
			</div> */}
		</div>
	);
}

export default Admin;
