const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
import { async } from "regenerator-runtime";
const deleteBtns = document.querySelectorAll(".fa-trash-alt");
const avatar = document.querySelector(".comment__avatar");
const all_comment_time = document.querySelectorAll(".commnet_time");

const elapsedTime = () => {
  all_comment_time.forEach((date) => {
    const start = new Date(date.textContent);
    const end = new Date();
    const diff = (end - start) / 1000;
    const times = [
      { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
      { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
      { name: "일", milliSeconds: 60 * 60 * 24 },
      { name: "시간", milliSeconds: 60 * 60 },
      { name: "분", milliSeconds: 60 },
    ];
    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);
      if (betweenTime > 0) {
        date.textContent = ` · ${betweenTime}${value.name} 전`;
      }
    }
    date.textContent = " · 방금 전";
  });
};

elapsedTime();

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const makeDiv = document.createElement("div");
  makeDiv.className = "commnet_owner_avatar";
  const avatar_img = document.createElement("img");
  avatar_img.src = avatar.src;
  avatar_img.crossOrigin = "crossorigin";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const span2 = document.createElement("i");
  span2.className = "far fa-trash-alt";
  makeDiv.appendChild(avatar_img);
  makeDiv.appendChild(span);
  newComment.appendChild(makeDiv);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("input");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  const avatar_url = avatar.src;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, avatar_url }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
  const {
    target: { parentElement: deleteComment },
  } = event;
  const {
    dataset: { id },
  } = deleteComment;

  deleteComment.remove();

  await fetch(`/api/comment/${id}/delete`, {
    method: "DELETE",
  });
};

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", handleDelete);
});

if (form) {
  form.addEventListener("submit", handleSubmit);
}
