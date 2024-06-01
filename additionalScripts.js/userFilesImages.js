document.addEventListener("DOMContentLoaded", () => {
  const updateImage = (inputId, imageId) => {
    const inputFile = document.getElementById(inputId);
    const icon = document.getElementById(imageId);

    if (inputFile) {
      inputFile.addEventListener("change", () => {
        const file = inputFile.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            icon.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  updateImage("insert1", "image1");
  updateImage("insert2", "image2");
  updateImage("insert3", "image3");
});
