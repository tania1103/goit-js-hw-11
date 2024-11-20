import Notiflix from 'notiflix';

export const showSuccessNotification = (message) => Notiflix.Notify.success(message);
export const showErrorNotification = (message) => Notiflix.Notify.failure(message);
export const showEndOfResults = (message) => Notiflix.Notify.info(message);
