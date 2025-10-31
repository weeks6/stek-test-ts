import type { DirectoryEntry } from './model';

interface IDirectoryStore {
	list: {
		[key: string]: DirectoryEntry;
	};
	deleteEntry(key: string): void;
	addEntry(entry: DirectoryEntry): void;
	editEntry(key: string, entry: DirectoryEntry): void;
	filterEntriesByFullName(full_name: string): DirectoryEntry[];
}

export const directoryStore: IDirectoryStore = {
	list: {},
	deleteEntry(key: string): void {
		delete this.list[key];
	},
	addEntry(entry: DirectoryEntry): void {
		const newId = Object.keys(this.list).length;
		this.list[newId] = entry;
	},
	editEntry(key: string, entry: DirectoryEntry): void {
		this.list[key] = entry;
	},
	filterEntriesByFullName(full_name: string): DirectoryEntry[] {
		return Object.values(this.list).filter((entry) =>
			entry.full_name.includes(full_name)
		);
	},
};

export const seedEntries = (): void => {
	directoryStore.addEntry({
		name: 'ООО "Вектор"',
		full_name: 'Иванов Иван Иванович',
		phone_number: '7000123456',
		address: {
			city: 'Москва',
			street: 'Ленина',
			building: '1',
		},
	});

	directoryStore.addEntry({
		name: 'ИП Сидоров С.С.',
		full_name: 'Сидоров Сергей Сергеевич',
		phone_number: '7000567899',
		address: {
			city: 'Санкт-Петербург',
			street: 'Невский проспект',
			building: '2',
		},
	});
};
