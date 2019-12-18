/* eslint-disable */
export default {
  main: (id, type, image, title, author, date, description) => {
    switch (type) {
      case 'video':
        return {
          id,
          type: 'video',
          preview: {
            poster: image ? image : './img/blog-post-1.png',
            src: './video/video.mp4',
          },
          head: {
            avatar: './img/blog-user-1.png',
            title: author ? author : 'Neil Richards',
            info: {
              date,
              long: '7 min read',
              comments: '19',
              rating: [
                {
                  state: 'fill',
                },
                {
                  state: 'fill',
                },
                {
                  state: 'half_filled',
                },
                {
                  state: 'empty',
                },
                {
                  state: 'empty',
                },
              ],
            },
          },
          body: {
            title,
            description,
            link: {
              url: 'post.html',
              text: 'Read more',
            },
          },
          footer: {
            likes: '75',
            socials: [
              {
                title: 'facebook',
                link: '/'
              },
              {
                title: 'dribbble',
                link: '/'
              },
              {
                title: 'instagram',
                link: '/'
              }
            ]
          },
        };
      case 'music':
        return {
          id,
          type: 'music',
          preview: {
            poster: image ? image : './img/blog-post-2.png',
            src: './audio/audio.mp3',
          },
          head: {
            avatar: './img/blog-user-2.png',
            title: author ? author : 'Sarah Healy',
            info: {
              date,
              long: '12 min read',
              comments: '4',
              rating: [
                {
                  state: 'fill',
                },
                {
                  state: 'empty',
                },
                {
                  state: 'empty',
                },
                {
                  state: 'empty',
                },
                {
                  state: 'empty',
                },
              ],
            },
          },
          body: {
            title,
            description,
            link: {
              url: 'post.html',
              text: 'Read more',
            },
          },
          footer: {
            likes: '75',
            socials: [
              {
                title: 'facebook',
                link: '/'
              },
              {
                title: 'dribbble',
                link: '/'
              },
              {
                title: 'instagram',
                link: '/'
              }
            ]
          },
        };
      case 'image':
        return {
          id,
          type: 'image',
          preview: {
            poster: image ? image : './img/blog-post-3.png',
          },
          head: {
            avatar: './img/blog-user-3.png',
            title: author ? author : 'Grace Noh',
            info: {
              date,
              long: '16 min read',
              comments: '421',
              rating: [
                {
                  state: 'fill',
                },
                {
                  state: 'fill',
                },
                {
                  state: 'empty',
                },
                {
                  state: 'empty',
                },
                {
                  state: 'empty',
                },
              ],
            },
          },
          body: {
            title,
            description,
            link: {
              url: 'post.html',
              text: 'Read more',
            },
          },
          footer: {
            likes: '75',
            socials: [
              {
                title: 'facebook',
                link: '/'
              },
              {
                title: 'dribbble',
                link: '/'
              },
              {
                title: 'instagram',
                link: '/'
              }
            ]
          },
        };
      case 'text':
        return {
          id,
          type: 'text',
          head: {
            avatar: image ? image : './img/blog-user-4.png',
            title: author ? author : 'Alex Zlatkus',
            info: {
              date,
              long: '17 min read',
              comments: '77',
              rating: [
                {
                  state: 'fill',
                },
                {
                  state: 'fill',
                },
                {
                  state: 'fill',
                },
                {
                  state: 'empty',
                },
                {
                  state: 'empty',
                },
              ],
            },
          },
          body: {
            title,
            description,
            link: {
              url: 'post.html',
              text: 'Read more',
            },
          },
          footer: {
            likes: '75',
            socials: [
              {
                title: 'facebook',
                link: '/'
              },
              {
                title: 'dribbble',
                link: '/'
              },
              {
                title: 'instagram',
                link: '/'
              }
            ]
          },
        };
    }
  }
}
