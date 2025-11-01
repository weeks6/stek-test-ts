import type { DirectoryEntry, EntryAddress, SortableColumns } from './model';

import seedArray from './seed.json';

interface IDirectoryStore {
	list: DirectoryEntry[];
	sortBy?: SortableColumns;
	sortDirection?: 'asc' | 'desc';
	searchQuery?: string;
	totalPages: number;
	perPage: number;
	page: number;
	formatAddress(address: EntryAddress): string;
	addEntry(entry: Omit<DirectoryEntry, 'id'>): void;
	editEntry(id: number, entry: Omit<DirectoryEntry, 'id'>): void;
	deleteEntry(key: number): void;
	filterEntriesByFullName(entries: DirectoryEntry[]): DirectoryEntry[];
	sort(entries: DirectoryEntry[]): DirectoryEntry[];
	paginate(entries: DirectoryEntry[]): DirectoryEntry[];
}

export const directoryStore: IDirectoryStore = {
	list: [],
	page: 1,
	perPage: 20,
	totalPages: 0,
	formatAddress(address: EntryAddress): string {
		return `${address.city}, ${address.street}, ${address.building}`;
	},
	deleteEntry(id: number): void {
		this.list = this.list.filter((entry) => entry.id !== id);
	},
	addEntry(entry: Omit<DirectoryEntry, 'id'>): void {
		const newId = Math.max(...this.list.map((e) => e.id), 0) + 1;

		this.list.push({ ...entry, id: newId });
	},
	editEntry(id: number, entry: Omit<DirectoryEntry, 'id'>): void {
		this.list = this.list.map((e) => (e.id === id ? { ...entry, id } : e));
	},
	filterEntriesByFullName(entries: DirectoryEntry[]): DirectoryEntry[] {
		if (!this.searchQuery) return entries;

		const query = this.searchQuery?.trim().toLocaleLowerCase() ?? '';

		return entries.filter((entry) =>
			entry.full_name.toLocaleLowerCase().includes(query)
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

	paginate(entries: DirectoryEntry[]): DirectoryEntry[] {
		return entries.slice(
			(this.page - 1) * this.perPage,
			this.page * this.perPage
		);
	},
};

export const seedEntries = (): void => {
	if (!Array.isArray(seedArray)) {
		return;
	}

	(seedArray as []).forEach((entry) => directoryStore.addEntry(entry));
};
