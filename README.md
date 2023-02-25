# QR Code Widget para Navegador do OBS Studio

Este projeto é um widget de QR code para o navegador do OBS Studio.

## Como usar

1. Abra o OBS Studio e adicione uma fonte do tipo "Navegador".
2. Adicione a URL https://xogumon.github.io/qrcode.widget/ como fonte da página da web.
3. Configure os parâmetros do widget na URL adicionando os parâmetros com os seguintes valores:

| Parâmetro | Descrição                                      | Valor Padrão      |
| --------- | ---------------------------------------------- | ----------------- |
| url       | URL para a qual o QR code deve redirecionar    | `https://xog.one` |
| color     | Cor do QR code                                 | `#212529`         |
| show      | Tempo de exibição do QR code em minutos        | `1`               |
| hide      | Tempo de ocultação do QR code em minutos       | `10`              |
| interval  | Tempo de exibição de cada mensagem em segundos | `5`               |
| msg1      | Primeira mensagem                              | -                 |
| msg2      | Segunda mensagem                               | -                 |
| ...       | Mensagens adicionais                           | -                 |

4. Defina a largura em 240.
5. Defina a altura em 285.

Exemplo de URL com parâmetros:

`https://xogumon.github.io/qrcode.widget/?url=https://www.xogumon.com&msg1=Essa é a mensagem 1&msg2=Essa é a mensagem 2&msg3=Essa é a mensagem 3&show=1&hide=10&interval=5&color=red`

### Notas

- Certifique-se de testar o widget antes de usá-lo em uma transmissão ao vivo.
- Não esqueça de definir as mensagens e a URL, caso contrário, a URL padrão será exibida sem mensagens.
