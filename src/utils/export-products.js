import ExportJsonExcel from 'js-export-excel'

export function exportProducts(products, categories) {

    const data = [{
        1: 'Категория',
        2: 'Название',
        3: 'Идентификатор',
        4: 'Описание',
        5: 'Цена',
        6: 'Фото',
        7: 'Популярный товар',
        8: 'В наличии',
        9: 'Количество',
        10: 'Единицы измерения'
    }]

    products.forEach(item => {
        const result = {}
        const category = categories.find(category => category.productIds.find(id => id === item._id))
        if (category) {
            result[1] = category.title
            result[3] = item._id
            result[4] = item.description
            if (item.type === 'SINGLE') {
                result[2] = item.title
                // result[5] = item.cost
                result[6] = process.env.VUE_APP_BACKEND_HOST + '/api/product/image/' + item.images[0].filename
                result[9] = item.weight
            } else {
                result[2] = item.title + '(' + item.variants
                        .map(variant => variant.title)
                        .join('/')
                    + ')'
                // result[5] = item.variants
                //     .map(variant => variant.cost)
                //     .join('/')
                result[6] = process.env.VUE_APP_BACKEND_HOST + '/api/product/variant/image/' + item.variants[0].image
                result[9] = Math.max(
                    ...item.variants
                        .map(variant => variant.weight)
                )
                    // .join('/')
            }
            result[5] = '-'
            result[7] = 'Нет'
            result[8] = 'Да'
            result[10] = 'грамм'
        }
        data.push(result)
    })


    const options = {
        fileName: 'products',
        datas: [
            {
                sheetData: data,
                columnWidths: [20, 20],
            }
        ]
    }
    const toExcel = new ExportJsonExcel(options)
    toExcel.saveExcel()
}