const thumb = document.querySelector("#avatar");

const setThumbnail = (event) => {
    const checkNoImg = document.querySelector(".noImg__avatar");
    if (checkNoImg !== null) {
        checkNoImg.remove();
    }
    const checkImg = document.querySelector(".thumbnail_preview");
    if (checkImg !== null) {
        checkImg.remove();
    }
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = document.createElement("img");
        img.className = "thumbnail_preview";
        img.setAttribute("src", event.target.result);
        document.querySelector("div#image_container").appendChild(img);
    };

    reader.readAsDataURL(event.target.files[0]);
};

thumb.addEventListener("change", setThumbnail);
