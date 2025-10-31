export interface EntryAddress {
	city: string;
	street: string;
	building: string;
}

export interface DirectoryEntry {
	id: number;
	name: string;
	full_name: string;
	phone_number: string;
	address: EntryAddress;
}

export type SortableColumns = 'name' | 'full_name' | 'phone_number' | 'address';
