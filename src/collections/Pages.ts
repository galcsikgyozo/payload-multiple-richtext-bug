import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Page title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Page content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        lexical: {
          disableEvents: true,
          namespace: 'pageContent',
          theme: {
            blockCursor: 'hidden',
          },
        },
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [
              // RichText inside RichText cause the page to re-render and lose content after a while.
              /**
               * FAQ Section (Array)
               */
              {
                slug: 'faqArrayVersion',
                labels: {
                  singular: 'FAQ Section (Array)',
                  plural: 'FAQ Sections (Array)',
                },
                fields: [
                  {
                    name: 'faqArrayVersionTitle',
                    label: 'Title of my FAQ section',
                    type: 'text',
                  },
                  {
                    type: 'array',
                    name: 'faqItems',
                    labels: {
                      singular: 'Q&A item',
                      plural: 'Q&A items',
                    },
                    fields: [
                      {
                        name: 'faqItemQuestion',
                        label: 'Question',
                        type: 'text',
                      },
                      {
                        name: 'faqItemAnswer',
                        label: 'Answer',
                        type: 'richText',
                        editor: lexicalEditor({
                          lexical: {
                            disableEvents: true,
                            namespace: 'faqItemAnswerInArray',
                            theme: {
                              blockCursor: 'hidden',
                            },
                          },
                        }),
                      },
                      /**
                       * The problem still occurs even if the richText field is inside another field, like a group.
                       */
                      // {
                      //   name: 'faqItemAnswerInGroup',
                      //   label: 'Answer in Group',
                      //   type: 'group',
                      //   fields: [
                      //     {
                      //       name: 'content',
                      //       label: 'Content',
                      //       type: 'richText',
                      //     },
                      //   ],
                      // },
                    ],
                  },
                ],
              },
              // Same for our RichTexts being in blocks instead of an array.
              /**
               * FAQ Section (Block)
               */
              {
                slug: 'faqBlockVersion',
                labels: {
                  singular: 'FAQ Section (Block)',
                  plural: 'FAQ Sections (Block)',
                },
                fields: [
                  {
                    name: 'faqBlockVersionTitle',
                    label: 'Title of my FAQ section',
                    type: 'text',
                  },
                  {
                    type: 'blocks',
                    name: 'faqItems',
                    labels: {
                      singular: 'Q&A item',
                      plural: 'Q&A items',
                    },
                    blocks: [
                      {
                        slug: 'faqItemInBlocks',
                        labels: {
                          singular: 'Q&A item',
                          plural: 'Q&A items',
                        },
                        fields: [
                          {
                            name: 'faqItemQuestion',
                            label: 'Question',
                            type: 'text',
                          },
                          {
                            name: 'faqItemAnswer',
                            label: 'Answer',
                            type: 'richText',
                            editor: lexicalEditor({
                              lexical: {
                                disableEvents: true,
                                namespace: 'faqItemAnswerInBlocks',
                                theme: {
                                  blockCursor: 'hidden',
                                },
                              },
                            }),
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              // This alternative RichText inside RichText version works, but has a horrible editing experience, since it was not meant to be used like this.
              /**
               * FAQ Section (RichText in RichText)
               */
              {
                slug: 'faqAlternativeVersion',
                labels: {
                  singular: 'FAQ Section (RichText in RichText)',
                  plural: 'FAQ Sections (RichText in RichText)',
                },
                fields: [
                  {
                    name: 'faqAlternativeVersionTitle',
                    label: 'Title of my FAQ section',
                    type: 'text',
                  },
                  {
                    type: 'richText',
                    name: 'faqItems',
                    label: 'FAQ items',
                    editor: lexicalEditor({
                      admin: {
                        placeholder: '<-- Click the (+) to add your FAQ items here',
                      },
                      features: () => [
                        BlocksFeature({
                          blocks: [
                            {
                              slug: 'faqItemInBlocks',
                              labels: {
                                singular: 'Q&A item',
                                plural: 'Q&A items',
                              },
                              fields: [
                                {
                                  name: 'faqItemQuestion',
                                  label: 'Question',
                                  type: 'text',
                                },
                                {
                                  name: 'faqItemAnswer',
                                  label: 'Answer',
                                  type: 'richText',
                                },
                              ],
                            },
                          ],
                        }),
                      ],
                    }),
                  },
                ],
              },
            ],
          }),
        ],
      }),
    },

    // The problem does not occur here, when the items are not already in a RichText.
    /**
     * FAQ Section (Array)
     */
    // {
    //   name: 'faqArrayVersion',
    //   label: 'FAQ Section (Array)',
    //   type: 'group',
    //   fields: [
    //     {
    //       name: 'faqArrayVersionTitle',
    //       label: 'Title of my FAQ section',
    //       type: 'text',
    //     },
    //     {
    //       type: 'array',
    //       name: 'faqItems',
    //       labels: {
    //         singular: 'Q&A item',
    //         plural: 'Q&A items',
    //       },
    //       fields: [
    //         {
    //           name: 'faqItemQuestion',
    //           label: 'Question',
    //           type: 'text',
    //         },
    //         {
    //           name: 'faqItemAnswer',
    //           label: 'Answer',
    //           type: 'richText',
    //         },
    //       ],
    //     },
    //   ],
    // },
    /**
     * FAQ Section (Block)
     */
    // {
    //   name: 'faqBlockVersion',
    //   label: 'FAQ Section (Block)',
    //   type: 'group',
    //   fields: [
    //     {
    //       name: 'faqBlockVersionTitle',
    //       label: 'Title of my FAQ section',
    //       type: 'text',
    //     },
    //     {
    //       type: 'blocks',
    //       name: 'faqItems',
    //       labels: {
    //         singular: 'Q&A item',
    //         plural: 'Q&A items',
    //       },
    //       blocks: [
    //         {
    //           slug: 'faqItemInBlocks',
    //           labels: {
    //             singular: 'Q&A item',
    //             plural: 'Q&A items',
    //           },
    //           fields: [
    //             {
    //               name: 'faqItemQuestion',
    //               label: 'Question',
    //               type: 'text',
    //             },
    //             {
    //               name: 'faqItemAnswer',
    //               label: 'Answer',
    //               type: 'richText',
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
}
