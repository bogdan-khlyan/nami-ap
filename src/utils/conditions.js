export const conditionsMap = new Map()
  .set('NEW', 'Новый')
  .set('IN_PROGRESS', 'В обработке')
  .set('IN_THE_WAY', 'Доставляется')
  .set('IS_DELIVERED', 'Доставлен')
  .set('DONE', 'Завершен')
  .set('REJECT', 'Отменен')

export const conditionsArray = Array
    .from(conditionsMap)
    .map(item => ({
        value: item[0],
        name: item[1]
    }))