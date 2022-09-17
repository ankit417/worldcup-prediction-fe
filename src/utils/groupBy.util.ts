const _menuItems = [
  {
    total_count: '4',
    menu_items: {
      id: 2,
      name: 'Burger',
      price: 150,
      menu_id: 1,
      menu_name: 'test',
      is_deleted: false,
      description: 'This is burger',
      menu_description: 'This is nepalese food.',
    },
  },
  {
    total_count: '4',
    menu_items: {
      id: 5,
      name: 'Sekuwa',
      price: 150,
      menu_id: 2,
      menu_name: 'Nepalese food',
      is_deleted: false,
      description: 'This is burger',
      menu_description: 'This is nepalese food.',
    },
  },
  {
    total_count: '4',
    menu_items: {
      id: 11,
      name: 'Curry',
      price: 150,
      menu_id: 4,
      menu_name: 'Nepalese food',
      is_deleted: false,
      description: 'This is burger',
      menu_description: 'This is nepalese food.',
    },
  },
]

export const getGroupedMenuItems = (menuItems: Array<any> = _menuItems) => {
  const remappedMenuItems = menuItems.map((menuItem: any) => {
    const { id, name, price, menu_name } = menuItem.menu_items
    return {
      quantity: 1,
      price,
      menuItemId: id,
      value: {
        id,
        value: name,
      },
      label: name,
      menu_name,
    }
  })
  const groupedByItems = groupByKey(remappedMenuItems, 'menu_name')
  const newArray = groupByKeyValue(groupedByItems)
  return newArray
}

export const groupByKey = (array: Array<any>, key: any) => {
  return array.reduce((result, obj) => {
    ;(result[obj[key]] = result[obj[key]] || []).push(obj)
    return result
  }, {})
}

export const groupByKeyValue = (array: any) => {
  return Object.keys(array).map((key: any) => ({
    label: key,
    options: array[key],
  }))
}
