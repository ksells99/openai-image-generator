const onSubmit = (e) => {
  e.preventDefault();
  clearErrorAndImage();

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    alert("Please enter a prompt");
    return;
  }

  generateImageRequest(prompt, size);
};

const generateImageRequest = async (prompt, size) => {
  try {
    showSpinner();

    // setup fetch request
    const res = await fetch("/openai/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!res.ok) {
      hideSpinner();
      throw new Error("The image could not be generated!");
    }

    // Get image from response & display it
    const data = await res.json();
    hideSpinner();
    const imageUrl = data.newImageUrl;

    document.querySelector("#image").src = imageUrl;

    //
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
};

const showSpinner = () => {
  document.querySelector(".spinner").classList.add("show");
};

const hideSpinner = () => {
  document.querySelector(".spinner").classList.remove("show");
};

const clearErrorAndImage = () => {
  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";
};

document.querySelector("#image-form").addEventListener("submit", onSubmit);
