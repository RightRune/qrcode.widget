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
const queryParams = Array.from(
  new URLSearchParams(
    location.href.replace(
      `${location.protocol}//${location.host}${location.pathname}`,
      ""
    )
  )
).reduce(
  (params, [key, value]) => ({
    ...params,
    [key.toLowerCase()]: isNaN(value) ? String(value) : Number(value),
  }),
  {
    url: "https://example.com",
    show: 1,
    hide: 10,
    interval: 5,
    msg1: "Hello world",
    msg2: "Hello universe",
    color: "#212529",
  }
);
// Definição do objeto Widget
const Widget = {
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
      borderColor.setAlpha(0.18);
      this.boxElement.style.border = `0.1rem solid ${borderColor.toString()}`;
      const siteBoxElement = this.boxElement.querySelector(".site strong");
      const qrCodeElement = document.getElementById("qrcode");
      if (!siteBoxElement || !qrCodeElement) {
        throw new Error();
      }
      Object.entries(queryParams)
        .filter(([key]) => key.startsWith("msg"))
        .sort()
        .forEach(([, message]) => {
          const messageElement = document.createElement("span");
          messageElement.textContent = message;
          this.messageElements.append(messageElement);
          fitty(messageElement, { multiLine: true, minSize: 12, maxSize: 24 });
        });
      siteBoxElement.textContent = queryParams.url.replace(/^https?:\/\//i, "");
      const qrCode = new QRious({
        element: qrCodeElement,
        value: queryParams.url,
        foreground: qrCodeColor,
        backgroundAlpha: 0,
        padding: 0,
        size: 300,
      });
      if (!qrCode) throw new Error("Erro ao gerar QRcode");
      fitty(siteBoxElement, { multiLine: false, minSize: 12, maxSize: 64 });
      this.toggle();
    } catch (err) {
      console.log(err);
    }
  },
};

// Inicialização do widget
onload = () => Widget.init();
