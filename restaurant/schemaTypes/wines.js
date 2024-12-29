import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'wines',
  title: 'Wines',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
    }),
  ],
})
