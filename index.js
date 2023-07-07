let users = [
  {
    id: 1,
    userId: 1,
    name: " Kien Dam",
  },
  {
    id: 2,
    userId: 2,
    name: " Tran Ky",
  },
  {
    id: 3,
    userId: 3,
    name: " Nguyen Vu",
  },
];
let comments = [
  {
    id: 1,
    content: "Ra khoa moi chua anh ei",
  },
  {
    id: 2,
    content: "Vua ra xong em oi",
  },
  {
    id: 1,
    content: "OK luon anh oi",
  },
];
/*
1: lấy cmt
2: từ cmt lấy ra người đã cmt ( user-id)
3: từ user-id lấy ra user tương ứng vs cmt đó
*/
// fake api
function getComment() {
  return new Promise(function (res) {
    setTimeout(function () {
      res(comments);
    }, 500);
  });
}

getComment()
  .then(function (comments) {
    let userIds = comments.map(function (comment) {
      return comment.id;
    });
    return getUserById(userIds).then(function (users) {
      return {
        users: users,
        comments: comments,
      };
    });
  })
  .then(function (data) {
    console.log(data);
    let commentBlock = document.getElementById("comment-box");
    let html = "";
    data.comments.forEach(function (comment) {
      let user = data.users.find(function (user) {
        return user.id === comment.id;
      });
      html += `<li>${user.name} : ${comment.content}</li>`;
    });
    commentBlock.innerHTML = html;
  });
function getUserById(userIds) {
  return new Promise(function (res) {
    let result = users.filter(function (user) {
      return userIds.includes(user.id);
    });
    res(result);
  });
}
