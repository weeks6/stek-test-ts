export interface EntryAddress {
	city: string;
	street: string;
	building: string;
}

export interface DirectoryEntry {
	name: string;
	full_name: string;
	phone_number: string;
	address: EntryAddress;
}
