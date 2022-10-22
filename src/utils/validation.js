export const messagesMap = new Map()
    .set('required', () => 'Не может быть пустым')
    .set('minLength', ({ $params }) => `Минимум ${$params.min} символов`)
    .set('maxLength', ({ $params }) => `Максимум ${$params.max} символов`)
    .set('minValue', ({ $params }) => `Значение не может быть меньше ${$params.min}`)
