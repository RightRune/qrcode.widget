# QR Code Widget para Navegador do OBS Studio

Este é um widget de QR code desenvolvido para ser utilizado no navegador do OBS Studio ou Streamlabs.

## Como usar

1. Abra o OBS Studio ou Streamlabs e adicione uma fonte do tipo "Navegador".
2. Insira a URL https://git.xog.one/qrcode.widget/ como fonte da página da web.
3. Configure os parâmetros do widget na URL, adicionando os seguintes valores:

| Parâmetro | Descrição                                         | Valor Padrão          |
| --------- | ------------------------------------------------- | --------------------- |
| url       | URL para a qual o QR code deve redirecionar       | `https://example.com` |
| color     | Cor do QR code (em hexadecimal ou nome em inglês) | `#212529`             |
| show      | Duração da exibição do QR code em minutos         | `1`                   |
| hide      | Duração da ocultação do QR code em minutos        | `10`                  |
| interval  | Duração da exibição de cada mensagem em segundos  | `5`                   |
| msg1      | Primeira mensagem                                 | `Hello world`         |
| msg2      | Segunda mensagem                                  | `Hello universe`      |
| ...       | Mensagens adicionais (seguindo o padrão `msg$`)   | -                     |

4. Defina a largura para 235.
5. Defina a altura para 300.

Exemplo de URL com parâmetros:

`https://git.xog.one/qrcode.widget/?url=https://www.example.com&msg1=Essa é a mensagem 1&msg2=Essa é a mensagem 2&msg3=Essa é a mensagem 3&show=1&hide=10&interval=5&color=red`

### Observações

- É importante que você teste o widget antes de utilizá-lo em uma transmissão ao vivo.
- Não esqueça de definir a URL e as mensagens, caso contrário, o widget exibirá apenas a URL padrão.
- Foram utilizados neste projeto as bibliotecas Bootstrap, Animate.css, Fitty, TinyColor e QRious.
