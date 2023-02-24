// Usaremos animate.css
const animateCSS = async (element, animation, prefix = "animate__") => {
  const animationName = `${prefix}${animation.replace(prefix, "")}`;
  const node =
    element instanceof Element ? element : document.querySelector(element);

  node.classList.add(`${prefix}animated`, animationName);

  await new Promise((resolve) =>
    node.addEventListener("animationend", resolve, { once: true })
  );

  node.classList.remove(`${prefix}animated`, animationName);
};

// Parametros que definirão os valores do Widget
const searchParams = new URLSearchParams(location.search);
const queryParams = Array.from(searchParams.entries()).reduce(
  (params, [key, value]) => ({
    ...params,
    [key.toLowerCase()]: isNaN(value) ? String(value) : Number(value),
  }),
  {}
);

// Definição do objeto Widget
const Widget = {
  // Variável para controlar o índice de mensagens
  idx: 0,

  // Elemento HTML que representa o widget
  boxElement: document.querySelector("#widget"),

  // Lista de mensagens do widget
  messageElements: document.querySelector("#widget .messages"),

  // Variáveis para controlar o intervalo de exibição das mensagens
  messageInterval: null,
  messageIntervalTime: (queryParams.interval || 5) * 1000,

  // Alterna as mensagens exibidas no widget
  messageSlider() {
    const messages = Array.from(this.messageElements.children);
    const numMessages = messages.length;
    const prevIdx = this.idx === 0 ? numMessages - 1 : this.idx - 1;
    messages.forEach((message, index) => {
      const active = this.idx === index;
      const prevMessage = messages[prevIdx];
      const hasPrevMessage = index > 0;
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
      setTimeout(() => this.toggle(), (queryParams.hide || 10) * 60000);
    } else {
      this.show();
      setTimeout(() => this.toggle(), (queryParams.show || 1) * 60000);
    }
  },

  // Inicializa o widget
  init() {
    try {
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
          fitty(messageElement);
        });
      const url = queryParams.url || "xog.one/pix";
      siteBoxElement.textContent = url.replace(/^https?:\/\//i, "");
      const qrCode = new QRious({
        element: qrCodeElement,
        value: url,
        size: 200,
        foreground: queryParams.color || "#212529",
        backgroundAlpha: 0,
      });
      if (!qrCode) throw new Error("Erro ao gerar QRcode");
      fitty(siteBoxElement, { multiLine: false });
      this.toggle();
    } catch {
      console.log("Erro ao iniciar o widget");
    }
  },
};

// Inicialização do widget
onload = () => Widget.init();
