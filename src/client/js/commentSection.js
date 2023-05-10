const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
import { async } from "regenerator-runtime";
const deleteBtns = document.querySelectorAll(".fa-trash-alt");
const avatar = document.querySelector(".comment__avatar");
const avatar_owner = document.querySelector(".comment__avatars");

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "video__comment";
    const makeDiv = document.createElement("div");
    makeDiv.className = "commnet_owner";
    const avatar_img = document.createElement("img");
    avatar_img.src = avatar.src;
    avatar_img.crossOrigin = "crossorigin";
    const span = document.createElement("span");
    span.innerText = `${text}`;
    const span2 = document.createElement("i");
    const makeDiv2 = document.createElement("div");
    makeDiv2.className = "commnet_owner_avatar";
    makeDiv2.appendChild(avatar_img);
    const makeDiv3 = document.createElement("div");
    const makeDiv4 = document.createElement("div");
    const makeDiv5 = document.createElement("div");
    const owner_name = avatar_owner.id;

    const span3 = document.createElement("span");
    span3.innerText = `${owner_name} · 방금전`;

    makeDiv3.appendChild(makeDiv4);
    makeDiv3.appendChild(makeDiv5);

    makeDiv4.className = "commnet_owner_name";
    makeDiv4.appendChild(span3);
    makeDiv5.appendChild(span);

    span2.className = "far fa-trash-alt";
    makeDiv.appendChild(makeDiv2);
    makeDiv.appendChild(makeDiv3);
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
