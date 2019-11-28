// task 1
function isTicketsSale(arr) {
  const priceTicket = 25;
  let cashBox = 0;
  const filterArr = arr.map((item, index) => {
    if (index === 0 && item > priceTicket) {
      return 'error';
    } else {
      if (item - priceTicket > cashBox) {
        return 'error';
      } else {
        cashBox += priceTicket;
        return 'success';
      }
    }
  });

  if (filterArr.indexOf('error') === -1) {
    return 'success';
  } else {
    return 'error';
  }
}

// init
isTicketsSale([25, 25, 50]);

// task 2
function getSum(a, b) {
  let newArr = [];
  if (a.length >= b.length) {
    newArr = a.split('').map((value, index) => {
      if (Number.isNaN(Number(value) + Number(b[index]))) {
        return Number(value);
      } else {
        return Number(value) + Number(b[index]);
      }
    });
  } else {
    newArr = b.split('').map((value, index) => {
      if (Number.isNaN(Number(value) + Number(a[index]))) {
        return Number(b[index]);
      } else {
        return Number(value) + Number(a[index]);
      }
    });
  }

  return newArr.join('');
}

// init
getSum('11111111111111111111111111111111111111111111111111', '23333333333333333333333333333333333333333333333333');

// task 3

// data
const listOfPosts = [
  {
    id: 1,
    post: 'some post1',
    title: 'title 1',
    author: 'Ivanov',
    comments: [
      {
        id: 1.1,
        comment: 'some comment1',
        title: 'title 1',
        author: 'Rimus',
      },
      {
        id: 1.2,
        comment: 'some comment2',
        title: 'title 2',
        author: 'Uncle',
      },
    ],
  },
  {
    id: 2,
    post: 'some post2',
    title: 'title 2',
    author: 'Ivanov',
    comments: [
      {
        id: 1.1,
        comment: 'some comment1',
        title: 'title 1',
        author: 'Rimus',
      },
      {
        id: 1.2,
        comment: 'some comment2',
        title: 'title 2',
        author: 'Uncle',
      },
      {
        id: 1.3,
        comment: 'some comment3',
        title: 'title 3',
        author: 'Rimus',
      },
    ],
  },
  {
    id: 3,
    post: 'some post3',
    title: 'title 3',
    author: 'Rimus',
  },
  {
    id: 4,
    post: 'some post4',
    title: 'title 4',
    author: 'Uncle',
  },
];

function getQuantityPostsByAuthor(list, author) {
  let posts = 0;
  let comments = 0;
  list.forEach((post) => {
    if (post.author === author) {
      posts += 1;
    }

    if (post.comments) {
      post.comments.forEach((comment) => {
        if (comment.author === author) {
          comments += 1;
        }
      });
    }
  });

  return `post: ${posts}, comments: ${comments}`;
}

// init
getQuantityPostsByAuthor(listOfPosts, 'Rimus');
