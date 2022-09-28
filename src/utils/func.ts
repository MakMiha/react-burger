export const _checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Ошибка ${res.status}`);
};

export const getCreatedDate = (createdDate: string) => {
  const createdAt = new Date(createdDate);
  const today = new Date();
  const hours = createdAt.getHours();
  const minutes = createdAt.getMinutes();
  const dayDiff = today.getDate() - createdAt.getDate();
  const day = dayDiff === 0 ? 'Сегодня' 
    : dayDiff === 1 ? 'Вчера' 
    : `${dayDiff}  дня назад`
  return `${day}, ${hours}:${minutes} i-GMT+3`;
}