# QR Code Widget para Navegador do OBS Studio

Este é um widget de QR code desenvolvido para ser utilizado no navegador do OBS Studio ou Streamlabs.
Para ter um resultado visual de toda mudança sem precisar abrir o OBS Studio/Streamlabs, ou se você preferir usar o StreamElements, use o [QRCodeWidget.SE](https://github.com/xogumon/qrwidget). É só seguir o passo-a-passo.

## Como usar

1. Abra o OBS Studio ou Streamlabs e adicione uma fonte do tipo "Navegador".
2. Insira a URL https://git.xog.one/qrcode.widget/ como fonte da página da web.
3. Configure os parâmetros do widget na URL, adicionando os seguintes valores:

| Parâmetro | Descrição                                                                          | Valor Padrão          |
| --------- | ---------------------------------------------------------------------------------- | --------------------- |
| bg        | Cor do widget (em hexadecimal ou nome em inglês)                                   | `#ffffff`             |
| color     | Cor do QR code (em hexadecimal ou nome em inglês)                                  | `#000000`             |
| show      | Duração da exibição do QR code em minutos                                          | `1`                   |
| hide      | Duração da ocultação do QR code em minutos                                         | `10`                  |
| interval  | Duração da exibição de cada mensagem em segundos                                   | `5`                   |
| url       | URL para a qual o QR code deve redirecionar                                        | `https://example.com` |
| title     | Titulo exibido no Widget (caso não definido, exibe a url sem protocolo http/https) | `example.com`         |
| msg       | Mnsagem animada exibida no Widget                                                  | -                     |
| ...       | Mensagens adicionais                                                               | -                     |

4. Defina a largura para 235.
5. Defina a altura para 300.

Exemplo de URL com parâmetros:

`https://git.xog.one/qrcode.widget/?url=https://www.example.com&msg=Essa é a mensagem 1&msg=Essa é a mensagem 2&msg=Essa é a mensagem 3&show=1&hide=10&interval=5&color=red`

### Observações

- É importante que você teste o widget antes de utilizá-lo em uma transmissão ao vivo.
- Não esqueça de definir a URL e as mensagens, caso contrário, o widget exibirá apenas a URL padrão.
- Foram utilizados neste projeto as bibliotecas Bootstrap, Animate.css, Fitty, TinyColor e QR Code Styling.
