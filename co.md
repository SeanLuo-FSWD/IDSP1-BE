collection comment

1. {
    postId: qlkwjeqwlr,
    comments: [
        {
            postId: lqkwjeq,
            createdAt: aslkdj,
            text: "aslkdjhqtqw"
        },
        {
            postId: lqkwjeq,
            createdAt: aslkdj,
            text: "aslkdjhqtqw"
        }
    ]
}

2. {
    postId: lqkwjeq,
    createdAt: aslkdj,
    text: "aslkdjhqtqw"
}

```js
{
    id:,
    caption:,
    images: [],
    totalLikes: ,
    totalComments,
    mostRecentComments: [],
    userid: ,
    username: ,
    userAvatar:, 
    currentUserLiked: true
}
```

```js
{
    text: ,
    postId,
    userId:,
    username:
    avatar:
}
```

Likes: 
```js
{
    postId:,
    userId;,
}


query likes -> filter the array -> currentUserLIke = true

getting mongodb to query and join to generate currentUserLIke;
query ({ postId, userId }) -> currentUserLIke = true;