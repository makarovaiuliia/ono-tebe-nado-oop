import { Model } from './base/Model';
import _ from 'lodash';
import { Component } from './base/Component';
import { cloneTemplate, ensureElement } from '../utils/utils';

const templateElement = ensureElement<HTMLTemplateElement>('#card');

interface IItem {
	id: string;
	title: string;
	about: string;
  image: string;
}

interface ICatalog {
	items: IItem[];
}

export class Catalog extends Model<ICatalog> {
	items: IItem[];

	setItems(items: IItem[]) {
		this.items = items.map((item) => {
			return _.pick(item, ['id', 'title', 'about', 'image']);
		});
		this.emitChanges('lots:changed');
	}
}

interface IItemConstructor {
	new (container: HTMLTemplateElement): Component<IItem>;
}

export class CatalogView extends Component<ICatalog> {
	constructor(protected Item: IItemConstructor) {
		super(ensureElement('.catalog__items'));
	}

	set items(items: IItem[]) {
		this.container.replaceChildren(
			...items.map((item) => {
        const itemView = new this.Item(templateElement);

				return itemView.render({
					title: item.title,
          image: item.image,
          about: item.about
				});
			})
		);
	}
}

export class ItemView extends Component<IItem> {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _about?: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(container: HTMLTemplateElement) {
		const templateContent = cloneTemplate(container);
		super(templateContent);

    this._title = templateContent.querySelector(`.card__title`);
		this._image = templateContent.querySelector(`.card__image`);
		this._button = templateContent.querySelector(`.card__action`);
    this._about = templateContent.querySelector(`.card__description`);

		this._button.addEventListener('click', this.onClick);
	}

	protected onClick = () => {
		console.log(`Clicked on`);
	};

	set id(value: string) {
		this.container.dataset.id = value;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set about(value: string) {
    this.setText(this._about, value);
	}
}
