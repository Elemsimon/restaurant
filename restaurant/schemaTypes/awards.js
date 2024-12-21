import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'awards',
  title: 'Awards',
  type: 'document',
  fields: [
    defineField({
      name: 'imgUrl',
      title: 'ImgUrl',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    }),
  ],
})
