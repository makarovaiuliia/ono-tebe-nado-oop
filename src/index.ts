import './scss/styles.scss';

import { AuctionAPI } from './components/AuctionAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter, IEvents } from './components/base/events';
import { Catalog, CatalogView, ItemView } from './components/card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';

const events = new EventEmitter();
const api = new AuctionAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Все шаблоны

// Модель данных приложения

// Глобальные контейнеры

// Переиспользуемые части интерфейса

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Получаем лоты с сервера

const catalog = new Catalog({ items: [] }, events);
const catalogView = new CatalogView(ItemView);

events.on('lots:changed', () => {
	catalogView.render(catalog);
});

api
	.getLotList()
	.then((result) => {
		catalog.setItems(result);
	})
	.catch((err) => {
		console.error(err);
	});

// api.getLotUpdate('854cef69-976d-4c2a-a18c-2aa45046c390').then((result) => {
// 	console.log(result);
// });