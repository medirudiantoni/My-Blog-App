export class MarginLeftTool {
  // Metode-metode yang diperlukan
  static get isReadOnlySupported() {
    return true;
  }

  // Metode untuk menyimpan data blok
  save(blockContent) {
    return {
      text: blockContent.textContent,
      // Informasi khusus lainnya
    };
  }

  // Metode untuk merender blok dengan gaya margin-left
  render(data, readOnly) {
    const wrapper = document.createElement("div");
    const paragraph = document.createElement("p");
    paragraph.textContent = data.text;

    // Tambahkan gaya margin-left di sini
    paragraph.style.marginLeft = "20px";

    wrapper.appendChild(paragraph);
    return wrapper;
  }
}

export class FirstLetterTool {
  // Metode-metode yang diperlukan
  static get isReadOnlySupported() {
    return true;
  }

  // Metode untuk menyimpan data blok
  save(blockContent) {
    return {
      text: blockContent.textContent,
      // Informasi khusus lainnya
    };
  }

  // Metode untuk merender blok dengan gaya huruf pertama yang berbeda
  render(data, readOnly) {
    const wrapper = document.createElement("div");
    const paragraph = document.createElement("p");
    paragraph.textContent = data.text;

    // Tambahkan gaya huruf pertama yang berbeda di sini
    paragraph.style.float = "left";
    paragraph.style.marginRight = "16px";
    paragraph.style.fontSize = "4.5rem";
    paragraph.style.fontFamily = "serif";

    wrapper.appendChild(paragraph);
    return wrapper;
  }
}
