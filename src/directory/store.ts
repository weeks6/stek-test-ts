import type { DirectoryEntry, EntryAddress, SortableColumns } from './model';

import seedArray from './seed.json';

interface IDirectoryStore {
	list: DirectoryEntry[];
	sortBy?: SortableColumns;
	sortDirection?: 'asc' | 'desc';
	searchQuery?: string;
	deleteEntry(key: number): void;
	addEntry(entry: Omit<DirectoryEntry, 'id'>): void;
	editEntry(id: number, entry: DirectoryEntry): void;
	filterEntriesByFullName(entries: DirectoryEntry[]): DirectoryEntry[];
	sort(entries: DirectoryEntry[]): DirectoryEntry[];
	formatAddress(address: EntryAddress): string;
}

export const directoryStore: IDirectoryStore = {
	list: [],
	formatAddress(address: EntryAddress): string {
		return `${address.city}, ${address.street}, ${address.building}`;
	},
	deleteEntry(id: number): void {
		this.list = this.list.filter((entry) => entry.id !== id);
	},
	addEntry(entry: Omit<DirectoryEntry, 'id'>): void {
		const newId = this.list.length;

		this.list.push({ ...entry, id: newId });
	},
	editEntry(id: number, entry: DirectoryEntry): void {
		this.list = this.list.map((e) => (e.id === id ? entry : e));
	},
	filterEntriesByFullName(entries: DirectoryEntry[]): DirectoryEntry[] {
		if (!this.searchQuery) return entries;

		return entries.filter((entry) =>
			entry.full_name.includes(this.searchQuery!)
		);
	},

	sort(entries: DirectoryEntry[]): DirectoryEntry[] {
		if (!this.sortBy) return entries;

		const getValue = (value: any) => {
			switch (this.sortBy) {
				case 'address':
					return this.formatAddress(value);
				default:
					return value;
			}
		};

		return entries.toSorted((a, b) => {
			const sortBy = this.sortBy!;

			if (this.sortDirection === 'desc') {
				return getValue(a[sortBy]) > getValue(b[sortBy]) ? -1 : 1;
			} else {
				return getValue(a[sortBy]) < getValue(b[sortBy]) ? -1 : 1;
			}
		});
	},
};

export const seedEntries = (): void => {
	if (!Array.isArray(seedArray)) {
		return;
	}

	(seedArray as []).forEach((entry) => directoryStore.addEntry(entry));
};
