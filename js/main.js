// Usaremos animate.css para animar a festa
const animateCSS = async (element, animation, prefix = "animate__") => {
  const animationName = `${prefix}${animation.replace(prefix, "")}`;
  const node =
    typeof element === "string" ? document.querySelector(element) : element;
  if (!node || !(node instanceof Element)) {
    throw new Error("Elemento não encontrado");
  }
  node.classList.add(`${prefix}animated`, animationName);
  await new Promise((resolve) =>
    node.addEventListener("animationend", resolve, { once: true })
  );
  node.classList.remove(`${prefix}animated`, animationName);
  return node;
};

// Parametros que definirão os valores do Widget
const searchParams = new URLSearchParams(
  location.href.replace(
    `${location.protocol}//${location.host}${location.pathname}`,
    ""
  )
);

const allMessages = searchParams.getAll("msg");
for (const [key, value] of searchParams.entries()) {
  if (key.match(/msg[0-9]/)) {
    allMessages.push(value);
  }
}

const queryParams = {
  url: searchParams.get("url") || "https://example.com",
  show: Number(searchParams.get("show") || 1),
  hide: Number(searchParams.get("hide") || 10),
  interval: Number(searchParams.get("interval") || 5),
  color: searchParams.get("color") || "#000",
  msgs: allMessages.length ? allMessages : ["Hello world!", "Hello universe!"],
};

// Definição do objeto Widget
const Widget = {
  // Cor do QR code com tinycolor
  color: tinycolor(queryParams.color),

  // Variável para controlar o índice de mensagens
  idx: 0,

  // Elemento HTML que representa o widget
  boxElement: document.querySelector("#widget"),

  // Lista de mensagens do widget
  messageElements: document.querySelector("#widget .messages"),

  // Variáveis para controlar o intervalo de exibição das mensagens
  messageInterval: null,
  messageIntervalTime: queryParams.interval * 1000,

  // Alterna as mensagens exibidas no widget
  messageSlider() {
    const messages = Array.from(this.messageElements.children);
    const numMessages = messages.length;
    const prevIdx = this.idx === 0 ? numMessages - 1 : this.idx - 1;
    messages.forEach((message, index) => {
      const active = this.idx === index;
      const prevMessage = messages[prevIdx];
      const isActiveOrPrev = index === prevIdx || active;
      if (active) {
        message.classList.remove("show", "hide");
        animateCSS(message, "bounceInLeft").then(() => {
          message.classList.add("show");
        });
        if (prevMessage) {
          prevMessage.classList.remove("show", "hide");
          animateCSS(prevMessage, "bounceOutRight").then(() =>
            prevMessage.classList.add("hide")
          );
        }
      } else {
        message.classList.remove("show", "hide");
        if (!isActiveOrPrev) {
          message.classList.add("hide");
        }
      }
    });
    this.idx = (this.idx + 1) % numMessages;
  },

  // Exibe o widget
  show() {
    this.boxElement.classList.remove("hide");
    animateCSS(this.boxElement, "animate__bounceIn").then(() =>
      this.boxElement.classList.add("show")
    );
    this.messageInterval = setInterval(
      () => this.messageSlider(),
      this.messageIntervalTime
    );
    this.messageSlider();
  },

  // Oculta o widget
  hide() {
    clearInterval(this.messageInterval);
    this.idx = 0;
    this.boxElement.classList.remove("show");
    animateCSS(this.boxElement, "animate__bounceOutUp").then(() =>
      this.boxElement.classList.add("hide")
    );
  },

  // Alterna o estado do widget entre exibição e ocultação
  toggle() {
    if (this.boxElement.classList.contains("show")) {
      this.hide();
      setTimeout(() => this.toggle(), queryParams.hide * 60000);
    } else {
      this.show();
      setTimeout(() => this.toggle(), queryParams.show * 60000);
    }
  },

  // Inicializa o widget
  init() {
    try {
      const qrCodeColor = this.color.toString();
      const borderColor = this.color.clone();
      const textColor = this.color.isDark() ? "#000000" : "#ffffff";
      const background = this.color.isLight() ? "#000000" : "#ffffff";
      borderColor.setAlpha(0.18);
      this.boxElement.style.backgroundColor = `${background}`;
      this.boxElement.style.color = `${textColor}`;
      this.boxElement.style.border = `0.1rem solid ${borderColor.toString()}`;
      const siteElement = document.createElement("span");
      siteElement.textContent = queryParams.url.replace(/^https?:\/\//i, "");
      const siteBoxElement = this.boxElement.querySelector(".site");
      siteBoxElement.append(siteElement);
      fitty(siteElement, { multiLine: false, minSize: 12, maxSize: 64 });
      const qrCodeElement = document.querySelector(".qrcode");
      if (!siteBoxElement || !qrCodeElement) {
        throw new Error();
      }
      queryParams.msgs.forEach((message) => {
        const messageElement = document.createElement("span");
        messageElement.textContent = message;
        this.messageElements.append(messageElement);
        fitty(messageElement, { multiLine: true, minSize: 14, maxSize: 24 });
      });
      QrCreator.render(
        {
          text: queryParams.url,
          radius: 0.5, // 0.0 to 0.5
          ecLevel: "L", // L, M, Q, H
          fill: qrCodeColor,
          background,
          size: 166,
        },
        qrCodeElement
      );
      this.toggle();
    } catch (err) {
      console.log(err);
    }
  },
};

// Inicialização do widget
onload = () => Widget.init();
